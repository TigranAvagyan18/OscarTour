import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from './tour.model';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';

@Injectable()
export class ToursService {
	constructor(@InjectRepository(Tour) private readonly tourRepository: Repository<Tour>) {}

	async findAll(): Promise<Tour[]> {
		return this.tourRepository.find({ order: { createdAt: 'DESC' } });
	}

	async findPublished(): Promise<Tour[]> {
		return this.tourRepository.find({ where: { isPublished: true }, order: { createdAt: 'DESC' } });
	}

	async findById(id: number): Promise<Tour> {
		const tour = await this.tourRepository.findOne({ where: { id } });
		if (!tour) throw new NotFoundException(`Tour #${id} not found`);
		return tour;
	}

	async findBySlug(slug: string): Promise<Tour> {
		const tour = await this.tourRepository.findOne({ where: { slug } });
		if (!tour) throw new NotFoundException(`Tour "${slug}" not found`);
		return tour;
	}

	async create(dto: CreateTourDto): Promise<Tour> {
		const slug = await this.generateUniqueSlug(dto.title);
		const tour = this.tourRepository.create({ ...dto, slug });
		return this.tourRepository.save(tour);
	}

	async update(id: number, dto: UpdateTourDto): Promise<Tour> {
		const tour = await this.findById(id);
		if (dto.title && dto.title !== tour.title) {
			const newSlug = await this.generateUniqueSlug(dto.title);
			Object.assign(tour, dto, { slug: newSlug });
		} else {
			Object.assign(tour, dto);
		}
		return this.tourRepository.save(tour);
	}

	async remove(id: number): Promise<void> {
		const tour = await this.findById(id);
		await this.tourRepository.remove(tour);
	}

	private toSlug(text: string): string {
		return text
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, '')
			.replace(/[\s_-]+/g, '-')
			.replace(/^-+|-+$/g, '');
	}

	private async generateUniqueSlug(title: string): Promise<string> {
		const base = this.toSlug(title);
		const existing = await this.tourRepository.find({
			where: {},
			select: ['slug']
		});
		const slugs = new Set(existing.map((t) => t.slug));
		if (!slugs.has(base)) return base;
		let i = 1;
		while (slugs.has(`${base}-${i}`)) i++;
		return `${base}-${i}`;
	}
}
