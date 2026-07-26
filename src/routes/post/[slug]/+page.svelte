<script lang="ts">
    let { data } = $props();
</script>

<div class="flex h-screen items-center justify-center">
    <div class="border-2 border-gray-600 rounded-xl p-3">
        <p class="font-bold">{data.author.username}</p>
        <br>
        <p>{data.post.content}</p>
        <br>
        <p class="p-0.5 rounded-full font-bold w-full text-center bg-blue-500">Typos: {data.post.typoCount}</p>
    </div>
</div>