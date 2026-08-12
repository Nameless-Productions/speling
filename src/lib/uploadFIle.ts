import { Upload } from '@aws-sdk/lib-storage';
import { s3 } from './client';
import { env } from '$env/dynamic/private';

export async function uploadFile(
	uid: number,
	fileName: string,
	contentType: string,
	body: ReadableStream<Uint8Array>,
	size: number
) {
	const isTooBig = size > 50 * 1024 * 1024;

	if (isTooBig) {
		return false;
	}

	const key = `${uid}/${fileName}`;

	const upload = new Upload({
		client: s3,
		params: {
			Bucket: env.CF_BUCKET,
			Key: key,
			Body: body,
			ContentType: contentType
		},
		queueSize: 4,
		partSize: 10 * 1024 * 1024
	});

	try {
		await upload.done();
		return `${env.CDN_URL}/${key}`;
	} catch {
		await upload.abort().catch(() => {});
		return false;
	}
}
