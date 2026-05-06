import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RpcException } from '@nestjs/microservices';
import { Logger } from '../logger/logger.service';

@Injectable()
export class MicroserviceService {
	constructor(
		private readonly logger: Logger,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache
	) {}

	async handleLog(data: any) {
		this.logger.log(data.message, data.context);
	}

	async handleError(data: any) {
		this.logger.error(data.message, data.context);
	}

	async handleCacheDelete(data: any) {
		await this.cacheManager.del(data.key);
	}
}
