<script lang="ts">
	import { resolve } from '$app/paths';

	let { userID }: { userID: number } = $props();
</script>

<dialog class="m-auto rounded-xl bg-neutral-500 p-5 text-neutral-300" open>
	<p>Are you sure that you want to delete your user?</p>
	<p>This will delete all of your:</p>
	<ul class="ml-4 list-inside list-disc">
		<li>Posts</li>
		<li>Uploaded images</li>
		<li>Comments</li>
		<li>Likes</li>
	</ul>
	<p>This cannot be reversed</p>
	<p>
		You can recreate your account again by logging in with Discord <br />but all of your data will
		be deleted
	</p>

	<button
		type="button"
		onclick={() => location.reload()}
		class="cursor-pointer rounded-xl bg-green-600 p-1 duration-300 hover:bg-green-400"
		>Go Back</button
	>
	<a
		href={resolve(`/user/${userID}/delete`)}
		class="cursor-pointer rounded-xl bg-red-600 p-1 duration-300 hover:bg-red-400">Delete account</a
	>
</dialog>
