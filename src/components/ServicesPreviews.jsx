import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Leaf, Ruler, Sprout, Microscope, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const servicesList = [
  {
    key: 'seedlings',
    icon: <Sprout size={32} />,
    image: 'https://images.unsplash.com/photo-1592150621344-78439b734823?auto=format&fit=crop&q=80&w=800'
  },
  {
    key: 'management',
    icon: <Ruler size={32} />,
    image: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?auto=format&fit=crop&q=80&w=800'
  },
  {
    key: 'soil',
    icon: <Microscope size={32} />,
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800'
  }
];

const ServicesPreviews = () => {
  const { t } = useTranslation();

  return (
    <section className="py-14 md:py-24 bg-surface" id="services">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-text mb-4">{t('services.title')}</h2>
          <div className="w-16 h-1 bg-secondary rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.key}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 h-full flex flex-col group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img src={service.image} alt={t(`services.${service.key}.title`)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute -bottom-5 right-5 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10">
                  {service.icon}
                </div>
              </div>
              <div className="p-6 pt-10 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-3 text-text">{t(`services.${service.key}.title`)}</h3>
                <p className="text-text-muted mb-6 flex-1 leading-relaxed">{t(`services.${service.key}.description`)}</p>
                <Link to="/services#quote" className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary/10 rounded-lg text-sm font-semibold transition-colors self-start whitespace-nowrap">
                  {t('nav.quote')} <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreviews;
