import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../event/event.module';
import { Feedback } from './feedback.model';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Feedback]), EventModule],
	controllers: [FeedbackController],
	providers: [FeedbackService]
})
export class FeedbackModule {}
