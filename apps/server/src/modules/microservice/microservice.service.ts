import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RpcException } from '@nestjs/microservices';
import { UserService } from '../user/user.service';
import { Logger } from '../logger/logger.service';

@Injectable()
export class MicroserviceService {
	constructor(
		private readonly userservice: UserService,
		private readonly logger: Logger,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache
	) {}

	async getUser(data: any) {
		try {
			return await this.userservice.getById(data.id);
		} catch (error) {
			throw new RpcException({
				message: error.message || 'Failed to get user',
				statusCode: error.getStatus ? error.getStatus() : 500
			});
		}
	}

	async createUser(data: any) {
		try {
			return await this.userservice.create(data);
		} catch (error) {
			throw new RpcException({
				message: error.message || 'Failed to create user',
				statusCode: error.getStatus ? error.getStatus() : 500
			});
		}
	}

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
