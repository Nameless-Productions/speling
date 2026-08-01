<script lang="ts">
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
			By using our platform you agree to our <button
				type="button"
				onclick={() => location.href = "/legal/privacy.pdf"}
				class="text-blue-500 cursor-pointer underline">Privacy Policy</button
			>
			and
			<button type="button" onclick={() => location.href = "/legal/tos.pdf"} class="text-blue-500 cursor-pointer underline"
				>Terms of Service</button
			>
		</p>
	</div>
</main>
