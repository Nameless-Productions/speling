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

	return { post, author, likes: likes.length };
};
