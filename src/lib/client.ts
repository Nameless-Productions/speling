import { CF_ACCESS_KEY, CF_SECRET_KEY, CF_URL } from '$env/dynamic/private';
import { S3Client } from '@aws-sdk/client-s3';

export const s3 = new S3Client({
	region: 'auto',
	endpoint: CF_URL,
	credentials: {
		accessKeyId: CF_ACCESS_KEY,
		secretAccessKey: CF_SECRET_KEY
	}
});
