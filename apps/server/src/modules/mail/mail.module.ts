import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import config from 'src/config';
import { MAIL_QUEUE_NAME } from 'src/config/constants';
import { LoggerModule } from '../logger/logger.module';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailProcessor } from './mail.processor';

@Global()
@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: config.SMTP_HOST,
				port: config.SMTP_PORT,
				secure: false,
				auth: {
					user: config.SMTP_LOGIN,
					pass: config.SMPT_PASSWORD
				},
				tls: {
					minVersion: 'TLSv1.2'
				}
			}
		}),
		BullModule.registerQueue({
			name: MAIL_QUEUE_NAME
		}),
		LoggerModule
	],
	controllers: [MailController],
	providers: [MailService, MailProcessor],
	exports: [MailService]
})
export class MailModule {}
