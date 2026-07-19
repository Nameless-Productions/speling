<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	const { data } = $props();

	const { form, errors, enhance, submitting } = superForm(data.form);
</script>

<div class="flex h-screen items-center justify-center">
	<div class="rounded-xl border-2 border-white p-5">
		<form action="?/post" method="post" use:enhance>
			<textarea
				name="content"
				placeholder="What's on your mind?"
				bind:value={$form.content}
				class="h-50 w-100 rounded-xl border border-gray-500 p-1"
				required></textarea>
			{#if $errors.content}
				<p class="text-red-500">{$errors.content}</p>
			{/if}

			<br />

			<button
				type="submit"
				class="mt-3 w-full cursor-pointer rounded-full border bg-neutral-800 duration-300 hover:bg-neutral-600"
				disabled={$submitting}>{$submitting ? 'Sending...' : 'Post'}</button
			>
		</form>
	</div>
</div>
