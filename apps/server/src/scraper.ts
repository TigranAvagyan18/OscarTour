import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';

const BASE_URL = 'https://hyurservice.com';
const LIST_URL = `${BASE_URL}/en/private-tours-armenia`;
const MAX_PAGES = 5;
const DELAY_MS = 1000;

interface Tour {
	url: string;
	title: string;
	images: string[];
	duration: string;
	mileage: string;
	description: string;
	price: string;
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseBiggestSrcset(srcset: string): string | null {
	if (!srcset) return null;
	const parts = srcset
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean);
	let biggest: { url: string; width: number } | null = null;
	for (const part of parts) {
		const [url, descriptor] = part.split(/\s+/);
		const width = descriptor ? parseInt(descriptor.replace('w', ''), 10) : 0;
		if (!biggest || width > biggest.width) {
			biggest = { url: url.trim(), width };
		}
	}
	return biggest ? biggest.url : null;
}

async function fetchPage(url: string): Promise<string> {
	const response = await axios.get(url, {
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
			Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
			'Accept-Language': 'en-US,en;q=0.9'
		}
	});
	return response.data as string;
}

async function getTourLinks(page: number): Promise<string[]> {
	const url = page === 1 ? LIST_URL : `${LIST_URL}?page=${page}`;
	console.log(`Fetching list page ${page}: ${url}`);
	const html = await fetchPage(url);
	const $ = cheerio.load(html);
	const links: string[] = [];

	$('.tours__item').each((_, el) => {
		const link = $(el).find('.list__rooms-right a.tours__open-btn').attr('href');
		if (link) {
			links.push(link.startsWith('http') ? link : `${BASE_URL}${link}`);
		}
	});

	console.log(`  Found ${links.length} tours on page ${page}`);
	return links;
}

async function scrapeTourDetail(url: string): Promise<Tour> {
	console.log(`  Scraping tour: ${url}`);
	const html = await fetchPage(url);
	const $ = cheerio.load(html);

	const titleEl = $('.view-box__title.fs26.monserrat-medium');
	titleEl.find('.view-box__sign').remove();
	const title = titleEl.text().trim();

	const images: string[] = [];
	$('.list--one .list__item img.list__top-round-img').each((_, el) => {
		const srcset = $(el).attr('data-srcset') || $(el).attr('srcset') || '';
		const imgUrl = parseBiggestSrcset(srcset);

		if (imgUrl) {
			const fullUrl = imgUrl.startsWith('http') ? imgUrl : `${BASE_URL}${imgUrl}`;
			if (!images.includes(fullUrl)) {
				images.push(fullUrl);
			}
		}
	});

	const durationEl = $('.view-box__info-snippet .tours__time-info span');
	const duration = durationEl.text().trim();

	const mileageText = $('.view-box__info-snippet .tours__mileage-info').text().trim();
	const mileage = mileageText.replace(/Mileage:\s*/i, '').trim();

	const description = $('.view-box__static-original').text().trim();

	const price = $('.tours__price.monserrat-medium.price.no-special').first().text().trim();

	return { url, title, images, duration, mileage, description, price };
}

async function main() {
	const allTours: Tour[] = [];
	const allLinks: string[] = [];

	for (let page = 1; page <= MAX_PAGES; page++) {
		const links = await getTourLinks(page);
		allLinks.push(...links);
		await sleep(DELAY_MS);
	}

	const uniqueLinks = [...new Set(allLinks)];
	console.log(`\nTotal unique tour links collected: ${uniqueLinks.length}`);
	console.log('Starting detail scraping...\n');

	for (let i = 0; i < uniqueLinks.length; i++) {
		const link = uniqueLinks[i];
		try {
			const tour = await scrapeTourDetail(link);
			allTours.push(tour);
			console.log(`  [${i + 1}/${uniqueLinks.length}] ✓ ${tour.title || link}`);
		} catch (err) {
			console.error(`  [${i + 1}/${uniqueLinks.length}] ✗ Failed: ${link}`, err instanceof Error ? err.message : err);
		}
		await sleep(DELAY_MS);
	}

	const outputPath = path.join(__dirname, 'scraped-tours.json');
	fs.writeFileSync(outputPath, JSON.stringify(allTours, null, 2), 'utf-8');
	console.log(`\nDone! Scraped ${allTours.length} tours.`);
	console.log(`Output saved to: ${outputPath}`);
}

main().catch(console.error);
