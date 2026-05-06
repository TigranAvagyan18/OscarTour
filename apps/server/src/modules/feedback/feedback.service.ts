import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './feedback.model';
import { CreateFeedbackDTO } from './dto/create.dto';

@Injectable()
export class FeedbackService {
	constructor(@InjectRepository(Feedback) private readonly feedbackRepository: Repository<Feedback>) {}

	async create(data: CreateFeedbackDTO, userId: number) {
		await this.feedbackRepository.save(this.feedbackRepository.create({ ...data, userId }));
	}

	async get() {
		return await this.feedbackRepository.find();
	}
}
