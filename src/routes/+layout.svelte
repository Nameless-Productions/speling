<script lang="ts">
	import NavBar from '../lib/componets/NavBar.svelte';
	import './layout.css';

	let { children, data } = $props();
</script>

<svelte:head><title>Speling</title></svelte:head>

<NavBar user={data.user} />

<main class="m-2 mt-13 flex flex-1 flex-col">
	{@render children()}
	<div class="text-center">
		<p>
			By using our platform you agree to our <button
				type="button"
				onclick={() => (location.href = '/legal/privacy.pdf')}
				class="cursor-pointer text-blue-500 underline">Privacy Policy</button
			>
			and
			<button
				type="button"
				onclick={() => (location.href = '/legal/tos.pdf')}
				class="cursor-pointer text-blue-500 underline">Terms of Service</button
			>
		</p>
	</div>
</main>
