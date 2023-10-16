<script>
	import ColorGrid from '$lib/components/ColorGrid.svelte';
	import { ColorTranslator } from 'colortranslator';
	import { onMount } from 'svelte';
	$: customColors = `.myColors{\n\t--php: #4F5B93;\n\t--svelte: hsl(15, 100%, 50%);\n\t--laravel: rgb(249, 50, 44);\n\t--javascript: #f0db4f;\n\t--tailwind: rgb(14 165 233);\n\t--vue: #42b883;\n}\n`;
	$: Colors = [];
	let fontColor = 'black';

	onMount(() => {
		Colors = createColorGrid(customColors);
	});

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

	function update(event) {
		const rows = customColors.split(/\r\n|\r|\n/).length;
		rowsTextarea = Math.ceil(rows / 5);
		Colors = createColorGrid(event.target.value);
	}
	let rowsTextarea = 2;
	// $: console.log('rowsTextarea', rowsTextarea);
	// $: console.log('customColors', customColors);
</script>

<div class="grid-container">
	<textarea bind:value={customColors} on:keyup={update} style="--rows-textarea: {rowsTextarea}" />
	{#each Colors as rule}
		{#each rule.styles as style}
			<div class="grid-item" style="background-color: {style.value}; --color:{style.fontColor}">
				<div class="color">{@html style.valueText}</div>
				<div class="name">{style.name}</div>
			</div>
		{/each}
	{/each}
</div>

<style>
	textarea {
		--rows-textarea: 2;
		width: 100%;
		height: calc(var(--rows-textarea) * 100px + 10);
		border: 1px solid var(--bodyFontColor);
		padding: 0.5rem;
		border-radius: 0.5rem;
		-moz-tab-size: 2;
		-o-tab-size: 2;
		tab-size: 2;
		background-color: var(--bodyBgColor);
		color: var(--bodyFontColor);
		grid-column: span 2;
		grid-row: span var(--rows-textarea);
		font-size: 1rem;
	}

	.grid-container {
		margin-top: 2rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		grid-auto-rows: 100px;
		/* grid-template-rows: auto; */
		/* grid-auto-rows: minmax(100px, auto); */
		grid-auto-flow: dense;
		gap: 10px;
	}

	@media (max-width: 700px) {
		.grid-container {
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		}
	}
	@media (max-width: 550px) {
		.grid-container {
			grid-template-columns: 1fr;
		}
		textarea {
			grid-column: span 1;
		}
	}
	.grid-item {
		color: var(--color);
		padding: 0.5rem;
		text-align: center;
		border-radius: 0.5rem;
		border: 1px solid #000;
		/* height: 90px; */
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
