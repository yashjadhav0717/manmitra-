import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, HeartHandshake, Shield, AlertTriangle, PhoneCall, RefreshCcw, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  isCrisis?: boolean;
}

export const AIAssistantPage: React.FC = () => {
  const { language } = useAuth();
  const [inputLang, setInputLang] = useState<'mr' | 'hi' | 'en'>(language === 'en' ? 'en' : 'mr');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text:
        inputLang === 'mr'
          ? 'नमस्कार. मी मनमित्र AI आहे. आज तुमच्या मनात काय चाललंय? मनात साचलेला ताण, थकवा किंवा कोणतीही गोष्ट इथे निःसंकोचपणे सांगा. मी तुम्हाला कोणताही सल्ला देणार नाही, फक्त तुमचं मन शांतपणे ऐकून घेईन.'
          : inputLang === 'hi'
          ? 'नमस्ते। मैं मनमित्र AI हूँ। आज आप कैसा महसूस कर रहे हैं? अपने मन की बात बिना किसी झिझक के यहाँ साझा करें। मैं कोई सलाह नहीं दूंगा, बस आपकी बात सुनूँगा।'
          : "Hello. I am ManMitra AI. What is on your mind today? Share whatever feels heavy, confusing, or tiring. I won't give unsolicited advice or judgments—I am here simply to listen.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const promptSuggestions = {
    mr: [
      'आज दिवसभरात खूप थकल्यासारखं वाटतंय...',
      'डोक्यात सतत नकारात्मक विचारांचं वादळ चाललंय...',
      'सगळे सोबत आहेत पण तरीही आतून खूप एकटं वाटतंय...',
      'करिअर आणि भविष्याची प्रचंड भीती वाटतेय...',
    ],
    hi: [
      'आज बहुत ज्यादा तनाव और अकेलापन महसूस हो रहा है...',
      'दिमाग लगातार भाग रहा है और शांत नहीं हो रहा...',
      'रिश्तों की उलझनें समझ नहीं आ रहीं...',
    ],
    en: [
      'I am feeling emotionally exhausted and overwhelmed...',
      'There are too many thoughts racing in my head...',
      'I feel lonely even when surrounded by people...',
    ],
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Crisis indicator check
    const crisisKeywords = ['suicide', 'kill myself', 'आत्महत्या', 'मरावं वाटतं', 'जीवाचं काहीतरी', 'self harm', 'मरना चाहता'];
    const hasCrisis = crisisKeywords.some((kw) => text.toLowerCase().includes(kw));

    setTimeout(() => {
      if (hasCrisis) {
        const crisisMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          isCrisis: true,
          text:
            inputLang === 'mr'
              ? 'तुमचं मन आत्ता खूप तीव्र त्रासात आहे हे मी समजू शकतो. पण कृपया लक्षात ठेवा, तुमचं आयुष्य अत्यंत अमूल्य आहे. मी एक AI आहे आणि अशा गंभीर परिस्थितीत तुम्हाला प्रशिक्षित तज्ज्ञांची तात्काळ गरज आहे. कृपया खालील क्रमांकावर त्वरित संपर्क साधा:'
              : 'I can hear how intensely painful things feel for you right now. Please know that your life is deeply important. Because I am an AI, please reach out directly to emergency national mental health counselors right now:',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, crisisMsg]);
      } else {
        // Empathetic active listening response
        let reply = '';
        if (inputLang === 'mr') {
          reply = `मी तुमचं बोलणं पूर्ण लक्ष देऊन वाचलं. जेव्हा आपण असं अनुभवतो, तेव्हा मनात खूप जडपणा येतो हे अगदी स्वाभाविक आहे. तुमच्या भावना पूर्णपणे रास्त आहेत. तुम्हाला याबद्दल आणखी काही सांगावसं वाटतंय का?`;
        } else if (inputLang === 'hi') {
          reply = `मैं आपकी बात को समझ पा रहा हूँ। ऐसा महसूस होना स्वाभाविक है। क्या आप इस बारे में और कुछ साझा करना चाहेंगे?`;
        } else {
          reply = `Thank you for sharing that with me. It takes courage to put these feelings into words. What you are describing sounds emotionally draining. Would you like to share a bit more about what brought this on?`;
        }

        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
      }
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header */}
      <div className="p-6 rounded-3xl bg-white border border-sage-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-deep-900">ManMitra AI Sanctuary</h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Online & Listening
              </span>
            </div>
            <p className="text-xs text-stone-500">
              {language === 'mr'
                ? 'शांत, सुरक्षित आणि पूर्वग्रहरहित भावनिक ऐकण्याची जागा'
                : 'Empathetic, confidential AI emotional companion'}
            </p>
          </div>
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-1 bg-sage-100/80 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setInputLang('mr')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              inputLang === 'mr' ? 'bg-white text-sage-900 shadow-sm font-bold' : 'text-sage-700'
            }`}
          >
            मराठी
          </button>
          <button
            onClick={() => setInputLang('hi')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              inputLang === 'hi' ? 'bg-white text-sage-900 shadow-sm font-bold' : 'text-sage-700'
            }`}
          >
            हिंदी
          </button>
          <button
            onClick={() => setInputLang('en')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              inputLang === 'en' ? 'bg-white text-sage-900 shadow-sm font-bold' : 'text-sage-700'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* Chat Container */}
      <div className="h-[520px] rounded-3xl bg-white border border-sage-200 shadow-sm flex flex-col overflow-hidden">
        {/* Messages scroll area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-sage-600 text-white'
                    : 'bg-sage-100 text-sage-800 border border-sage-200'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-sage-600" />}
              </div>

              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-sage-600 text-white rounded-tr-none'
                    : msg.isCrisis
                    ? 'bg-rose-50 border-2 border-rose-300 text-rose-900 rounded-tl-none'
                    : 'bg-cream-100 text-deep-900 border border-sage-200/80 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {msg.isCrisis && (
                  <div className="mt-4 pt-3 border-t border-rose-200 space-y-2">
                    <a
                      href="tel:14416"
                      className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-colors"
                    >
                      <PhoneCall className="w-4 h-4" />
                      Tele-MANAS (24x7 टोल-फ्री): 14416
                    </a>
                    <a
                      href="tel:18005990019"
                      className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white border border-rose-300 text-rose-700 font-semibold text-xs hover:bg-rose-50 transition-colors"
                    >
                      KIRAN हेल्पलाईन: 1800-599-0019
                    </a>
                  </div>
                )}

                <div
                  className={`mt-1.5 text-[10px] ${
                    msg.sender === 'user' ? 'text-sage-200 text-right' : 'text-stone-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-xs text-stone-500 italic">
              <Sparkles className="w-4 h-4 text-sage-600 animate-spin" />
              <span>मनमित्र विचार ऐकून घेत आहे...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Pills */}
        <div className="px-6 py-2 bg-cream-50 border-t border-sage-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-stone-400 shrink-0 font-medium">सुझाव:</span>
          {promptSuggestions[inputLang].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="shrink-0 px-3 py-1 rounded-full bg-white border border-sage-200 text-stone-700 hover:border-sage-400 hover:bg-sage-50 transition-colors text-xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-sage-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                inputLang === 'mr'
                  ? 'इथे आपल्या भावना मोकळेपणाने लिहा...'
                  : inputLang === 'hi'
                  ? 'यहाँ अपने विचार बेझिझक लिखें...'
                  : 'Type whatever you are holding inside...'
              }
              className="flex-1 px-4 py-3 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sage-500 text-sm"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-3 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white shadow-md disabled:opacity-40 transition-all shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Connect with human listener referral */}
      <div className="p-6 rounded-3xl bg-sage-50 border border-sage-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sage-200 text-sage-800 flex items-center justify-center shrink-0">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-deep-900">
              {language === 'mr' ? 'खऱ्या माणसाशी बोलायचं आहे का?' : 'Want to speak with a verified human listener?'}
            </h4>
            <p className="text-xs text-stone-600">
              {language === 'mr'
                ? 'आमचे मराठी श्रोते उपलब्ध आहेत. पहिल्या सत्रासाठी फक्त ₹1.'
                : 'Connect with a real trained listener on audio call. Introductory ₹1 trial.'}
            </p>
          </div>
        </div>
        <Link
          to="/listeners"
          className="shrink-0 px-5 py-2.5 rounded-xl bg-deep-900 hover:bg-deep-800 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          {language === 'mr' ? 'श्रोते भेटा (₹1 ट्रायल)' : 'Meet Listeners (₹1)'}
        </Link>
      </div>
    </div>
  );
};

export default AIAssistantPage;
