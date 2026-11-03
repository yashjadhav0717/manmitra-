import React, { useState } from 'react';
import { Star, ShieldCheck, Headphones, MessageSquare, Calendar, MapPin, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ListenersPage: React.FC = () => {
  const { language } = useAuth();
  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const listeners = [
    {
      id: 'listener-1',
      name: 'Tanvi Patil (तन्वी पाटील)',
      displayName: 'तन्वी (Tanvi)',
      city: 'Pune',
      rating: 4.95,
      sessions: 320,
      languages: ['मराठी (Marathi)', 'English'],
      languagesCodes: ['mr', 'en'],
      headline: 'Compassionate Marathi & English Peer Listener | Empathetic & Non-judgmental',
      bio: 'मी पुण्यात राहते. गेली ३ वर्षे सामाजिक क्षेत्रात भावनिक संवादक म्हणून काम करत आहे. कोणत्याही विषयावर मन हलकं करायचं असेल तर मी तुमच्यासोबत आहे.',
      specialties: ['Stress & Overthinking', 'Student Life', 'Loneliness'],
    },
    {
      id: 'listener-2',
      name: 'Amit Deshpande (अमित देशपांडे)',
      displayName: 'अमित (Amit)',
      city: 'Mumbai',
      rating: 4.92,
      sessions: 450,
      languages: ['मराठी (Marathi)', 'हिंदी (Hindi)', 'English'],
      languagesCodes: ['mr', 'hi', 'en'],
      headline: 'Workplace Stress, Life Balance & Patient Listener',
      bio: 'कामाचा ताण, करिअरमधील अनिश्चितता किंवा दैनंदिन जगण्यातील थकवा. शांतपणे ऐकून घेणे आणि मनातील भार हलका करणे हाच माझा दृष्टिकोन आहे.',
      specialties: ['Career Stress', 'Workplace Politics', 'Life Decisions'],
    },
    {
      id: 'listener-3',
      name: 'Sneha Kulkarni (स्नेहा कुलकर्णी)',
      displayName: 'स्नेहा (Sneha)',
      city: 'Nashik',
      rating: 4.98,
      sessions: 510,
      languages: ['मराठी (Marathi)', 'हिंदी (Hindi)'],
      languagesCodes: ['mr', 'hi'],
      headline: 'Gentle, Warm Listener for Family Matters & Emotional Venting',
      bio: 'घरातील प्रश्न, नातेसंबंधांतील गुंतागुंत किंवा एकटेपणा. जेव्हा कोणाला तरी मनातील खरी गोष्ट सांगायची असते, तेव्हा मी तुमच्यासाठी उपलब्ध आहे.',
      specialties: ['Family Concerns', 'Grief & Loss', 'Daily Venting'],
    },
    {
      id: 'listener-4',
      name: 'Rahul Shinde (राहुल शिंदे)',
      displayName: 'राहुल (Rahul)',
      city: 'Chhatrapati Sambhajinagar',
      rating: 4.89,
      sessions: 210,
      languages: ['मराठी (Marathi)', 'हिंदी (Hindi)'],
      languagesCodes: ['mr', 'hi'],
      headline: 'Student Pressure, MPSC/Competitive Exam Anxiety Listener',
      bio: 'स्पर्धा परीक्षांची तयारी करताना येणारा एकटेपणा आणि मानसिक ताण मी स्वतः अनुभवला आहे. तुमच्या संघर्षात एक सच्चा मित्र म्हणून मी ऐकेन.',
      specialties: ['Exam Pressure', 'Overthinking', 'Youth Peer Support'],
    },
  ];

  const filteredListeners = listeners.filter((l) => {
    if (selectedLang === 'all') return true;
    return l.languagesCodes.includes(selectedLang);
  });

  const handleBook = (listenerName: string) => {
    setBookingSuccess(listenerName);
    setTimeout(() => {
      setBookingSuccess(null);
    }, 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-bold text-deep-900">
          {language === 'mr' ? 'आमचे प्रमाणित श्रोते' : 'Meet Our Verified Listeners'}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          {language === 'mr'
            ? 'सर्व श्रोते नैतिक सीमा, गोपनीयता आणि पूर्वग्रहरहित ऐकण्याच्या कौशल्यात प्रशिक्षित आहेत. पहिल्या सत्रासाठी फक्त ₹1.'
            : 'Carefully vetted peer listeners trained in active listening and empathetic presence. ₹1 introductory trial applies.'}
        </p>

        {/* Filter Bar */}
        <div className="pt-4 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-stone-500 mr-2">भाषा निवडा:</span>
          {[
            { code: 'all', label: 'सर्व भाषा (All)' },
            { code: 'mr', label: 'मराठी (Marathi)' },
            { code: 'hi', label: 'हिंदी (Hindi)' },
            { code: 'en', label: 'English' },
          ].map((btn) => (
            <button
              key={btn.code}
              onClick={() => setSelectedLang(btn.code)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedLang === btn.code
                  ? 'bg-sage-600 text-white shadow-sm'
                  : 'bg-white border border-stone-200 text-stone-600 hover:border-sage-300'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {bookingSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center justify-between text-sm shadow-md animate-fade-in max-w-xl mx-auto">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-600" />
            <span>
              <strong>{bookingSuccess}</strong> यांच्यासोबत ₹1 चाचणी सत्र यशस्वीरीत्या आरक्षित केले गेले!
            </span>
          </div>
        </div>
      )}

      {/* Listeners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredListeners.map((l) => (
          <div
            key={l.id}
            className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-md hover:border-sage-400 transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Header card */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sage-500 to-sage-400 text-white font-bold text-xl flex items-center justify-center shadow-md">
                    {l.displayName[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-lg text-deep-900">{l.name}</h3>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" aria-label="प्रमाणित श्रोता" />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-stone-500 mt-0.5">
                      <span className="flex items-center gap-1 text-amber-600 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        {l.rating}
                      </span>
                      <span>•</span>
                      <span>{l.sessions}+ सत्रे</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        {l.city}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Headline */}
              <p className="text-xs font-semibold text-sage-800 bg-sage-50 p-2.5 rounded-xl border border-sage-200/60">
                “{l.headline}”
              </p>

              {/* Bio */}
              <p className="text-xs text-stone-600 leading-relaxed">
                {l.bio}
              </p>

              {/* Language Badges */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {l.languages.map((lang, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-lg bg-cream-200 text-deep-900 text-[11px] font-medium"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-stone-400 block">परिचय चाचणी</span>
                <span className="font-extrabold text-lg text-deep-900">₹1</span>
                <span className="text-[10px] text-stone-500"> / १५ मिनिटे</span>
              </div>

              <button
                onClick={() => handleBook(l.name)}
                className="px-5 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs shadow-sm hover:scale-105 transition-all"
              >
                {language === 'mr' ? '₹1 ट्रायल बुक करा' : 'Book ₹1 Trial'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListenersPage;
