import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { confirmationEmailTemplate } from './templates/confirmation';

@Controller('mail')
export class MailController {
	constructor(private readonly mailService: MailService) {}

	@Get('/send')
	async send() {
		await this.mailService.enqueue({
			to: 'tigranav18@gmail.com',
			subject: 'Test mail',
			html: confirmationEmailTemplate('https://flowerfinder.be/auth/confirm?token=1234567890')
		});
		return true;
	}
}
