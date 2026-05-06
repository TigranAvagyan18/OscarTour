import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class AssignCourierToShopDto {
	@ApiProperty({ description: 'Courier profile ID' })
	@IsString()
	courierId: string;

	@ApiProperty({ description: 'Shop ID' })
	@IsNumber()
	shopId: number;
}
