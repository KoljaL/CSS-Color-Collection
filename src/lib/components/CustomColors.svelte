<script>
	import ColorGrid from '$lib/components/ColorGrid.svelte';
	let editor;
	// export let customColors = '';
	// $: customColors = '';
	$: customColors = `.myColors{\n\t--php: #4F5B93;\n\t--svelte: hsl(15, 100%, 50%);\n}`;

	function update(event) {
		// tab key
		// if (event.keyCode === 9) {
		// 	// this will prevent us from tabbing out of the editor
		// 	event.preventDefault();
		// 	var doc = editor.ownerDocument.defaultView;
		// 	var sel = doc.getSelection();
		// 	var range = sel.getRangeAt(0);
		// 	var tabNode = document.createTextNode('\u00a0\u00a0');
		// 	range.insertNode(tabNode);
		// 	range.setStartAfter(tabNode);
		// 	range.setEndAfter(tabNode);
		// 	sel.removeAllRanges();
		// 	sel.addRange(range);
		// }
		// console.log('event', event);
		customColors = event.target.value;
	}
	// $: console.log('customColors', customColors);
</script>

<div class="customWrapper">
	<textarea bind:value={customColors} on:keyup={update} />
	<ColorGrid cssText={customColors} />
</div>

<style>
	.customWrapper {
		/* display: flex; */
		flex-direction: row;
		align-items: start;
		justify-content: center;
	}
	.customWrapper > :global(*) {
		/* margin: 0.5rem; */
		/* outline: 1px solid #000; */
	}
	textarea {
		width: 50%;
		height: 200px;
		border: 1px solid #000;
		padding: 0.5rem;
		border-radius: 0.5rem;
		-moz-tab-size: 2;
		-o-tab-size: 2;
		tab-size: 2;
	}
</style>
