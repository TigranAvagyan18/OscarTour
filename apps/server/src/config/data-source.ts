import 'reflect-metadata';
import { resolve } from 'node:path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import config from '.';

export const AppDataSource = new DataSource({
	type: 'postgres',
	timezone: 'UTC',
	host: config.DB_HOST,
	port: config.DB_PORT,
	username: config.DB_USER,
	password: config.DB_PASSWORD,
	database: config.DB_NAME,
	synchronize: false,
	keepConnectionAlive: true,
	namingStrategy: new SnakeNamingStrategy(),
	logging: false,
	entities: [resolve(__dirname, '../**/*.model.{js,ts}'), resolve(__dirname, '../**/*.view.{js,ts}')],
	subscribers: [resolve(__dirname, '../**/*.subscriber.{js,ts}')]
} as DataSourceOptions);
