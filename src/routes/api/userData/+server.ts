import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getUserData } from '$lib/getUserData';

export const GET: RequestHandler = async ({ url, locals }) => {
	if (!locals.User) return redirect(303, new URL('/login', url));

	const userData = await getUserData(locals.User.id);

	if (!userData) return error(400, 'User not found');

	return new Response(userData, {
		headers: {
			'Content-Type': 'application/string',
			'Content-Disposition': 'attachment; filename="userData.zip"'
		}
	});
};
