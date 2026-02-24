import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider, useTranslation } from './context/LanguageContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';
import AICropDoctor from './components/AICropDoctor';
import AdminLayout from './components/admin/AdminLayout';
import BlogAdmin from './pages/admin/BlogAdmin';
import { AuthProvider } from './context/AuthContext';
import { initializationError } from './supabase';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const SiteContent = () => {
  const { language } = useTranslation();

  // Update document title based on language
  useEffect(() => {
    document.title = language === 'en'
      ? "AOC TZ | The Best Solution For Agriculture"
      : "AOC TZ | Suluhisho Bora kwa Kilimo";
  }, [language]);

  return (
    <div className="app-wrapper">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="blog" element={<BlogAdmin />} />
          </Route>
        </Routes>
      </main>
      <Footer />
      <AICropDoctor />
    </div>
  );
};



function App() {
  if (initializationError) {
    return (
      <div style={{ padding: '2rem', color: '#721c24', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', margin: '2rem', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>Configuration Error</h2>
        <p>There was a problem initializing the application backend:</p>
        <pre style={{ background: 'rgba(255,255,255,0.5)', padding: '1rem', borderRadius: '4px' }}>
          {initializationError}
        </pre>
        <p>Please check your <code>.env</code> file and restart the server.</p>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Toaster position="top-right" />
            <ScrollToTop />
            <SiteContent />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
