<script lang="ts">
	let { data } = $props();
	let agreeToThings = $state(false);
</script>

<div class="flex h-screen items-center justify-center">
	<div class="rounded-xl border-2 p-5">
		<p class="text-lg font-bold">Sign in to Speling</p>
		<br />
		<button
			onclick={() => {
				if (agreeToThings) {
					location.href = data.discord;
				}
			}}
			disabled={!agreeToThings}
			class="cursor-pointer rounded-xl bg-blue-600 p-1 duration-200 hover:bg-blue-800 disabled:cursor-not-allowed"
			>Sign in with Discord</button
		>
		<br />
		<div class="flex">
			<input type="checkbox" class="m-1" bind:checked={agreeToThings} />
			<p>
				I agree to the <br /><button
					type="button"
					onclick={() => (location.href = '/legal/privacy.pdf')}
					class="cursor-pointer text-blue-500 underline">Privacy Policy</button
				>
				and <br />
				<button
					type="button"
					onclick={() => (location.href = '/legal/tos.pdf')}
					class="cursor-pointer text-blue-500 underline">Terms of Service</button
				>
			</p>
		</div>
		<p class="mt-2 text-center text-sm text-gray-600">More sign in <br />options later (or not)</p>
	</div>
</div>
