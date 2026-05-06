import { Request } from 'express';

declare module 'express' {
	interface Request {
		token?: string | null;
		currentUser?: {
			id: string;
			mail: string;
		} | null;
	}
}
