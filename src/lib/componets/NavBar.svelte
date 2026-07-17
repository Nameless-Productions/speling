<script lang="ts">
	import { resolve } from '$app/paths';

	let { user }: { user: { id: number; username: string } | undefined } = $props();

	const btnClass = 'text-lg hover:font-bold duration-200';
</script>

<nav class="flex border-b-2 p-2 space-x-5 items-center">
	<a href={resolve('/')} class="font-bold text-xl hover:font-normal duration-200">speling</a>
	<p class="-ml-4.5 text-sm text-gray-600">(yes it's like that)</p>

	<a href={resolve('/leaderboard')} class="ml-auto {btnClass}">Leaderboard</a>
	<a href={resolve('/how')} class={btnClass}>How it works</a>
	{#if !user}
		<a
			href={resolve('/login')}
			class="p-1 bg-white rounded-full text-slate-800 text-lg hover:bg-gray-400 duration-200"
			>Log in</a
		>
	{:else}
		<a href={resolve('/feed')} class={btnClass}>Scroll</a>
	{/if}
</nav>
