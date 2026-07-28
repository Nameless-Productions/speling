import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import type { Post } from '$lib/types/post';

const pageSize = 100;

export const GET: RequestHandler = async ({ url }) => {
	const typosFirst = url.searchParams.get('typosFirst') === 'true' ? true : false;
	const page = Number(url.searchParams.get('page') ?? 0);

	if (isNaN(page)) return error(400, 'Page is NaN');

	const postsDB = await db.post.findMany({
		take: page === 0 ? pageSize : page * pageSize,
		orderBy: [{ typoCount: typosFirst ? 'desc' : 'asc' }, { createdAt: 'desc' }]
	});

	const posts: Post[] = [];

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
		});

		const comments: { author: string; content: string; id: number }[] = [];

		for (const comment of commentsDB) {
			const author = await db.user.findUnique({
				where: {
					id: comment.authorID
				}
			});
			if (!author) continue;

			comments.push({ author: author.username, content: comment.content, id: comment.id });
		}

		posts.push({
			author: user.username,
			content: post.content,
			likes: likes.length,
			date: post.createdAt,
			comments,
			typos: post.typoCount,
			id: post.id,
			commentCount: comments.length
		});
	}

	return json(posts);
};
