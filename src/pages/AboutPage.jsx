import React, { useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Leaf, Award, Users, Target, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage = () => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const values = [
        { key: 'climate', icon: <Leaf size={24} /> },
        { key: 'sustainability', icon: <Award size={24} /> },
        { key: 'professionalism', icon: <Target size={24} /> }
    ];

    const teamMembers = [
        { name: "John Doe", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
        { name: "Jane Smith", role: "Chief Agronomist", img: "https://images.unsplash.com/photo-1595856419342-570a290c01a1?auto=format&fit=crop&q=80&w=400" },
        { name: "Michael Johnson", role: "Head of Engineering", img: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=400" }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[400px] pt-[80px] flex items-center justify-center text-center text-white bg-cover bg-center" style={{
                backgroundImage: "linear-gradient(rgba(27, 77, 62, 0.8), rgba(27, 77, 62, 0.8)), url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=1200')"
            }}>
                <div className="max-w-7xl mx-auto px-5 md:px-8 w-full">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-white text-center text-[clamp(2.5rem,6vw,3.5rem)] font-bold font-heading mb-4 leading-tight"
                    >
                        {t('nav.about')}
                    </motion.h1>
                </div>
            </section>

            {/* Narrative Section */}
            <section className="py-14 md:py-24">
                <div className="max-w-[1000px] mx-auto px-5 md:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-text mb-4">{t('about.title')}</h2>
                        <div className="w-16 h-1 bg-secondary rounded-full mx-auto"></div>
                    </div>
                    <p className="text-xl text-text-muted leading-relaxed text-center mb-16">
                        {t('about.narrative')}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
                        <div className="p-8 bg-surface rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
                                <span className="p-2 bg-primary/10 text-primary rounded-lg"><Target size={24} /></span>
                                Mission
                            </h3>
                            <p className="text-text-muted leading-relaxed">To revolutionize African agriculture by providing sustainable, data-driven solutions that empower farmers and ensure food security for generations to come.</p>
                        </div>
                        <div className="p-8 bg-surface rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
                                <span className="p-2 bg-primary/10 text-primary rounded-lg"><Globe size={24} /></span>
                                Vision
                            </h3>
                            <p className="text-text-muted leading-relaxed">To be the leading agricultural innovation hub in East Africa, bridging the gap between traditional farming and modern technology.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-14 md:py-24 bg-surface">
                <div className="max-w-7xl mx-auto px-5 md:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-text mb-4">Our Core Values</h2>
                        <div className="w-16 h-1 bg-secondary rounded-full mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.key}
                                className="bg-white p-10 rounded-2xl shadow-md text-center hover:-translate-y-1.5 transition-transform duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                    {React.cloneElement(value.icon, { size: 32 })}
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-4">{t(`about.values.${value.key}`)}</h3>
                                <p className="text-text-muted leading-relaxed">Commitment to excellence in every project we undertake.</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 md:py-24 bg-primary text-white">
                <div className="max-w-7xl mx-auto px-5 md:px-8">
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24">
                        <div className="text-center">
                            <h3 className="text-4xl md:text-5xl font-extrabold font-heading text-accent mb-2">10+</h3>
                            <p className="text-white/80 font-medium tracking-wide uppercase text-sm">{t('about.impact.years')}</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-4xl md:text-5xl font-extrabold font-heading text-accent mb-2">5k+</h3>
                            <p className="text-white/80 font-medium tracking-wide uppercase text-sm">{t('about.impact.acres')}</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-4xl md:text-5xl font-extrabold font-heading text-accent mb-2">1M+</h3>
                            <p className="text-white/80 font-medium tracking-wide uppercase text-sm">{t('about.impact.trees')}</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-4xl md:text-5xl font-extrabold font-heading text-accent mb-2">200+</h3>
                            <p className="text-white/80 font-medium tracking-wide uppercase text-sm">{t('about.impact.jobs')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-14 md:py-24">
                <div className="max-w-7xl mx-auto px-5 md:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-text mb-4">Leadership Team</h2>
                        <div className="w-16 h-1 bg-secondary rounded-full mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, idx) => (
                            <div key={idx} className="bg-white rounded-2xl shadow-md overflow-hidden text-center hover:shadow-xl transition-shadow duration-300">
                                <div className="h-[320px] overflow-hidden">
                                    <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-text mb-2">{member.name}</h3>
                                    <p className="text-secondary font-semibold">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

// Simple Globe Icon component since it wasn't imported from lucide-react in the plan but used
const Globe = ({ size = 24, color = "currentColor" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
);

export default AboutPage;
