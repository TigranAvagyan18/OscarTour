import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  ArrowLeft, Clock, MapPin, Star, Users, Globe,
  CheckCircle, Circle as XCircle,
  Calendar, ChevronDown, ChevronUp, MessageSquare,
  Share2, Heart, Minus, Plus, ArrowRight, Shield, Zap,
} from 'lucide-react';
import { useGetTourBySlug } from '@/generated/index';
import { useTranslation } from '@/providers/TranslationProvider';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

// Fields not present in scraped data — same value for all tours
const STATIC_DETAIL_DEFAULTS = {
  region: 'Armenia',
  startingPoint: 'Yerevan',
  maxGroupSize: 10,
  minGroupSize: 1,
  languages: ['English', 'Russian'] as string[],
  originalPrice: null as number | null,
  departures: [
    { days: 'Daily', times: ['09:00', '10:00', '14:00'] },
  ] as { days: string; times: string[] }[],
  highlights: [
    'Garni Hellenistic Temple (1st century AD)',
    'Symphony of Stones basalt gorge',
    'Geghard UNESCO Monastery',
    'Traditional lavash bread baking demonstration',
    'Local honey, gata (pastry) and brandy tasting',
  ] as string[],
  included: [
    'Professional licensed guide',
    'Air-conditioned minibus',
    'Hotel pickup and drop-off in Yerevan',
    'Bottled water',
  ] as string[],
  excluded: [
    'Entrance fees (paid on site)',
    'Lunch (optional stop at roadside restaurant)',
    'Personal shopping',
    'Tips',
  ] as string[],
  itinerary: [
    {
      day: 1,
      title: 'Departure & Drive',
      description: 'Pickup from your hotel in Yerevan and drive toward the first destination along scenic mountain roads.',
      stops: ['Yerevan Hotel Pickup'],
      meals: [] as string[],
    },
    {
      day: 1,
      title: 'Main Sites',
      description: 'Explore the key historical and cultural highlights of the day tour with your expert local guide.',
      stops: ['Main Attraction', 'Secondary Viewpoint'],
      meals: [] as string[],
    },
    {
      day: 1,
      title: 'Return to Yerevan',
      description: 'Head back to Yerevan with panoramic views along the way. Drop-off at your hotel.',
      stops: ['Scenic Viewpoint', 'Yerevan Drop-off'],
      meals: [] as string[],
    },
  ] as { day: number; title: string; description: string; stops: string[]; meals: string[]; accommodation?: string }[],
  faq: [
    {
      question: 'What is the minimum group size?',
      answer: 'Tours operate with a minimum of 1 participant. Contact us to discuss private arrangements.',
    },
    {
      question: 'Is hotel pickup included?',
      answer: 'Yes, pickup is included from all hotels in central Yerevan. Please provide your hotel name when booking.',
    },
    {
      question: 'Are children welcome?',
      answer: 'Absolutely. Children under 5 join for free; ages 5–12 receive a 30% discount.',
    },
  ] as { question: string; answer: string }[],
};

const tabKeys = ['overview', 'itinerary', 'included', 'reviews', 'faq'] as const;
type TabKey = typeof tabKeys[number];

const difficultyColors: Record<string, string> = {
  easy:        'bg-emerald-100 text-emerald-700',
  moderate:    'bg-amber-100 text-amber-700',
  challenging: 'bg-red-100 text-red-700',
};

