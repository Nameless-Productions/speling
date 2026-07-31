<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Post } from '$lib/types/post';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';

	let {
		post,
		showComments,
		formThing,
		isOwned = false
	}: {
		post: Post;
		showComments: boolean;
		formThing?: SuperValidated<
			{
				content: string;
			},
			{
				content: string;
			}
		>;
		isOwned?: boolean;
	} = $props();

	post.comments = post.comments.reverse();

	const sf = formThing ? superForm(formThing) : undefined;
	const form = sf?.form;
	const errors = sf?.errors;
	const enhance = sf?.enhance;
	const submitting = sf?.submitting;

	async function like() {
		const res = await fetch(`/api/like?post=${post.id}`);
		if (!res.ok) return;

		location.reload();
	}
</script>

<div>
	<a href={resolve(`/user/${post.author.id}`)} class="font-bold">{post.author.username}</a>
	<p>{post.content}</p>

	{#if post.imageUrl}
		<img
			src={post.imageUrl}
			alt="uploaded img"
			class="max-h-96 w-full rounded-xl object-cover"
			loading="lazy"
		/>
	{/if}

	<div class="flex">
		<p class="my-2 w-1/3 rounded-l-full bg-blue-600 p-0.5 text-center">Typos: {post.typos}</p>
		<button
			type="button"
			onclick={() => like()}
			class="my-2 w-1/3 cursor-pointer bg-red-600 p-0.5 text-center duration-300 hover:bg-red-500"
			>Likes: {post.likes}</button
		>
		<a
			href={resolve(`/post/${post.id}`)}
			class="my-2 w-1/3 cursor-pointer rounded-r-full bg-gray-600 p-0.5 text-center duration-300 hover:bg-gray-500"
			>Comments: {post.commentCount}</a
		>
	</div>

	{#if isOwned}
		<div class="-mt-2 text-center">
			<a
				href={resolve(`/post/${post.id}/delete`)}
				class="rounded-b-xl bg-red-600 p-1 text-center duration-300 hover:bg-red-500">Delete post</a
			>
		</div>
	{/if}

	{#if formThing && sf && enhance}
		<br />

		<form action={`/post/${post.id}?/comment`} class="flex" method="post" use:enhance>
			<input
				type="text"
				placeholder="Comment"
				class="w-2/3 rounded-l-xl border-2 border-white p-1"
				name="content"
				bind:value={$form!.content}
				required
			/>
			<button
				type="submit"
				class="w-1/3 cursor-pointer rounded-r-xl border-2 border-white p-1 duration-300 hover:bg-gray-600"
				disabled={$submitting}>Comment</button
			>
		</form>
		{#if $errors!.content}
			<p class="text-red-500">{$errors!.content}</p>
		{/if}
	{/if}

	{#if showComments}
		<br />
		<p class="mb-3 text-center text-lg font-bold">Comments:</p>
		{#each post.comments as comment (comment.id)}
			<p class="font-bold">{comment.author}</p>
			<p style="white-space: pre-line;">{comment.content}</p>
		{/each}
	{/if}
</div>
