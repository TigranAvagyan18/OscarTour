import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Logger } from 'src/modules/logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	constructor(
		private readonly httpAdapterHost: HttpAdapterHost,
		readonly logger: Logger
	) {}

	catch(exception: HttpException, host: ArgumentsHost): void {
		const { httpAdapter } = this.httpAdapterHost;
		const ctx = host.switchToHttp();

		const request = ctx.getRequest();
		const controllerName = request.controllerName || 'ExceptionFilter';

		this.logger.setContext(controllerName);

		const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

		if (httpStatus >= 500) this.logger.error(exception.message || 'Unexpected error', exception);

		const response =
			exception instanceof HttpException
				? (exception.getResponse() as {
						constraints?: any;
						message?: string;
					} | null)
				: null;
		const constraints = response && (response?.constraints ?? response?.message ?? null);

		const responseBody = {
			message: exception.message || 'Unexpected error',
			statusCode: httpStatus,
			timestamp: new Date().toISOString(),
			path: httpAdapter.getRequestUrl(ctx.getRequest()),
			...(typeof constraints === 'string' || constraints === null ? {} : { constraints })
		};

		httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
	}
}
