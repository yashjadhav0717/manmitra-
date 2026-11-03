import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Headphones,
  Shield,
  Heart,
  BrainCircuit,
  HeartHandshake,
  HeartCrack,
  Users,
  Briefcase,
  GraduationCap,
  Compass,
  Flower2,
  MessageSquareText,
  Clock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HomePageProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenAuth }) => {
  const { language } = useAuth();

  const categories = [
    {
      slug: 'stress-and-overthinking',
      nameMr: 'ताण आणि अतिविचार',
      nameEn: 'Stress & Overthinking',
      descMr: 'डोक्यात सतत विचारांचं चक्र फिरतंय? मनात साठलेला ताण हलका करा.',
      descEn: 'When thoughts feel endless, loud, and overwhelming.',
      icon: BrainCircuit,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      slug: 'loneliness-and-emotional-support',
      nameMr: 'एकटेपणा आणि भावनिक साथ',
      nameEn: 'Loneliness & Support',
      descMr: 'गर्दीत असूनही आतून एकटं वाटतंय? इथे एक संवेदनशील मित्र तुमच्यासाठी आहे.',
      descEn: 'Surrounded by people yet feeling isolated inside.',
      icon: HeartHandshake,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      slug: 'relationship-difficulties',
      nameMr: 'नातेसंबंधातील समस्या',
      nameEn: 'Relationships',
      descMr: 'गैरसमज, न बोलता आलेलं दुःख किंवा दुरावा. कोणाच्याही पूर्वग्रहाशिवाय बोला.',
      descEn: 'Misunderstandings, heartbreak, and unexpressed feelings.',
      icon: HeartCrack,
      color: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      slug: 'family-concerns',
      nameMr: 'कौटुंबिक अडचणी',
      nameEn: 'Family Concerns',
      descMr: 'घरातील वाद, अपेक्षांचं ओझं आणि न सुटणारे प्रश्न मोकळेपणाने मांडा.',
      descEn: 'Expectations, household tension, and friction.',
      icon: Users,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      slug: 'career-and-workplace-stress',
      nameMr: 'करिअर आणि कामाचा ताण',
      nameEn: 'Career & Work Stress',
      descMr: 'कामाचा वाढता बोजा, नोकरीची अनिश्चितता आणि थकवा हलका करा.',
      descEn: 'Burnout, imposter feelings, and work fatigue.',
      icon: Briefcase,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      slug: 'student-life-and-exam-pressure',
      nameMr: 'विद्यार्थी जीवन आणि परीक्षा',
      nameEn: 'Student Life & Exams',
      descMr: 'स्पर्धा परीक्षा (MPSC/UPSC/JEE), अपयशाची भीती. तुम्ही एकटे नाही आहात.',
      descEn: 'Competitive exams, parent pressure, and fear of failure.',
      icon: GraduationCap,
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    },
    {
      slug: 'personal-growth-and-life-decisions',
      nameMr: 'व्यक्तिमत्त्व आणि निर्णय',
      nameEn: 'Life Decisions',
      descMr: 'जीवनाच्या वळणावर कोणता निर्णय घ्यावा? स्वतःच्या विचारांशी संवाद साधा.',
      descEn: 'Crossroads, purpose, and inner confidence.',
      icon: Compass,
      color: 'bg-violet-50 text-violet-700 border-violet-200',
    },
    {
      slug: 'grief-and-loss',
      nameMr: 'दुःख, शोक आणि विरह',
      nameEn: 'Grief & Loss',
      descMr: 'आपलं माणूस गमावल्याचं अथांग दुःख. इथे अश्रूंना सुरक्षित जागा आहे.',
      descEn: 'Grieving the loss of a loved one or life chapter.',
      icon: Flower2,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      slug: 'daily-life-venting',
      nameMr: 'रोजच्या जगण्यातील मन मोकळे',
      nameEn: 'Daily Life Venting',
      descMr: 'दिवसभरात साचलेली चिडचिड, थकवा आणि छोटी-मोठी नाराजी बोला.',
      descEn: 'Everyday frustrations, exhaustion, and bad days.',
      icon: MessageSquareText,
      color: 'bg-orange-50 text-orange-700 border-orange-200',
    },
    {
      slug: 'just-need-someone-to-listen',
      nameMr: 'फक्त कुणीतरी ऐकणारं हवंय',
      nameEn: 'Just Need a Listener',
      descMr: 'सल्ला नको, मार्गदर्शन नको. फक्त शांतपणे ऐकून घेणारा एक सहृदय मित्र.',
      descEn: 'No lectures, no unsolicited solutions. Just pure presence.',
      icon: Headphones,
      color: 'bg-teal-50 text-teal-700 border-teal-200',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Decorative badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage-100 border border-sage-300 text-sage-800 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-sage-600" />
          <span>{language === 'mr' ? 'अपूर्व शांतता आणि मोकळेपणा' : 'Zero Advice. Pure Empathetic Listening.'}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-deep-900 leading-[1.15] max-w-4xl mx-auto">
          {language === 'mr' ? (
            <>
              “तुमचं मन. तुमच्या भावना.{' '}
              <span className="text-sage-600 underline decoration-sage-300 decoration-wavy">
                आमची साथ.
              </span>”
            </>
          ) : (
            <>
              “You Don’t Always Need Answers.{' '}
              <span className="text-sage-600 underline decoration-sage-300 decoration-wavy">
                Sometimes, You Just Need to Be Heard.
              </span>”
            </>
          )}
        </h1>

        <p className="mt-6 text-base sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
          {language === 'mr'
            ? 'मनात दाटून आलेलं कोणालाही न सांगता साचवून ठेवू नका. मनमित्र आपल्याला एक सुरक्षित, पूर्वग्रहरहित आणि पूर्णपणे गोपनीय जागा देतो.'
            : 'Unburden your mind without fear of judgment, lectures, or unsolicited advice. A culturally rooted sanctuary for thoughtful expression.'}
        </p>

        {/* Dual Mode Cards (Human vs AI) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
          {/* Card 1: AI Instant Listening */}
          <div className="p-8 rounded-3xl bg-white border border-sage-200 shadow-xl shadow-sage-600/5 hover:border-sage-400 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="inline-block px-2.5 py-1 rounded-md bg-sage-100 text-sage-800 text-xs font-bold">
                {language === 'mr' ? 'तात्काळ आणि मोफत' : 'Instant & Confidential'}
              </div>
              <h3 className="text-2xl font-bold text-deep-900">
                {language === 'mr' ? 'मन मोकळं करा (AI संवादी)' : 'AI Listening Sanctuary'}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                {language === 'mr'
                  ? 'मनात साचलेले विचार आत्ता लगेच लिहून हलके करा. कोणताही न्याय नाही, सल्ला नाही; फक्त तुमचे विचार शांतपणे समजून घेणारा AI साथीदार.'
                  : 'Start venting immediately in Marathi, Hindi, or English. Completely free, confidential, and compassionate with 24/7 safety triage.'}
              </p>
            </div>
            <div className="mt-8">
              <Link
                to="/ai-assistant"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white font-semibold text-sm shadow-md transition-all"
              >
                <span>{language === 'mr' ? 'आताच मन मोकळं करा' : 'Open AI Sanctuary'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Verified Human Listener */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-cream-50 to-sage-50/70 border-2 border-sage-300 shadow-xl shadow-sage-600/10 hover:border-sage-500 transition-all flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-coral-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              ₹1 Introductory Trial
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-coral-50 text-coral-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Headphones className="w-6 h-6" />
              </div>
              <div className="inline-block px-2.5 py-1 rounded-md bg-coral-100 text-coral-800 text-xs font-bold">
                {language === 'mr' ? 'प्रशिक्षित मानव श्रोते' : 'Verified Human Listeners'}
              </div>
              <h3 className="text-2xl font-bold text-deep-900">
                {language === 'mr' ? 'मानव श्रोत्याशी बोला' : 'Talk to a Human Listener'}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                {language === 'mr'
                  ? 'मराठी किंवा हिंदी बोलणाऱ्या संवेदनशील, प्रशिक्षित श्रोत्यांशी ऑडिओ कॉल किंवा चॅटवर संवाद साधा. पहिल्या सत्रासाठी फक्त ₹1.'
                  : 'Book an audio or text session with trained empathetic listeners. Share your story freely with zero judgment. ₹1 trial offer available.'}
              </p>
            </div>
            <div className="mt-8">
              <Link
                to="/listeners"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-deep-900 hover:bg-deep-800 text-white font-semibold text-sm shadow-md transition-all"
              >
                <span>{language === 'mr' ? 'श्रोते निवडा आणि बुक करा (₹1)' : 'Meet Listeners & Book (₹1)'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-deep-900">
            {language === 'mr' ? 'तुम्हाला कशाबद्दल बोलायचं आहे?' : 'What Would You Like to Share?'}
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            {language === 'mr'
              ? 'आमच्या १० विशिष्ट भावनिक वर्गवाऱ्यांमधून आपल्या मनाला जवळचा विषय निवडा.'
              : 'Choose any of our 10 emotional listening domains to connect with the right space.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                to={`/listeners?category=${cat.slug}`}
                className="p-6 rounded-2xl bg-white border border-stone-200/80 hover:border-sage-400 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl border ${cat.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-deep-900 group-hover:text-sage-700 transition-colors">
                      {language === 'mr' ? cat.nameMr : cat.nameEn}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      {language === 'mr' ? cat.descMr : cat.descEn}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Transparent ₹1 Trial Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-sage-800 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-sage-700 text-sage-200 text-xs font-bold uppercase tracking-wider">
              {language === 'mr' ? 'विशेष परिचय ऑफर' : 'Special Introductory Trial'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">
              {language === 'mr' ? 'फक्त ₹1 मध्ये १५ मिनिटांचे भावनिक सत्र' : 'Experience 15 Mins of Empathetic Listening for ₹1'}
            </h2>
            <p className="text-sm text-sage-200 leading-relaxed">
              {language === 'mr'
                ? 'कोणतीही छुपी वर्गणी नाही, कोणतीही जबरदस्ती नाही. फक्त ऐकून घेण्याचा दिलासा अनुभवण्यासाठी आमची पारदर्शक ₹1 ऑफर.'
                : 'No recurring subscriptions, no hidden clauses. A nominal ₹1 gateway test to experience genuine emotional relief.'}
            </p>
          </div>
          <Link
            to="/pricing"
            className="shrink-0 px-8 py-4 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm shadow-lg hover:scale-105 transition-all text-center"
          >
            {language === 'mr' ? 'ऑफर पहा आणि स्लॉट निवडा' : 'View Offer & Book Slot'}
          </Link>
        </div>
      </section>

      {/* Safety & Non-judgmental Commitment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 space-y-2">
            <Shield className="w-8 h-8 text-sage-600 mb-2" />
            <h3 className="font-bold text-deep-900 text-lg">
              {language === 'mr' ? '१००% खाजगी आणि गोपनीय' : '100% Confidential'}
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              {language === 'mr'
                ? 'तुमचा संवाद फक्त तुमच्या आणि श्रोत्यादरम्यान राहतो. आम्ही कोणताही वैयक्तिक डेटा विकत नाही.'
                : 'End-to-end respect for your privacy. Your emotional conversations are strictly between you and your listener.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 space-y-2">
            <Heart className="w-8 h-8 text-coral-500 mb-2" />
            <h3 className="font-bold text-deep-900 text-lg">
              {language === 'mr' ? 'सल्ला नाही, फक्त ऐकणे' : 'Listening, Not Lecturing'}
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              {language === 'mr'
                ? 'आम्ही तुम्हाला काय करावं हे सांगायला बसलेलो नाही. तुमच्या भावना समजून घेणं हेच आमचं ध्येय आहे.'
                : 'We prioritize active listening and empathy over unsolicited solutions or premature advice.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 space-y-2">
            <Clock className="w-8 h-8 text-sage-600 mb-2" />
            <h3 className="font-bold text-deep-900 text-lg">
              {language === 'mr' ? 'तुमच्या वेळेनुसार' : 'On Your Schedule'}
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              {language === 'mr'
                ? 'सकाळी ९ ते रात्री १० दरम्यान आपल्या सोयीचा स्लॉट निवडा आणि शांततेत संवाद साधा.'
                : 'Book slots that fit your daily rhythm. Text chat or audio call options available.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
