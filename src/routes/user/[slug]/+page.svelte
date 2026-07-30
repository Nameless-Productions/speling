<script lang="ts">
	import DeleteUserPopup from '$lib/componets/DeleteUserPopup.svelte';
	import Post from '$lib/componets/Post.svelte';

	const { data } = $props();
	let isDeleteOpen = $state(false);
</script>

<div class="flex flex-col items-center">
	<p class="text-xl font-bold flex">{data.user.user.username} {#if data.thisUser}
		- You
	{/if}</p>

	<div class="flex">
		<p class="mb-5 rounded-l-full bg-blue-600 p-1">Typos: {data.user.user.typoCount}</p>
		<button type="button" class="mb-5 rounded-r-full bg-red-600 hover:bg-red-400 duration-300 p-1 cursor-pointer" onclick={() => isDeleteOpen = !isDeleteOpen}>Delete account</button>
	</div>

	<p class="mb-3 font-bold">Posts:</p>
	{#each data.user.posts as post (post.date)}
		<div class="mx-auto w-full max-w-sm border-t border-b border-t-white border-b-white p-2">
			<Post {post} showComments={false} />
		</div>
	{/each}
</div>

{#if isDeleteOpen}
	<DeleteUserPopup userID={data.user.user.id} />
{/if}