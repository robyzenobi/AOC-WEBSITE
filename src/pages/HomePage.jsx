import React from 'react';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import ServicesPreviews from '../components/ServicesPreviews';
import IrrigationCalculator from '../components/IrrigationCalculator';
import BlogPreview from '../components/BlogPreview';

const HomePage = () => {
    return (
        <>
            <Hero />
            <AboutUs />
            <ServicesPreviews />
            <IrrigationCalculator />
            <BlogPreview />
        </>
    );
};

export default HomePage;
