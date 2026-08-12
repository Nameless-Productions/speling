import { DISCORD_URL } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return { discord: DISCORD_URL };
};
