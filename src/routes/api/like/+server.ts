import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';

export const GET: RequestHandler = async ({ locals, url }) => {
	if (!locals.User) return error(401, 'Unauthorized');

	const postID = Number(url.searchParams.get('post'));
	if (!postID || isNaN(postID)) return error(400, 'Post ID is null or not a number');

	const userLikes = await db.like.findMany({
		where: {
			userID: locals.User.id,
			postID
		}
	});
	if (userLikes.length !== 0) return error(400, 'User already likes this post');

	await db.like.create({
		data: {
			userID: locals.User.id,
			postID
		}
	});

	const likes = await db.like.findMany({
		where: {
			postID
		}
	});

	return json({ likes: likes.length });
};
