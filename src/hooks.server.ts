import { db } from "$lib/db";
import { verifyToken } from "$lib/jwt";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({event, resolve}) => {
    const pathname = event.url.pathname.replace(/\/{2,}/g, '/').replace(/\/+$/, '') || '/';

    const isPublic = pathname.startsWith("/feed") || pathname.startsWith("/login") || pathname.startsWith("/oauth/") || pathname === "/";

    const token = event.cookies.get("token");

    if (token) {
        const userID = await verifyToken(token);
        if (userID) {
            const userDB = await db.user.findUnique({
                where: {
                    id: userID
                }
            });
            if (userDB) {
                event.locals.User = {username: userDB.username, id: userID};
            }
        }
    }

    if (!isPublic && !event.locals.User) {
        return redirect(302, new URL("/login", event.url));
    }

    return await resolve(event)
}