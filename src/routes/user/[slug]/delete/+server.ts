import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { db } from "$lib/db";

export const GET: RequestHandler = async ({url, params, locals, cookies}) => {
    const userID = Number(params.slug);
    if (!locals.User) return redirect(303, new URL("/login", url));
    if (locals.User.id !== userID) return error(403, "You must either be this user or a staff member");

    const userDB = await db.user.findUnique({
        where: {
            id: locals.User.id
        }
    });
    if (!userDB) return redirect(303, new URL("/login", url));

    await db.comment.deleteMany({
        where: {
            authorID: userDB.id
        }
    });

    await db.like.deleteMany({
        where: {
            userID: userDB.id
        }
    });

    await db.post.deleteMany({
        where: {
            authorID: userDB.id
        }
    });

    await db.user.delete({
        where: userDB
    });

    cookies.delete("token", {
        path: "/"
    })

    return redirect(303, new URL("/login", url))
}