<script>
	import { onMount } from 'svelte';
	import { ColorTranslator } from 'colortranslator';
	import Accordion from './Accordion.svelte';
	import { browser } from '$app/environment';
	import Format from '$lib/icons/Format.svelte';
	export let cssText = '';

	$: Colors = [];

	let fontColor = 'black';
	let sheetRules = [];
	$: if (cssText && browser) {
		Colors = createColorGrid(cssText);
	}
	export let isOpen = false;

	// onMount(() => {
	// 	Colors = createColorGrid(cssText);
	// });

	function createColorGrid(cssText) {
		const customColors = [];
		const sheet = new CSSStyleSheet();
		sheet.replaceSync(cssText);
		sheetRules.push(...sheet.cssRules);
		console.log('sheetRules', sheetRules);
		for (const rule of sheet.cssRules) {
			if (rule instanceof CSSStyleRule) {
				const ruleName = rule.selectorText;
				const styles = [];
				for (const declaration of rule.style) {
					if (declaration.startsWith('--')) {
						try {
							const ct = new ColorTranslator(rule.style.getPropertyValue(declaration));
							const valueText = `hsl(
							<span>${Math.round(ct.hsl['h'])},</span>
							<span>${Math.round(ct.hsl['s'])}%,</span>
							<span>${Math.round(ct.hsl['l'])}%)</span>`;
							if (ct.hsl['l'] + ct.hsl['s'] / 2 <= 50) {
								fontColor = 'white';
							} else {
								fontColor = 'black';
							}
							styles.push({
								name: declaration,
								valueText: valueText,
								value: rule.style.getPropertyValue(declaration),
								fontColor: fontColor
							});
						} catch (error) {
							console.log('error', error);
							console.log(
								'rule.style.getPropertyValue(declaration)',
								rule.style.getPropertyValue(declaration)
							);
						}
					}
				}
				customColors.push({
					name: ruleName,
					styles
				});
			}
		}
		return customColors;
	}

	function toggleColorFormat(e, i) {
		const rule = sheetRules[i];
		console.log('rule', rule);
		const sccText = rule.cssText;
		// copy to clipboard
		navigator.clipboard.writeText(sccText);
		// rule.styles.forEach((style) => {
		// 	console.log('ct', style);
		// 	const ct = new ColorTranslator(style.value);
		// 	// const valueText = `#${ct.hex['r']}${ct.hex['g']}${ct.hex['b']}`;
		// 	// style.valueText = valueText;
		// });
	}

	// $: console.log('cssText', cssText);
	// $: console.log('Colors', Colors);
</script>

{#each Colors as rule, index}
	<Accordion title={rule.name} {isOpen}>
		<!-- <div class="accordionHeader" slot="header">
			<button
			class="icon"
				on:click={(e) => {
					toggleColorFormat(e, index);
				}}
			>
				<Format />
			</button>
			<button>2</button>
			<button>3</button>
		</div> -->
		<div class="grid-container">
			{#each rule.styles as style}
				<div class="grid-item" style="background-color: {style.value}; --color:{style.fontColor}">
					<div class="color">{@html style.valueText}</div>
					<!-- <div class="value">{style.value}</div>  -->
					<div class="name">{style.name}</div>
				</div>
			{/each}
		</div>
	</Accordion>
{/each}

<style>
	.accordionHeader {
		position: sticky;
		display: flex;
		flex-direction: row;
		justify-content: end;
		align-items: center;
		gap: 1rem;
		width: max-content;
	}

	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 10px;
	}
	.grid-item {
		color: var(--color);
		padding: 0.5rem;
		text-align: center;
		border-radius: 0.5rem;
		border: 1px solid #000;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
	}
	.grid-item .color {
		font-size: 1.2rem;
		display: flex;
	}
	.grid-item .color :global(span) {
		display: inline-block;
		width: 3.5rem;
		text-align: right;
	}
	.grid-item .color :global(span:first-child) {
		width: 3rem;
		/* outline: 1px solid #000; */
	}

	.grid-item .name {
		font-size: 0.7rem;
		align-self: flex-end;
		justify-self: flex-end;
	}
</style>
