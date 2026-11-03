import React from 'react';
import { Link } from 'react-router-dom';
import {
  BrainCircuit,
  HeartHandshake,
  HeartCrack,
  Users,
  Briefcase,
  GraduationCap,
  Compass,
  Flower2,
  MessageSquareText,
  Headphones,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const CategoriesPage: React.FC = () => {
  const { language } = useAuth();

  const categories = [
    {
      slug: 'stress-and-overthinking',
      nameMr: 'ताण आणि अतिविचार (Stress & Overthinking)',
      nameEn: 'Stress & Overthinking',
      descMr: 'जेव्हा विचारांचे चक्र थांबत नाही, रात्री झोप येत नाही आणि मन सतत घाबरलेलं असतं. तुमच्या मनातील प्रत्येक विचार इथे मोकळा करा.',
      descEn: 'When thoughts feel endless, loud, and overwhelming. Unload your mind without fear of judgment.',
      icon: BrainCircuit,
    },
    {
      slug: 'loneliness-and-emotional-support',
      nameMr: 'एकटेपणा आणि भावनिक साथ (Loneliness)',
      nameEn: 'Loneliness & Emotional Support',
      descMr: 'मित्रांमध्ये किंवा घरात राहूनही आतून येणारा असह्य एकटेपणा. मनमित्र तुम्हाला एक आपुलकीचा, संवेदनशील कान देतो.',
      descEn: 'Surrounded by people yet feeling completely alone? We are here to listen with genuine warmth.',
      icon: HeartHandshake,
    },
    {
      slug: 'relationship-difficulties',
      nameMr: 'नातेसंबंधातील समस्या (Relationships)',
      nameEn: 'Relationship Difficulties',
      descMr: 'नात्यांमधील दुरावा, संशय, न बोललेले गैरसमज आणि तुटलेल्या विश्वासाचे दुःख. पूर्वग्रहाशिवाय मन हलकं करा.',
      descEn: 'Heartbreak, misunderstandings, unexpressed feelings, or distance with partners.',
      icon: HeartCrack,
    },
    {
      slug: 'family-concerns',
      nameMr: 'कौटुंबिक अडचणी (Family)',
      nameEn: 'Family Concerns',
      descMr: 'घरातील वाद, आई-वडिलांच्या किंवा मुलांच्या अवास्तव अपेक्षांचे ओझे. कोणत्याही भीतीशिवाय आपले मत मांडा.',
      descEn: 'Expectations, intergenerational friction, and unresolved household tension.',
      icon: Users,
    },
    {
      slug: 'career-and-workplace-stress',
      nameMr: 'करिअर आणि कामाचा ताण (Workplace)',
      nameEn: 'Career & Workplace Stress',
      descMr: 'ऑफिसमधील राजकारण, कामाचा वाढता बोजा, नोकरी जाण्याची भीती किंवा बर्नआउट. मन मोकळे करा.',
      descEn: 'Burnout, imposter feelings, office politics, job transitions, and work-life balance.',
      icon: Briefcase,
    },
    {
      slug: 'student-life-and-exam-pressure',
      nameMr: 'विद्यार्थी जीवन आणि परीक्षा (Exams)',
      nameEn: 'Student Life & Exam Pressure',
      descMr: 'MPSC, UPSC, JEE, NEET सारख्या परीक्षांची प्रचंड भीती आणि अपयशाचे ओझे. तुम्ही एकटे नाही आहात.',
      descEn: 'Competitive exams, fear of failure, parental pressure, and career uncertainty.',
      icon: GraduationCap,
    },
    {
      slug: 'personal-growth-and-life-decisions',
      nameMr: 'व्यक्तिमत्त्व आणि निर्णय (Decisions)',
      nameEn: 'Personal Growth & Life Decisions',
      descMr: 'जीवनाच्या महत्त्वाच्या वळणावर निर्णय घेताना होणारी तारांबळ आणि स्वतःवरचा अविश्वास.',
      descEn: 'Standing at life’s crossroads, finding purpose, and building inner confidence.',
      icon: Compass,
    },
    {
      slug: 'grief-and-loss',
      nameMr: 'दुःख, शोक आणि विरह (Grief)',
      nameEn: 'Grief & Loss',
      descMr: 'जवळच्या व्यक्तीचे जाणे किंवा आयुष्यातील अत्यंत महत्त्वाचा टप्पा संपल्याचे तीव्र दुःख. इथे अश्रूंना जागा आहे.',
      descEn: 'Grieving the loss of a loved one, health, or an important chapter of life.',
      icon: Flower2,
    },
    {
      slug: 'daily-life-venting',
      nameMr: 'रोजच्या जगण्यातील मन मोकळे करणे (Venting)',
      nameEn: 'Daily Life Venting',
      descMr: 'दिवसभरात झालेली चिडचिड, रस्त्यावरील ट्रॅफिक, छोटी-मोठी नाराजी जी हळूहळू मनात साचते.',
      descEn: 'Minor frustrations, bad days, traffic, and mundane worries that slowly pile up inside.',
      icon: MessageSquareText,
    },
    {
      slug: 'just-need-someone-to-listen',
      nameMr: 'फक्त कुणीतरी ऐकून घेणारं हवंय (Pure Listening)',
      nameEn: 'Just Need Someone to Listen',
      descMr: 'सल्ला नको, मार्गदर्शन नको, फक्त शांतपणे मनापासून ऐकून घेणारा एक सहृदय मित्र.',
      descEn: 'No advice, no lectures, no solutions. Just pure, respectful human presence.',
      icon: Headphones,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-bold text-deep-900">
          {language === 'mr' ? '१० भावनिक वर्गवाऱ्या' : '10 Empathetic Listening Categories'}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          {language === 'mr'
            ? 'प्रत्येक भावना महत्त्वाची आहे. आपल्या अनुभवाशी सुसंगत असलेली वर्गवारी निवडून मोकळेपणाने व्यक्त व्हा.'
            : 'Every emotion is valid. Select a domain below to find dedicated peer listeners or AI companion.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.slug}
              className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-sage-400 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-deep-900">
                    {language === 'mr' ? c.nameMr : c.nameEn}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    {language === 'mr' ? c.descMr : c.descEn}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                <Link
                  to={`/ai-assistant?topic=${c.slug}`}
                  className="text-xs text-sage-700 font-semibold hover:underline"
                >
                  {language === 'mr' ? 'AI कडे व्यक्त व्हा →' : 'Express to AI →'}
                </Link>
                <Link
                  to={`/listeners?category=${c.slug}`}
                  className="px-4 py-1.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold shadow-sm"
                >
                  {language === 'mr' ? 'श्रोता निवडा (₹1)' : 'Book Listener (₹1)'}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesPage;
