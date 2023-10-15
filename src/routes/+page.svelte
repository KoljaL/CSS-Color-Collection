<script>
	import '@fontsource/jetbrains-mono/300.css';
	import colors from '$lib/colors.css?inline';
	import '$lib/styles.css';
	import { ColorTranslator, Harmony, Mix } from 'colortranslator';
	import { onMount } from 'svelte';
	import ColorPickerAdvanced from '$lib/components/ColorPickerAdvanced.svelte';
	import Accordion from '../lib/components/Accordion.svelte';
	import CustomColors from '../lib/components/CustomColors.svelte';

	let Colors = [];
	let fontColor = 'black';
	onMount(() => {
		const sheet = new CSSStyleSheet();
		// console.log('sheet', sheet);
		sheet.replaceSync(colors);
		// console.log('sheet', sheet);

		for (const rule of sheet.cssRules) {
			// console.log(rule);
			if (rule instanceof CSSStyleRule) {
				// console.log('rule', rule);
				const ruleName = rule.selectorText;
				const styles = [];
				for (const declaration of rule.style) {
					// console.log(declaration);
					if (declaration.startsWith('--')) {
						const ct = new ColorTranslator(rule.style.getPropertyValue(declaration));
						// 	rule.style.getPropertyValue(declaration),
						// 	Harmony.ANALOGOUS,
						// 	Mix.ADDITIVE
						// );
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
					}
				}
				Colors.push({
					name: ruleName,
					styles
				});
			}
		}
		Colors = Colors;
	});
</script>

<header class="first">
	<h1 class="">ColorCollection</h1>
	<ColorPickerAdvanced />
</header>

<main class="last">
	<Accordion title="Custom Colors" isOpen={true}>
		<CustomColors />
	</Accordion>
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
</main>

<style>
	header {
		position: sticky;
		top: 0;
		background-color: var(--bodyBgColor, #fff);
		padding-bottom: 0.5rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		z-index: 1;
	}
	main {
		max-width: 99vw;
		padding: 1rem;
	}
	.grid-container {
		display: grid;
		/* margin-inline: auto; */
		/* grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr)); */
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

	.first,
	.second,
	.last {
		animation: 0.1s fade-drop;
		animation-fill-mode: forwards;
		opacity: 0;
	}

	.second {
		animation-delay: 0.1s;
		animation-duration: 0.5s;
	}

	.last {
		animation-delay: 0.2s;
		animation-duration: 0.5s;
	}

	@keyframes fade-drop {
		100% {
			opacity: 1;
		}
	}
</style>
