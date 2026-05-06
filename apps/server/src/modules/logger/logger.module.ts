import { Global, Module } from '@nestjs/common';
import { EventModule } from '../event/event.module';
import { Logger } from './logger.service';
import { loggerFactory } from './logger.factory';

@Global()
@Module({
	imports: [EventModule],
	providers: [Logger, loggerFactory],
	exports: [Logger, loggerFactory]
})
export class LoggerModule {}
