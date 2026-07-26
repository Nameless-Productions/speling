<script lang="ts">
    let {data} = $props();
</script>

<div class="flex flex-col items-center">
    {#each data.posts as post (post.date)}
        <div class="border-b border-t border-b-white border-t-white max-w-sm w-full p-2 mx-auto">
            <p class="font-bold">{post.author}</p>
            <p>{post.content}</p>

            <div class="flex">
                <p class="p-0.5 bg-blue-600 rounded-l-full my-2 w-1/2 text-center">Typos: {post.typos}</p>
                <p class="p-0.5 bg-red-600 rounded-r-full my-2 w-1/2 text-center">Likes: {post.likes}</p>
            </div>
        </div>
    {/each}
</div>