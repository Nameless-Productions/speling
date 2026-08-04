<script>
	import { resolve } from '$app/paths';

	const { data } = $props();
</script>

<div class="text-center">
	<p class="text-3xl font-bold">we count your typos. everyone sees the number.</p>
	<p class="text-sm text-gray-400">
		post whatever you want (not really). we're just here to keep score.
	</p>

	<div class="m-2 flex justify-center space-x-3">
		<a
			href={resolve('/post')}
			class="rounded-full bg-white p-2 text-black duration-300 hover:bg-neutral-300"
			>post something</a
		>
		<a
			href={resolve('/leaderboard')}
			class="rounded-full border border-white p-2 duration-300 hover:bg-gray-700">leaderboard</a
		>
	</div>

	<hr class="mx-auto w-md text-gray-500/50" />
	<p>
		User with most typos: <span
			>{data.mostTypoUser.length === 0 ? 'no one' : data.mostTypoUser[0].username}</span
		>
	</p>
	<hr class="mx-auto w-md text-gray-500/50" />
</div>
