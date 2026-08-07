import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.User) return error(401);

	const body = await request.json();

	if (!body.userID) return error(400, 'No user ID');

	const user = await db.user.findUnique({
		where: {
			id: Number(body.userID)
		}
	});
	if (!user) return error(404, 'user not found');

	const userFollows = await db.follow.findMany({
		where: {
			authorID: locals.User.id
		}
	});
	if (userFollows.length === 1) {
		await db.follow.deleteMany({
			where: {
				userID: Number(body.userID),
				authorID: locals.User.id
			}
		});

		const follows = await db.follow.findMany({
			where: {
				userID: Number(body.userID)
			}
		});

		return json({ follows: follows.length });
	}

	await db.follow.create({
		data: {
			userID: Number(body.userID),
			authorID: locals.User.id
		}
	});

	const follows = await db.follow.findMany({
		where: {
			userID: Number(body.userID)
		}
	});

	return json({ follows: follows.length });
};

export const GET: RequestHandler = async ({ url }) => {
	const userID = url.searchParams.get('userID');
	if (!userID) return error(400, 'Missing userID');

	const follows = await db.follow.findMany({
		where: {
			userID: Number(userID)
		}
	});

	return json({ follows: follows.length });
};
