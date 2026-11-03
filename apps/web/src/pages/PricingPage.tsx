import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const PricingPage: React.FC = () => {
  const { language } = useAuth();

  const plans = [
    {
      code: 'TRIAL_1_INR',
      titleMr: 'परिचय सत्र (Trial)',
      titleEn: 'Introductory Trial',
      price: '₹1',
      durationMr: '१५ मिनिटे',
      durationEn: '15 Minutes',
      descMr: 'नवीन सदस्यांसाठी खास अनुभव. भावनिक श्रोत्याशी सुरक्षित संवादाचा परिचय.',
      descEn: 'One-time introductory trial session for new members to experience empathetic listening.',
      featuresMr: [
        '१५ मिनिटे समर्पित श्रोत्याचा वेळ',
        'ऑडिओ कॉल किंवा चॅट पर्याय',
        'शून्य छुपी वर्गणी किंवा ऑटो-डेबिट',
        '१००% खाजगी आणि गोपनीय',
      ],
      featuresEn: [
        '15 minutes dedicated listening',
        'Audio call or text chat format',
        'No auto-debit or recurring subscription',
        '100% confidential & respectful',
      ],
      isPopular: true,
      ctaMr: '₹1 मध्ये बुक करा',
      ctaEn: 'Book for ₹1',
      link: '/listeners',
    },
    {
      code: 'STANDARD_20_MIN',
      titleMr: 'मानक सत्र (Standard)',
      titleEn: 'Standard Session',
      price: '₹99',
      durationMr: '२० मिनिटे',
      durationEn: '20 Minutes',
      descMr: 'मनात दाटून आलेला ताण हलका करण्यासाठी आणि विचारांना दिशा देण्यासाठी आदर्श सत्र.',
      descEn: 'A focused 20-minute session to untangle thoughts and feel truly validated.',
      featuresMr: [
        '२० मिनिटे सलग संवाद',
        'तुमच्या पसंतीचा मराठी/हिंदी श्रोता',
        'पूर्वग्रहरहित ऐकणे',
        'सत्राच्या वेळेचे लवचिक स्लॉट्स',
      ],
      featuresEn: [
        '20 minutes focused dialogue',
        'Choice of Marathi/Hindi listener',
        'Non-judgmental atmosphere',
        'Flexible scheduling slots',
      ],
      isPopular: false,
      ctaMr: 'सत्र निवडा (₹99)',
      ctaEn: 'Select Session (₹99)',
      link: '/listeners',
    },
    {
      code: 'EXTENDED_45_MIN',
      titleMr: 'सखोल संवाद (Extended)',
      titleEn: 'Deep Unburdening',
      price: '₹199',
      durationMr: '४५ मिनिटे',
      durationEn: '45 Minutes',
      descMr: 'अत्यंत जड वाटणाऱ्या दिवसांसाठी आणि मनातील गुंतागुंत शांतपणे उलगडण्यासाठी.',
      descEn: 'An extended calm space for navigating complex emotions and deep heart-to-heart unburdening.',
      featuresMr: [
        '४५ मिनिटे सखोल ऐकणे',
        'कोणतीही घाई किंवा वेळेचा दबाव नाही',
        'वरिष्ठ प्रशिक्षित श्रोते उपलब्ध',
        'सत्रानंतर शांततेची अनुभूती',
      ],
      featuresEn: [
        '45 minutes in-depth listening',
        'Zero rush or conversational pressure',
        'Senior trained listeners',
        'Unhurried emotional unburdening',
      ],
      isPopular: false,
      ctaMr: 'सत्र निवडा (₹199)',
      ctaEn: 'Select Session (₹199)',
      link: '/listeners',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-sage-600" />
          <span>१००% पारदर्शक • शून्य छुपे शुल्क</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-deep-900">
          {language === 'mr' ? 'शांत आणि सुलभ मूल्य रचना' : 'Simple, Transparent Pricing'}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          {language === 'mr'
            ? 'प्रत्येकाला ऐकून घेणारा एक खरा मित्र मिळायला हवा. म्हणूनच आम्ही पहिल्या सत्रासाठी फक्त ₹1 ची प्रायोगिक संधी उपलब्ध केली आहे.'
            : 'Everyone deserves a safe place to be heard. Experience our platform with a transparent ₹1 introductory trial.'}
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.code}
            className={`p-8 rounded-3xl bg-white border flex flex-col justify-between transition-all relative ${
              plan.isPopular
                ? 'border-2 border-sage-500 shadow-xl shadow-sage-600/10 scale-105'
                : 'border-stone-200/80 shadow-sm hover:border-sage-300'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-sage-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                Most Popular Trial
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-deep-900">
                  {language === 'mr' ? plan.titleMr : plan.titleEn}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  {language === 'mr' ? plan.descMr : plan.descEn}
                </p>
              </div>

              <div className="flex items-baseline gap-2 pb-6 border-b border-stone-100">
                <span className="text-4xl font-extrabold text-deep-900">{plan.price}</span>
                <span className="text-xs text-stone-500">
                  / {language === 'mr' ? plan.durationMr : plan.durationEn}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-stone-600">
                {(language === 'mr' ? plan.featuresMr : plan.featuresEn).map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sage-600 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <Link
                to={plan.link}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-xs text-center block transition-all shadow-sm ${
                  plan.isPopular
                    ? 'bg-sage-600 hover:bg-sage-700 text-white shadow-sage-500/20'
                    : 'bg-cream-100 hover:bg-sage-100 text-deep-900 border border-stone-200'
                }`}
              >
                {language === 'mr' ? plan.ctaMr : plan.ctaEn}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Guarantee */}
      <div className="p-8 rounded-3xl bg-cream-50 border border-sage-200 flex flex-col sm:flex-row items-center gap-6 justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-sage-200 text-sage-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-deep-900">
              {language === 'mr' ? 'सुरक्षित पेमेंट आणि १००% गोपनीयता' : 'Secure Razorpay Payments & 100% Privacy'}
            </h4>
            <p className="text-xs text-stone-500">
              {language === 'mr'
                ? 'UPI, डेबिट कार्ड किंवा नेटबँकिंगने सुरक्षित व्यवहार. कोणतेही छुपा ऑटो-पे नाही.'
                : 'Supports all Indian UPI, NetBanking and Cards with strict RBI compliance.'}
            </p>
          </div>
        </div>
        <Link
          to="/safety"
          className="text-xs font-semibold text-sage-700 hover:underline shrink-0"
        >
          {language === 'mr' ? 'सुरक्षा धोरण वाचा →' : 'Read Safety Charter →'}
        </Link>
      </div>
    </div>
  );
};

export default PricingPage;
