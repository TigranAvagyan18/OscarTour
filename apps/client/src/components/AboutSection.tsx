import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { Award, Shield, Heart, CheckCircle } from 'lucide-react';
import { stats } from '../data/mockData';
import { useTranslation } from '@/providers/TranslationProvider';
import { translations } from '@/i18n';

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    return count.on('change', (v) => setDisplay(Math.round(v)));
  }, [count]);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, target, { duration: 2, ease: [0, 0.71, 0.2, 1.01] });
      return controls.stop;
    }
  }, [inView, target, count]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}{suffix}
    </span>
  );
}

const valueIcons = [Shield, Award, Heart, CheckCircle];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const leftVariants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

export default function AboutSection() {
  const { t, language } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10%' });

  const values: string[] = ((translations[language] || translations.en) as any)?.home?.about?.values ?? [];

  const statLabels = [
    t('home.about.stats.experience'),
    t('home.about.stats.travelers'),
    t('home.about.stats.packages'),
    t('home.about.stats.guides'),
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section
      id="about"
      className="py-24 bg-white overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={sectionRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="relative">
            <motion.div
              variants={leftVariants}
              className="relative z-10 rounded-3xl overflow-hidden aspect-[4/5] max-w-md"
            >
              <img
                src="/assets/ararat.webp"
                alt="Geghard Monastery"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, x: -48 }, visible: { opacity: 1, x: 0, transition: { duration: 0.65, delay: 0.2, ease: 'easeOut' } } }}
              className="absolute -bottom-6 -right-6 lg:right-0 z-20 bg-white rounded-2xl shadow-xl p-5 max-w-xs border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-dark">{t('home.about.topRated')}</p>
                  <p className="text-xs text-gray-400">{t('home.about.topRatedYears')}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-4 h-4 text-gold-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-gray-500 ml-1">{t('home.about.topRatedReviews')}</span>
              </div>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, x: -48 }, visible: { opacity: 1, x: 0, transition: { duration: 0.65, delay: 0.1, ease: 'easeOut' } } }}
              className="absolute -top-4 -right-4 lg:right-2 z-10 w-40 h-40 rounded-3xl overflow-hidden border-4 border-white shadow-lg"
            >
              <img
                src="/assets/jermuk.webp"
                alt="Jermuk"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>

          <div>
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-brand-50 text-brand-500 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              {t('home.about.badge')}
            </motion.div>

            <motion.h2
              id="about-heading"
              variants={itemVariants}
              className="text-4xl md:text-5xl font-serif font-bold text-dark leading-tight mb-6"
            >
              {t('home.about.title')}
              <br />
              <span className="text-gradient">{t('home.about.titleHighlight')}</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-gray-500 leading-relaxed mb-5">
              {t('home.about.para1')}
            </motion.p>

            <motion.p variants={itemVariants} className="text-gray-500 leading-relaxed mb-8">
              {t('home.about.para2')}
            </motion.p>

            <motion.ul variants={itemVariants} className="space-y-3 mb-10">
              {values.map((text, i) => {
                const Icon = valueIcons[i] ?? CheckCircle;
                return (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-brand-500" />
                    </div>
                    <span className="text-sm font-medium">{text}</span>
                  </li>
                );
              })}
            </motion.ul>

            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div key={stat.label} className="text-center p-4 rounded-2xl bg-cream border border-gray-100">
                  <div className="text-2xl font-serif font-bold text-brand-500 mb-1">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-gray-400 leading-tight">{statLabels[i]}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
