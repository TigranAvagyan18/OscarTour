import { Provider } from '@nestjs/common';
import { PublisherService } from '../event/publisher.service';
import { Logger } from './logger.service';

export const loggerFactory: Provider = {
	provide: 'LOGGER_FACTORY',
	useFactory: (anotherService: PublisherService) => {
		return () => new Logger(anotherService);
	},
	inject: [PublisherService]
};
