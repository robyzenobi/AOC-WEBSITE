import React, { useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Droplets, Sprout, Ruler, Microscope, Bug, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import IrrigationCalculator from '../components/IrrigationCalculator';

const ServicesPage = () => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const services = [
        {
            key: 'soil',
            title: 'Soil Analysis',
            subtitle: 'Nutrient reports & pH balancing',
            icon: <Microscope size={24} />
        },
        {
            key: 'management',
            title: 'Crop Monitoring',
            subtitle: 'Satellite & drone health tracking',
            icon: <Ruler size={24} />
        },
        {
            key: 'irrigation',
            title: 'Irrigation',
            subtitle: 'Smart water scheduling for yield',
            icon: <Droplets size={24} />
        },
        {
            key: 'pest_control', // Added to match inspiration, using bug icon
            title: 'Pest Control',
            subtitle: 'Eco-friendly early detection',
            icon: <Bug size={24} />
        }
    ];

    return (
        <div className="flex-1 p-5 md:p-8 max-w-[1000px] mx-auto mt-[80px] min-h-screen">

            {/* Header Card */}
            <motion.div
                className="relative rounded-2xl overflow-hidden h-[280px] mb-8 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <img src="https://images.unsplash.com/photo-1530836369250-ef72085e4f00?auto=format&fit=crop&q=80&w=1600" alt="Agricultural Field" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
                    <span className="self-start bg-accent text-text px-3 py-1 rounded-full text-xs font-bold uppercase mb-4">Featured</span>
                    <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">Smart Farming Solutions</h1>
                    <p className="text-lg opacity-90">Optimize your harvest with tech-driven insights</p>
                </div>
            </motion.div>

            {/* Section Headline */}
            <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold font-heading text-text mb-1">Expert Farming Services</h3>
                <p className="text-primary-light font-medium">Tailored for modern agriculture</p>
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
                    <h3 className="font-bold text-lg mb-1">Need personalized help?</h3>
                    <p className="text-primary text-sm font-medium">Consult our expert agronomists</p>
                </div>
                <button className="bg-white text-secondary px-6 py-3 rounded-full font-bold shadow-sm hover:shadow-md cursor-pointer transition-transform hover:-translate-y-0.5 whitespace-nowrap" onClick={() => document.querySelector('.ai-toggle-btn')?.click()}>
                    Chat Now
                </button>
            </div>

            {/* Irrigation Calculator (Optional Integration) */}
            <div className="mt-8">
                <h3 className="text-2xl font-bold font-heading mb-6 border-b border-border pb-4">Irrigation Estimator</h3>
                <IrrigationCalculator />
            </div>

        </div>
    );
};

export default ServicesPage;
