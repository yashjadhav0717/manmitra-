import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialMode, onClose }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [preferredLang, setPreferredLang] = useState<'mr' | 'hi' | 'en'>('mr');
  const [termsConsent, setTermsConsent] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register, language } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        await login({ email, password });
      } else {
        await register({
          fullName,
          email,
          password,
          preferredLang,
          termsConsent: true,
        });
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Operation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-sage-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-cream-100 border-b border-sage-200/80 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-xl text-deep-900">
              {mode === 'login'
                ? language === 'mr' ? 'मनमित्र लॉगिन' : 'Log In to ManMitra'
                : language === 'mr' ? 'नवीन खाते तयार करा' : 'Create Free Account'}
            </h3>
            <p className="text-xs text-sage-700 mt-0.5">
              {language === 'mr'
                ? 'सुरक्षित आणि खाजगी भावनिक ऐकण्याचे व्यासपीठ'
                : 'A confidential, empathetic listening space'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-500 hover:text-stone-800 hover:bg-sage-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-sage-100 text-sm font-semibold">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`flex-1 py-3 text-center transition-all ${
              mode === 'login'
                ? 'text-sage-800 border-b-2 border-sage-600 bg-sage-50/50'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            {language === 'mr' ? 'लॉगिन' : 'Log In'}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError(null);
            }}
            className={`flex-1 py-3 text-center transition-all ${
              mode === 'register'
                ? 'text-sage-800 border-b-2 border-sage-600 bg-sage-50/50'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            {language === 'mr' ? 'नोंदणी करा' : 'Sign Up'}
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {language === 'mr' ? 'पूर्ण नाव' : 'Full Name'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="उदा. राहुल देशमुख"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sage-500 text-sm"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {language === 'mr' ? 'ईमेल पत्ता' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sage-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {language === 'mr' ? 'पासवर्ड' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="किमान ८ अक्षरे (अक्षर + अंक)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sage-500 text-sm"
              />
            </div>
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {language === 'mr' ? 'संवादाची पसंतीची भाषा' : 'Preferred Language'}
                </label>
                <select
                  value={preferredLang}
                  onChange={(e) => setPreferredLang(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
                >
                  <option value="mr">मराठी (Marathi)</option>
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="flex items-start gap-2 pt-1 text-xs text-stone-600">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  checked={termsConsent}
                  onChange={(e) => setTermsConsent(e.target.checked)}
                  className="mt-0.5 rounded text-sage-600 focus:ring-sage-500"
                />
                <label htmlFor="terms">
                  {language === 'mr'
                    ? 'मी अटी व शर्ती आणि गोपनीयता धोरण मान्य करतो. मला समजले आहे की मनमित्र ही वैद्यकीय उपचारांचा पर्याय नाही.'
                    : 'I agree to the Terms of Service & Privacy Policy, understanding that ManMitra is peer support, not clinical therapy.'}
                </label>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>प्रतीक्षा करा...</span>
            ) : mode === 'login' ? (
              language === 'mr' ? 'लॉगिन करा' : 'Sign In'
            ) : (
              language === 'mr' ? 'विनामूल्य नोंदणी करा' : 'Create Free Account'
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-sage-600" />
            <span>२५६-बिट एनक्रिप्टेड आणि १००% गोपनीय</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
