<script lang="ts">
	import Post from '$lib/componets/Post.svelte';

	let { data } = $props();
	let posts = $state(data.posts);
	let typosFirst = $state(false);

	$effect(() => {
		if (typeof window !== 'undefined') {
			typosFirst = new URL(window.location.href).searchParams.get('typosFirst') === 'true';
		}
	});

	const sortedPosts = $derived(
		typosFirst ? [...posts].sort((a, b) => (b.typos ?? 0) - (a.typos ?? 0)) : posts
	);

	function handleFilterChange(value: string) {
		const url = new URL(window.location.href);
		if (value === 'typosFirst') {
			url.searchParams.set('typosFirst', 'true');
		} else {
			url.searchParams.delete('typosFirst');
		}
		window.history.replaceState({}, '', url.toString().split(window.location.origin)[1]);
		typosFirst = value === 'typosFirst';
	}
</script>

<div class="flex flex-col items-center">
	<div class="mx-auto w-full max-w-sm p-2">
		<label for="sort" class="mb-2 block text-sm font-medium">Sort by:</label>
		<select
			id="sort"
			onchange={(e) => handleFilterChange(e.currentTarget.value)}
			value={typosFirst ? 'typosFirst' : 'default'}
			class="w-full rounded-md border border-gray-300 px-3 py-2"
		>
			<option value="default">Default</option>
			<option value="typosFirst">Typos First</option>
		</select>
	</div>

	{#each sortedPosts as post (post.date)}
		<div class="mx-auto w-full max-w-sm border-t border-b border-t-white border-b-white p-2">
			<Post {post} />
		</div>
	{/each}
</div>
