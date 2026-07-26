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
			<p class="my-2 w-1/2 rounded-l-full bg-blue-600 p-0.5 text-center">
				Typos: {data.post.typoCount}
			</p>
			<p class="my-2 w-1/2 rounded-r-full bg-red-600 p-0.5 text-center">Likes: {data.likes}</p>
		</div>
	</div>
</div>
