import { ApiProperty } from '@nestjs/swagger';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

export type TourCategory = 'group' | 'private' | 'package';
export type TourDifficulty = 'easy' | 'moderate' | 'challenging';

export interface DepartureSchedule {
	days: string;
	times: string[];
}

export interface ItineraryDay {
	day: number;
	title: string;
	description: string;
	stops: string[];
	meals: string[];
	accommodation?: string;
}

export interface FaqItem {
	question: string;
	answer: string;
}

@Entity()
export class Tour extends BaseEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn('increment')
	id: number;

	@ApiProperty()
	@Column({ unique: true })
	slug: string;

	@ApiProperty()
	@Column()
	title: string;

	@ApiProperty()
	@Column({ type: 'text' })
	shortDescription: string;

	@ApiProperty()
	@Column({ type: 'text' })
	fullDescription: string;

	@ApiProperty({ enum: ['group', 'private', 'package'] })
	@Column()
	category: TourCategory;

	@ApiProperty()
	@Column()
	duration: string;

	@ApiProperty()
	@Column({ type: 'int' })
	durationHours: number;

	@ApiProperty({ required: false, nullable: true })
	@Column({ type: 'int', nullable: true })
	durationDays: number | null;

	@ApiProperty()
	@Column({ type: 'decimal', precision: 10, scale: 2 })
	price: number;

	@ApiProperty()
	@Column({ default: 'per person' })
	priceNote: string;

	@ApiProperty({ required: false, nullable: true })
	@Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
	originalPrice: number | null;

	@ApiProperty({ required: false, nullable: true })
	@Column({ nullable: true })
	image: string | null;

	@ApiProperty({ type: [String] })
	@Column({ type: 'jsonb', default: '[]' })
	gallery: string[];

	@ApiProperty()
	@Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
	rating: number;

	@ApiProperty()
	@Column({ default: 0 })
	reviewCount: number;

	@ApiProperty()
	@Column({ type: 'int' })
	maxGroupSize: number;

	@ApiProperty()
	@Column({ type: 'int' })
	minGroupSize: number;

	@ApiProperty({ type: [String] })
	@Column({ type: 'jsonb', default: '[]' })
	languages: string[];

	@ApiProperty({ enum: ['easy', 'moderate', 'challenging'] })
	@Column()
	difficulty: TourDifficulty;

	@ApiProperty()
	@Column({ default: false })
	pickupIncluded: boolean;

	@ApiProperty({ required: false, nullable: true })
	@Column({ nullable: true })
	meetingPoint: string | null;

	@ApiProperty({ required: false, nullable: true })
	@Column({ nullable: true })
	region: string | null;

	@ApiProperty({ required: false, nullable: true })
	@Column({ nullable: true })
	startingPoint: string | null;

	@ApiProperty()
	@Column({ type: 'jsonb', default: '[]' })
	departures: DepartureSchedule[];

	@ApiProperty({ type: [String] })
	@Column({ type: 'jsonb', default: '[]' })
	highlights: string[];

	@ApiProperty({ type: [String] })
	@Column({ type: 'jsonb', default: '[]' })
	included: string[];

	@ApiProperty({ type: [String] })
	@Column({ type: 'jsonb', default: '[]' })
	excluded: string[];

	@ApiProperty()
	@Column({ type: 'jsonb', default: '[]' })
	itinerary: ItineraryDay[];

	@ApiProperty()
	@Column({ type: 'jsonb', default: '[]' })
	faq: FaqItem[];

	@ApiProperty({ type: [String] })
	@Column({ type: 'jsonb', default: '[]' })
	tags: string[];

	@ApiProperty({ required: false, nullable: true })
	@Column({ nullable: true })
	badge: string | null;

	@ApiProperty()
	@Column({ default: true })
	isPublished: boolean;

	@ApiProperty()
	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@ApiProperty()
	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;
}