export default function TourDetailPage() {
  const router = useRouter();
  const { slug } = router.query as { slug: string };
  const { t } = useTranslation();

  const { data: tour, isLoading } = useGetTourBySlug(slug ?? '', {
    query: { enabled: !!slug },
  });

  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [activeImage, setActiveImage] = useState(0);
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [groupSize, setGroupSize] = useState(2);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [openItinerary, setOpenItinerary] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  useEffect(() => {
    if (!mainApi) return;
    const onSelect = () => {
      const idx = mainApi.selectedScrollSnap();
      setActiveImage(idx);
      thumbApi?.scrollTo(idx);
    };
    mainApi.on('select', onSelect);
    return () => { mainApi.off('select', onSelect); };
  }, [mainApi, thumbApi]);

  const onThumbClick = (index: number) => {
    mainApi?.scrollTo(index);
  };

  if (!slug || isLoading) return null;

  if (!tour) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif font-bold text-dark text-2xl mb-3">{t('tour.notFound')}</h2>
          <Button asChild variant="primary" size="pill" className="text-sm">
            <Link href="/tours">{t('tour.backToTours')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const totalPrice = tour.price * groupSize;

  const scrollToTab = (key: TabKey) => {
    setActiveTab(key);
    document.getElementById(`tab-${key}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-white border-b border-gray-100 sticky top-16 md:top-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-brand-500 transition-colors">{t('tour.breadcrumb.home')}</Link>
          <span>/</span>
          <Link href="/tours" className="hover:text-brand-500 transition-colors">{t('tour.breadcrumb.tours')}</Link>
          <span>/</span>
          <span className="text-dark font-medium line-clamp-1">{tour.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
        <button
          onClick={() => router.push('/tours')}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-brand-500 transition-colors mb-5"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('tour.backToTours')}
        </button>

        <div className="flex flex-wrap items-start gap-4 justify-between mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 text-brand-700">
                {t(`tour.categories.${tour.category}`)}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${difficultyColors[tour.difficulty]}`}>
                {t(`tour.difficulty.${tour.difficulty}`)}
              </span>
              {tour.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold-500 text-white">{tour.badge}</span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-dark leading-tight max-w-2xl">
              {tour.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                saved ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-400 hover:border-gray-300'
              }`}
              aria-label={saved ? 'Unsave tour' : 'Save tour'}
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-300 transition-all">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
            <span className="font-semibold text-dark">{tour.rating}</span>
            <span>({tour.reviewCount} {t('tour.reviews')})</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-brand-400" />
            {tour.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-brand-400" />
            {STATIC_DETAIL_DEFAULTS.region}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-brand-400" />
            Max {STATIC_DETAIL_DEFAULTS.maxGroupSize}
          </span>
          <span className="flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-brand-400" />
            {STATIC_DETAIL_DEFAULTS.languages.join(', ')}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <Carousel
          setApi={setMainApi}
          opts={{ loop: true }}
          className="relative"
        >
          <CarouselContent className="-ml-0">
            {tour.gallery.map((img, i) => (
              <CarouselItem key={i} className="pl-0">
                <div className="h-80 md:h-[520px] rounded-3xl overflow-hidden">
                  <img
                    src={img}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-white/80 backdrop-blur-sm border-0 hover:bg-white shadow-md" />
          <CarouselNext className="right-4 bg-white/80 backdrop-blur-sm border-0 hover:bg-white shadow-md" />
        </Carousel>

        <div className="mt-3">
          <Carousel
            setApi={setThumbApi}
            opts={{ align: 'start', dragFree: true }}
          >
            <CarouselContent className="-ml-2">
              {tour.gallery.map((img, i) => (
                <CarouselItem key={i} className="pl-2 basis-1/4 sm:basis-1/5 md:basis-1/6">
                  <button
                    onClick={() => onThumbClick(i)}
                    className={`relative rounded-xl overflow-hidden h-16 md:h-20 w-full block transition-all duration-200 ${
                      activeImage === i
                        ? 'ring-2 ring-brand-500 opacity-100'
                        : 'opacity-55 hover:opacity-90'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      <div className="sticky top-[calc(4rem+48px)] md:top-[calc(5rem+48px)] z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {tabKeys.map((key) => (
              <button
                key={key}
                onClick={() => scrollToTab(key)}
                className={`flex-none px-5 py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === key
                    ? 'border-brand-500 text-brand-600'
                    : 'border-transparent text-gray-400 hover:text-dark'
                }`}
              >
                {t(`tour.tabs.${key}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-4xl space-y-14">
            <section id="tab-overview" aria-label="Overview">
              <h2 className="text-2xl font-serif font-bold text-dark mb-4">{t('tour.tabs.overview')}</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{tour.fullDescription}</p>

              <h3 className="text-lg font-serif font-bold text-dark mb-4">{t('tour.overview.highlights')}</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STATIC_DETAIL_DEFAULTS.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                    <div className="w-6 h-6 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-500" />
                    </div>
                    <span className="text-sm text-gray-700 leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Clock,  label: t('tour.overview.duration'),  value: tour.duration },
                  { icon: MapPin, label: t('tour.overview.startsAt'),  value: STATIC_DETAIL_DEFAULTS.startingPoint },
                  { icon: Users,  label: t('tour.overview.groupSize'), value: `${STATIC_DETAIL_DEFAULTS.minGroupSize}–${STATIC_DETAIL_DEFAULTS.maxGroupSize}` },
                  { icon: Globe,  label: t('tour.overview.language'),  value: STATIC_DETAIL_DEFAULTS.languages[0] + (STATIC_DETAIL_DEFAULTS.languages.length > 1 ? ` +${STATIC_DETAIL_DEFAULTS.languages.length - 1}` : '') },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
                    <Icon className="w-5 h-5 text-brand-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                    <p className="text-sm font-semibold text-dark">{value}</p>
                  </div>
                ))}
              </div>

              {STATIC_DETAIL_DEFAULTS.departures.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-serif font-bold text-dark mb-4">{t('tour.overview.departureSchedule')}</h3>
                  <div className="space-y-3">
                    {STATIC_DETAIL_DEFAULTS.departures.map((dep, i) => (
                      <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-brand-400" />
                          <span className="text-sm font-semibold text-dark">{dep.days}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-gray-400">{t('tour.overview.departureTimes')}:</span>
                          {dep.times.map((time) => (
                            <span key={time} className="px-3 py-1 bg-brand-50 text-brand-600 text-sm font-semibold rounded-full">
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <section id="tab-itinerary" aria-label="Itinerary">
              <h2 className="text-2xl font-serif font-bold text-dark mb-6">
                {tour.durationDays
                  ? `${tour.durationDays}-${t('tour.itinerary.dayItinerary')}`
                  : t('tour.itinerary.tourItinerary')}
              </h2>
              <div className="space-y-3">
                {STATIC_DETAIL_DEFAULTS.itinerary.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <button
                      onClick={() => setOpenItinerary(openItinerary === idx ? null : idx)}
                      className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-dark text-base">{item.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.stops.length} {item.stops.length === 1 ? t('tour.itinerary.stop') : t('tour.itinerary.stops')}
                          {item.meals.length > 0 && ` · ${item.meals.length} ${item.meals.length === 1 ? t('tour.itinerary.meal') : t('tour.itinerary.meals_plural')}`}
                          {item.accommodation && ` · ${t('tour.itinerary.overnight')}`}
                        </p>
                      </div>
                      {openItinerary === idx
                        ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      }
                    </button>

                    {openItinerary === idx && (
                      <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {item.stops.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t('tour.itinerary.stops')}</p>
                              <ul className="space-y-1.5">
                                {item.stops.map((stop) => (
                                  <li key={stop} className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                                    {stop}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {(item.meals.length > 0 || item.accommodation) && (
                            <div>
                              {item.meals.length > 0 && (
                                <>
                                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t('tour.itinerary.meals')}</p>
                                  <ul className="space-y-1 mb-3">
                                    {item.meals.map((m) => (
                                      <li key={m} className="text-sm text-gray-600 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />
                                        {m}
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              )}
                              {item.accommodation && (
                                <>
                                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{t('tour.itinerary.accommodation')}</p>
                                  <p className="text-sm text-gray-600">{item.accommodation}</p>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section id="tab-included" aria-label="What's Included">
              <h2 className="text-2xl font-serif font-bold text-dark mb-6">{t('tour.included.title')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-dark">{t('tour.included.included')}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {STATIC_DETAIL_DEFAULTS.included.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                      <XCircle className="w-4 h-4 text-red-500" />
                    </div>
                    <h3 className="font-semibold text-dark">{t('tour.included.notIncluded')}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {STATIC_DETAIL_DEFAULTS.excluded.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section id="tab-reviews" aria-label="Reviews">
              <h2 className="text-2xl font-serif font-bold text-dark mb-6">{t('tour.reviewsSection.title')}</h2>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="text-center">
                    <div className="text-5xl font-serif font-bold text-dark mb-1">{tour.rating}</div>
                    <div className="flex items-center justify-center gap-0.5 mb-1">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} className={`w-4 h-4 ${i <= Math.round(tour.rating) ? 'text-gold-400 fill-gold-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm">{tour.reviewCount} {t('tour.reviews')}</p>
                  </div>
                  <div className="flex-1 min-w-[140px] space-y-2">
                    {[5,4,3,2,1].map((star) => {
                      const pct = star === 5 ? 78 : star === 4 ? 16 : star === 3 ? 4 : star === 2 ? 1 : 1;
                      return (
                        <div key={star} className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="w-2">{star}</span>
                          <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gold-400 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="w-6 text-right">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="text-center py-8 text-gray-400 text-sm bg-white rounded-2xl border border-gray-100">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-200" />
                {t('tour.reviewsSection.verifiedNote')}
              </div>
            </section>

            <section id="tab-faq" aria-label="FAQ">
              <h2 className="text-2xl font-serif font-bold text-dark mb-6">{t('tour.faqSection.title')}</h2>
              <div className="space-y-3">
                {STATIC_DETAIL_DEFAULTS.faq.map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-dark text-sm">{item.question}</span>
                      {openFaq === i
                        ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      }
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                        <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
        </div>
      </div>
    </div>
  );
}
