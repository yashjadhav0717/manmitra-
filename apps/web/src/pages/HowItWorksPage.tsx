import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Headphones, Heart, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const HowItWorksPage: React.FC = () => {
  const { language } = useAuth();

  const steps = [
    {
      step: '०१',
      titleMr: 'तुमचा विषय किंवा श्रोता निवडा',
      titleEn: 'Choose Your Domain or Listener',
      descMr: 'आमच्या १० विशिष्ट भावनिक वर्गवाऱ्यांमधून तुम्हाला ज्या विषयावर मन हलकं करायचं आहे तो विषय निवडा किंवा आमच्या प्रमाणित श्रोत्यांचे प्रोफाइल तपासा.',
      descEn: 'Browse through our 10 emotional domains or explore verified listener profiles by language and specialty.',
      icon: Search,
    },
    {
      step: '०२',
      titleMr: 'वेळ आणि संवाद माध्यम ठरवा',
      titleEn: 'Pick Time & Format',
      descMr: 'ऑडिओ कॉल किंवा सुरक्षित टेक्स्ट चॅट यापैकी तुम्हाला ज्या माध्यमातून बोलायला सोयीचं वाटतं ते निवडा आणि तुमच्या वेळेनुसार स्लॉट निवडा.',
      descEn: 'Choose between an audio call or private text chat, and select a time slot that matches your comfort.',
      icon: Calendar,
    },
    {
      step: '०३',
      titleMr: 'सुरक्षित ₹1 ट्रायल बुकिंग',
      titleEn: 'Safe ₹1 Trial Booking',
      descMr: 'पहिल्या सत्रासाठी फक्त ₹1 चे पारदर्शक पेमेंट करा. कोणत्याही छुपी वर्गणीशिवाय त्वरित बुकिंग पुष्टीकरण मिळवा.',
      descEn: 'Confirm your introductory 15-minute trial for just ₹1 with instant confirmation and zero subscription traps.',
      icon: Headphones,
    },
    {
      step: '०४',
      titleMr: 'मन मोकळं करा आणि हलके व्हा',
      titleEn: 'Unburden & Feel Heard',
      descMr: 'सत्राच्या वेळी खाजगी कक्षामध्ये सामील व्हा. कोणताही सल्ला न घेता, फक्त मनापासून ऐकणारा संवेदनशील मित्र अनुभवा.',
      descEn: 'Join your private listening space. Experience genuine empathetic presence and leave feeling emotionally lighter.',
      icon: Heart,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-bold text-deep-900">
          {language === 'mr' ? 'मनमित्र कसं काम करतं?' : 'How ManMitra Works'}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          {language === 'mr'
            ? 'अवघ्या ४ सोप्या टप्प्यांत आपण एका संवेदनशील, पूर्वग्रहरहित श्रोत्याशी सुरक्षितपणे जोडले जाऊ शकता.'
            : 'Four simple, respectful steps to unburden your thoughts and experience genuine human listening.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <span className="text-5xl font-extrabold text-sage-100 absolute top-4 right-6 select-none">
                {s.step}
              </span>
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-deep-900">
                  {language === 'mr' ? s.titleMr : s.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {language === 'mr' ? s.descMr : s.descEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-8 rounded-3xl bg-sage-600 text-white text-center space-y-4 shadow-xl">
        <h3 className="text-2xl font-bold">
          {language === 'mr' ? 'आजच मन हलकं करायला सुरुवात करा' : 'Start Feeling Heard Today'}
        </h3>
        <p className="text-sm text-sage-100 max-w-xl mx-auto">
          {language === 'mr'
            ? 'विचार साचवून ठेवू नका. आमचे प्रशिक्षित श्रोते तुमच्यासाठी उपलब्ध आहेत.'
            : 'Connect with a verified empathetic listener for an introductory ₹1 trial session.'}
        </p>
        <div className="pt-2">
          <Link
            to="/listeners"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-sage-900 font-bold text-sm hover:bg-cream-100 transition-all shadow-md"
          >
            <span>{language === 'mr' ? 'श्रोते भेटा आणि स्लॉट निवडा (₹1)' : 'Meet Listeners & Book (₹1)'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
