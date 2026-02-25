import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0f172a] text-white py-14 md:py-20 mt-auto border-t border-border/10">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1: Info */}
          <div className="flex flex-col">
            <div className="mb-4">
              <img src={logo} alt="AOC TZ Logo" className="h-16 md:h-20 w-auto object-contain" />
            </div>
            <p className="text-gray-300 text-[0.95rem] leading-relaxed mb-6">{t('footer.tagline')}</p>
            <div className="flex items-center gap-4 text-white">
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-all duration-300"><Facebook size={18} /></a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-all duration-300"><Twitter size={18} /></a>
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-all duration-300"><Linkedin size={18} /></a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-all duration-300"><Instagram size={18} /></a>
            </div>
          </div>

          {/* Column 2: Resources (Quick Links) */}
          <div>
            <h4 className="text-primary font-bold text-lg mb-6">{t('footer.quickLinks')}</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/" className="text-gray-300 hover:text-primary transition-colors font-medium text-[0.95rem]">{t('nav.home')}</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-primary transition-colors font-medium text-[0.95rem]">{t('nav.about')}</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-primary transition-colors font-medium text-[0.95rem]">{t('nav.services')}</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-primary transition-colors font-medium text-[0.95rem]">{t('nav.blog')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-primary font-bold text-lg mb-6">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/about" className="text-gray-300 hover:text-primary transition-colors font-medium text-[0.95rem]">Our Team</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-primary transition-colors font-medium text-[0.95rem]">Careers</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-primary transition-colors font-medium text-[0.95rem]">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-primary transition-colors font-medium text-[0.95rem]">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-primary font-bold text-lg mb-4">Stay Updated</h4>
            <p className="text-gray-300 text-[0.9rem] mb-4">Subscribe to our newsletter for the latest agricultural insights.</p>
            <form className="flex flex-col sm:flex-row gap-2 mb-6" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required className="flex-1 w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-[0.95rem]" />
              <button type="submit" className="whitespace-nowrap shrink-0 px-6 py-3 rounded-xl font-semibold bg-primary text-white hover:bg-primary-light hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">Subscribe</button>
            </form>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shadow-sm text-white">
                  <Phone size={14} />
                </div>
                <span className="text-gray-300 text-[0.95rem] font-medium">+255 740 691 481</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shadow-sm text-white">
                  <Mail size={14} />
                </div>
                <span className="text-gray-300 text-[0.95rem] font-medium">info@aoc-tz.com</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-solid border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-[0.9rem] font-medium">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
