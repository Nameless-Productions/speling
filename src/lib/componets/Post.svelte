<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Post } from '$lib/types/post';

	let { post }: { post: Post } = $props();

	async function like() {
		const res = await fetch(`/api/like?post=${post.id}`);
		if (!res.ok) return;

		location.reload();
	}
</script>

<div>
	<p class="font-bold">{post.author}</p>
	<p>{post.content}</p>

	<div class="flex">
		<p class="my-2 w-1/3 rounded-l-full bg-blue-600 p-0.5 text-center">Typos: {post.typos}</p>
		<button
			type="button"
			onclick={() => like()}
			class="my-2 w-1/3 cursor-pointer bg-red-600 p-0.5 text-center duration-300 hover:bg-red-500"
			>Likes: {post.likes}</button
		>
		<a
			href={resolve(`/post/${post.id}`)}
			class="my-2 w-1/3 cursor-pointer rounded-r-full bg-gray-600 p-0.5 text-center duration-300 hover:bg-gray-500"
			>Comments: {post.commentCount}</a
		>
	</div>
</div>
