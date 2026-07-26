import { db } from "$lib/db";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const users = await db.user.findMany({
        take: 100,
        orderBy: {
            typoCount: "desc"
        }
    })

    return {users}
}