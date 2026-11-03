import React from 'react';
import { PhoneCall, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SafetyPage: React.FC = () => {
  const { language } = useAuth();

  const helplines = [
    {
      name: 'Tele-MANAS (भारत सरकार)',
      number: '14416 / 1800-891-4416',
      desc: '२४x७ राष्ट्रीय मानसिक आरोग्य टेली-परामर्श सेवा. २०+ भारतीय भाषांमध्ये उपलब्ध.',
      tel: '14416',
      badge: '24x7 टोल-फ्री',
    },
    {
      name: 'KIRAN मानसिक आरोग्य हेल्पलाईन',
      number: '1800-599-0019',
      desc: 'सामाजिक न्याय आणि सक्षमीकरण मंत्रालय, भारत सरकार.',
      tel: '18005990019',
      badge: '24x7 टोल-फ्री',
    },
    {
      name: 'Vandrevala Foundation',
      number: '+91 9999 666 555',
      desc: 'मानसिक ताण आणि संकट निवारणासाठी २४ तास विनामूल्य समुपदेशन सेवा.',
      tel: '9999666555',
      badge: '24x7',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <span>सुरक्षा, आचारसंहिता आणि संकट निवारण</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-deep-900">
          {language === 'mr' ? 'सुरक्षा आणि आपत्कालीन मदत' : 'Safety & Emergency Resources'}
        </h1>
        <p className="text-stone-600 text-sm">
          {language === 'mr'
            ? 'तुमची सुरक्षितता आणि मानसिक स्वास्थ्य हे आमचे सर्वोच्च प्राधान्य आहे.'
            : 'Your personal safety, privacy, and well-being are at the core of everything we build.'}
        </p>
      </div>

      {/* Emergency Helpline Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-deep-900 flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-coral-500" />
          <span>{language === 'mr' ? '२४x७ राष्ट्रीय संकट निवारण क्रमांक' : '24x7 National Crisis Helplines'}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {helplines.map((h, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 text-[10px] font-bold">
                  {h.badge}
                </span>
                <h3 className="font-bold text-base text-deep-900 mt-2">{h.name}</h3>
                <p className="text-xs text-stone-500 mt-1">{h.desc}</p>
              </div>

              <a
                href={`tel:${h.tel}`}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                {h.number}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Boundaries and non-clinical nature */}
      <div className="p-8 rounded-3xl bg-cream-50 border border-sage-200 space-y-4">
        <div className="flex items-center gap-2 text-sage-800 font-bold text-lg">
          <Shield className="w-5 h-5 text-sage-600" />
          <span>{language === 'mr' ? 'मनमित्र आचारसंहिता व सीमा' : 'ManMitra Non-Clinical Charter'}</span>
        </div>
        <ul className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>भावनिक आधार (Peer Support):</strong> मनमित्र हे प्रशिक्षित मित्रासारखे शांतपणे ऐकून घेण्याचे व्यासपीठ आहे.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>वैद्यकीय उपचारांचा पर्याय नाही:</strong> आमचे श्रोते औषधोपचार किंवा वैद्यकीय मानसोपचार (Psychiatry/Clinical Therapy) करत नाहीत.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>१००% गोपनीयता:</strong> तुमचा कॉल किंवा चॅट संभाषण कोणाशीही शेअर केले जात नाही.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SafetyPage;
