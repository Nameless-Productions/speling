import { db } from '$lib/db';
import { verifyToken } from '$lib/jwt';
import { error, redirect, type Handle } from '@sveltejs/kit';
import { limiter } from '$lib/rateLimiter';

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname.replace(/\/{2,}/g, '/').replace(/\/+$/, '') || '/';

	if (await limiter.isLimited(event)) {
		return error(429, 'Rate limited');
	}

	const isPublic =
		pathname.startsWith('/feed') ||
		pathname.startsWith('/login') ||
		pathname.startsWith('/oauth/') ||
		pathname.startsWith('/api/posts') ||
		pathname.startsWith('/support') ||
		pathname === '/';

	const token = event.cookies.get('token');

	if (token) {
		const userID = await verifyToken(token);
		if (userID) {
			const userDB = await db.user.findUnique({
				where: {
					id: userID
				}
			});
			if (userDB) {
				event.locals.User = { username: userDB.username, id: userID, isAdmin: userDB.isAdmin };
			}
		}
	}

	if (!isPublic && !event.locals.User) {
		return redirect(302, new URL('/login', event.url));
	}

	return await resolve(event);
};
