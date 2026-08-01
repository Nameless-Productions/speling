<script lang="ts">
	import { resolve } from '$app/paths';
	import NavBar from '../lib/componets/NavBar.svelte';
	import './layout.css';

	let { children, data } = $props();
</script>

<svelte:head><title>Speling</title></svelte:head>

<NavBar user={data.user} />

<main class="m-2 flex flex-1 flex-col">
	{@render children()}
	<div class="text-center">
		<p>
			By using our platform you agree to our <a
				href={resolve("/legal/privacy.pdf")}
				target="_blank"
				class="text-blue-500 underline">Privacy Policy</a
			>
			and
			<a href={resolve("/legal/tos.pdf")} target="_blank" class="text-blue-500 underline">Terms of Service</a>
		</p>
	</div>
</main>
