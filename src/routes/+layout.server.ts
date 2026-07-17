import type { User } from '../lib/types/user';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({locals}) => {
	return { user: locals.User };
};
