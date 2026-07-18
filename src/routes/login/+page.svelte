<script lang="ts">
	let { data } = $props();
</script>

<div class="flex h-screen items-center justify-center">
	<div class="rounded-xl border-2 p-5">
		<p class="text-lg font-bold">Sign in to Speling</p>
		<br />
		<a href={data.discord} class="rounded-xl bg-blue-600 p-1 duration-200 hover:bg-blue-800"
			>Sign in with Discord</a
		>
		<p class="mt-2 text-center text-sm text-gray-600">More sign in <br />options later (or not)</p>
	</div>
</div>
