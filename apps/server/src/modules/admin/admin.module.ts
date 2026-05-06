import { Module } from '@nestjs/common';
import { EventModule } from '../event/event.module';
import { OrganizationModule } from '../organization/organization.module';
import { LocationModule } from '../location/location.module';
import { OrderModule } from '../order/order.module';
import { AdminController } from './admin.controller';

@Module({
	imports: [EventModule, OrganizationModule, LocationModule, OrderModule],
	controllers: [AdminController],
	providers: []
})
export class AdminModule {}
