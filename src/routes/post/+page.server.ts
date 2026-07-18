import { zod4 } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import { fail, superValidate } from "sveltekit-superforms"
import { postSchema } from "$lib/types/postSchema";
import { redirect } from "@sveltejs/kit";
import Typo from "typo-js"
import { db } from "$lib/db";

export const load: PageServerLoad = async () => {
    const form = await superValidate(zod4(postSchema));

    return { form }
}


export const actions: Actions = {
    post: async ({request, locals}) => {
        if (!locals.User) return redirect(303, new URL("/login", request.url));

        const form = await superValidate(zod4(postSchema));
        if (!form.valid) return fail(400, {form});

        const dictionary = new Typo("en_US");

        const contentArr = form.data.content.split(" ");
        let typos = 0;

        for (const word of contentArr) {
            if (dictionary.check(word)) {
                continue
            } else {
                typos += 1;
            }
        };

        const post = await db.post.create({
            data: {
                authorID: locals.User.id,
                typoCount: typos,
                likes: 0,
                content: form.data.content,
                createdAt: new Date()
            }
        });

        return redirect(303, new URL(`/post/${post.id}`))
    }
}