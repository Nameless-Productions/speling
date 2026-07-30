import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({locals, url}) => {
    if (!locals.User) return redirect(303, new URL("/login", url));

    return redirect(303, new URL(`/user/${locals.User.id}`, url))
}