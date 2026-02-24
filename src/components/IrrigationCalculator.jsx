import React, { useState } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Calculator, Send, Droplets, User, Phone, MapPin, Sprout, Maximize2, Waves } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const IrrigationCalculator = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    phone: '',
    crop: '',
    size: '',
    water: 'Borehole'
  });
  const [estimate, setEstimate] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateEstimate = (e) => {
    e.preventDefault();
    const size = parseFloat(formData.size) || 0;
    const basePrice = size * 1200000;
    const waterFactor = formData.water === 'River' ? 1.2 : 1.0;
    const total = basePrice * waterFactor;

    setEstimate(total.toLocaleString());
  };

  return (
    <section className="py-14 md:py-24 bg-surface" id="calculator">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
              <Droplets className="text-secondary" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-text">{t('services.irrigation.calculator')}</h2>
            <p className="text-lg text-text-muted mb-8 leading-relaxed">
              {t('services.irrigation.description')}
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">✓</div>
                <span className="text-text font-medium">{t('services.irrigation.benefits.water')}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">✓</div>
                <span className="text-text font-medium">{t('services.irrigation.benefits.climate')}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">✓</div>
                <span className="text-text font-medium">{t('services.irrigation.benefits.yield')}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-black/5 mt-10 lg:mt-0">
            <div className="flex items-center gap-3 mb-8 bg-secondary text-white p-4 rounded-2xl -mt-12 mx-4 shadow-lg justify-center">
              <Calculator size={24} />
              <h3 className="font-bold text-lg m-0">{t('calculator.getEstimate')}</h3>
            </div>

            <form onSubmit={calculateEstimate} className="space-y-4">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
                  <User size={20} />
                </div>
                <input type="text" name="name" required onChange={handleChange} value={formData.name} placeholder={t('calculator.fields.name')} className="w-full pl-14 pr-4 py-3.5 bg-surface border border-black/10 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-text appearance-none" />
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
                  <Phone size={20} />
                </div>
                <input type="tel" name="phone" required onChange={handleChange} value={formData.phone} placeholder={t('calculator.fields.phone')} className="w-full pl-14 pr-4 py-3.5 bg-surface border border-black/10 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-text appearance-none" />
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
                  <MapPin size={20} />
                </div>
                <input type="text" name="location" required onChange={handleChange} value={formData.location} placeholder={t('calculator.fields.location')} className="w-full pl-14 pr-4 py-3.5 bg-surface border border-black/10 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-text appearance-none" />
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
                  <Sprout size={20} />
                </div>
                <input type="text" name="crop" required onChange={handleChange} value={formData.crop} placeholder={t('calculator.fields.crop')} className="w-full pl-14 pr-4 py-3.5 bg-surface border border-black/10 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-text appearance-none" />
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
                  <Maximize2 size={20} />
                </div>
                <input type="number" name="size" required onChange={handleChange} value={formData.size} placeholder={t('calculator.fields.size')} className="w-full pl-14 pr-4 py-3.5 bg-surface border border-black/10 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-text appearance-none" />
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
                  <Waves size={20} />
                </div>
                <select name="water" value={formData.water} onChange={handleChange} className="w-full pl-14 pr-4 py-3.5 bg-surface border border-black/10 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-text appearance-none">
                  {/* <option value="" disabled>{t('calculator.fields.water')}</option> */}
                  {t('calculator.waterSources').map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="w-full bg-secondary text-white font-bold py-4 rounded-xl hover:bg-secondary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 mt-2 flex items-center justify-center gap-2">
                {t('calculator.calculateNow')}
              </button>
            </form>

            <AnimatePresence>
              {estimate && (
                <motion.div
                  className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl text-center border border-primary/20 overflow-hidden"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="text-sm font-bold text-primary uppercase tracking-wider mb-2">{t('calculator.estimateResult')}</div>
                  <div className="text-4xl font-bold font-heading text-text mb-2">TZS {estimate}*</div>
                  <p className="text-xs text-text-muted mb-6">{t('calculator.approximateNote')}</p>
                  <button className="inline-flex w-full items-center justify-center gap-2 bg-secondary text-white font-bold py-4 rounded-xl hover:bg-secondary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                    <Send size={18} /> {t('calculator.confirmRequest')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IrrigationCalculator;
