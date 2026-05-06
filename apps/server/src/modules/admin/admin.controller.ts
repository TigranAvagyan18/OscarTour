import { Controller, Post, Body, UseGuards, Get, Param, Delete, ParseIntPipe, Patch, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Response } from 'express';
import { AuthGuard } from '../../common/guards/auth.guard';
import { PublisherService } from '../event/publisher.service';
import { OrganizationService } from '../organization/organization.service';
import { LocationService } from '../location/location.service';
import { OrderService } from '../order/order.service';
import { AssignCourierDto } from '../order/dto/assign-courier.dto';
import { UpdateWithdrawalDto } from '../organization/dto/update-withdrawal.dto';
import { Withdrawal } from '../organization/withdrawal.model';
import { Invoice } from '../organization/invoice.model';
import { Organization } from '../organization/organization.model';
import { AssignCourierToLocationDto } from './dto/assign-courier-to-location.dto';

@Controller('admin')
@ApiTags('Admin - Operations')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AdminController {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		private readonly publisherService: PublisherService,
		private readonly organizationService: OrganizationService,
		private readonly locationService: LocationService,
		private readonly orderService: OrderService
	) {}

	@Post('locations/assign-courier')
	@ApiOperation({ summary: 'Assign courier to location', operationId: 'assignCourierToLocation' })
	@ApiResponse({ status: 200, description: 'Courier assigned to location successfully' })
	async assignCourierToLocation(@Body() dto: AssignCourierToLocationDto) {
		return this.locationService.assignCourierToLocation(dto.locationId, dto.courierId);
	}

	@Delete('locations/:locationId/couriers/:courierId')
	@ApiOperation({ summary: 'Remove courier from location', operationId: 'removeCourierFromLocation' })
	@ApiResponse({ status: 200, description: 'Courier removed from location successfully' })
	async removeCourierFromLocation(
		@Param('locationId', ParseIntPipe) locationId: number,
		@Param('courierId') courierId: string
	) {
		return this.locationService.removeCourierFromLocation(locationId, courierId);
	}

	@Get('locations/:locationId/couriers')
	@ApiOperation({ summary: 'Get couriers assigned to location', operationId: 'getLocationCouriers' })
	@ApiResponse({ status: 200, description: 'Location couriers retrieved successfully' })
	async getLocationCouriers(@Param('locationId', ParseIntPipe) locationId: number) {
		return this.locationService.getLocationCouriers(locationId);
	}

	@Post('location-orders/:locationOrderId/assign-courier')
	@ApiOperation({
		summary: 'Assign courier to location order (sub-order)',
		operationId: 'assignCourierToLocationOrder'
	})
	@ApiResponse({ status: 200, description: 'Courier assigned to location order successfully' })
	@ApiResponse({ status: 404, description: 'Location order not found' })
	async assignCourierToLocationOrder(@Param('locationOrderId') locationOrderId: string, @Body() dto: AssignCourierDto) {
		return this.orderService.assignCourier(locationOrderId, dto.courierId);
	}

	@Get('withdrawals')
	@ApiOperation({ summary: 'Get all withdrawal requests', operationId: 'getAllWithdrawals' })
	@ApiResponse({ status: 200, description: 'Withdrawals retrieved successfully', type: [Withdrawal] })
	async getAllWithdrawals(): Promise<Withdrawal[]> {
		return this.organizationService.getAllWithdrawals();
	}

	@Patch('withdrawals/:id')
	@ApiOperation({ summary: 'Update withdrawal status', operationId: 'updateWithdrawal' })
	@ApiResponse({ status: 200, description: 'Withdrawal updated successfully', type: Withdrawal })
	@ApiResponse({ status: 400, description: 'Invalid status update' })
	@ApiResponse({ status: 404, description: 'Withdrawal not found' })
	async updateWithdrawal(
		@Param('id') id: string,
		@Body() updateWithdrawalDto: UpdateWithdrawalDto
	): Promise<Withdrawal> {
		return this.organizationService.updateWithdrawalStatus(id, updateWithdrawalDto);
	}

	@Get('invoices')
	@ApiOperation({ summary: 'Get all invoices', operationId: 'getAllInvoices' })
	@ApiResponse({ status: 200, description: 'Invoices retrieved successfully', type: [Invoice] })
	async getAllInvoices(): Promise<Invoice[]> {
		return this.organizationService.getAllInvoices();
	}

	@Get('invoices/:id')
	@ApiOperation({ summary: 'Get invoice details', operationId: 'getInvoice' })
	@ApiResponse({ status: 200, description: 'Invoice retrieved successfully', type: Invoice })
	async getInvoice(@Param('id') id: string): Promise<Invoice> {
		return this.organizationService.getInvoice(id);
	}

	@Get('invoices/:id/pdf')
	@ApiOperation({ summary: 'Download invoice PDF', operationId: 'downloadInvoicePdf' })
	@ApiResponse({ status: 200, description: 'Invoice PDF generated successfully' })
	async downloadInvoicePdf(@Param('id') id: string, @Res() res: Response) {
		const invoice = await this.organizationService.getInvoice(id);
		const pdf = await this.organizationService.generateInvoicePdf(invoice);
		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice.invoiceNumber}.pdf`);
		res.send(pdf);
	}

	@Get('organizations')
	@ApiOperation({
		summary: 'Get all organizations with locations and couriers',
		operationId: 'getAllOrganizationsAdmin'
	})
	@ApiResponse({ status: 200, description: 'Organizations retrieved successfully', type: [Organization] })
	async getAllOrganizationsAdmin(): Promise<Organization[]> {
		return this.entityManager.find(Organization, {
			relations: ['locations', 'locations.couriers'],
			order: {
				createdAt: 'DESC'
			}
		});
	}
}
