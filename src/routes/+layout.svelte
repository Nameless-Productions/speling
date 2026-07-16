<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head><title>Speling</title></svelte:head>


<main class="m-2">
	{@render children()}
</main>