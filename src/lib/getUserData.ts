import { Readable } from 'stream';
import { db } from './db';
import { ZipArchive } from 'archiver';

export async function getUserData(userID: number) {
	const profile = await db.user.findUnique({
		where: {
			id: userID
		}
	});
	if (!profile) return;

	const posts = await db.post.findMany({
		where: {
			authorID: userID
		}
	});

	const likes = await db.like.findMany({
		where: {
			userID
		}
	});

	const comments = await db.comment.findMany({
		where: {
			authorID: userID
		}
	});

	const archive = new ZipArchive({
		zlib: {
			level: 9
		}
	});

	archive.on('warning', (err) => {
		if (err.code === 'ENOENT') {
			console.warn(err);
		} else {
			return;
		}
	});

	archive.on('error', () => {
		return;
	});

	archive.append(JSON.stringify(profile, null), { name: 'profile.json' });
	archive.append(JSON.stringify(posts, null), { name: 'posts.json' });
	archive.append(JSON.stringify(likes, null), { name: 'likes.json' });
	archive.append(JSON.stringify(comments, null), { name: 'comments.json' });

	archive.finalize();

	return Readable.toWeb(archive);
}
