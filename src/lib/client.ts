import { env } from '$env/dynamic/private';
import { S3Client } from '@aws-sdk/client-s3';

export const s3 = new S3Client({
	region: 'auto',
	endpoint: env.CF_URL,
	credentials: {
		accessKeyId: env.CF_ACCESS_KEY,
		secretAccessKey: env.CF_SECRET_KEY
	}
});
