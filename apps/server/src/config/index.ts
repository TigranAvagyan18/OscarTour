import 'dotenv/config';
import { cleanEnv, host, port, str, url } from 'envalid';

const env = cleanEnv(process.env, {
	NODE_ENV: str({
		choices: ['test', 'development', 'production'],
		default: 'development'
	}),
	APP_ENV: str({
		choices: ['development', 'stage', 'production'],
		default: 'development'
	}),

	APP_URL: str(),

	SERVER_URL: url(),

	BACKEND_PORT: port(),

	DB_NAME: str(),
	DB_HOST: host(),
	DB_PORT: port(),
	DB_USER: str(),
	DB_PASSWORD: str(),

	REDIS_HOST: host(),
	REDIS_PASSWORD: str(),
	REDIS_PORT: port(),

	RABBITMQ_HOST: host(),
	RABBITMQ_USER: str(),
	RABBITMQ_PASSWORD: str(),
	RABBITMQ_PORT: port(),

	AWS_ACCESS_KEY: str(),
	AWS_ACCESS_SECRET_KEY: str(),
	AWS_S3_REGION: str(),

	GOOGLE_CLIENT_ID: str(),
	GOOGLE_CLIENT_SECRET: str(),
	GOOGLE_CALLBACK_URL: url(),

	APPLE_CLIENT_ID: str({ default: '' }),

	SMTP_HOST: host(),
	SMTP_PORT: port(),
	SMTP_LOGIN: str(),
	SMPT_PASSWORD: str(),

	JWT_SECRET: str(),

	MEILISEARCH_HOST: url({ default: 'http://localhost:7700' }),
	MEILI_MASTER_KEY: str({ default: '' }),

	ADMIN_USERNAME: str({ default: 'admin' }),
	ADMIN_PASSWORD: str({ default: 'admin' })
});

const config = {
	NODE_ENV: env.NODE_ENV,
	APP_ENV: env.APP_ENV,

	APP_URL: env.APP_URL,

	SERVER_URL: env.SERVER_URL,

	PORT: env.BACKEND_PORT,

	DB_NAME: env.DB_NAME,
	DB_HOST: env.DB_HOST,
	DB_PORT: env.DB_PORT,
	DB_USER: env.DB_USER,
	DB_PASSWORD: env.DB_PASSWORD,

	REDIS_HOST: env.REDIS_HOST,
	REDIS_PASSWORD: env.REDIS_PASSWORD,
	REDIS_PORT: env.REDIS_PORT,

	RABBITMQ_HOST: env.RABBITMQ_HOST,
	RABBITMQ_USER: env.RABBITMQ_USER,
	RABBITMQ_PASSWORD: env.RABBITMQ_PASSWORD,
	RABBITMQ_PORT: env.RABBITMQ_PORT,

	AWS_ACCESS_KEY: env.AWS_ACCESS_KEY,
	AWS_ACCESS_SECRET_KEY: env.AWS_ACCESS_SECRET_KEY,
	AWS_S3_REGION: env.AWS_S3_REGION,

	GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET: env.GOOGLE_CLIENT_SECRET,
	GOOGLE_CALLBACK_URL: env.GOOGLE_CALLBACK_URL,

	APPLE_CLIENT_ID: env.APPLE_CLIENT_ID,

	SMTP_HOST: env.SMTP_HOST,
	SMTP_PORT: env.SMTP_PORT,
	SMTP_LOGIN: env.SMTP_LOGIN,
	SMPT_PASSWORD: env.SMPT_PASSWORD,

	JWT_SECRET: env.JWT_SECRET,

	MEILISEARCH_HOST: env.MEILISEARCH_HOST,
	MEILISEARCH_API_KEY: env.MEILI_MASTER_KEY,

	ADMIN_USERNAME: env.ADMIN_USERNAME,
	ADMIN_PASSWORD: env.ADMIN_PASSWORD
};

export default config;
