<script>
	import '@fontsource/jetbrains-mono/300.css';
	import '$lib/styles.css';
	import { onMount } from 'svelte';
	import colors from '$lib/colors.css?inline';
	import ColorPickerAdvanced from '$lib/components/ColorPickerAdvanced.svelte';
	import Accordion from '../lib/components/Accordion.svelte';
	import CustomColors from '../lib/components/CustomColors.svelte';
	import ColorGrid from '../lib/components/ColorGrid.svelte';
</script>

<svelte:head>
	<title>ColorCollection</title>
</svelte:head>

<header class="firstAnimation">
	<h1 class="small">Color Collection Animation</h1>
	<ColorPickerAdvanced />
</header>

<main class="thirdAnimation">
	<Accordion title="Custom Colors" isOpen={true}>
		<CustomColors />
	</Accordion>

	<ColorGrid cssText={colors} />
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
	h1 {
		font-size: 2rem;
		margin: 0;
	}

	main {
		max-width: 99vw;
		padding: 1rem;
	}
</style>
