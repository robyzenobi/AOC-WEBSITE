import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');

    useEffect(() => {
        localStorage.setItem('lang', language);
    }, [language]);

    const t = (path) => {
        const keys = path.split('.');
        let result = translations[language];
        for (const key of keys) {
            if (result[key]) {
                result = result[key];
            } else {
                console.warn(`Translation path "${path}" not found in language "${language}"`);
                return path;
            }
        }
        return result;
    };

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'sw' : 'en'));
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
};
