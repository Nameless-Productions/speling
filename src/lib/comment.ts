import { db } from './db';

export async function comment(authorID: number, content: string, postID: number) {
	const author = await db.user.findUnique({
		where: {
			id: authorID
		}
	});
	if (!author) return;

	const post = await db.post.findUnique({
		where: {
			id: postID
		}
	});
	if (!post) return;

	await db.comment.create({
		data: {
			post: postID,
			authorID,
			content
		}
	});
}
