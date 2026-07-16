<script lang="ts">
    let {data} = $props()
</script>

<div class="flex h-screen items-center justify-center">
    <div class="border-2 p-5 rounded-xl">
        <p class="font-bold text-lg">Sign in to Speling</p>
        <br>
        <a href={data.discord} class="p-1 bg-blue-600 rounded-xl hover:bg-blue-800 duration-200">Sign in with Discord</a>
        <p class="text-sm text-gray-600 text-center mt-2">More sign in <br>options later (or not)</p>
    </div>
</div>