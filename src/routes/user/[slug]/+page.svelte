<script lang="ts">
	import { resolve } from '$app/paths';
	import DeleteUserPopup from '$lib/componets/DeleteUserPopup.svelte';
	import Post from '$lib/componets/Post.svelte';

	const { data } = $props();
	let isDeleteOpen = $state(false);
</script>

<div class="flex flex-col items-center">
	<p class="flex text-xl font-bold">
		{data.profile.user.username}
		{#if data.thisUser}
			- You
		{/if}
	</p>

	<div class="flex">
		{#if data.thisUser || data.user?.isAdmin}
			<p class="mb-5 rounded-l-full bg-blue-600 p-1">Typos: {data.profile.user.typoCount}</p>
			<a href={resolve('/logout')} class="mb-5 bg-gray-600 p-1 duration-300 hover:bg-gray-500"
				>Log out</a
			>
			<a href={resolve('/api/userData')} class="mb-5 bg-zinc-600 p-1 duration-300 hover:bg-zinc-500"
				>Download User Data</a
			>
			<button
				type="button"
				class="mb-5 cursor-pointer rounded-r-full bg-red-600 p-1 duration-300 hover:bg-red-400"
				onclick={() => (isDeleteOpen = !isDeleteOpen)}>Delete account</button
			>
		{:else}
			<p class="mb-5 rounded-full bg-blue-600 p-1">Typos: {data.profile.user.typoCount}</p>
		{/if}
	</div>

	<p class="mb-3 font-bold">Posts:</p>
	{#each data.profile.posts as post (post.date)}
		<div class="mx-auto w-full max-w-sm border-t border-b border-t-white border-b-white p-2">
			<Post {post} showComments={false} isOwned={data.thisUser} />
		</div>
	{/each}
</div>

{#if isDeleteOpen}
	<DeleteUserPopup userID={data.profile.user.id} />
{/if}
