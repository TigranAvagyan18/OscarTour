import { ApiProperty } from '@nestjs/swagger';
import {
	IsArray,
	IsBoolean,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { DepartureSchedule, FaqItem, ItineraryDay, TourCategory, TourDifficulty } from '../tour.model';

export class DepartureScheduleDto implements DepartureSchedule {
	@ApiProperty()
	@IsString()
	days: string;

	@ApiProperty({ type: [String] })
	@IsArray()
	@IsString({ each: true })
	times: string[];
}

export class ItineraryDayDto implements ItineraryDay {
	@ApiProperty()
	@IsNumber()
	day: number;

	@ApiProperty()
	@IsString()
	title: string;

	@ApiProperty()
	@IsString()
	description: string;

	@ApiProperty({ type: [String] })
	@IsArray()
	@IsString({ each: true })
	stops: string[];

	@ApiProperty({ type: [String] })
	@IsArray()
	@IsString({ each: true })
	meals: string[];

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	accommodation?: string;
}

export class FaqItemDto implements FaqItem {
	@ApiProperty()
	@IsString()
	question: string;

	@ApiProperty()
	@IsString()
	answer: string;
}

export class CreateTourDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	shortDescription: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	fullDescription: string;

	@ApiProperty({ enum: ['group', 'private', 'package'] })
	@IsEnum(['group', 'private', 'package'])
	category: TourCategory;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	duration: string;

	@ApiProperty()
	@IsNumber()
	durationHours: number;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	durationDays?: number;

	@ApiProperty()
	@IsNumber()
	price: number;

	@ApiProperty({ required: false, default: 'per person' })
	@IsOptional()
	@IsString()
	priceNote?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	originalPrice?: number;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	image?: string;

	@ApiProperty({ type: [String], required: false })
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	gallery?: string[];

	@ApiProperty({ required: false, default: 0 })
	@IsOptional()
	@IsNumber()
	rating?: number;

	@ApiProperty({ required: false, default: 0 })
	@IsOptional()
	@IsNumber()
	reviewCount?: number;

	@ApiProperty()
	@IsNumber()
	maxGroupSize: number;

	@ApiProperty()
	@IsNumber()
	minGroupSize: number;

	@ApiProperty({ type: [String], required: false })
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	languages?: string[];

	@ApiProperty({ enum: ['easy', 'moderate', 'challenging'] })
	@IsEnum(['easy', 'moderate', 'challenging'])
	difficulty: TourDifficulty;

	@ApiProperty({ required: false, default: false })
	@IsOptional()
	@IsBoolean()
	pickupIncluded?: boolean;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	meetingPoint?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	region?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	startingPoint?: string;

	@ApiProperty({ type: [DepartureScheduleDto], required: false })
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => DepartureScheduleDto)
	departures?: DepartureScheduleDto[];

	@ApiProperty({ type: [String], required: false })
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	highlights?: string[];

	@ApiProperty({ type: [String], required: false })
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	included?: string[];

	@ApiProperty({ type: [String], required: false })
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	excluded?: string[];

	@ApiProperty({ type: [ItineraryDayDto], required: false })
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ItineraryDayDto)
	itinerary?: ItineraryDayDto[];

	@ApiProperty({ type: [FaqItemDto], required: false })
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => FaqItemDto)
	faq?: FaqItemDto[];

	@ApiProperty({ type: [String], required: false })
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	tags?: string[];

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	badge?: string;

	@ApiProperty({ required: false, default: true })
	@IsOptional()
	@IsBoolean()
	isPublished?: boolean;
}
