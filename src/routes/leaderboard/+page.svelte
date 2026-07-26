<script lang="ts">
	let { data } = $props();
</script>

<ul class="list-inside list-decimal">
	{#each data.users as user (user.id)}
		<li class="flex">{user.username}<span class="ml-auto">Typos: {user.typoCount}</span></li>
	{/each}
</ul>
