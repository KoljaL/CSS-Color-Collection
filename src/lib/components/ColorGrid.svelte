<script>
	import { onMount } from 'svelte';
	import { ColorTranslator } from 'colortranslator';
	import Accordion from './Accordion.svelte';
	import { browser } from '$app/environment';

	export let cssText = '';

	$: Colors = [];

	let fontColor = 'black';

	$: if (cssText && browser) {
		Colors = createColorGrid(cssText);
	}

	// onMount(() => {
	// 	Colors = createColorGrid(cssText);
	// });

	function createColorGrid(cssText) {
		const customColors = [];
		const sheet = new CSSStyleSheet();
		sheet.replaceSync(cssText);

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

	// $: console.log('cssText', cssText);
	// $: console.log('Colors', Colors);
</script>

{#each Colors as rule}
	<Accordion title={rule.name}>
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
