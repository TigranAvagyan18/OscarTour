import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
	private readonly uploadPath = join(process.cwd(), 'uploads');

	constructor() {
		if (!existsSync(this.uploadPath)) {
			mkdirSync(this.uploadPath, { recursive: true });
		}
	}

	getUploadPath(): string {
		return this.uploadPath;
	}

	getFileUrl(filename: string, baseUrl: string): string {
		return `${baseUrl}/uploads/${filename}`;
	}
}
