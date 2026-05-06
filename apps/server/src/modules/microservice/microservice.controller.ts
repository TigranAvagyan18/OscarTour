import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MicroserviceService } from './microservice.service';

@Controller()
export class MicroserviceController {
	constructor(private readonly microserviceService: MicroserviceService) {}

	@MessagePattern('get_user')
	getUser(data: any) {
		return this.microserviceService.getUser(data);
	}

	@MessagePattern('create_user')
	createUser(data: any) {
		return this.microserviceService.createUser(data);
	}

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
