import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateFeedbackDTO {
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	@MaxLength(255)
	message: string;

	@IsString()
	@IsNotEmpty()
	model: string;
}
