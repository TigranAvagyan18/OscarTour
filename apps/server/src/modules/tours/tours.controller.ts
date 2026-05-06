import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { Tour } from './tour.model';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';

@ApiTags('Tours')
@Controller('tours')
export class ToursController {
	constructor(private readonly toursService: ToursService) {}

	@ApiOperation({ operationId: 'getPublishedTours' })
	@ApiOkResponse({ type: [Tour] })
	@Get('/')
	async getPublishedTours(): Promise<Tour[]> {
		return this.toursService.findPublished();
	}

	@ApiOperation({ operationId: 'getTourById' })
	@ApiOkResponse({ type: Tour })
	@Get('/:id')
	async getTourById(@Param('id', ParseIntPipe) id: number): Promise<Tour> {
		return this.toursService.findById(id);
	}

	@ApiOperation({ operationId: 'getTourBySlug' })
	@ApiOkResponse({ type: Tour })
	@Get('/slug/:slug')
	async getTourBySlug(@Param('slug') slug: string): Promise<Tour> {
		return this.toursService.findBySlug(slug);
	}

	@ApiBearerAuth()
	@ApiOperation({ operationId: 'adminGetAllTours' })
	@ApiOkResponse({ type: [Tour] })
	@UseGuards(AdminGuard)
	@Get('/admin/all')
	async adminGetAllTours(): Promise<Tour[]> {
		return this.toursService.findAll();
	}

	@ApiBearerAuth()
	@ApiOperation({ operationId: 'createTour' })
	@ApiOkResponse({ type: Tour })
	@UseGuards(AdminGuard)
	@Post('/')
	async createTour(@Body() dto: CreateTourDto): Promise<Tour> {
		return this.toursService.create(dto);
	}

	@ApiBearerAuth()
	@ApiOperation({ operationId: 'updateTour' })
	@ApiOkResponse({ type: Tour })
	@UseGuards(AdminGuard)
	@Patch('/:id')
	async updateTour(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTourDto): Promise<Tour> {
		return this.toursService.update(id, dto);
	}

	@ApiBearerAuth()
	@ApiOperation({ operationId: 'deleteTour' })
	@ApiOkResponse({ type: Boolean })
	@UseGuards(AdminGuard)
	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete('/:id')
	async deleteTour(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.toursService.remove(id);
	}
}
