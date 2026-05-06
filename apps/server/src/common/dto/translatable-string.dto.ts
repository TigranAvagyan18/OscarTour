import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { TranslatableString } from '../../types/translatable.types';

export class TranslatableStringDto implements TranslatableString {
	@ApiProperty({ description: 'English translation', example: 'Red Rose' })
	@IsString()
	en: string;

	@ApiProperty({ description: 'Dutch translation', example: 'Rode Roos' })
	@IsString()
	nl: string;

	@ApiProperty({ description: 'German translation', example: 'Rote Rose' })
	@IsString()
	de: string;

	@ApiProperty({ description: 'French translation', example: 'Rose Rouge' })
	@IsString()
	fr: string;
}
