<script lang="ts">
	import Post from '$lib/componets/Post.svelte';
	import type { Post as PostType } from '$lib/types/post';

	let { data } = $props();

	const post: PostType = {
		author: data.author.username,
		content: data.post.content,
		likes: data.likes,
		date: data.post.createdAt,
		comments: data.comments,
		typos: data.post.typoCount,
		id: data.post.id,
		commentCount: data.comments.length,
		imageUrl: data.post.imageUrl ? data.post.imageUrl : undefined
	};
</script>

<div class="flex h-screen items-center justify-center">
	<div class="w-full max-w-md rounded-xl border-2 border-gray-600 p-3">
		<Post {post} showComments formThing={data.form} />
	</div>
</div>
