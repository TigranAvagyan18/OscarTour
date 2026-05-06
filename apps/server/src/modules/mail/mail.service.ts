import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { getTestMessageUrl } from 'nodemailer';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import config from 'src/config';
import { ENQUEUE_MAIL, MAIL_QUEUE_NAME } from 'src/config/constants';

@Injectable()
export class MailService {
	constructor(
		private readonly mailService: MailerService,
		@InjectQueue(MAIL_QUEUE_NAME) private readonly mailQueue: Queue
	) {}

	async enqueue(data: Omit<ISendMailOptions, 'from'>) {
		await this.mailQueue.add(ENQUEUE_MAIL, data);
	}

	async send(data: Omit<ISendMailOptions, 'from'>) {
		const { to, html } = data;
		const info = await this.mailService.sendMail({
			from: 'noreply@flowerfinder.be',
			to,
			html,
			...data
		});

		if (config.APP_ENV !== 'production') {
			console.log(getTestMessageUrl(info));
		}
	}
}
