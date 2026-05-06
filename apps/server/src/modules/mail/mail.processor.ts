import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ISendMailOptions } from '@nestjs-modules/mailer';
import { ENQUEUE_MAIL, MAIL_QUEUE_NAME } from 'src/config/constants';
import { Logger } from '../logger/logger.service';
import { MailService } from './mail.service';

@Processor(MAIL_QUEUE_NAME)
export class MailProcessor {
	constructor(
		private readonly mailService: MailService,
		private logger: Logger
	) {
		logger.setContext(MailProcessor.name);
	}

	@Process(ENQUEUE_MAIL)
	async sendMail(job: Job<ISendMailOptions>) {
		return await this.mailService.send(job.data);
	}

	@OnQueueActive()
	public onActive(job: Job) {
		this.logger.notice(`Processing job ${job.id} of type ${job.name}`);
	}

	@OnQueueCompleted()
	public async onComplete(job: Job) {
		this.logger.log(`Completed job ${job.id} of type ${job.name}`);
	}

	@OnQueueFailed()
	public async onError(job: Job<any>, error: any) {
		this.logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
	}
}
