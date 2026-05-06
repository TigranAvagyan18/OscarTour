import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { reviews } from '../data/mockData';
import { useTranslation } from '@/providers/TranslationProvider';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-gold-400 fill-gold-400' : 'text-gray-200'}`}
        />
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function Testimonials() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10%' });

  const statItems = [
    { val: '98%', label: t('home.testimonials.satisfaction') },
    { val: '95%', label: t('home.testimonials.recommend') },
    { val: '92%', label: t('home.testimonials.returnTravelers') },
  ];

  return (
    <section
      id="reviews"
      className="py-24 bg-white overflow-hidden"
      aria-labelledby="reviews-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="text-center mb-16">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-gold-50 text-gold-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              {t('home.testimonials.badge')}
            </motion.div>
            <motion.h2
              id="reviews-heading"
              variants={itemVariants}
              className="text-4xl md:text-5xl font-serif font-bold text-dark mb-4"
            >
              {t('home.testimonials.title')}
              <span className="text-gradient"> {t('home.testimonials.titleHighlight')}</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t('home.testimonials.subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review) => (
              <motion.article
                key={review.id}
                variants={itemVariants}
                whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(99,102,241,0.08)' }}
                transition={{ duration: 0.3 }}
                className="group relative bg-cream rounded-3xl p-8 border border-gray-100"
              >
                <motion.div
                  className="absolute top-6 right-6 text-brand-100"
                  whileHover={{ color: '#c7d2fe' }}
                  transition={{ duration: 0.2 }}
                >
                  <Quote className="w-10 h-10" />
                </motion.div>

                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 shadow-md"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="font-semibold text-dark text-base">{review.name}</h3>
                    <p className="text-gray-400 text-sm">{review.country}</p>
                    <div className="mt-1.5">
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                </div>

                <blockquote className="text-gray-600 leading-relaxed text-[0.95rem] mb-6">
                  "{review.text}"
                </blockquote>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <span className="text-xs text-gray-400">{t('home.testimonials.tour')}: </span>
                    <span className="text-xs font-medium text-brand-500">{review.tourTitle}</span>
                  </div>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-cream rounded-3xl px-8 py-6 border border-gray-100">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1 mb-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <p className="font-serif font-bold text-dark text-2xl">4.98 / 5</p>
                <p className="text-gray-400 text-sm">{t('home.testimonials.averageRating')}</p>
              </div>
              <div className="hidden sm:block w-px h-14 bg-gray-200" />
              <div className="flex gap-6 text-center">
                {statItems.map(({ val, label }) => (
                  <div key={label}>
                    <p className="font-serif font-bold text-dark text-xl">{val}</p>
                    <p className="text-gray-400 text-xs">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
