import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/db';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { commentSchema } from '$lib/types/commentSchema';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.slug);
	if (isNaN(id)) return error(400, 'ID is NaN');

	const form = await superValidate(zod4(commentSchema));

	const post = await db.post.findUnique({
		where: {
			id
		}
	});
	if (!post) return error(404, 'Post not found');

	const author = await db.user.findUnique({
		where: {
			id: post.authorID
		}
	});
	if (!author) return error(404, 'Post author not found');

	const likes = await db.like.findMany({
		where: {
			postID: post.id
		}
	});

	const commentsDB = await db.comment.findMany({
		where: {
			post: post.id
		}
	});

	const comments: { author: string; content: string; id: number }[] = [];

	for (const comment of commentsDB) {
		const authorDB = await db.user.findUnique({
			where: {
				id: comment.authorID
			}
		});
		if (!authorDB) continue;

		comments.push({ author: authorDB.username, content: comment.content, id: comment.id });
	}

	return { post, author, likes: likes.length, comments, form };
};

export const actions: Actions = {
	comment: async ({ request, locals, params }) => {
		if (!locals.User) return redirect(303, new URL('/login', request.url));
		const postID = Number(params.slug);

		const form = await superValidate(request, zod4(commentSchema));

		if (!form.valid) return fail(400, { form });

		await db.comment.create({
			data: {
				post: postID,
				authorID: locals.User.id,
				content: form.data.content
			}
		});

		return redirect(303, new URL(`/post/${params.slug}`, request.url));
	}
};
