import { Injectable, LoggerService, Scope } from '@nestjs/common';
import * as winston from 'winston';
// import LokiTransport from 'winston-loki';
import config from 'src/config';
import { PublisherService } from 'src/modules/event/publisher.service';

const gcpLogLevels = {
	levels: {
		default: 7,
		debug: 7,
		info: 6,
		notice: 5,
		warn: 4,
		error: 3,
		crit: 2,
		alert: 1,
		emerg: 0
	},
	colors: {
		default: 'grey',
		debug: 'blue',
		info: 'green',
		notice: 'magenta',
		warn: 'yellow',
		error: 'red',
		crit: 'red',
		alert: 'red',
		emerg: 'red'
	}
};

interface LogMeta {
	trace?: Error | string | unknown;
	[key: string]: any;
}

winston.addColors(gcpLogLevels.colors);
const colorizer = winston.format.colorize();
const isProd = config.NODE_ENV === 'production';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger implements LoggerService {
	private context?: string;
	private readonly logger: winston.Logger;

	constructor(private readonly publisherService: PublisherService) {
		const formatList = [
			winston.format.printf((info) => {
				info.ctx = this.context || 'unknown';
				if (info?.trace instanceof Error) {
					info.trace = info.trace?.stack || info.trace?.message || 'Unknown';
				}

				if (isProd && info.level === 'error') {
					const message = JSON.stringify(info);
					this.publisherService.sendEvent('log', { message });
				}

				return isProd ? JSON.stringify(info) : colorizer.colorize(info.level, JSON.stringify(info));
			})
		];

		if (isProd) {
			formatList.push(winston.format.json());
		}

		const transports: winston.transport[] = [
			new winston.transports.Console({
				format: winston.format.combine(...formatList)
			})
			// new LokiTransport({
			// 	host: 'http://localhost:3100',
			// 	labels: { job: 'nestjs_app' },
			// 	json: true,
			// 	format: winston.format.json(),
			// 	replaceTimestamp: true,
			// 	onConnectionError: (err) => console.error(err)
			// })
		];

		this.logger = winston.createLogger({
			levels: gcpLogLevels.levels,
			defaultMeta: {
				app: 'server',
				instance: `server-${process.env.pm_id}`
			},
			level: 'debug',
			format: winston.format.combine(
				winston.format.timestamp({
					format: () => new Date().toISOString()
				}),
				winston.format.json()
			),
			transports
		});
	}

	setContext(context: string) {
		this.context = context;
	}

	log(message: string, meta?: LogMeta) {
		this.logger.info(message, meta);
	}

	debug(message: string, meta?: LogMeta) {
		this.logger.debug(message, meta);
	}

	notice(message: string, meta?: LogMeta) {
		this.logger.notice(message, meta);
	}

	warn(message: string, meta?: LogMeta) {
		this.logger.warn(message, meta);
	}

	error(message: string, trace: Error | string | unknown, meta?: LogMeta) {
		this.logger.error(`${message}`, { ...meta, trace });
	}

	crit(message: string, meta?: LogMeta) {
		this.logger.crit(message, meta);
	}

	alert(message: string, meta?: LogMeta) {
		this.logger.alert(message, meta);
	}

	emerg(message: string, meta?: LogMeta) {
		this.logger.emerg(message, meta);
	}
}
