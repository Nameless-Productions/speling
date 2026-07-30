import { z } from 'zod';

export const postSchema = z.object({
	content: z.string().min(1).max(255),
	image: z
		.instanceof(File)
		.refine((f) => f.size <= 50 * 1024 * 1024, { message: 'Max size is 50MB' })
		.refine((f) => f.size > 0, { message: 'File is required' })
		.optional()
});
