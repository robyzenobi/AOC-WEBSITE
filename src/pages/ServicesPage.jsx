import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';
import { Droplets, Sprout, Ruler, Microscope, Bug, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import IrrigationCalculator from '../components/IrrigationCalculator';

const ServicesPage = () => {
    const { t } = useTranslation();

    const location = useLocation();

    const handleQuoteSubmit = (e) => {
        e.preventDefault();
        toast.success(t('services.quoteForm.successMessage') || "Quote request submitted successfully! We'll be in touch soon.");
        e.target.reset();
    };

    useEffect(() => {
        if (location.hash) {
            setTimeout(() => {
                const element = document.getElementById(location.hash.slice(1));
                if (element) {
                    const headerOffset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    const services = [
        {
            key: 'soil',
            title: t('services.page.soilTitle'),
            subtitle: t('services.page.soilSubtitle'),
            icon: <Microscope size={24} />
        },
        {
            key: 'management',
            title: t('services.page.cropTitle'),
            subtitle: t('services.page.cropSubtitle'),
            icon: <Ruler size={24} />
        },
        {
            key: 'irrigation',
            title: t('services.page.irrigationTitle'),
            subtitle: t('services.page.irrigationSubtitle'),
            icon: <Droplets size={24} />
        },
        {
            key: 'pest_control',
            title: t('services.page.pestTitle'),
            subtitle: t('services.page.pestSubtitle'),
            icon: <Bug size={24} />
        }
    ];

    return (
        <div className="flex-1 p-5 md:p-8 max-w-[1000px] mx-auto mt-[80px] min-h-screen">

            {/* Section Headline */}
            <div className="mb-6 pt-8">
                <h3 className="text-2xl md:text-3xl font-bold font-heading text-text mb-1">{t('services.page.sectionTitle')}</h3>
                <p className="text-primary-light font-medium">{t('services.page.sectionSubtitle')}</p>
            </div>

            {/* Service Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {services.map((service, index) => (
                    <motion.div
                        key={service.key}
                        className="bg-white rounded-2xl p-6 flex items-start gap-5 shadow-sm hover:shadow-md transition-all duration-300 border border-black/5 hover:-translate-y-1 group"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="w-[50px] h-[50px] rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            {service.icon}
                        </div>
                        <div>
                            <p className="text-lg font-bold text-text mb-1">{service.title}</p>
                            <p className="text-sm text-text-muted leading-relaxed">{service.subtitle}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Contact Banner */}
            <div className="bg-secondary/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left mb-12">
                <div>
                    <h3 className="font-bold text-lg mb-1">{t('services.page.contactTitle')}</h3>
                    <p className="text-primary text-sm font-medium">{t('services.page.contactSubtitle')}</p>
                </div>
                <button className="bg-white text-secondary px-6 py-3 rounded-full font-bold shadow-sm hover:shadow-md cursor-pointer transition-transform hover:-translate-y-0.5 whitespace-nowrap" onClick={() => document.querySelector('.ai-toggle-btn')?.click()}>
                    {t('services.page.chatNow')}
                </button>
            </div>

            {/* Request a Quote Form Section */}
            <div className="mt-16 bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-black/5" id="quote">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold font-heading text-text mb-2">{t('services.quoteForm.title')}</h2>
                    <p className="text-text-muted">{t('services.quoteForm.subtitle')}</p>
                </div>
                <form className="space-y-5 max-w-2xl mx-auto" onSubmit={handleQuoteSubmit}>
                    {/* Name + Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-text ml-1">{t('services.quoteForm.fullName')}</label>
                            <input type="text" placeholder={t('services.quoteForm.namePlaceholder')} required className="w-full px-4 py-3 bg-surface border border-black/10 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-text" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-text ml-1">{t('services.quoteForm.phone')}</label>
                            <input type="tel" placeholder={t('services.quoteForm.phonePlaceholder')} required className="w-full px-4 py-3 bg-surface border border-black/10 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-text" />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-text ml-1">{t('services.quoteForm.email')}</label>
                        <input type="email" placeholder={t('services.quoteForm.emailPlaceholder')} required className="w-full px-4 py-3 bg-surface border border-black/10 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-text" />
                    </div>

                    {/* Service Dropdown */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-text ml-1">{t('services.quoteForm.serviceNeeded')}</label>
                        <div className="relative">
                            <select required className="w-full px-4 py-3 bg-surface border border-black/10 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-text appearance-none cursor-pointer pr-10">
                                <option value="" disabled selected>{t('services.quoteForm.selectService')}</option>
                                <option value="soil">{t('services.quoteForm.options.soil')}</option>
                                <option value="crop">{t('services.quoteForm.options.crop')}</option>
                                <option value="irrigation">{t('services.quoteForm.options.irrigation')}</option>
                                <option value="pest">{t('services.quoteForm.options.pest')}</option>
                                <option value="seedlings">{t('services.quoteForm.options.seedlings')}</option>
                                <option value="other">{t('services.quoteForm.options.other')}</option>
                            </select>
                            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">▾</span>
                        </div>
                    </div>

                    {/* Short Description */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-text ml-1">{t('services.quoteForm.description')}</label>
                        <textarea rows="4" placeholder={t('services.quoteForm.descriptionPlaceholder')} required className="w-full px-4 py-3 bg-surface border border-black/10 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-text resize-none"></textarea>
                    </div>

                    {/* Farm Info (optional) */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-text ml-1">{t('services.quoteForm.farmInfo')}</label>
                        <input type="text" placeholder={t('services.quoteForm.farmPlaceholder')} className="w-full px-4 py-3 bg-surface border border-black/10 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-text" />
                    </div>

                    <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-light transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 mt-2">
                        {t('services.quoteForm.submit')}
                    </button>
                </form>
            </div>

            {/* Irrigation Calculator (Optional Integration) */}
            <div className="mt-16">
                <h3 className="text-2xl font-bold font-heading mb-6 border-b border-border pb-4">{t('calculator.title')}</h3>
                <IrrigationCalculator />
            </div>

        </div>
    );
};

export default ServicesPage;
