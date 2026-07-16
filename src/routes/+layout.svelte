<script lang="ts">
	import NavBar from '../lib/componets/NavBar.svelte';
	import './layout.css';

	let { children, data } = $props();
</script>

<svelte:head><title>Speling</title></svelte:head>


<NavBar user={data.user} />

<main class="m-2">
	{@render children()}
</main>