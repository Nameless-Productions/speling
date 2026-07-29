import { db } from './db';
import type { Post } from './types/post';

export async function getProfile(id: number) {
	const user = await db.user.findUnique({
		where: {
			id
		}
	});
	if (!user) return;

	const postsDB = await db.post.findMany({
		take: 50,
		where: {
			authorID: user.id
		}
	});

	const posts: Post[] = [];

	for (const post of postsDB) {
		const likes = await db.like.findMany({
			where: {
				postID: post.id
			}
		});

		const comments = await db.comment.findMany({
			where: {
				post: post.id
			}
		});

		posts.push({
			author: user.username,
			content: post.content,
			likes: likes.length,
			date: post.createdAt,
			comments: [],
			typos: post.typoCount,
			id: post.id,
			commentCount: comments.length,
			imageUrl: post.imageUrl ? post.imageUrl : undefined
		});
	}

	return { user, posts };
}
