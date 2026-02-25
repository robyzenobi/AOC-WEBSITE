import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000')] bg-no-repeat bg-center bg-cover text-white pt-[80px]" id="home">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent z-[1]"></div>
      <div className="relative z-[2] max-w-7xl mx-auto px-5 md:px-8 w-full flex flex-col items-center text-center">
        <motion.div
          className="max-w-[800px] flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[0.85rem] font-medium mb-8">
            <ShieldCheck size={16} />
            <span>{t('hero.trust')}</span>
          </div>
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] mx-auto mb-6 leading-[1.1] font-bold font-heading">{t('hero.title')}</h1>
          <p className="text-[clamp(1rem,2vw,1.25rem)] opacity-90 mx-auto mb-10 max-w-[600px]">{t('hero.subtitle')}</p>
          <div className="flex justify-center gap-5 flex-wrap">
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg rounded-xl font-semibold bg-primary text-white hover:bg-primary-light hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
              {t('hero.cta')} <ChevronRight size={20} />
            </button>
            <a href="https://wa.me/255740691481" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg rounded-xl font-semibold bg-primary text-white hover:bg-primary-light hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
              {t('hero.whatsapp')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
