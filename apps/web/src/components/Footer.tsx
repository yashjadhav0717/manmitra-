import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Shield, Heart, PhoneCall } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Footer: React.FC = () => {
  const { language } = useAuth();

  return (
    <footer className="bg-deep-900 text-stone-300 pt-16 pb-12 border-t border-deep-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-deep-800">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-sage-600 flex items-center justify-center text-white">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white">ManMitra</span>
              <span className="text-sage-400 font-marathi font-medium">(मनमित्र)</span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              {language === 'mr'
                ? 'तुमचं मन. तुमच्या भावना. आमची साथ. सुरक्षित, आदरयुक्त आणि खाजगी भावनिक ऐकण्याचे व्यासपीठ.'
                : 'A safe, respectful, and confidential space for non-judgmental emotional listening and genuine human connection.'}
            </p>
            <div className="p-3 rounded-xl bg-deep-800/80 border border-deep-700/60 text-xs text-stone-300 space-y-1">
              <div className="flex items-center gap-1.5 text-coral-400 font-semibold">
                <Shield className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'महत्त्वाची सूचना' : 'Important Notice'}</span>
              </div>
              <p className="text-[11px] leading-normal text-stone-400">
                {language === 'mr'
                  ? 'मनमित्र ही भावनिक आधार आणि ऐकून घेण्याची सेवा आहे. हे मानसोपचार (Therapy) किंवा वैद्यकीय उपचारांचा पर्याय नाही.'
                  : 'ManMitra provides empathetic listening and peer support. We do not provide clinical psychiatric diagnosis or medical treatment.'}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {language === 'mr' ? 'प्लॅटफॉर्म' : 'Platform'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/ai-assistant" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-sage-400">✦</span>
                  {language === 'mr' ? 'मन मोकळं करा (AI)' : 'AI Listening Assistant'}
                </Link>
              </li>
              <li>
                <Link to="/listeners" className="hover:text-white transition-colors">
                  {language === 'mr' ? 'मानव श्रोते भेटा' : 'Meet Verified Listeners'}
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-white transition-colors">
                  {language === 'mr' ? 'सर्व १० वर्गवारी' : 'All 10 Categories'}
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  {language === 'mr' ? 'मूल्य व ₹1 ट्रायल' : 'Pricing & ₹1 Trial'}
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">
                  {language === 'mr' ? 'कसं कार्य करतं?' : 'How It Works'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Organisation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {language === 'mr' ? 'संस्था व समाज' : 'Community'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  {language === 'mr' ? 'आमच्याबद्दल (About Us)' : 'About ManMitra'}
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white transition-colors">
                  {language === 'mr' ? 'करिअर (Careers)' : 'Careers & Hiring'}
                </Link>
              </li>
              <li>
                <Link to="/safety" className="hover:text-white transition-colors">
                  {language === 'mr' ? 'सुरक्षा व संकट निवारण' : 'Safety & Crisis Resources'}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  {language === 'mr' ? 'संपर्क साधा' : 'Contact Support'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Crisis Helplines */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {language === 'mr' ? 'संकट समयी २४x७ मदत' : '24x7 Crisis Support'}
            </h4>
            <p className="text-xs text-stone-400">
              {language === 'mr'
                ? 'जर आपण किंवा आपले आप्त तीव्र मानसिक तणावाखाली असाल तर भारत सरकारच्या विनामूल्य क्रमांकांवर संपर्क साधा:'
                : 'If you or someone you know is in acute distress, reach out to national emergency toll-free numbers:'}
            </p>
            <div className="space-y-2">
              <a
                href="tel:14416"
                className="block p-2.5 rounded-xl bg-deep-800 border border-deep-700 hover:border-sage-500 transition-colors"
              >
                <div className="text-[11px] text-stone-400">Tele-MANAS (Govt of India)</div>
                <div className="font-bold text-coral-400 text-base flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4" /> 14416 / 1800-891-4416
                </div>
              </a>
              <a
                href="tel:18005990019"
                className="block p-2.5 rounded-xl bg-deep-800 border border-deep-700 hover:border-sage-500 transition-colors"
              >
                <div className="text-[11px] text-stone-400">KIRAN Mental Health Helpline</div>
                <div className="font-bold text-coral-400 text-base flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4" /> 1800-599-0019
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} ManMitra Platform. Built with care for Maharashtra & India.</p>
          <div className="flex items-center gap-4">
            <Link to="/safety" className="hover:text-stone-300">Safety Policy</Link>
            <span>•</span>
            <span className="flex items-center gap-1 text-sage-400">
              Made with <Heart className="w-3.5 h-3.5 text-coral-500 fill-coral-500" /> for genuine connection
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
