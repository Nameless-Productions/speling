import { db } from "$lib/db";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({url}) => {
    const typosFirst = url.searchParams.get("typosFirst") === "true" ? true : false;

    const posts: {author: string, content: string, likes: number, date: Date, comments: {author: string, content: string}[], typos: number, id: number}[] = []

    const postsDB = await db.post.findMany({
        take: 100,
        orderBy: [
            { typoCount: typosFirst ? "desc" : "asc" },
            { createdAt: "desc" }
        ]
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

        const commentsDB = await db.comment.findMany({
            where: {
                post: post.id
            }
        })

        const comments: {author: string, content: string}[] = [];

        for (const comment of commentsDB) {
            const author = await db.user.findUnique({
                where: {
                    id: comment.authorID
                }
            });
            if (!author) continue;

            comments.push({author: author.username, content: comment.content})
        }

        posts.push({author: user.username, content: post.content, likes: likes.length, date: post.createdAt, comments, typos: post.typoCount, id: post.id})
    }

    return {posts}
}