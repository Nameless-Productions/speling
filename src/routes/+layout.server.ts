import type { User } from "../lib/types/user";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
    const user: User | null = null;
    return {user}
}