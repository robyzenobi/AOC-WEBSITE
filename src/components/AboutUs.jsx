import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Leaf, Award, Users, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const { t } = useTranslation();

  const values = [
    { key: 'climate', icon: <Leaf size={24} /> },
    { key: 'sustainability', icon: <Award size={24} /> },
    { key: 'professionalism', icon: <Target size={24} /> }
  ];

  return (
    <section className="py-14 md:py-24" id="about">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="relative px-4 sm:px-8 lg:px-0"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <img src="https://images.unsplash.com/photo-1489352937578-32d1e2930796?auto=format&fit=crop&q=80&w=1200" alt="Sustainable Farming" loading="lazy" decoding="async" className="w-full rounded-2xl shadow-lg object-cover" />
          </motion.div>

          <div className="mt-8 lg:mt-0">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-text mb-4">{t('about.title')}</h2>
            <div className="w-16 h-1 bg-secondary rounded-full mb-6"></div>
            <p className="text-lg text-text-muted mb-10 leading-relaxed">{t('about.narrative')}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 mb-10">
              {values.map((value) => (
                <div key={value.key} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">{value.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-primary">{t(`about.values.${value.key}`)}</h4>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-8 md:gap-12 border-t border-border pt-8">
              <div>
                <h3 className="text-3xl font-bold font-heading text-secondary mb-1">5k+</h3>
                <p className="text-sm font-semibold text-text-muted">{t('about.impact.acres')}</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold font-heading text-secondary mb-1">1M+</h3>
                <p className="text-sm font-semibold text-text-muted">{t('about.impact.trees')}</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold font-heading text-secondary mb-1">200+</h3>
                <p className="text-sm font-semibold text-text-muted">{t('about.impact.jobs')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
