import { db } from '$lib/db';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, url, locals }) => {
	const postID = Number(params.slug);
	if (isNaN(postID)) return error(400, 'Post ID is NaN');
	const post = await db.post.findUnique({
		where: {
			id: postID
		}
	});
	if (!post) return redirect(303, new URL('/login', url));
	if (!locals.User) return redirect(303, new URL('/login', url));

	if (post.authorID !== locals.User.id)
		return error(403, 'Only the author and admins can delete this');

	await db.like.deleteMany({
		where: {
			postID
		}
	});

	await db.comment.deleteMany({
		where: {
			post: postID
		}
	});

	await db.post.delete({
		where: post
	});

	return redirect(303, new URL(`/user/${post.authorID}`, url));
};
