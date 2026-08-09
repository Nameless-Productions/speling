<script lang="ts">
	import { resolve } from '$app/paths';

	let { user }: { user: { id: number; username: string } | undefined } = $props();

	const btnClass = 'text-lg hover:font-bold duration-200';
</script>

<nav class="fixed -mt-13 flex w-full items-center space-x-5 border-b-2 bg-slate-900 p-2">
	<a href={resolve('/')} class="text-xl font-bold duration-200 hover:font-normal">speling</a>
	<p class="-ml-4.5 text-sm text-gray-600">(yes it's like that)</p>

	<a href={resolve('/leaderboard')} class="ml-auto {btnClass}">Leaderboard</a>
	{#if !user}
		<a
			href={resolve('/login')}
			class="rounded-full bg-white p-1 text-lg text-slate-800 duration-200 hover:bg-gray-400"
			>Log in</a
		>
	{:else}
		<a href={resolve('/post')} class={btnClass}>Post</a>
		<a href={resolve('/me')} class={btnClass}>Profile</a>
	{/if}
	<a href={resolve('/feed')} class={btnClass}>Scroll</a>
	<a href={resolve('/support')} class={btnClass}>Support</a>
</nav>
