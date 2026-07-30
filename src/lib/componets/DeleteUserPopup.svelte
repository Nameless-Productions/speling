<script lang="ts">
	import { resolve } from "$app/paths";

    let { userID }: { userID: number } = $props();
</script>

<dialog class="bg-neutral-500 p-5 rounded-xl text-neutral-300 m-auto" open>
    <p>Are you sure that you want to delete your user?</p>
    <p>This will delete all of your:</p>
    <ul class="list-disc list-inside ml-4">
        <li>Posts</li>
        <li>Uploaded images</li>
        <li>Comments</li>
        <li>Likes</li>
    </ul>
    <p>This cannot be reversed</p>
    <p>You can recreate your account again by logging in with Discord <br>but all of your data will be deleted</p>

    <button type="button" onclick={() => location.reload()} class="p-1 bg-green-600 rounded-xl cursor-pointer hover:bg-green-400 duration-300">Go Back</button>
    <a href={resolve(`/user/${userID}/delete`)} class="p-1 bg-red-600 rounded-xl cursor-pointer hover:bg-red-400 duration-300">Delete account</a>
</dialog>