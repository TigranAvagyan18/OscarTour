import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { nanoid } from 'nanoid';
import { Logger } from '../../modules/logger/logger.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
	constructor(private readonly logger: Logger) {
		this.logger.setContext('HTTP');
	}

	use(request: Request, response: Response, next: NextFunction) {
		const { ip, method, originalUrl: url } = request;

		if (method === 'OPTIONS' || method === 'HEAD' || url.includes('health') || url.includes('stat')) {
			return next();
		}

		const userAgent = request.get('user-agent') || '';
		const requestId = nanoid(7);
		const startTime = Date.now();

		const userId = request.currentUser?.id || null;

		const requestLog = {
			requestId,
			userId,
			method,
			url,
			ms: startTime,
			query: request.query,
			params: request.params,
			body: request.body,
			remoteAddress: ip,
			userAgent
		};

		this.logger.debug(`Incoming ${method} ${url}`, { request: requestLog });

		response.on('finish', () => {
			const ms = Date.now();
			const responseTime = ms - startTime;
			const { statusCode } = response;
			const contentLength = response.get('content-length');

			const responseLog = {
				requestId,
				userId,
				ms,
				statusCode,
				contentLength: contentLength,
				responseTime
			};

			this.logger.debug(`Outgoing ${method} ${url}`, {
				response: responseLog
			});
		});

		next();
	}
}
