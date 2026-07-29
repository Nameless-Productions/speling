import { Upload } from '@aws-sdk/lib-storage';
import { s3 } from './client';

async function isItBig(stream: ReadableStream<Uint8Array>) {
	const maxBytes = 50 * 1024 * 1024;
	let received = 0;

	const reader = stream.getReader();

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;

		received += value.byteLength;

		if (received > maxBytes) {
			await reader.cancel();
			return true;
		}
	}

	return false;
}

export async function uploadFile(
	uid: number,
	fileName: string,
	contentType: string,
	body: ReadableStream<Uint8Array>
) {
	const isTooBig = await isItBig(body);

	if (isTooBig) {
		return false;
	}

	const key = `${uid}/${fileName}`;

	const upload = new Upload({
		client: s3,
		params: {
			Bucket: 'speling',
			Key: key,
			Body: body,
			ContentType: contentType
		},
		queueSize: 4,
		partSize: 10 * 1024 * 1024
	});

	try {
		await upload.done();
		return `https://cdn.thenamelessdev.com/${key}`;
	} catch {
		await upload.abort().catch(() => {});
		return false;
	}
}
