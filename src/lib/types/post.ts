export interface Post {
	author: string;
	content: string;
	likes: number;
	date: Date;
	comments: { author: string; content: string; id: number }[];
	typos: number;
	id: number;
	commentCount: number;
}
