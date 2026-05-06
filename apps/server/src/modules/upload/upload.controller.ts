import { extname } from 'path';
import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import config from '../../config';
import { UploadService } from './upload.service';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
	constructor(private readonly uploadService: UploadService) {}

	@Post('single')
	@ApiOperation({ operationId: 'uploadSingle' })
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary'
				}
			}
		}
	})
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: (req, file, cb) => {
					cb(null, './uploads');
				},
				filename: (req, file, cb) => {
					const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
					const ext = extname(file.originalname);
					cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
				}
			}),
			fileFilter: (req, file, cb) => {
				const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
				if (allowedMimes.includes(file.mimetype)) {
					cb(null, true);
				} else {
					cb(new BadRequestException('Invalid file type. Only images are allowed.'), false);
				}
			},
			limits: {
				fileSize: 5 * 1024 * 1024
			}
		})
	)
	uploadSingle(@UploadedFile() file: Express.Multer.File) {
		if (!file) {
			throw new BadRequestException('No file uploaded');
		}

		const url = this.uploadService.getFileUrl(file.filename, config.SERVER_URL);

		return {
			filename: file.filename,
			url: url
		};
	}

	@Post('multiple')
	@ApiOperation({ operationId: 'uploadMultiple' })
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				files: {
					type: 'array',
					items: {
						type: 'string',
						format: 'binary'
					}
				}
			}
		}
	})
	@UseInterceptors(
		FilesInterceptor('files', 10, {
			storage: diskStorage({
				destination: (req, file, cb) => {
					cb(null, './uploads');
				},
				filename: (req, file, cb) => {
					const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
					const ext = extname(file.originalname);
					cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
				}
			}),
			fileFilter: (req, file, cb) => {
				const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
				if (allowedMimes.includes(file.mimetype)) {
					cb(null, true);
				} else {
					cb(new BadRequestException('Invalid file type. Only images are allowed.'), false);
				}
			},
			limits: {
				fileSize: 5 * 1024 * 1024
			}
		})
	)
	uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
		if (!files || files.length === 0) {
			throw new BadRequestException('No files uploaded');
		}

		return {
			files: files.map((file) => ({
				filename: file.filename,
				url: this.uploadService.getFileUrl(file.filename, config.SERVER_URL)
			}))
		};
	}
}
