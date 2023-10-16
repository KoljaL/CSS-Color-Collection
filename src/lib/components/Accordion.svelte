<script>
	import { slide } from 'svelte/transition';

	export let title;
	export let isOpen = false;

	const toggle = () => (isOpen = !isOpen);

	function fadeSlide(node, options) {
		const slideTrans = slide(node, options);
		return {
			duration: options.duration,
			css: (t) => `
				${slideTrans.css(t)}
				opacity: ${t};
			`
		};
	}
</script>

<button on:click={toggle} aria-expanded={isOpen} class:isOpen>
	<svg
		style="tran"
		width="20"
		height="20"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<path d="M9 5l7 7-7 7" />
	</svg>
	{title}
</button>
{#if isOpen}
	<div transition:fadeSlide={{ duration: 300 }}>
		<slot />
	</div>
{/if}

<style>
	button {
		border: none;
		background: none;
		display: block;
		color: inherit;
		font-size: 36px;
		cursor: pointer;
		margin: 0;
		margin-top: 1rem;
		padding: 0;
		background-color: var(--bodyBgColor);
		width: 100%;
		text-align: start;
	}
	button.isOpen {
		position: -webkit-sticky;
		position: sticky;
		top: 85px;
	}
	div {
		padding: 1rem;
	}

	svg {
		transition: transform 0.2s ease-in;
	}

	[aria-expanded='true'] svg {
		transform: rotate(0.25turn);
	}
</style>
