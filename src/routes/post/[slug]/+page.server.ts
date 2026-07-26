import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.slug);
	if (isNaN(id)) return error(400, 'ID is NaN');

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

	const comments: {author: string, content: string}[] = [];

	for (const comment of commentsDB) {
		const authorDB = await db.user.findUnique({
			where: {
				id: comment.id
			}
		});
		if (!authorDB) continue;

		comments.push({author: authorDB, content: comment.content})
	}

	return { post, author, likes: likes.length, comments };
};
