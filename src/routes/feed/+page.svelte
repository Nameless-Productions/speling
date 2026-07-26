<script lang="ts">
	let { data } = $props();
	let posts = $state(data.posts);

	async function like(postID: number) {
		const res = await fetch(`/api/like?post=${postID}`);
		if (!res.ok) return;

		const resJson = (await res.json()) as { likes: number };

		posts = posts.map((post) => (post.id === postID ? { ...post, likes: resJson.likes } : post));
	}
</script>

<div class="flex flex-col items-center">
	{#each posts as post (post.date)}
		<div class="mx-auto w-full max-w-sm border-t border-b border-t-white border-b-white p-2">
			<p class="font-bold">{post.author}</p>
			<p>{post.content}</p>

			<div class="flex">
				<p class="my-2 w-1/2 rounded-l-full bg-blue-600 p-0.5 text-center">Typos: {post.typos}</p>
				<button
					type="button"
					onclick={() => like(post.id)}
					class="my-2 w-1/2 cursor-pointer rounded-r-full bg-red-600 p-0.5 text-center duration-300 hover:bg-red-500"
					>Likes: {post.likes}</button
				>
			</div>
		</div>
	{/each}
</div>
