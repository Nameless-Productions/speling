import { s3 } from './client';
import { ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { CF_BUCKET } from '$env/static/private';

export async function deleteUserFolder(userID: number) {
	const prefix = `${userID}/`;

	try {
		let isTruncated = true;
		let continuationToken: string | undefined;

		while (isTruncated) {
			const response = await s3.send(
				new ListObjectsV2Command({
					Bucket: CF_BUCKET,
					Prefix: prefix,
					ContinuationToken: continuationToken
				})
			);

			if (!response.Contents || response.Contents.length === 0) {
				break;
			}

			await s3.send(
				new DeleteObjectsCommand({
					Bucket: CF_BUCKET,
					Delete: {
						Objects: response.Contents.map((obj) => ({
							Key: obj.Key!
						}))
					}
				})
			);

			isTruncated = response.IsTruncated ?? false;
			continuationToken = response.NextContinuationToken;
		}
	} catch (error) {
		console.error(`Failed to delete R2 folder for user ${userID}:`, error);
		throw error;
	}
}
