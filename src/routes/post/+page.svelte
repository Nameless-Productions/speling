<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

    const {data} = $props()
    
    const { form, errors, enhance, submitting } = superForm(data.form);
</script>

<div class="flex h-screen items-center justify-center">
    <div class="border-2 border-white rounded-xl p-5">
        <form action="?/post" use:enhance>
            <textarea name="content" placeholder="What's on your mind?" bind:value={$form.content} class="border border-gray-500 p-1 rounded-xl w-100 h-50" required></textarea>
            {#if $errors.content}
                <p class="text-red-500">{$errors.content}</p>
            {/if}

            <br>
            
            <button type="submit" class="border mt-3 rounded-full w-full cursor-pointer bg-neutral-800 hover:bg-neutral-600 duration-300" disabled={$submitting}>{$submitting ? "Sending..." : "Post"}</button>
        </form>
    </div>
</div>