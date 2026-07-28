import { getProfile } from '$lib/getProfile';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const uid = Number(params.slug);

	const user = await getProfile(uid);
	if (!user) return error(404, 'User not found');

	return { user };
};
