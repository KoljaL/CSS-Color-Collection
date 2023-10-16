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
	<h1 class="">ColorCollectionAnimation</h1>
	<ColorPickerAdvanced />
</header>

<main class="thirdAnimation">
	<Accordion title="Custom Colors" isOpen={true}>
		<CustomColors />
	</Accordion>

	<ColorGrid cssText={colors} />;
</main>

<style>
	header {
		position: sticky;
		top: 0;
		background-color: var(--bodyBgColor);
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
</style>
