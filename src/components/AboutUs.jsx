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
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-text mb-4">{t('about.title')}</h2>
            <div className="w-16 h-1 bg-secondary rounded-full mx-auto mb-8"></div>
            <p className="text-lg text-text-muted leading-relaxed">{t('about.narrative')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full mb-12">
            {values.map((value) => (
              <div key={value.key} className="flex flex-col items-center gap-4 p-6 bg-surface rounded-2xl shadow-sm border border-border">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  {value.icon}
                </div>
                <h4 className="text-lg font-bold text-primary">{t(`about.values.${value.key}`)}</h4>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-12 md:gap-24 border-t border-border w-full pt-10">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold font-heading text-secondary mb-2">5k+</h3>
              <p className="text-sm md:text-base font-semibold text-text-muted">{t('about.impact.acres')}</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold font-heading text-secondary mb-2">1M+</h3>
              <p className="text-sm md:text-base font-semibold text-text-muted">{t('about.impact.trees')}</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold font-heading text-secondary mb-2">200+</h3>
              <p className="text-sm md:text-base font-semibold text-text-muted">{t('about.impact.jobs')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
