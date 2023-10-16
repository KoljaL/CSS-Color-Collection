<script>
	import { slide, fade } from 'svelte/transition';

	export let title;
	export let isOpen = true;

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
		viewBox="0 -4 24 24"
		stroke="currentColor"
	>
		<path d="M9 5l7 7-7 7" />
	</svg>
	{title}
</button>
{#if isOpen}
	<header in:fade={{ duration: 300, delay: 200 }} out:fade={{ duration: 100 }}>
		<slot name="header" />
	</header>
{/if}
{#if isOpen}
	<div transition:fadeSlide={{ duration: 800, easing: 'linear' }}>
		<slot />
	</div>
{/if}

<style>
	header {
		position: relative;
		top: -2.25rem;
		right: 2rem;
		height: 0;
		/* border: 1px solid var(--bodyFontColor); */
		display: flex;
		flex-direction: row;
		justify-content: end;
		align-items: start;
	}
	button {
		border: none;
		background: none;
		display: block;
		color: inherit;
		font-size: 1.2rem;
		cursor: pointer;
		margin: 0;
		margin-top: 1rem;
		padding: 0;
		padding-bottom: 0.5rem;
		background-color: var(--bodyBgColor);
		width: 100%;
		text-align: start;
	}
	button:hover {
		text-decoration: underline;
	}
	button.isOpen {
		position: -webkit-sticky;
		position: sticky;
		top: 75px;
	}
	@media (width < 580px) {
		button.isOpen {
			top: 113px;
		}
	}
	div {
		/* padding: 1rem; */
		padding-block: 1rem;
	}

	svg {
		transition: transform 0.2s ease-in;
	}

	[aria-expanded='true'] svg {
		transform: rotate(0.25turn);
	}
</style>
