<script>
	import { fade } from 'svelte/transition';
	import { expoInOut } from 'svelte/easing';
	import { clickOutside } from '$lib/functions/clickOutside.js';

	let cArray = [];
	let hasHue = false;
	let isModalOpen = false;
	let pickedColorText = 'none';
	$: bodyBgColor = '';
	$: bodyFontColor = '';

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
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M12 4.81V19c-3.31 0-6-2.63-6-5.87c0-1.56.62-3.03 1.75-4.14L12 4.81M6.35 7.56C4.9 8.99 4 10.96 4 13.13C4 17.48 7.58 21 12 21s8-3.52 8-7.87c0-2.17-.9-4.14-2.35-5.57L12 2L6.35 7.56z"
			/>
		</svg>
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
	.colorWrapper {
		position: relative;
		width: fit-content;
	}
	.chooseColor {
		padding: 0.5rem;
		font-size: 0.9rem;
		border: 1px solid var(--bodyFontColor);
		border: none;
		color: var(--bodyFontColor);
		border-radius: 0.25rem;
		background-color: transparent;
		cursor: pointer;
	}
	.pickedColor {
		position: absolute;
		top: 1.5rem;
		right: 0rem;
		padding: 0.5rem;
		font-size: 0.9rem;
		white-space: nowrap;
	}
	.colorGrid {
		position: absolute;
		top: 0;
		right: 0;
		width: 25rem;
		max-width: 99vw;
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
		transition:
			transform 100ms ease-in-out 0s,
			background-color 400ms linear 0s;
	}
	/* .colorItem span {
		pointer-events: none;
	} */

	.colorItem:hover {
		transform: scale(1.1);
	}

	@media (max-width: 768px) {
		.colorItem {
			color: transparent !important;
		}
	}
</style>
