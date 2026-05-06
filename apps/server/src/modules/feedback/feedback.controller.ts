import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateFeedbackDTO } from './dto/create.dto';
import { FeedbackService } from './feedback.service';
import { Feedback } from './feedback.model';

@ApiTags('Feedback')
@Controller('/feedback')
export class FeedbackController {
	constructor(private readonly feedbackService: FeedbackService) {}

	@ApiOperation({ operationId: 'createFeedback' })
	@ApiOkResponse({ type: Boolean })
	@Post('/create')
	@UseGuards(AuthGuard)
	async create(@Body() data: CreateFeedbackDTO, @CurrentUser() user: any) {
		await this.feedbackService.create(data, user?.id);
		return true;
	}

	@ApiOperation({ operationId: 'getFeedback' })
	@ApiOkResponse({ type: [Feedback] })
	@Get('/')
	async get() {
		return await this.feedbackService.get();
	}
}
