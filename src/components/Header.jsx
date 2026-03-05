import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Globe, Menu, X, Phone, Home, Info, Briefcase, BookOpen, MessageCircle } from 'lucide-react';
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

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: t('nav.home'), icon: <Home size={20} /> },
    { to: '/about', label: t('nav.about'), icon: <Info size={20} /> },
    { to: '/services', label: t('nav.services'), icon: <Briefcase size={20} /> },
    { to: '/blog', label: t('nav.blog'), icon: <BookOpen size={20} /> },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full flex items-center z-50 bg-white border-b border-border transition-all duration-300 ${isScrolled ? 'h-[70px] shadow-sm' : 'h-[80px]'}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 w-full flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="AOC TZ Logo" fetchPriority="high" loading="eager" decoding="sync" className="h-16 md:h-20 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex lg:gap-8 lg:items-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-medium text-[0.95rem] text-text hover:text-primary transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+255740691481"
              className="inline-flex whitespace-nowrap shrink-0 items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-primary text-white hover:bg-primary-light hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            >
              <Phone size={18} /> +255 740 691 481
            </a>
          </nav>

          <div className="flex items-center gap-5">
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface text-primary font-semibold text-sm transition-all duration-300"
              onClick={toggleLanguage}
            >
              <Globe size={20} />
              <span>{language.toUpperCase()}</span>
            </button>
            <button
              className="lg:hidden bg-transparent text-primary transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-400 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-primary">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
            <img src={logo} alt="AOC TZ" className="h-10 w-auto object-contain brightness-0 invert" />
            <span className="text-white font-bold text-lg">AOC TZ</span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold text-[1rem] transition-all duration-200 ${location.pathname === link.to
                  ? 'bg-primary/10 text-primary'
                  : 'text-text hover:bg-surface hover:text-primary'
                }`}
            >
              <span className="text-primary">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Drawer Footer: Phone + WhatsApp */}
        <div className="px-4 py-6 border-t border-border flex flex-col gap-3">
          <a
            href="tel:+255740691481"
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold bg-primary text-white hover:bg-primary-light transition-all duration-300"
          >
            <Phone size={18} /> +255 740 691 481
          </a>
          <a
            href="https://wa.me/255740691481"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <MessageCircle size={18} /> WhatsApp Us
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
