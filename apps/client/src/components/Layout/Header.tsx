import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Map } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from '@/providers/TranslationProvider';
import { Language, languages } from '@/i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { t, language, changeLanguage } = useTranslation();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeLang = languages.find((l) => l.code === language) || languages[0];
  const isHomePage = router.pathname === '/';

  const navLinks = [
    { label: t('common.nav.home'),         href: '#home',         section: true },
    { label: t('common.nav.tours'),        href: '/tours',        section: false },
    { label: t('common.nav.destinations'), href: '#destinations', section: true },
    { label: t('common.nav.about'),        href: '#about',        section: true },
    { label: t('common.nav.contact'),      href: '#contact',      section: true },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  const isTransparent = isHomePage && !scrolled;

  const handleNavClick = (link: typeof navLinks[0], e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    if (!link.section) {
      router.push(link.href);
      return;
    }
    if (!isHomePage) {
      router.push('/' + link.href);
      return;
    }
    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHomePage) {
      document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  const handleLangChange = (lang: typeof languages[0]) => {
    changeLanguage(lang.code as Language);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-dark/95 backdrop-blur-md shadow-xl shadow-dark/20'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 group"
            aria-label="OscarTour Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Map className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-white font-serif font-bold text-xl tracking-tight">
              Oscar<span className="text-gold-400">Tour</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.section ? link.href : undefined}
                onClick={(e) => handleNavClick(link, e)}
                className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white rounded-lg
                           hover:bg-white/10 transition-all duration-200 relative group cursor-pointer"
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-px bg-gold-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white/80
                             hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  aria-label="Select language"
                >
                  <ReactCountryFlag
                    countryCode={activeLang.flag}
                    svg
                    style={{ width: '1.1em', height: '1.1em', borderRadius: '2px' }}
                    title={activeLang.nativeName}
                  />
                  <span>{activeLang.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 transition-transform" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden min-w-[160px] py-1 mt-2"
              >
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLangChange(lang)}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                      activeLang.code === lang.code
                        ? 'bg-brand-500 text-white focus:bg-brand-600 focus:text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white'
                    }`}
                  >
                    <ReactCountryFlag
                      countryCode={lang.flag}
                      svg
                      style={{ width: '1.2em', height: '1.2em', borderRadius: '2px' }}
                      title={lang.nativeName}
                    />
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
{/* 
            <Button asChild variant="gold" size="pill" className="text-sm px-5 py-2.5">
              <Link href="/tours">
                {t('common.nav.bookATour')}
              </Link>
            </Button> */}
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-dark/98 backdrop-blur-md border-t border-white/10">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.section ? link.href : undefined}
                onClick={(e) => handleNavClick(link, e)}
                className="flex items-center px-4 py-3 text-base font-medium text-white/80 hover:text-white
                           hover:bg-white/10 rounded-xl transition-all duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <div className="flex gap-2 flex-wrap px-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLangChange(lang)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                      activeLang.code === lang.code
                        ? 'bg-brand-500 text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <ReactCountryFlag
                      countryCode={lang.flag}
                      svg
                      style={{ width: '1.1em', height: '1.1em', borderRadius: '2px' }}
                      title={lang.nativeName}
                    />
                    {lang.name}
                  </button>
                ))}
              </div>
              {/* <Button asChild variant="gold" size="pill" className="text-center w-full justify-center mt-1">
                <Link href="/tours">
                  {t('common.nav.bookATour')}
                </Link>
              </Button> */}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
