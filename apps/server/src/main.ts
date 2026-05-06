import { writeFile } from 'fs/promises';
import { join } from 'path';
import { BadRequestException, ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { stringify } from 'yaml';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exceptions/error.exception';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';
import config from './config';
import { RedisIoAdapter } from './modules/event/adapter';
import { PublisherService } from './modules/event/publisher.service';
import { Logger } from './modules/logger/logger.service';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		bufferLogs: true,
		snapshot: true
	});

	app.set('trust proxy', 1);

	app.useStaticAssets(join(process.cwd(), 'uploads'), {
		prefix: '/uploads/'
	});

	const loggerFactory = app.get<() => Logger>('LOGGER_FACTORY');
	const logger = loggerFactory();

	process.on('uncaughtException', (error: Error) => logger.error('uncaught exception', error));
	process.on('unhandledRejection', (error: Error) => logger.error('unhandled rejection', error));

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.RMQ,
		options: {
			urls: [`amqp://${config.RABBITMQ_USER}:${config.RABBITMQ_PASSWORD}@${config.RABBITMQ_HOST}`],
			queue: 'app',
			queueOptions: {
				durable: false
			}
		}
	});

	if (config.APP_ENV !== 'production') {
		const swagger = new DocumentBuilder()
			.setTitle('FlowerFinder')
			.setDescription('FlowerFinder API')
			.setVersion('1.0')
			.addBearerAuth()
			.build();
		const document = SwaggerModule.createDocument(app, swagger);
		SwaggerModule.setup('swagger', app, document);
		const yamlString: string = stringify(document, {});
		await writeFile('./swagger-spec.yaml', yamlString);
	}

	app.use(cookieParser());
	app.useGlobalPipes(
		new ValidationPipe({
			exceptionFactory: (errors) => {
				const formatErrors = (error: any): any[] => {
					const result: { property: string; details: string[] }[] = [];

					if (error.constraints) {
						result.push({
							property: error.property,
							details: Object.values(error.constraints)
						});
					}

					if (error.children && error.children.length > 0) {
						error.children.forEach((child: any) => {
							const childErrors = formatErrors(child).map((childError) => ({
								property: `${error.property}.${childError.property}`,
								details: childError.details
							}));
							result.push(...childErrors);
						});
					}

					return result;
				};

				const formattedErrors = errors.flatMap(formatErrors);
				return new BadRequestException(formattedErrors);
			},
			stopAtFirstError: false
		})
	);
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
	app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost), logger));
	app.useGlobalInterceptors(new ErrorInterceptor());

	app.enableCors({ credentials: true, origin: config.APP_URL });

	const redisIoAdapter = new RedisIoAdapter(app);
	await redisIoAdapter.connectToRedis();
	app.useWebSocketAdapter(redisIoAdapter);

	await app.startAllMicroservices();
	await app.listen(config.PORT, '0.0.0.0');
	logger.log('Server is running on port ' + config.PORT);
	const publisher = app.get<PublisherService>(PublisherService);

	if (process.env.NODE_APP_INSTANCE === '0') {
		publisher.sendEvent('log', { message: `\`${config.APP_URL} is running\`` });
	}
}
bootstrap();
