import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, ArrowRight, User } from 'lucide-react';
import { blogPosts } from '../data/mockData';
import { useTranslation } from '@/providers/TranslationProvider';
import { Button } from '@/components/ui/button';

const categoryColors: Record<string, string> = {
  'Travel Tips':    'bg-brand-100 text-brand-700',
  'Destinations':   'bg-emerald-100 text-emerald-700',
  'Food & Culture': 'bg-gold-100 text-gold-700',
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function BlogPreview() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10%' });

  return (
    <section
      id="blog"
      className="py-24 bg-cream"
      aria-labelledby="blog-heading"
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
                {t('home.blog.badge')}
              </motion.div>
              <motion.h2
                id="blog-heading"
                variants={itemVariants}
                className="text-4xl md:text-5xl font-serif font-bold text-dark"
              >
                {t('home.blog.title')}
                <span className="text-gradient"> {t('home.blog.titleHighlight')}</span>
              </motion.h2>
            </div>
            <motion.button
              variants={itemVariants}
              whileHover="btnHover"
              className="hidden md:flex items-center gap-2 text-brand-500 font-semibold text-sm hover:text-brand-600 transition-colors group"
            >
              {t('home.blog.readAll')}
              <motion.span
                variants={{ btnHover: { x: 4 } }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                whileHover="hover"
                role="button"
                tabIndex={0}
                aria-label={`Read article: ${post.title}`}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 cursor-pointer"
              >
                <motion.div
                  variants={{ hover: { y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' } }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="h-full"
                >
                  <div className="relative h-52 overflow-hidden">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      variants={{ hover: { scale: 1.1 } }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[post.category] ?? 'bg-gray-100 text-gray-600'}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime} {t('home.blog.minRead')}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-dark text-lg leading-snug mb-3 group-hover:text-brand-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-5">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-400">{post.date}</span>
                      <motion.span
                        className="flex items-center gap-1 text-brand-500 font-semibold text-xs"
                        variants={{ hover: { gap: '0.5rem' } }}
                        transition={{ duration: 0.2 }}
                      >
                        {t('home.blog.readMore')}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-8 text-center md:hidden">
            <Button variant="primary" size="pill" className="text-sm">
              {t('home.blog.readAll')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
