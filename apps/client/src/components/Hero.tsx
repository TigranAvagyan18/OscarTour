import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, MapPin, Calendar, Users, ChevronDown } from 'lucide-react';
import { useTranslation } from '@/providers/TranslationProvider';
import { translations } from '@/i18n';
import { Button } from '@/components/ui/button';

const slideImages = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Garni_Temple_at_Sunset%2C_Armenia.jpg/1920px-Garni_Temple_at_Sunset%2C_Armenia.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/a/ab/-2025.05_Татевский_монастырь_7.jpg',
  'https://pohcdn.com/sites/default/files/styles/paragraph__hero_banner__hb_image__2350bp/public/hero_banner/grand-cascade-yerevan_optimized.jpg',
];

const enterVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: 'easeOut' },
  }),
};

export default function Hero() {
  const { t, language } = useTranslation();
  const [current, setCurrent] = useState(0);

  const slides: { tagline: string; subline: string; location: string }[] =
    ((translations[language] || translations.en) as any)?.home?.hero?.slides ?? [];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTours = () => {
    document.querySelector('#tours')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { icon: MapPin, label: t('home.hero.stats.tours'), sub: t('home.hero.stats.toursSub') },
    { icon: Users, label: t('home.hero.stats.guests'), sub: t('home.hero.stats.guestsSub') },
    { icon: Calendar, label: t('home.hero.stats.years'), sub: t('home.hero.stats.yearsSub') },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {slideImages.map((img, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          aria-hidden={i !== current}
        >
          <img
            src={img}
            alt={slides[i]?.location ?? ''}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/85 via-dark/55 to-dark/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-3xl">
          <motion.div
            className="flex items-center gap-2 mb-6"
            variants={enterVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <MapPin className="w-4 h-4 text-gold-400" />
            <span className="text-gold-300 text-sm font-medium tracking-widest uppercase">
              {slides[current]?.location}
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.05] mb-6"
            variants={enterVariants}
            initial="hidden"
            animate="visible"
            custom={0.1}
          >
            {slides[current]?.tagline}
            <br />
            <span className="text-gradient-gold">{slides[current]?.subline}</span>
          </motion.h1>

          <motion.p
            className="text-lg text-white/75 leading-relaxed mb-10 max-w-xl"
            variants={enterVariants}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            {t('home.hero.description')}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 mb-16"
            variants={enterVariants}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            <Button onClick={scrollToTours} variant="gold" size="pill" className="text-base px-8 py-4">
              {t('home.hero.findTours')}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button onClick={scrollToContact} variant="outlineWhite" size="pill" className="text-base px-8 py-4">
              <Play className="w-4 h-4" />
              {t('home.hero.contactUs')}
            </Button>
          </motion.div>

          <motion.div
            className="hidden md:grid grid-cols-3 gap-6 max-w-sm"
            variants={enterVariants}
            initial="hidden"
            animate="visible"
            custom={0.5}
          >
            {stats.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center p-3 rounded-xl bg-white/8 backdrop-blur-sm border border-white/10">
                <Icon className="w-5 h-5 text-gold-400 mb-1.5" />
                <span className="text-white font-semibold text-sm">{label}</span>
                <span className="text-white/50 text-xs">{sub}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-10 flex gap-2">
        {slideImages.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrent(i)}
            animate={{ width: i === current ? 24 : 10 }}
            transition={{ duration: 0.3 }}
            className={`h-2.5 rounded-full ${i === current ? 'bg-gold-400' : 'bg-white/40 hover:bg-white/70'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <motion.button
        onClick={scrollToTours}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/50 hover:text-white/90 transition-colors"
        aria-label="Scroll to tours"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="text-xs tracking-widest uppercase font-medium">{t('home.hero.explore')}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
