import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, Clock, MapPin, Star, ArrowRight, Users, Filter, X, Calendar, Sparkles
} from 'lucide-react';
import { useGetPublishedTours } from '@/generated/index';
import { useTranslation } from '@/providers/TranslationProvider';
import { groupTours } from '@/data/groupToursData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type TourCategory = 'group' | 'private' | 'package';

// Fields not present in scraped data — same value for all tours
const STATIC_TOUR_DEFAULTS = {
  region: 'Armenia',
  tags: [] as string[],
  departures: [] as { days: string; times: string[] }[],
  originalPrice: null as number | null,
  maxGroupSize: 10,
};

const difficultyColors: Record<string, string> = {
  easy:        'bg-emerald-100 text-emerald-700',
  moderate:    'bg-amber-100 text-amber-700',
  challenging: 'bg-red-100 text-red-700',
};

const categoryColors: Record<string, string> = {
  group:   'bg-brand-100 text-brand-700',
  private: 'bg-gold-100 text-gold-700',
  package: 'bg-emerald-100 text-emerald-700',
};

export default function ToursPage() {
  const { t, language } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<TourCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');
  const [maxPrice, setMaxPrice] = useState(500000);
  const [showFilters, setShowFilters] = useState(false);

  const { data: toursData = [] } = useGetPublishedTours();

  const lang = (language === 'en' || language === 'ru' || language === 'hy') ? language : 'en';

  const allTours = useMemo(() => {
    const mockGroupTours = groupTours.map((gt) => ({
      id: gt.id,
      slug: gt.slug,
      title: gt[lang].title,
      description: { en: gt.en.shortDescription, ru: gt.ru.shortDescription, hy: gt.hy.shortDescription },
      category: gt.category as TourCategory,
      duration: gt.duration,
      durationHours: gt.durationHours,
      price: gt.price,
      image: gt.image,
      gallery: gt.gallery,
      rating: gt.rating,
      reviewCount: gt.reviewCount,
      badge: gt.badge ?? null,
      difficulty: 'easy' as const,
    }));
    return [...toursData, ...mockGroupTours];
  }, [toursData, lang]);

  const categoryTabs: { value: TourCategory | 'all'; label: string; disabled?: boolean }[] = [
    { value: 'all',     label: t('tours.tabs.all') },
    { value: 'group',   label: t('tours.tabs.group') },
    { value: 'private', label: t('tours.tabs.private') },
    { value: 'package', label: t('tours.tabs.package'), disabled: true },
  ];

  const sortOptions = [
    { value: 'popular',    label: t('tours.sort.popular') },
    { value: 'price-asc',  label: t('tours.sort.priceAsc') },
    { value: 'price-desc', label: t('tours.sort.priceDesc') },
    { value: 'rating',     label: t('tours.sort.rating') },
    { value: 'duration',   label: t('tours.sort.duration') },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filtered = useMemo(() => {
    let list = allTours.filter((tour) => {
      const matchesCategory = activeCategory === 'all' || tour.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        STATIC_TOUR_DEFAULTS.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        STATIC_TOUR_DEFAULTS.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesPrice = tour.price <= maxPrice;
      return matchesCategory && matchesSearch && matchesPrice;
    });

    switch (sortBy) {
      case 'price-asc':  list = [...list].sort((a, b) => a.price - b.price); break;
      case 'price-desc': list = [...list].sort((a, b) => b.price - a.price); break;
      case 'rating':     list = [...list].sort((a, b) => b.rating - a.rating); break;
      case 'duration':   list = [...list].sort((a, b) => (a.durationHours ?? (a.durationDays ?? 0) * 24) - (b.durationHours ?? (b.durationDays ?? 0) * 24)); break;
      default:           list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return list;
  }, [allTours, activeCategory, searchQuery, sortBy, maxPrice]);

  return (
    <div className="min-h-screen bg-cream">
      <section
        className="relative pt-20 py-10 md:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #081622 0%, #0B4F6C 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 to-dark/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-gold-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
            <Sparkles className="w-4 h-4" />
            {t('tours.badge')}
          </div>
          <h1 className="hidden md:block text-5xl md:text-6xl font-serif font-bold text-white mb-5 leading-tight">
            {t('tours.title')} <span className="text-gradient-gold">{t('tours.titleHighlight')}</span>
          </h1>
          <p className="hidden md:block text-white/60 text-lg max-w-2xl mx-auto mb-10">
            {t('tours.subtitle')}
          </p>

          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder={t('tours.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pl-12 pr-4 py-4
                         text-white placeholder-white/40 text-sm focus:outline-none focus:border-gold-400 focus:bg-white/15 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="sticky top-16 md:top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
            {categoryTabs.map((tab) => (
              <div key={tab.value} className="relative flex-none">
                <button
                  onClick={tab.disabled ? undefined : () => setActiveCategory(tab.value)}
                  disabled={tab.disabled}
                  className={`px-5 py-3 text-sm font-semibold rounded-xl whitespace-nowrap transition-all duration-200 ${
                    tab.disabled
                      ? 'text-gray-300 cursor-not-allowed'
                      : activeCategory === tab.value
                        ? 'bg-brand-500 text-white shadow-sm'
                        : 'text-gray-500 hover:text-dark hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                  {tab.disabled && (
                    <span className="ml-2 text-[10px] font-semibold bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full align-middle">
                      Soon
                    </span>
                  )}
                </button>
              </div>
            ))}
            <div className="flex-1" />
            <div className="flex items-center gap-2 flex-none">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-all ${
                  showFilters ? 'bg-brand-50 border-brand-200 text-brand-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                <Filter className="w-4 h-4" />
                {t('tours.filters')}
              </button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[170px] px-4 py-2.5 text-sm font-medium text-gray-500 border-gray-200 rounded-xl hover:border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {showFilters && (
            <div className="py-4 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-semibold text-gray-600 whitespace-nowrap">
                    {t('tours.maxPrice')}: <span className="text-brand-500">{maxPrice.toLocaleString()} AMD</span>
                  </label>
                  <input
                    type="range"
                    min={10000}
                    max={500000}
                    step={5000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-40 accent-brand-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-400 text-sm">
            {t('tours.showing')} <span className="font-semibold text-dark">{filtered.length}</span> {t('tours.toursIn')}
            {activeCategory !== 'all' && (
              <span> {t('tours.in')} <span className="font-semibold text-brand-500 capitalize">{activeCategory}</span></span>
            )}
          </p>
          {(searchQuery || activeCategory !== 'all') && (
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-dark transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              {t('tours.clearFilters')}
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-gray-300" />
            </div>
            <h3 className="font-serif font-bold text-dark text-xl mb-2">{t('tours.noResults')}</h3>
            <p className="text-gray-400 text-sm">{t('tours.noResultsSub')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((tour) => (
              <Link key={tour.id} href={`/tours/${tour.slug}`} className="group block bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 hover:-translate-y-1.5">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={tour.image ?? ''}
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent" />

                  <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${categoryColors[tour.category]}`}>
                      {t(`tourDetail.categories.${tour.category}`)}
                    </span>
                    {tour.badge && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gold-500 text-white">
                        {tour.badge}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div className="flex items-center gap-1.5 bg-dark/60 backdrop-blur-sm rounded-full px-2.5 py-1">
                      <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                      <span className="text-white text-xs font-semibold">{tour.rating}</span>
                      <span className="text-white/50 text-xs">({tour.reviewCount})</span>
                    </div>
                    <div className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${difficultyColors[tour.difficulty]}`}>
                      {t(`toursPage.difficulty.${tour.difficulty}`)}
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="font-serif font-bold text-dark text-lg leading-snug mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
                    {tour.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {tour.description[language]}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <MapPin className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                      <span>{STATIC_TOUR_DEFAULTS.region}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Users className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                      <span>{t('tours.maxPeople')} {STATIC_TOUR_DEFAULTS.maxGroupSize} {t('tours.people')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                      <span>{STATIC_TOUR_DEFAULTS.departures[0]?.days}</span>
                    </div>
                  </div>

                  {STATIC_TOUR_DEFAULTS.departures[0]?.times && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs text-gray-400 font-medium">{t('tours.departures')}:</span>
                      <div className="flex gap-1.5 flex-wrap">
                        {STATIC_TOUR_DEFAULTS.departures[0].times.map((time) => (
                          <span key={time} className="px-2 py-0.5 bg-brand-50 text-brand-600 text-xs font-semibold rounded-full">
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      {STATIC_TOUR_DEFAULTS.originalPrice && (
                        <span className="text-xs text-gray-400 line-through block">{STATIC_TOUR_DEFAULTS.originalPrice} AMD</span>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-gold-600 font-bold text-xl font-serif">{tour.price.toLocaleString()}</span>
                        <span className="text-gray-400 text-xs hidden sm:inline-block">AMD / {t('tours.perPerson')}</span>
                      </div>
                    </div>
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm px-4 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/25"
                    >
                      {t('tours.viewTour')}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
