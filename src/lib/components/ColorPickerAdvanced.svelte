<script>
	import { fade } from 'svelte/transition';
	import { expoInOut } from 'svelte/easing';
	import { clickOutside } from '$lib/functions/clickOutside.js';

	let cArray = [];
	let hasHue = false;
	let isModalOpen = false;
	let pickedColorText = 'none';
	$: bodyBgColor = '';
	$: bodyFontColor = 'hsl(0, 75%, 0%)';

	function setHue(colorItem, hue_i) {
		if (hasHue) {
			const hue = colorItem.style.getPropertyValue('--hue');
			const sat = colorItem.style.getPropertyValue('--sat');
			const light = colorItem.style.getPropertyValue('--light');
			bodyBgColor = `hsl(${hue}, ${sat}, ${light})`;
			document.body.style.setProperty('--bodyBgColor', bodyBgColor);
			bodyFontColor = parseInt(light) > 50 ? '#000' : '#fff';

			document.body.style.setProperty('--bodyFontColor', bodyFontColor);
			pickedColorText = `You have selected ${bodyBgColor}.`;
			isModalOpen = false;
		} else {
			let array = [];
			for (let i = 1; i <= 100; i++) {
				array.push({
					hue: Math.round(hue_i * 3.6, 1),
					sat: 75,
					light: 100 - i
				});
			}
			cArray = array;
			hasHue = true;
		}
	}

	function initPicker() {
		let array = [];
		for (let i = 0; i < 100; i++) {
			array.push({
				hue: Math.round(i * 3.6, 1),
				sat: 75,
				light: 50
			});
		}
		cArray = array;
		hasHue = false;
		pickedColorText = 'none';
		isModalOpen = true;
	}
	// initPicker();
	// $: console.log('cArray', cArray);
	// $: console.log('isModalOpen', isModalOpen);
</script>

<div
	class="colorWrapper"
	use:clickOutside={() => {
		isModalOpen = false;
	}}
>
	<button class="chooseColor" on:click={initPicker} on:keydown={initPicker}>
		Choose background color
	</button>
	<p class="pickedColor">{bodyBgColor}</p>

	{#if isModalOpen}
		<div
			class="colorGrid"
			in:fade={{ duration: 300, easing: expoInOut }}
			out:fade={{ duration: 150, easing: expoInOut }}
		>
			{#if cArray}
				{#each cArray as c, i}
					<button
						class="colorItem"
						style="--hue:{c.hue};  --sat:{c.sat}%; --light:{c.light}%;"
						style:color={c.light > 50 ? '#000' : '#fff'}
						on:click={(e) => setHue(e.target, i)}
						on:keydown={(e) => setHue(e.target, i)}
					>
						<!-- <span>h: {c.hue}</span><span>s: {c.sat}</span><span>l: {c.light}</span> -->
					</button>
				{/each}
			{/if}
		</div>
	{/if}
</div>

<style>
	:global(body) {
		color: var(--bodyFontColor, #000);
		background-color: var(--bodyBgColor, #fff);
	}
	.colorWrapper {
		position: relative;
		width: fit-content;
	}
	.chooseColor {
		padding: 0.5rem;
		font-size: 0.9rem;
		border: 1px solid var(--bodyFontColor, #000);
		color: var(--bodyFontColor, #000);
		border-radius: 0.25rem;
		background-color: transparent;
		cursor: pointer;
	}
	.pickedColor {
		position: absolute;
		top: 1.5rem;
		left: 0.25rem;
		padding: 0.5rem;
		font-size: 0.9rem;
	}
	.colorGrid {
		position: absolute;
		top: 0;
		right: 0;
		width: 30rem;
		--font-color: #000;
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		grid-gap: 0.5rem;
		/* background-color: var(--bodyFontColor); */
		/* border: 0.1px solid var(--bodyBgColor); */
		background-color: #fff;
		border: 1px solid #000;
		border-radius: 0.5rem;
		padding: 0.5rem;
	}

	.colorItem {
		background-color: hsl(var(--hue), var(--sat), var(--light));
		min-width: 20px;
		height: auto;
		aspect-ratio: 1 / 1;
		border: 0.1px solid #000;
		/* border: 0.1px solid var(--bodyBgColor, #fff); */
		border-radius: 0.25rem;
		text-align: left;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 0.5rem;
		cursor: pointer;
		color: var(--font-color);
		transition: transform 100ms ease-in-out 0s, background-color 400ms linear 0s;
	}
	.colorItem span {
		pointer-events: none;
	}

	.colorItem:hover {
		transform: scale(1.1);
	}

	@media (max-width: 768px) {
		.colorItem {
			color: transparent !important;
		}
	}
</style>
