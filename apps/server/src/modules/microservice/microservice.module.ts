import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { EventModule } from '../event/event.module';
import { MicroserviceController } from './microservice.controller';
import { MicroserviceService } from './microservice.service';

@Module({
	imports: [UserModule, EventModule],
	controllers: [MicroserviceController],
	providers: [MicroserviceService]
})
export class MicroserviceModule {}
