<script lang="ts">
	import type { Post } from "$lib/types/post";

    let { post }: { post: Post } = $props()

	async function like() {
		const res = await fetch(`/api/like?post=${post.id}`);
		if (!res.ok) return;

        location.reload()
	}
</script>

<div>
    <p class="font-bold">{post.author}</p>
    <p>{post.content}</p>

    <div class="flex">
        <p class="my-2 w-1/2 rounded-l-full bg-blue-600 p-0.5 text-center">Typos: {post.typos}</p>
        <button
            type="button"
            onclick={() => like()}
            class="my-2 w-1/2 cursor-pointer rounded-r-full bg-red-600 p-0.5 text-center duration-300 hover:bg-red-500"
            >Likes: {post.likes}</button
        >
    </div>
</div>