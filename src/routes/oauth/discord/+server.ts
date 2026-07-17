import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { DISCORD_CLIENT, DISCORD_REDIRECT, DISCORD_SECRET } from "$env/static/private";
import { db } from "$lib/db";
import { createToken } from "$lib/jwt";

export const GET: RequestHandler = async ({cookies, locals, url}) => {
    const code = url.searchParams.get("code");
    if (!code) return error(400, "Code not found in search params");

	const params = new URLSearchParams({
		client_id: DISCORD_CLIENT,
		client_secret: DISCORD_SECRET,
		grant_type: 'authorization_code',
		code,
		redirect_uri: DISCORD_REDIRECT
	});

	const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: params
	});
    if (!tokenRes.ok) return error(400, "invalid code in search params");

    const tokenJson = await tokenRes.json()
    const token = tokenJson.access_token as string | null;
    if (!token) return error(500, "No token received");

	const userRes = await fetch('https://discord.com/api/users/@me', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
    if (!userRes.ok) return error(500, "error while getting user");
    const userJson = await userRes.json();


	const { id, username }: { id: string | null; username: string | null } = {
		username: userJson.username,
		id: userJson.id
	};

	if (!id || !username) return error(400, 'id or username not found');


    let userDB = await db.user.findUnique({
        where: {
            username
        }
    });

    if (!userDB) {
        userDB = await db.user.create({
            data: {
                username
            }
        });
    }

    const jwtToken = await createToken(userDB.id);

    cookies.set("token", jwtToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: "lax"
    });

    locals.User = {username: userDB.username, id: userDB.id}

    return redirect(303, new URL("/", url));
}