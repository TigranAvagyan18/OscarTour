import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MicroserviceService } from './microservice.service';

@Controller()
export class MicroserviceController {
	constructor(private readonly microserviceService: MicroserviceService) {}

	@MessagePattern('log')
	handleLog(data: any) {
		return this.microserviceService.handleLog(data);
	}

	@MessagePattern('error')
	handleError(data: any) {
		return this.microserviceService.handleError(data);
	}

	@MessagePattern('cache:delete')
	handleCacheDelete(data: any) {
		return this.microserviceService.handleCacheDelete(data);
	}
}
