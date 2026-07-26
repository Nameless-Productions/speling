<script lang="ts">
	let { data } = $props();
</script>

<div class="flex h-screen items-center justify-center">
	<div class="w-full max-w-md rounded-xl border-2 border-gray-600 p-3">
		<p class="font-bold">{data.author.username}</p>
		<br />
		<p>{data.post.content}</p>
		<br />
        <div class="flex">
            <p class="p-0.5 bg-blue-600 rounded-l-full my-2 w-1/2 text-center">Typos: {data.post.typoCount}</p>
            <p class="p-0.5 bg-red-600 rounded-r-full my-2 w-1/2 text-center">Likes: {data.likes}</p>
        </div>
	</div>
</div>
