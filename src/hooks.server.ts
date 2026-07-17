import { db } from "$lib/db";
import { verifyToken } from "$lib/jwt";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({event, resolve}) => {
    const pathname = event.url.pathname.replace(/\/{2,}/g, '/').replace(/\/+$/, '') || '/';

    if (pathname.startsWith("/feed") || pathname.startsWith("/login") || pathname.startsWith("/oauth/") || pathname === "/") {
        return await resolve(event)
    }

    const token = event.cookies.get("token");
    if (!token) return redirect(302, new URL("/login", event.url));

    const userID = await verifyToken(token);
    if (!userID) return redirect(302, new URL("/login", event.url));

    const userDB = await db.user.findUnique({
        where: {
            id: userID
        }
    });
    if (!userDB) return redirect(302, new URL("/login", event.url));

    event.locals.User = {username: userDB.username, id: userID};

    return await resolve(event)
}