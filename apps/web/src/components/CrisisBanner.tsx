import React, { useState } from 'react';
import { PhoneCall, AlertCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const CrisisBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const { language } = useAuth();

  if (dismissed) return null;

  return (
    <div className="bg-sage-900 text-white text-xs sm:text-sm py-2 px-4 shadow-sm transition-all border-b border-sage-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <AlertCircle className="w-4 h-4 text-coral-500 shrink-0" />
          <span className="font-medium">
            {language === 'mr' ? (
              <>
                तात्काळ मदतीची गरज आहे का? २४x७ राष्ट्रीय मानसिक आरोग्य हेल्पलाईन:
              </>
            ) : (
              <>
                Need immediate emergency support? 24x7 National Mental Health Helpline:
              </>
            )}
          </span>
          <a
            href="tel:14416"
            className="inline-flex items-center gap-1 font-bold text-coral-500 hover:underline bg-sage-800/80 px-2 py-0.5 rounded"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            Tele-MANAS: 14416
          </a>
          <span className="text-sage-400">|</span>
          <a
            href="tel:18005990019"
            className="font-bold text-coral-500 hover:underline bg-sage-800/80 px-2 py-0.5 rounded"
          >
            KIRAN: 1800-599-0019
          </a>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-sage-300 hover:text-white p-1"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CrisisBanner;
