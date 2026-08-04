<script lang="ts">
	import Post from '$lib/componets/Post.svelte';
	import type { Post as PostType } from '$lib/types/post';

	let posts = $state<PostType[]>([]);
	let typosFirst = $state<'false' | 'true'>('true');
	let page = $state(0);
	let isLoading = $state(true);

	$effect(() => {
		(async () => {
			isLoading = true;
			const res = await fetch(`/api/posts?typosFirst=${typosFirst}&page=${page}`);
			if (!res.ok) return;

			const resJson = (await res.json()) as PostType[];

			isLoading = false;
			posts = resJson;
		})();
	});
</script>

<div class="flex flex-col items-center">
	<div class="mx-auto w-full max-w-sm p-2">
		<label for="sort" class="mb-2 block text-sm font-medium">Sort by:</label>
		<select
			id="sort"
			bind:value={typosFirst}
			class="w-full rounded-md border border-gray-300 px-3 py-2"
		>
			<option value="false">Default</option>
			<option value="true">Typos First</option>
		</select>
	</div>

	{#if isLoading}
		<br />
		<p>Loading posts...</p>
	{/if}

	{#each posts as post (post.date)}
		<div class="mx-auto w-full max-w-sm border-t border-b border-t-white border-b-white p-2">
			<Post {post} showComments={false} />
		</div>
	{/each}

	{#if posts.length >= 100}
		<button
			type="button"
			onclick={() => (page += 1)}
			class="cursor-pointer text-center text-blue-600 underline">Load more</button
		>
	{/if}
</div>
