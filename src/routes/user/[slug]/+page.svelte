<script lang="ts">
	import Post from '$lib/componets/Post.svelte';

	const { data } = $props();
</script>

<div class="flex flex-col items-center">
	<p class="text-xl font-bold">{data.user.user.username}</p>

	<p class="mb-5 rounded-full bg-blue-600 p-1">Typos: {data.user.user.typoCount}</p>

	<p class="mb-3 font-bold">Posts:</p>
	{#each data.user.posts as post (post.date)}
		<div class="mx-auto w-full max-w-sm border-t border-b border-t-white border-b-white p-2">
			<Post {post} showComments={false} />
		</div>
	{/each}
</div>
