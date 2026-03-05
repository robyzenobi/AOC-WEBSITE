import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider, useTranslation } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AICropDoctor from './components/AICropDoctor';
import AdminLayout from './components/admin/AdminLayout';

// Lazy load route pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const BlogAdmin = lazy(() => import('./pages/admin/BlogAdmin'));
import { AuthProvider } from './context/AuthContext';
import { initializationError } from './supabase';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (garbage collection time)
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
    },
  },
});

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
    <div className="app-wrapper flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
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
        </Suspense>
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
