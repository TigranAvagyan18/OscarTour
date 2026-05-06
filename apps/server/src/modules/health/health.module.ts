import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ClientsModule, Transport } from '@nestjs/microservices';
import config from 'src/config';
import { HealthController } from './health.controller';

@Module({
	imports: [
		TerminusModule,
		ClientsModule.register([
			{
				name: 'METRICS_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: [`amqp://${config.RABBITMQ_USER}:${config.RABBITMQ_PASSWORD}@${config.RABBITMQ_HOST}`],
					queue: 'metrics',
					queueOptions: {
						durable: false
					}
				}
			}
		])
	],
	controllers: [HealthController]
})
export class HealthModule {}
