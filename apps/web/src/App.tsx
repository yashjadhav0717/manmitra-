import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import CrisisBanner from './components/CrisisBanner';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

import HomePage from './pages/HomePage';
import AIAssistantPage from './pages/AIAssistantPage';
import PricingPage from './pages/PricingPage';
import ListenersPage from './pages/ListenersPage';
import CategoriesPage from './pages/CategoriesPage';
import SafetyPage from './pages/SafetyPage';
import HowItWorksPage from './pages/HowItWorksPage';
import AboutPage from './pages/AboutPage';

export const App: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-cream-100 text-deep-900 selection:bg-sage-200">
          <CrisisBanner />
          <Navbar onOpenAuth={handleOpenAuth} />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage onOpenAuth={handleOpenAuth} />} />
              <Route path="/ai-assistant" element={<AIAssistantPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/listeners" element={<ListenersPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/safety" element={<SafetyPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<HomePage onOpenAuth={handleOpenAuth} />} />
            </Routes>
          </main>

          <Footer />

          <AuthModal
            isOpen={authModalOpen}
            initialMode={authMode}
            onClose={() => setAuthModalOpen(false)}
          />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
