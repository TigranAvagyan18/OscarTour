import { Map, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter, Send } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/providers/TranslationProvider';

const socials = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
];

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const quickLinks = [
    { key: 'home', href: '#home' },
    { key: 'groupTours', href: '#tours' },
    { key: 'privateTours', href: '#tours' },
    { key: 'destinations', href: '#destinations' },
    { key: 'aboutUs', href: '#about' },
    { key: 'blog', href: '#blog' },
  ] as const;

  const supportLinks = [
    { key: 'faq', href: '#' },
    { key: 'bookingPolicy', href: '#' },
    { key: 'cancellation', href: '#' },
    { key: 'privacyPolicy', href: '#' },
    { key: 'terms', href: '#' },
    { key: 'accessibility', href: '#' },
  ] as const;

  const scrollTo = (href: string) => {
    if (href === '#') return;
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="footer" className="bg-dark text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }} className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-lg bg-gold-500 flex items-center justify-center">
                <Map className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-white font-serif font-bold text-xl">
                Oscar<span className="text-gold-400">Tour</span>
              </span>
            </a>

            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              {t('common.footer.description')}
            </p>

            <address className="not-italic space-y-3 mb-8">
              {[
                { icon: Phone, text: '+374 55 077 010' },
                { icon: Mail, text: 'oscartour.am@gmail.com' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 text-sm text-white/50 hover:text-white/80 transition-colors">
                  <Icon className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span>{text}</span>
                </div>
              ))}
            </address>

            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 hover:border-white/20 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-serif font-semibold text-white text-base mb-5">{t('common.footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="text-sm text-white/50 hover:text-gold-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-gold-400 transition-colors" />
                    {t(`common.footer.links.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-serif font-semibold text-white text-base mb-5">{t('common.footer.support')}</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-gold-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-gold-400 transition-colors" />
                    {t(`common.footer.supportLinks.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div>
              <p className="text-white/40 text-xs mb-3 uppercase tracking-wider">{t('common.footer.paymentMethods')}</p>
              <div className="flex items-center gap-3 flex-wrap">
              <div className="mt-4 flex flex-wrap gap-2">
              {["mastercard", "visa", "amex", "mir"].map((method) => (
                <img
                  key={method}
                  src={`/pay-methods/${method}.svg`}
                  alt={method}
                  width={42}
                  height={30}
                  className="h-[30px] w-[42px] object-contain"
                />
              ))}
            </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} {t('common.footer.copyright')}
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms', 'FAQ'].map((item) => (
              <a key={item} href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
