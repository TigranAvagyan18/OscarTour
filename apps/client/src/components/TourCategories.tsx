import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, User, Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/providers/TranslationProvider';
import { translations } from '@/i18n';

const categoryImages = [
  'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/4609034/pexels-photo-4609034.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=600',
];

const categoryIcons = [Users, User, Package];
const categoryColors = ['brand', 'gold', 'brand'];
const categoryKeys = ['group', 'private', 'package'] as const;
const disabledKeys = new Set(['group', 'package']);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function TourCategories() {
  const { t, language } = useTranslation();
  const tourCategoriesData = ((translations[language] || translations.en) as any)?.home?.tourCategories;
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10%' });


  return (
    <section
      id="tours"
      className="py-24 bg-cream"
      aria-labelledby="tours-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="text-center mb-16">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-brand-50 text-brand-500 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              {t('home.tourCategories.badge')}
            </motion.div>
            <motion.h2
              id="tours-heading"
              variants={itemVariants}
              className="text-4xl md:text-5xl font-serif font-bold text-dark mb-4"
            >
              {t('home.tourCategories.title')}
              <span className="text-gradient"> {t('home.tourCategories.titleHighlight')}</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {t('home.tourCategories.subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categoryKeys.map((key, index) => {
              const Icon = categoryIcons[index];
              const color = categoryColors[index];
              const features: string[] = tourCategoriesData?.[key]?.features ?? [];
              const isDisabled = disabledKeys.has(key);
              return (
                <motion.article
                  key={key}
                  variants={cardVariants}
                  whileHover={isDisabled ? undefined : 'hover'}
                  role="button"
                  tabIndex={isDisabled ? -1 : 0}
                  aria-label={`Explore ${t(`home.tourCategories.${key}.title`)}`}
                  aria-disabled={isDisabled}
                  className={`group relative rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100 ${
                    isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  style={{ transformOrigin: 'center bottom' }}
                  animate={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
                  transition={{ duration: 0.3 }}
                  custom={index}
                >
                  <motion.div
                    variants={isDisabled ? undefined : { hover: { y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' } }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="h-full"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={categoryImages[index]}
                        alt={t(`home.tourCategories.${key}.title`)}
                        className={`w-full h-full object-cover ${isDisabled ? 'grayscale opacity-60' : ''}`}
                        loading="lazy"
                        variants={isDisabled ? undefined : { hover: { scale: 1.1 } }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                      <div className={`absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center ${
                        isDisabled ? 'bg-gray-400' : color === 'gold' ? 'bg-gold-500' : 'bg-brand-500'
                      }`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      {isDisabled && (
                        <div className="absolute top-4 right-4 bg-gray-800/80 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                          Coming Soon
                        </div>
                      )}
                    </div>

                    <div className={`p-6 ${isDisabled ? 'opacity-50' : ''}`}>
                      <h3 className="text-xl font-serif font-bold text-dark mb-3 group-hover:text-brand-600 transition-colors">
                        {t(`home.tourCategories.${key}.title`)}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-5">
                        {t(`home.tourCategories.${key}.description`)}
                      </p>

                      <ul className="space-y-2 mb-6">
                        {features.map((feat) => (
                          <li key={feat} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              color === 'gold' ? 'bg-gold-500' : 'bg-brand-400'
                            }`} />
                            {feat}
                          </li>
                        ))}
                      </ul>

                      {!isDisabled && (
                        <Link href="/tours">
                          <motion.span
                            className={`flex items-center gap-2 font-semibold text-sm ${
                              color === 'gold' ? 'text-gold-600 hover:text-gold-700' : 'text-brand-500 hover:text-brand-600'
                            }`}
                            whileHover="btnHover"
                          >
                            {t('home.tourCategories.cta')}
                            <motion.span
                              variants={{ btnHover: { x: 4 } }}
                              transition={{ duration: 0.2 }}
                            >
                              <ArrowRight className="w-4 h-4" />
                            </motion.span>
                          </motion.span>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
