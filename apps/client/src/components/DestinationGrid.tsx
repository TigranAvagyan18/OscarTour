import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Compass, ArrowRight } from 'lucide-react';
import { destinations } from '../data/mockData';
import { useTranslation } from '@/providers/TranslationProvider';
import { Button } from '@/components/ui/button';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function DestinationGrid() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-5%' });

  return (
    <section
      id="destinations"
      className="py-24 bg-cream"
      aria-labelledby="destinations-heading"
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
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-brand-50 text-brand-500 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                {t('home.destinations.badge')}
              </motion.div>
              <motion.h2
                id="destinations-heading"
                variants={itemVariants}
                className="text-4xl md:text-5xl font-serif font-bold text-dark"
              >
                {t('home.destinations.title')}
                <span className="text-gradient"> {t('home.destinations.titleHighlight')}</span>
              </motion.h2>
            </div>
            <motion.p variants={itemVariants} className="text-gray-500 max-w-sm leading-relaxed md:text-right">
              {t('home.destinations.subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {destinations.slice(0, 3).map((dest, i) => (
              <motion.article
                key={dest.id}
                variants={itemVariants}
                whileHover="hover"
                className={`group relative overflow-hidden rounded-3xl cursor-pointer ${
                  i === 0 ? 'md:col-span-7 h-80 md:h-96' : 'md:col-span-5 h-72'
                }`}
                role="button"
                tabIndex={0}
                aria-label={`Explore ${dest.name}`}
              >
                <motion.img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  variants={{ hover: { scale: 1.08 } }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                <motion.div
                  className="absolute inset-0 bg-brand-900/0"
                  variants={{ hover: { backgroundColor: 'rgba(30,27,75,0.2)' } }}
                  transition={{ duration: 0.5 }}
                />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-gold-400" />
                    <span className="text-gold-300 text-xs font-medium">{dest.region}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-1 group-hover:text-gold-200 transition-colors">
                    {dest.name}
                  </h3>
                  <motion.p
                    className="text-white/70 text-sm line-clamp-2 mb-3 max-w-sm"
                    initial={{ opacity: 0, y: 8 }}
                    variants={{ hover: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.3 }}
                  >
                    {dest.description}
                  </motion.p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-xs text-white/60">
                      <Compass className="w-3.5 h-3.5" />
                      {dest.tours} {t('home.destinations.toursAvailable')}
                    </span>
                    <motion.span
                      className="inline-flex items-center gap-1 text-gold-300 text-xs font-semibold"
                      initial={{ opacity: 0 }}
                      variants={{ hover: { opacity: 1 } }}
                      transition={{ duration: 0.3 }}
                    >
                      {t('home.destinations.explore')} <ArrowRight className="w-3.5 h-3.5" />
                    </motion.span>
                  </div>
                </div>
              </motion.article>
            ))}

            {destinations.slice(3).map((dest) => (
              <motion.article
                key={dest.id}
                variants={itemVariants}
                whileHover="hover"
                className="group relative md:col-span-4 h-64 overflow-hidden rounded-3xl cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`Explore ${dest.name}`}
              >
                <motion.img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  variants={{ hover: { scale: 1.1 } }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3 h-3 text-gold-400" />
                    <span className="text-gold-300 text-xs">{dest.region}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-gold-200 transition-colors">
                    {dest.name}
                  </h3>
                  <span className="text-white/50 text-xs">{dest.tours} {t('home.destinations.toursAvailable')}</span>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center mt-10">
            <Button
              onClick={() => document.querySelector('#tours')?.scrollIntoView({ behavior: 'smooth' })}
              variant="primary"
              size="pill"
              className="text-sm"
            >
              {t('home.destinations.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
