export interface Post {
	author: {
		username: string;
		id: number;
	};
	content: string;
	likes: number;
	date: Date;
	comments: { author: string; content: string; id: number }[];
	typos: number;
	id: number;
	commentCount: number;
	imageUrl?: string;
}
