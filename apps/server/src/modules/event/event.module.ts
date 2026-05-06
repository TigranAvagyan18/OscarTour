import { forwardRef, Module } from '@nestjs/common';
import { createClient } from 'redis';
import config from 'src/config';
import { EventGateway } from './event.gateway';
import { PublisherService } from './publisher.service';

@Module({
	providers: [
		EventGateway,
		PublisherService,
		{
			provide: 'REDIS_CLIENT',
			useFactory: async () => {
				const client = createClient({
					url: `redis://${config.REDIS_HOST}:${config.REDIS_PORT}`
				});
				await client.connect();
				return client;
			}
		}
	],
	exports: [EventGateway, PublisherService, 'REDIS_CLIENT']
})
export class EventModule {}
