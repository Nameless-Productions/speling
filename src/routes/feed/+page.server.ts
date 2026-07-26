import { db } from "$lib/db";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({url}) => {
    const typosFirst = url.searchParams.get("typosFirst") === "true" ? true : false;

    let posts: {author: string, content: string, likes: number, date: Date}[] = []

    const postsDB = await db.post.findMany({
        take: 100,
        orderBy: {
            createdAt: "desc",
            typoCount: typosFirst ? "desc" : "asc"
        }
    });

    for (const post of postsDB) {
        const likes = await db.like.findMany({
            where: {
                postID: post.id
            }
        });

        const user = await db.user.findUnique({
            where: {
                id: post.authorID
            }
        });
        if (!user) continue;

        posts.push({author: user.username, content: post.content, likes: likes.length, date: post.createdAt})
    }

    return {posts}
}