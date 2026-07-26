<script lang="ts">
	let { data } = $props();
</script>

<div class="flex h-screen items-center justify-center">
	<div class="w-full max-w-md rounded-xl border-2 border-gray-600 p-3">
		<p class="font-bold">{data.author.username}</p>
		<br />
		<p>{data.post.content}</p>
		<br />
		<p class="w-full rounded-full bg-blue-500 p-0.5 text-center font-bold">
			Typos: {data.post.typoCount}
		</p>
	</div>
</div>
