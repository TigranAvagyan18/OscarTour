import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';
// import { register } from 'prom-client';
// import { ClientProxy } from '@nestjs/microservices';

@ApiTags('Health')
@Controller('health')
export class HealthController {
	constructor(
		private health: HealthCheckService

		// @Inject('METRICS_SERVICE') private readonly metricsClient: ClientProxy
	) {}

	@Get()
	@HealthCheck()
	check() {
		return this.health.check([]);
	}

	// @Get('metrics')
	// async getMetrics() {
	// 	return await register.metrics();
	// }

	// @Get('/metrics/api')
	// async getApiMetrics() {
	// 	return await this.metricsClient.send('get_metrics', {}).toPromise();
	// }
}
