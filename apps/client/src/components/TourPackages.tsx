import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, MapPin, Star, ArrowRight, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useGetPublishedTours } from '@/generated';
import { useTranslation } from '@/providers/TranslationProvider';

const categoryColors: Record<string, string> = {
  group: 'bg-brand-100 text-brand-600',
  private: 'bg-gold-100 text-gold-700',
  package: 'bg-emerald-100 text-emerald-700',
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function TourPackages() {
  const { t } = useTranslation();
  const { data: tours } = useGetPublishedTours();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10%' });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
  };

  return (
    <section
      id="packages"
      className="py-24 bg-dark overflow-hidden"
      aria-labelledby="packages-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/10 text-gold-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                {t('home.tourPackages.badge')}
              </motion.div>
              <motion.h2
                id="packages-heading"
                variants={itemVariants}
                className="text-4xl md:text-5xl font-serif font-bold text-white"
              >
                {t('home.tourPackages.title')}
                <span className="text-gradient-gold"> {t('home.tourPackages.titleHighlight')}</span>
              </motion.h2>
            </div>
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? 'border-white/20 text-white hover:bg-white/10'
                    : 'border-white/10 text-white/20 cursor-not-allowed'
                }`}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                  canScrollRight
                    ? 'border-white/20 text-white hover:bg-white/10'
                    : 'border-white/10 text-white/20 cursor-not-allowed'
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>

          <motion.div
            ref={scrollRef}
            onScroll={updateScrollButtons}
            variants={itemVariants}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          >
            {(tours ?? []).map((tour) => (
              <motion.article
                key={tour.id}
                whileHover="hover"
                className="flex-none w-80 bg-white/5 border border-white/10 rounded-3xl overflow-hidden group"
              >
                <motion.div
                  variants={{ hover: { y: -4, backgroundColor: 'rgba(255,255,255,0.08)' } }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={tour.image ?? ''}
                      alt={tour.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      variants={{ hover: { scale: 1.1 } }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[tour.category]}`}>
                        {t(`home.tourPackages.categories.${tour.category}`)}
                      </span>
                      {tour.badge && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold-500 text-white">
                          {tour.badge}
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-dark/70 backdrop-blur-sm rounded-full px-2.5 py-1">
                      <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                      <span className="text-white text-xs font-semibold">{tour.rating}</span>
                      <span className="text-white/50 text-xs">({tour.reviewCount})</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif font-bold text-white text-lg mb-3 leading-tight group-hover:text-gold-200 transition-colors line-clamp-2">
                      {tour.title}
                    </h3>

                    <div className="flex items-center gap-4 mb-4 text-sm text-white/50">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {tour.duration}
                      </span>
                      {tour.startingPoint && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {tour.startingPoint}
                        </span>
                      )}
                    </div>

                    <ul className="space-y-1.5 mb-5">
                      {tour.highlights.slice(0, 3).map((h) => (
                        <li key={h} className="flex items-center gap-2 text-xs text-white/60">
                          <CheckCircle className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        {tour.originalPrice && (
                          <span className="text-white/30 text-xs line-through block">{tour.originalPrice.toLocaleString()}</span>
                        )}
                        <span className="text-white/40 text-xs">{t('home.tourPackages.from')}</span>
                        <div className="text-gold-400 font-bold text-xl font-serif">
                          {tour.price.toLocaleString()}
                        </div>
                        <span className="text-white/30 text-xs">{t('home.tourPackages.perPerson')}</span>
                      </div>
                      <Link
                        href={`/tours/${tour.slug}`}
                        className="flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-semibold text-sm px-4 py-2.5 rounded-full transition-colors hover:shadow-lg hover:shadow-brand-500/30"
                      >
                        {t('home.tourPackages.bookNow')}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
