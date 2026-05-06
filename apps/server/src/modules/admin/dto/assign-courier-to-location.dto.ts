import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class AssignCourierToLocationDto {
	@ApiProperty({ description: 'Courier profile ID' })
	@IsString()
	courierId: string;

	@ApiProperty({ description: 'Location ID' })
	@IsNumber()
	locationId: number;
}
