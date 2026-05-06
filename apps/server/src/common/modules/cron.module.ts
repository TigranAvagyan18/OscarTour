import { DynamicModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({})
export class SafeScheduleModule {
	static forRoot(): DynamicModule {
		const disableCrons = process.env.NODE_APP_INSTANCE !== '0';

		if (disableCrons) {
			console.log('⚠️ Cron jobs disabled in this instance');
		}

		return {
			module: SafeScheduleModule,
			imports: disableCrons ? [] : [ScheduleModule.forRoot()]
		};
	}
}
