import { Injectable } from '@nestjs/common';
import { ClientProxy, Transport, ClientProxyFactory } from '@nestjs/microservices';
import config from 'src/config';

@Injectable()
export class PublisherService {
	private client: ClientProxy;

	constructor() {
		this.client = ClientProxyFactory.create({
			transport: Transport.RMQ,
			options: {
				urls: [`amqp://${config.RABBITMQ_USER}:${config.RABBITMQ_PASSWORD}@${config.RABBITMQ_HOST}`],
				queue: 'telegram',
				queueOptions: {
					durable: false
				}
			}
		});
	}

	sendEvent(eventName: string, data: any) {
		return this.client.emit(eventName, data);
	}

	async sendMessage(eventName: string, data: any) {
		return this.client
			.send(eventName, data)
			.toPromise()
			.catch((err) => {
				console.log('err', err);
			});
	}
}
