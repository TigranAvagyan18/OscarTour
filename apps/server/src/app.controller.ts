import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Body, Controller, Get, Inject, InternalServerErrorException, Param, Post, Query } from '@nestjs/common';
import sizeof from 'object-sizeof';
import { PublisherService } from './modules/event/publisher.service';
import { EventGateway } from './modules/event/event.gateway';
import { Logger } from './modules/logger/logger.service';
import { NotificationService } from './modules/notification/notification.service';
import { UserService } from './modules/user/user.service';

@Controller('/')
export class AppController {
	constructor(
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
		private readonly publisherService: PublisherService,
		private readonly eventGateway: EventGateway,
		private readonly logger: Logger,
		private readonly notificationService: NotificationService,
		private readonly userService: UserService
	) {
		this.logger.setContext(AppController.name);
	}

	@Get('/error')
	error() {
		throw new InternalServerErrorException();
	}

	@Get('/cache')
	async cache() {
		const keys = await this.cacheManager.store.keys();
		const keysSize = {};
		await Promise.all(
			keys.map(async (key) => {
				try {
					const value = await this.cacheManager.get(key);
					const size = sizeof(value);
					keysSize[key] = Number(size / 1024).toFixed(2);
				} catch (error) {}
			})
		);
		return keysSize;
	}

	@Post('/log-error')
	logMobileError(
		@Body()
		body: {
			error: string;
			context?: string;
			userId?: string;
			platform?: string;
			timestamp?: string;
			stack?: string;
		}
	) {
		this.logger.error('Mobile Error', {
			error: body.error,
			context: body.context || 'Mobile App',
			userId: body.userId,
			platform: body.platform,
			timestamp: body.timestamp || new Date().toISOString(),
			stack: body.stack
		});
		return { success: true };
	}

	@Get('/push-notification/:id')
	async pushNotification(@Param('id') id: string, @Query('title') title?: string, @Query('body') body?: string) {
		const user = await this.userService.getById(id);
		if (!user.pushToken) {
			return { success: false, message: 'User has no push token' };
		}
		await this.notificationService.sendPushNotification(
			user.pushToken as string,
			title || 'Test Notification',
			body || 'This is a test notification'
		);
		return { success: true };
	}

	@Get('/socket/connected')
	async getConnectedSockets() {
		return await this.eventGateway.getConnectedSockets();
	}

	@Get('/socket/user/:userId')
	async getUserSockets(@Param('userId') userId: string) {
		return await this.eventGateway.getUserSockets(parseInt(userId));
	}
}
