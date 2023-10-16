<script>
	import '@fontsource/jetbrains-mono/300.css';
	import '$lib/styles.css';
	import { onMount } from 'svelte';
	import colors from '$lib/colors.css?inline';
	import ColorPickerAdvanced from '$lib/components/ColorPickerAdvanced.svelte';
	import Accordion from '../lib/components/Accordion.svelte';
	import CustomColors from '../lib/components/CustomColors.svelte';
	import ColorGrid from '../lib/components/ColorGrid.svelte';
	import Expand from '../lib/icons/Expand.svelte';
	let isOpen = false;
	// $:
	let isOpenCustom = true;
</script>

<svelte:head>
	<title>ColorCollection</title>
</svelte:head>

<header class="firstAnimation">
	<h1 class="small">Color Collection Animation</h1>
	<div class="subHeader">
		<button class="icon" on:click={() => ((isOpenCustom = !isOpen), (isOpen = !isOpen))}>
			<Expand />
		</button>
		<ColorPickerAdvanced />
	</div>
</header>

<main class="thirdAnimation">
	<Accordion title="Custom Colors" isOpen={isOpenCustom}>
		<CustomColors />
	</Accordion>

	<ColorGrid cssText={colors} {isOpen} />
</main>

<style>
	header {
		position: sticky;
		top: 0;
		background-color: var(--bodyBgColor);
		padding-bottom: 0.5rem;
		display: flex;
		flex-direction: row;
		align-items: top;
		justify-content: space-between;
		padding: 1rem;
		z-index: 1;
	}
	.subHeader {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
	}
	h1 {
		font-size: 2rem;
		margin: 0;
	}

	main {
		max-width: 99vw;
		padding: 1rem;
	}
</style>
