import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { ThrottlerModule } from '@nestjs/throttler';
import { type RedisClientOptions } from 'redis';
import config from './config';

import { RequestMiddleware } from './common/middlewares/request.middleware';
import { AppDataSource } from './config/data-source';
import { MailModule } from './modules/mail/mail.module';
import { AppController } from './app.controller';
import { EventModule } from './modules/event/event.module';
import { MicroserviceModule } from './modules/microservice/microservice.module';
import { RequestLoggerMiddleware } from './common/middlewares/request-logger.middleware';
import { LoggerModule } from './modules/logger/logger.module';
import { HealthModule } from './modules/health/health.module';
import { SafeScheduleModule } from './common/modules/cron.module';
import { UploadModule } from './modules/upload/upload.module';
import { ToursModule } from './modules/tours/tours.module';
import { AdminAuthModule } from './modules/auth/admin-auth.module';
const APP_MODULES = [MailModule, UploadModule, ToursModule, AdminAuthModule];

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: () => ({}),
			dataSourceFactory: async () => {
				const dataSource = await AppDataSource.initialize();
				return dataSource;
			}
		}),
		SafeScheduleModule.forRoot(),
		JwtModule.register({
			global: true,
			secret: config.JWT_SECRET,
			signOptions: { expiresIn: '30d' }
		}),
		BullModule.forRoot({
			redis: {
				host: config.REDIS_HOST,
				port: config.REDIS_PORT
			}
		}),
		CacheModule.register<RedisClientOptions>({
			store: redisStore,
			socket: {
				host: config.REDIS_HOST,
				port: config.REDIS_PORT
			},
			isGlobal: true,
			ttl: 0
		}),
		ThrottlerModule.forRoot([
			{
				ttl: 60 * 1000,
				limit: 3
			}
		]),
		// ClientsModule.register([
		// 	{
		// 		name: 'METRICS_SERVICE',
		// 		transport: Transport.RMQ,
		// 		options: {
		// 			urls: [`amqp://${config.RABBITMQ_USER}:${config.RABBITMQ_PASSWORD}@${config.RABBITMQ_HOST}`],
		// 			queue: 'metrics',
		// 			queueOptions: {
		// 				durable: false
		// 			}
		// 		}
		// 	},
		// ]),
		EventModule,
		MicroserviceModule,
		HealthModule,
		LoggerModule,
		...APP_MODULES
	],
	controllers: [AppController]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(RequestMiddleware).forRoutes('*');
		consumer.apply(RequestLoggerMiddleware).forRoutes('*');
	}
}
