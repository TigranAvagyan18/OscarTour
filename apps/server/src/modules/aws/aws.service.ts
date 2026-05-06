import { randomUUID } from 'crypto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import config from 'src/config';
import { Logger } from '../logger/logger.service';

@Injectable()
export class AWS {
	constructor(private readonly logger: Logger) {
		this.logger.setContext(AWS.name);
	}

	private readonly s3Client = new S3Client({
		region: config.AWS_S3_REGION,
		credentials: {
			accessKeyId: config.AWS_ACCESS_KEY,
			secretAccessKey: config.AWS_ACCESS_SECRET_KEY
		}
	});

	async upload(fileName: string, mimeType: string, file: Buffer) {
		return await this.s3Client.send(
			new PutObjectCommand({
				Bucket: 'bucket',
				Key: fileName,
				ContentType: mimeType,
				Body: file,
				ACL: 'public-read'
			})
		);
	}

	async uploadFromUrl(url: string, keepOriginalName = false) {
		try {
			const response = await axios.get(url, { responseType: 'arraybuffer' });

			const mimeType = response.headers['content-type'] as string;

			const fileName = keepOriginalName ? url.split('/').pop() : randomUUID() + '.' + mimeType.split('/').pop();

			const fileBuffer = Buffer.from(response.data);

			await this.upload(fileName, mimeType, fileBuffer);

			return this.getUrl(fileName);
		} catch (error) {
			this.logger.error('uploadFromUrl: error', { url, error });
			throw error;
		}
	}

	getUrl(fileName: string) {
		return `https://bucket.s3.amazonaws.com/${fileName}`;
	}
}
