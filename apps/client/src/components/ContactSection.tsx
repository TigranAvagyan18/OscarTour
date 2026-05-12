import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/providers/TranslationProvider';
import { Button } from '@/components/ui/button';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const rightVariants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, delay: 0.1, ease: 'easeOut' } },
};

export default function ContactSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10%' });
  const [form, setForm] = useState({ name: '', email: '', message: '', interest: 'group' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const contactItems = [
    { icon: Phone, label: t('home.contact.call'), value: '+374 55 077 010', sub: t('home.contact.callSub') },
    { icon: Mail, label: t('home.contact.email'), value: 'oscartour.am@gmail.com', sub: t('home.contact.emailSub') },
    { icon: MessageCircle, label: t('home.contact.whatsapp'), value: '+374 55 077 010', sub: t('home.contact.whatsappSub') },
  ];

  return (
    <section
      id="contact"
      className="py-24 bg-white overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={sectionRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={containerVariants}>
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-gold-50 text-gold-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              {t('home.contact.badge')}
            </motion.div>
            <motion.h2
              id="contact-heading"
              variants={itemVariants}
              className="text-4xl md:text-5xl font-serif font-bold text-dark mb-6 leading-tight"
            >
              {t('home.contact.title')}
              <br />
              <span className="text-gradient">{t('home.contact.titleHighlight')}</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-500 leading-relaxed mb-10 max-w-md">
              {t('home.contact.subtitle')}
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-4 mb-10">
              {contactItems.map(({ icon: Icon, label, value, sub }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 4, borderColor: '#bfdbfe' }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-cream border border-gray-100 hover:shadow-sm"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-brand-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
                    <p className="text-dark font-semibold text-sm">{value}</p>
                    <p className="text-gray-400 text-xs">{sub}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="p-6 rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
              <p className="font-serif font-bold text-lg mb-2">{t('home.contact.consultTitle')}</p>
              <p className="text-white/70 text-sm mb-4">
                {t('home.contact.consultDesc')}
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2 bg-white text-brand-600 font-semibold text-sm px-5 py-2.5 rounded-full hover:shadow-lg"
              >
                {t('home.contact.consultCta')}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div variants={rightVariants}>
            <div className="bg-cream rounded-3xl p-8 border border-gray-100">
              <h3 className="font-serif font-bold text-dark text-xl mb-2">{t('home.contact.formTitle')}</h3>
              <p className="text-gray-400 text-sm mb-6">{t('home.contact.formSubtitle')}</p>

              {sent ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-7 h-7 text-brand-500" />
                  </div>
                  <h4 className="font-serif font-bold text-dark text-xl mb-2">{t('home.contact.successTitle')}</h4>
                  <p className="text-gray-400 text-sm">
                    {t('home.contact.successDesc')}
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-brand-500 text-sm font-medium hover:text-brand-600 underline underline-offset-2"
                  >
                    {t('home.contact.sendAnother')}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">{t('home.contact.fields.name')}</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder={t('home.contact.fields.namePlaceholder')}
                        required
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-dark placeholder-gray-300
                                   focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">{t('home.contact.fields.email')}</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={t('home.contact.fields.emailPlaceholder')}
                        required
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-dark placeholder-gray-300
                                   focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="interest" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">{t('home.contact.fields.interest')}</label>
                    <select
                      id="interest"
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-dark
                                 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 transition-all appearance-none"
                    >
                      <option value="group">{t('home.contact.interests.group')}</option>
                      <option value="private">{t('home.contact.interests.private')}</option>
                      <option value="package">{t('home.contact.interests.package')}</option>
                      <option value="custom">{t('home.contact.interests.custom')}</option>
                      <option value="other">{t('home.contact.interests.other')}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">{t('home.contact.fields.message')}</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t('home.contact.fields.messagePlaceholder')}
                      required
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-dark placeholder-gray-300
                                 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 transition-all resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="pill"
                    className="w-full justify-center py-4 text-base"
                  >
                    {t('home.contact.send')}
                    <Send className="w-4 h-4" />
                  </Button>

                  <p className="text-xs text-gray-400 text-center">
                    {t('home.contact.privacy')}{' '}
                    <a href="#" className="text-brand-500 hover:underline">{t('home.contact.privacyLink')}</a>.
                    {' '}{t('home.contact.privacyEnd')}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
