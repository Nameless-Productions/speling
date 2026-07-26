<script lang="ts">
    let {data} = $props();

    async function like(postID: number) {
        const res = await fetch(`/api/like?post=${postID}`);
        if (!res.ok) return;

        const resJson = await res.json() as {likes: number};

        let i = 0;
        for (const post of data.posts) {
            if (post.id === postID) {
                data.posts[i].likes = resJson.likes
            }
            i += 1;
        }
    }
</script>

<div class="flex flex-col items-center">
    {#each data.posts as post (post.date)}
        <div class="border-b border-t border-b-white border-t-white max-w-sm w-full p-2 mx-auto">
            <p class="font-bold">{post.author}</p>
            <p>{post.content}</p>

            <div class="flex">
                <p class="p-0.5 bg-blue-600 rounded-l-full my-2 w-1/2 text-center">Typos: {post.typos}</p>
                <button type="button" onclick={() => like(post.id)} class="p-0.5 bg-red-600 hover:bg-red-500 duration-300 cursor-pointer rounded-r-full my-2 w-1/2 text-center">Likes: {post.likes}</button>
            </div>
        </div>
    {/each}
</div>