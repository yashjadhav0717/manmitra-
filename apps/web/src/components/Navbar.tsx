import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, User as UserIcon, LogOut, HeartHandshake } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, language, setLanguage } = useAuth();
  const location = useLocation();

  const navLinks = [
    { href: '/', labelMr: 'मुख्यपृष्ठ', labelEn: 'Home' },
    { href: '/how-it-works', labelMr: 'कसं चालतं?', labelEn: 'How It Works' },
    { href: '/categories', labelMr: 'वर्गवारी', labelEn: 'Categories' },
    { href: '/listeners', labelMr: 'श्रोते भेटा', labelEn: 'Listeners' },
    { href: '/pricing', labelMr: 'मूल्य (₹1)', labelEn: 'Pricing (₹1)', badge: '₹1 Trial' },
    { href: '/safety', labelMr: 'सुरक्षा व मदत', labelEn: 'Safety' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 glass-nav border-b border-sage-200/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sage-600 to-sage-500 flex items-center justify-center text-white shadow-md shadow-sage-500/20 group-hover:scale-105 transition-transform">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xl sm:text-2xl text-deep-900 tracking-tight">ManMitra</span>
              <span className="text-sage-600 font-semibold text-lg sm:text-xl font-marathi">(मनमित्र)</span>
            </div>
            <p className="text-[11px] text-sage-700 hidden sm:block">
              {language === 'mr' ? 'तुमचं मन. तुमच्या भावना. आमची साथ.' : 'Safe Emotional Listening Sanctuary'}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors relative ${
                isActive(link.href)
                  ? 'text-sage-800 bg-sage-100 font-semibold'
                  : 'text-stone-700 hover:text-sage-700 hover:bg-sage-50/70'
              }`}
            >
              {language === 'mr' ? link.labelMr : link.labelEn}
              {link.badge && (
                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-coral-500 text-white font-bold rounded-full">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right CTA / Language / Auth */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-sage-100/80 p-0.5 rounded-xl border border-sage-200 text-xs font-semibold">
            <button
              onClick={() => setLanguage('mr')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                language === 'mr' ? 'bg-white text-sage-900 shadow-sm' : 'text-sage-700 hover:text-sage-900'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                language === 'en' ? 'bg-white text-sage-900 shadow-sm' : 'text-sage-700 hover:text-sage-900'
              }`}
            >
              EN
            </button>
          </div>

          {/* AI Instant Listening CTA */}
          <Link
            to="/ai-assistant"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sage-100 border border-sage-300 text-sage-800 font-medium text-sm hover:bg-sage-200 transition-colors shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-sage-600" />
            <span>{language === 'mr' ? 'मन मोकळं करा' : 'AI Companion'}</span>
          </Link>

          {/* User Auth Controls */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-sage-200">
              <span className="text-sm font-medium text-deep-900">
                {user.fullName.split(' ')[0]}
              </span>
              <button
                onClick={logout}
                title="Logout"
                className="p-2 text-stone-500 hover:text-coral-500 hover:bg-coral-50 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3.5 py-2 text-sm font-medium text-sage-800 hover:text-sage-900 hover:bg-sage-100 rounded-xl transition-colors"
              >
                {language === 'mr' ? 'लॉगिन' : 'Log in'}
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-4 py-2 text-sm font-semibold text-white bg-sage-600 hover:bg-sage-700 rounded-xl shadow-sm transition-colors"
              >
                {language === 'mr' ? 'नोंदणी करा' : 'Sign up'}
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/ai-assistant"
            className="p-2 rounded-xl bg-sage-100 text-sage-800"
            title="मन मोकळं करा"
          >
            <Sparkles className="w-5 h-5 text-sage-600" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-700 hover:text-deep-900 rounded-xl"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-100/98 border-b border-sage-200 px-4 pt-2 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-sage-200">
            <span className="text-xs font-semibold uppercase text-sage-700">Language / भाषा</span>
            <div className="flex bg-sage-200/70 p-0.5 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setLanguage('mr')}
                className={`px-3 py-1 rounded ${language === 'mr' ? 'bg-white text-sage-900 font-bold' : 'text-sage-700'}`}
              >
                मराठी
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded ${language === 'en' ? 'bg-white text-sage-900 font-bold' : 'text-sage-700'}`}
              >
                English
              </button>
            </div>
          </div>

          <div className="grid gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-base font-medium flex items-center justify-between ${
                  isActive(link.href) ? 'bg-sage-200 text-sage-900 font-bold' : 'text-stone-800 hover:bg-sage-50'
                }`}
              >
                <span>{language === 'mr' ? link.labelMr : link.labelEn}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 text-xs bg-coral-500 text-white font-bold rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-sage-200">
            {user ? (
              <div className="flex items-center justify-between px-2 py-2">
                <span className="font-medium text-deep-900">{user.fullName}</span>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1 text-sm text-coral-600 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  लॉगआउट
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    onOpenAuth('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl border border-sage-300 font-medium text-sage-800 text-center"
                >
                  {language === 'mr' ? 'लॉगिन' : 'Log in'}
                </button>
                <button
                  onClick={() => {
                    onOpenAuth('register');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-sage-600 text-white font-semibold text-center"
                >
                  {language === 'mr' ? 'नोंदणी करा' : 'Sign up'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
