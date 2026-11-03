import React from 'react';
import { HeartHandshake, Shield, Heart, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AboutPage: React.FC = () => {
  const { language } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-bold text-deep-900">
          {language === 'mr' ? 'मनमित्र बद्दल (About Us)' : 'About ManMitra'}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          {language === 'mr'
            ? '“तुमचं मन. तुमच्या भावना. आमची साथ.” — भावनिक संवाद आणि खऱ्या ऐकण्याची चळवळ.'
            : 'A mission born out of empathy, understanding, and the power of non-judgmental human listening.'}
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6 text-sm text-stone-700 leading-relaxed">
        <h2 className="text-xl font-bold text-deep-900">
          {language === 'mr' ? 'आमची मूळ प्रेरणा' : 'Our Founding Purpose'}
        </h2>
        <p>
          आजच्या वेगवान, सोशल मीडियाच्या जगात माणसांच्या संपर्कात वाढ झाली असली, तरीही एकाकीपणा आणि आतून वाटणारा जडपणा कित्येक पटींनी वाढला आहे. अनेकदा आपल्याला कोणाकडूनही सल्ले, मार्गदर्शन किंवा सूचना नको असतात; आपल्याला फक्त असं कोणीतरी हवं असतं जे कोणत्याही पूर्वग्रहाशिवाय, शांतपणे आपलं मन ऐकून घेईल.
        </p>
        <p>
          महाराष्ट्रातील संवेदनशील सांस्कृतिक मूल्ये आणि आधुनिक तंत्रज्ञानाचा मेळ घालून **मनमित्र** ची निर्मिती करण्यात आली आहे. मराठी, हिंदी आणि इंग्रजी भाषेत सहज व्यक्त होण्याची संधी देणे आणि समाजात मानसिक स्वास्थ्याबद्दल असणारी भीती कमी करणे हे आमचे उद्दिष्ट आहे.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
          <div className="p-4 rounded-2xl bg-cream-100 space-y-1">
            <h4 className="font-bold text-deep-900">संवेदनशीलता</h4>
            <p className="text-xs text-stone-500">प्रत्येक व्यक्तीचा अनुभव आणि भावना अद्वितीय आणि आदरणीय आहेत.</p>
          </div>
          <div className="p-4 rounded-2xl bg-cream-100 space-y-1">
            <h4 className="font-bold text-deep-900">गोपनीयता</h4>
            <p className="text-xs text-stone-500">तुमचा संवाद १००% खाजगी आणि सुरक्षित राहण्याची खात्री.</p>
          </div>
          <div className="p-4 rounded-2xl bg-cream-100 space-y-1">
            <h4 className="font-bold text-deep-900">सुलभता</h4>
            <p className="text-xs text-stone-500">पहिल्या सत्रासाठी फक्त ₹1 चे प्रायोगिक शुल्क.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
