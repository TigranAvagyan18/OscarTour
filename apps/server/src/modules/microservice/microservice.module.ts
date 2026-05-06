import { Module } from '@nestjs/common';
import { EventModule } from '../event/event.module';
import { MicroserviceController } from './microservice.controller';
import { MicroserviceService } from './microservice.service';

@Module({
	imports: [EventModule],
	controllers: [MicroserviceController],
	providers: [MicroserviceService]
})
export class MicroserviceModule {}
