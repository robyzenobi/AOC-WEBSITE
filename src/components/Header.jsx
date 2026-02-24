import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Globe, Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
  const { t, language, toggleLanguage } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full flex items-center z-50 bg-white border-b border-border transition-all duration-300 ${isScrolled ? 'h-[70px] shadow-sm' : 'h-[80px]'}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 w-full flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="AOC TZ Logo" className="h-16 md:h-20 w-auto object-contain" />
        </Link>

        <nav className={`max-lg:fixed max-lg:top-0 max-lg:h-screen max-lg:w-4/5 max-lg:bg-white max-lg:flex-col max-lg:justify-center max-lg:p-8 max-lg:transition-all max-lg:duration-400 max-lg:shadow-[-10px_0_30px_rgba(0,0,0,0.1)] lg:flex lg:gap-8 lg:items-center ${isMobileMenuOpen ? 'max-lg:right-0 max-lg:flex' : 'max-lg:-right-full max-lg:hidden'}`}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-[0.95rem] text-text hover:text-primary transition-all duration-300 max-lg:my-3">{t('nav.home')}</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-[0.95rem] text-text hover:text-primary transition-all duration-300 max-lg:my-3">{t('nav.about')}</Link>
          <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-[0.95rem] text-text hover:text-primary transition-all duration-300 max-lg:my-3">{t('nav.services')}</Link>
          <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-[0.95rem] text-text hover:text-primary transition-all duration-300 max-lg:my-3">{t('nav.blog')}</Link>
          <button className="inline-flex whitespace-nowrap shrink-0 items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-primary text-white hover:bg-primary-light hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 max-lg:mt-6">
            {t('nav.quote')} <ArrowRight size={18} />
          </button>
        </nav>

        <div className="flex items-center gap-5">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface text-primary font-semibold text-sm transition-all duration-300" onClick={toggleLanguage}>
            <Globe size={20} />
            <span>{language.toUpperCase()}</span>
          </button>
          <button className="lg:hidden bg-transparent text-primary transition-all duration-300" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
