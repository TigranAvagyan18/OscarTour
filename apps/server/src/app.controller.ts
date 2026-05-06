import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Body, Controller, Get, Inject, InternalServerErrorException, Param, Post, Query } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import sizeof from 'object-sizeof';
import { PublisherService } from './modules/event/publisher.service';
import { EventGateway } from './modules/event/event.gateway';
import { Logger } from './modules/logger/logger.service';	
import { ToursService } from './modules/tours/tours.service';

@Controller('/')
export class AppController {
	constructor(
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
		private readonly publisherService: PublisherService,
		private readonly eventGateway: EventGateway,
		private readonly logger: Logger,
		private readonly toursService: ToursService
	) {
		this.logger.setContext(AppController.name);
	}

	@Get('/error')
	error() {
		throw new InternalServerErrorException();
	}

	@Get('/cache')
	async cache() {
		const keys = await this.cacheManager.store.keys();
		const keysSize = {};
		await Promise.all(
			keys.map(async (key) => {
				try {
					const value = await this.cacheManager.get(key);
					const size = sizeof(value);
					keysSize[key] = Number(size / 1024).toFixed(2);
				} catch (error) {}
			})
		);
		return keysSize;
	}

	@Post('/log-error')
	logMobileError(
		@Body()
		body: {
			error: string;
			context?: string;
			userId?: string;
			platform?: string;
			timestamp?: string;
			stack?: string;
		}
	) {
		this.logger.error('Mobile Error', {
			error: body.error,
			context: body.context || 'Mobile App',
			userId: body.userId,
			platform: body.platform,
			timestamp: body.timestamp || new Date().toISOString(),
			stack: body.stack
		});
		return { success: true };
	}

	@Get('/socket/connected')
	async getConnectedSockets() {
		return await this.eventGateway.getConnectedSockets();
	}

	@Get('/socket/user/:userId')
	async getUserSockets(@Param('userId') userId: string) {
		return await this.eventGateway.getUserSockets(parseInt(userId));
	}

	@Get('/import-tours')
	async importTours() {
		const filePath = process.cwd() + '/scraped-tours.json';
		const raw = fs.readFileSync(filePath, 'utf-8');
		const tours = JSON.parse(raw) as Array<{
			url: string;
			title: string;
			images: string[];
			duration: string;
			mileage: string;
			description: string;
			price: string;
		}>;

		const results = { created: 0, skipped: 0, errors: [] as string[] };

		for (const tour of tours) {
			try {
				const durationHours = parseInt(tour.duration, 10) || 1;
				const priceNum = parseFloat(tour.price.replace(/[^\d.]/g, '')) || 0;
				const category = tour.url.includes('private') ? 'private' : tour.url.includes('group') ? 'group' : 'package';

				await this.toursService.create({
					title: tour.title,
					shortDescription: tour.description.split('.')[0] + '.',
					fullDescription: tour.description,
					category: category as any,
					duration: tour.duration,
					durationHours,
					durationDays: null,
					price: priceNum,
					priceNote: 'per person',
					originalPrice: null,
					image: tour.images[0] ?? null,
					gallery: tour.images,
					rating: 0,
					reviewCount: 0,
					maxGroupSize: 10,
					minGroupSize: 1,
					languages: ['English'],
					difficulty: 'easy',
					pickupIncluded: false,
					meetingPoint: null,
					region: null,
					startingPoint: null,
					departures: [],
					highlights: [],
					included: [],
					excluded: [],
					itinerary: [],
					faq: [],
					tags: [],
					badge: null,
					isPublished: true
				});
				results.created++;
			} catch (err) {
				results.errors.push(`${tour.title}: ${err.message}`);
				results.skipped++;
			}
		}

		return results;
	}
}
