import { db } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const mostTypoUser = await db.user.findMany({
		take: 1,
		orderBy: {
			typoCount: 'desc'
		}
	});

	return { mostTypoUser: mostTypoUser };
};
