import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting ManMitra database seed...');

  // 1. Password Hashing
  const defaultPasswordHash = await bcrypt.hash('Manmitra#2026', 10);
  const adminPasswordHash = await bcrypt.hash('Admin#Manmitra2026', 10);

  // 2. Clear Existing Records in safe order
  await prisma.auditLog.deleteMany();
  await prisma.aIUsageRecord.deleteMany();
  await prisma.safetyReport.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.applicantDocument.deleteMany();
  await prisma.careerApplication.deleteMany();
  await prisma.careerJob.deleteMany();
  await prisma.donation.deleteMany();
  await prisma.donationCampaign.deleteMany();
  await prisma.refund.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.chatMessage.deleteMany();
  await prisma.sessionParticipant.deleteMany();
  await prisma.listeningSession.deleteMany();
  await prisma.bookingEvent.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.pricingPlan.deleteMany();
  await prisma.listenerShift.deleteMany();
  await prisma.listenerAvailability.deleteMany();
  await prisma.listenerSkill.deleteMany();
  await prisma.listenerProfile.deleteMany();
  await prisma.categoryTranslation.deleteMany();
  await prisma.listeningCategory.deleteMany();
  await prisma.session.deleteMany();
  await prisma.userConsent.deleteMany();
  await prisma.userProfile.deleteMany();
  await prisma.user.deleteMany();

  // 3. Create Seed Users
  const superAdmin = await prisma.user.create({
    data: {
      email: 'admin@manmitra.org',
      passwordHash: adminPasswordHash,
      fullName: 'ManMitra Administrator',
      phone: '+919800000001',
      role: 'SUPER_ADMIN',
      isEmailVerified: true,
      preferredLang: 'mr',
      profile: {
        create: {
          displayName: 'Admin Head',
          city: 'Pune',
          state: 'Maharashtra',
          bio: 'Platform safeguarding and operational administration.',
        },
      },
    },
  });

  const supervisor = await prisma.user.create({
    data: {
      email: 'supervisor@manmitra.org',
      passwordHash: defaultPasswordHash,
      fullName: 'Radhika Deshmukh',
      phone: '+919800000002',
      role: 'LISTENER_SUPERVISOR',
      isEmailVerified: true,
      preferredLang: 'mr',
      profile: {
        create: {
          displayName: 'Radhika D.',
          city: 'Mumbai',
          state: 'Maharashtra',
          bio: 'Peer listening supervisor and crisis escalation manager.',
        },
      },
    },
  });

  const recruiter = await prisma.user.create({
    data: {
      email: 'recruiter@manmitra.org',
      passwordHash: defaultPasswordHash,
      fullName: 'Vikram Joshi',
      phone: '+919800000003',
      role: 'CAREERS_RECRUITER',
      isEmailVerified: true,
      preferredLang: 'en',
      profile: {
        create: {
          displayName: 'Vikram (HR)',
          city: 'Pune',
          state: 'Maharashtra',
        },
      },
    },
  });

  const customerUser = await prisma.user.create({
    data: {
      email: 'user@manmitra.org',
      passwordHash: defaultPasswordHash,
      fullName: 'Siddharth Kulkarni',
      phone: '+919800000004',
      role: 'CUSTOMER',
      isEmailVerified: true,
      preferredLang: 'mr',
      profile: {
        create: {
          displayName: 'Siddharth',
          city: 'Nashik',
          state: 'Maharashtra',
        },
      },
    },
  });

  // 4. Create 10 Initial Categories with Marathi & Hindi Translations
  const categoriesData = [
    {
      slug: 'stress-and-overthinking',
      nameEn: 'Stress & Overthinking',
      nameMr: 'ताण आणि अतिविचार',
      nameHi: 'तनाव और अत्यधिक सोच',
      descEn: 'When thoughts feel endless, loud, and overwhelming. Unload your mind without fear of judgment.',
      descMr: 'डोक्यात विचारांचं चक्र सतत फिरत राहतंय? मनात दाटून आलेला ताण मोकळा करा.',
      descHi: 'जब दिमाग लगातार विचारों से भर जाता है, तो बिना झिझक अपनी बात कहें।',
      iconKey: 'BrainCircuit',
      displayOrder: 1,
    },
    {
      slug: 'loneliness-and-emotional-support',
      nameEn: 'Loneliness & Emotional Support',
      nameMr: 'एकटेपणा आणि भावनिक साथ',
      nameHi: 'अकेलापन और भावनात्मक सहारा',
      descEn: 'Surrounded by people yet feeling completely alone? We are here to listen with genuine warmth.',
      descMr: 'गर्दीत असूनही मन आतून एकटं वाटतंय? इथे एक संवेदनशील मित्र तुमच्यासाठी उपलब्ध आहे.',
      descHi: 'भीड़ में भी अकेलापन महसूस हो रहा है? हम पूरी आत्मीयता से सुनने के लिए तैयार हैं।',
      iconKey: 'HeartHandshake',
      displayOrder: 2,
    },
    {
      slug: 'relationship-difficulties',
      nameEn: 'Relationship Difficulties',
      nameMr: 'नातेसंबंधातील समस्या',
      nameHi: 'रिश्तों की उलझनें',
      descEn: 'Heartbreak, misunderstandings, unexpressed feelings, or distance with partners.',
      descMr: 'दुरावा, गैरसमज किंवा न बोलता आलेलं दुःख. मोकळेपणाने व्यक्त व्हा.',
      descHi: 'गलतफहमियां, अनकही बातें या रिश्तों में खिंचाव पर दिल खोलकर बात करें।',
      iconKey: 'HeartCrack',
      displayOrder: 3,
    },
    {
      slug: 'family-concerns',
      nameEn: 'Family Concerns',
      nameMr: 'कौटुंबिक अडचणी',
      nameHi: 'पारिवारिक चिंताएं',
      descEn: 'Expectations, intergenerational friction, and unresolved household tension.',
      descMr: 'घरातील वाद, अपेक्षांचं ओझं आणि न सुटणारे प्रश्न. कोणाचीही भीती न बाळगता सांगा.',
      descHi: 'पारिवारिक तनाव और अपेक्षाओं का दबाव साझा करें।',
      iconKey: 'Users',
      displayOrder: 4,
    },
    {
      slug: 'career-and-workplace-stress',
      nameEn: 'Career & Workplace Stress',
      nameMr: 'करिअर आणि कामाचा ताण',
      nameHi: 'करियर और कार्यस्थल का तनाव',
      descEn: 'Burnout, imposter feelings, office politics, job transitions, and work-life balance.',
      descMr: 'कामाचा वाढता बोजा, अनिश्चित भविष्य आणि थकवा. थोडा विसावा घ्या आणि मन हलकं करा.',
      descHi: 'काम का अत्यधिक दबाव और नौकरी की चिंताएं यहां साझा करें।',
      iconKey: 'Briefcase',
      displayOrder: 5,
    },
    {
      slug: 'student-life-and-exam-pressure',
      nameEn: 'Student Life & Exam Pressure',
      nameMr: 'विद्यार्थी जीवन आणि परीक्षांचा ताण',
      nameHi: 'छात्र जीवन और परीक्षा का दबाव',
      descEn: 'Competitive exams (MPSC/UPSC/JEE/NEET), fear of failure, parental pressure.',
      descMr: 'अभ्यासाचं ओझं, अपयशाची भीती आणि भविष्याची चिंता. तुम्ही एकटे नाही आहात.',
      descHi: 'पढ़ाई, परीक्षा और भविष्य के डर को खुलकर साझा करें।',
      iconKey: 'GraduationCap',
      displayOrder: 6,
    },
    {
      slug: 'personal-growth-and-life-decisions',
      nameEn: 'Personal Growth & Life Decisions',
      nameMr: 'व्यक्तिमत्त्व विकास आणि निर्णय',
      nameHi: 'व्यक्तिगत विकास और जीवन के निर्णय',
      descEn: 'Standing at life’s crossroads, finding purpose, self-acceptance, and building inner confidence.',
      descMr: 'जीवनाच्या वळणावर कोणता रस्ता निवडावा? स्वतःशी संवाद साधण्यासाठी साथ.',
      descHi: 'सही दिशा चुनने और खुद को बेहतर समझने के लिए बातचीत।',
      iconKey: 'Compass',
      displayOrder: 7,
    },
    {
      slug: 'grief-and-loss',
      nameEn: 'Grief & Loss',
      nameMr: 'दुःख, शोक आणि विरह',
      nameHi: 'शोक और नुकसान',
      descEn: 'Grieving the loss of a loved one, a dream, health, or an important chapter of life.',
      descMr: 'आपलं माणूस गमावल्याचं अथांग दुःख. इथे अश्रूंना जागा आहे, कोणताही न्याय नाही.',
      descHi: 'किसी अपने को खोने का दर्द साझा करने के लिए एक सुरक्षित स्थान।',
      iconKey: 'Flower2',
      displayOrder: 8,
      safetyNotice: 'For acute distress or overwhelming crises, 24/7 National Support is at Tele-MANAS (14416).',
    },
    {
      slug: 'daily-life-venting',
      nameEn: 'Daily Life Venting',
      nameMr: 'रोजच्या जगण्यातील मन मोकळं करणे',
      nameHi: 'रोजमर्रा की बातों को साझा करना',
      descEn: 'Minor frustrations, bad days, traffic, mundane worries that slowly pile up inside.',
      descMr: 'दिवसभरात साचलेली चिडचिड, थकवा आणि छोटी-मोठी नाराजी मनमोकळेपणाने बोला.',
      descHi: 'दिनभर की थकान और छोटी-मोटी परेशानियां बिना झिझक कहें।',
      iconKey: 'MessageSquareText',
      displayOrder: 9,
    },
    {
      slug: 'just-need-someone-to-listen',
      nameEn: 'Just Need Someone to Listen',
      nameMr: 'फक्त कुणीतरी ऐकून घेणारं हवंय',
      nameHi: 'बस कोई सुनने वाला चाहिए',
      descEn: 'No advice, no lectures, no solutions. Just pure, respectful human presence.',
      descMr: 'सल्ला नको, मार्गदर्शन नको, फक्त शांतपणे मनापासून ऐकून घेणारा एक संवेदनशील मित्र.',
      descHi: 'सलाह नहीं, सिर्फ आदरपूर्वक सुनने वाली एक सच्ची उपस्थिति।',
      iconKey: 'Headphones',
      displayOrder: 10,
    },
  ];

  const createdCategories: any[] = [];
  for (const cat of categoriesData) {
    const created = await prisma.listeningCategory.create({
      data: {
        slug: cat.slug,
        nameEn: cat.nameEn,
        nameMr: cat.nameMr,
        nameHi: cat.nameHi,
        descEn: cat.descEn,
        descMr: cat.descMr,
        descHi: cat.descHi,
        iconKey: cat.iconKey,
        displayOrder: cat.displayOrder,
        safetyNotice: cat.safetyNotice,
      },
    });
    createdCategories.push(created);
  }

  // 5. Create Pricing Plans
  const plansData = [
    {
      code: 'TRIAL_1_INR',
      title: 'Introductory Listening Trial (परिचय सत्र)',
      description: 'Experience safe, unburdened emotional listening for 15 minutes. One-time introductory offer for new users.',
      durationMinutes: 15,
      pricePaise: 100, // ₹1 (100 paise)
      isIntroductory: true,
      isActive: true,
    },
    {
      code: 'STANDARD_20_MIN',
      title: 'Standard Empathetic Listening (मानक सत्र)',
      description: 'A 20-minute focused listening session to untangle thoughts and feel deeply heard.',
      durationMinutes: 20,
      pricePaise: 9900, // ₹99 (9900 paise)
      isIntroductory: false,
      isActive: true,
    },
    {
      code: 'EXTENDED_45_MIN',
      title: 'Deep Unburdening Session (सखोल संवाद)',
      description: 'An extended 45-minute calm space for navigating complex emotions and heavy days.',
      durationMinutes: 45,
      pricePaise: 19900, // ₹199 (19900 paise)
      isIntroductory: false,
      isActive: true,
    },
  ];

  for (const plan of plansData) {
    await prisma.pricingPlan.create({ data: plan });
  }

  // 6. Create Verified Human Listeners
  const listenersSeed = [
    {
      email: 'tanvi.patil@manmitra.org',
      fullName: 'Tanvi Patil (तन्वी पाटील)',
      displayName: 'तन्वी (Tanvi)',
      headline: 'Compassionate Marathi & English Peer Listener | Empathetic & Non-judgmental',
      bio: 'मी पुण्यात राहते. गेली ३ वर्षे सामाजिक क्षेत्रात भावनिक संवादक म्हणून काम करत आहे. कोणत्याही विषयावर मन हलकं करायचं असेल तर मी तुमच्यासोबत आहे.',
      languages: JSON.stringify(['mr', 'en']),
      city: 'Pune',
      rating: 4.95,
      totalSessions: 142,
      hourlyRatePaise: 9900,
      skillCategorySlugs: ['stress-and-overthinking', 'loneliness-and-emotional-support', 'student-life-and-exam-pressure', 'just-need-someone-to-listen'],
    },
    {
      email: 'rohit.shinde@manmitra.org',
      fullName: 'Rohit Shinde (रोहित शिंदे)',
      displayName: 'रोहित (Rohit)',
      headline: 'Active Listener for Workplace, Career Transitions & Daily Stress',
      bio: 'कामाचा ताण, करिअरमधील अस्वस्थता आणि नात्यांमधील गुंतागुंत शांतपणे ऐकून घेणे हे माझे प्राधान्य आहे. मराठी आणि हिंदीमध्ये सहज संवाद.',
      languages: JSON.stringify(['mr', 'hi', 'en']),
      city: 'Mumbai',
      rating: 4.88,
      totalSessions: 98,
      hourlyRatePaise: 9900,
      skillCategorySlugs: ['career-and-workplace-stress', 'stress-and-overthinking', 'daily-life-venting', 'personal-growth-and-life-decisions'],
    },
    {
      email: 'meera.kulkarni@manmitra.org',
      fullName: 'Meera Kulkarni (मीरा कुलकर्णी)',
      displayName: 'मीरा (Meera)',
      headline: 'Gentle listener specializing in Family Dynamics, Grief & Heartfelt Venting',
      bio: 'घरातील अडचणी किंवा प्रिय व्यक्तीच्या विरहाने मन जड झालं असेल, तर मोकळेपणाने व्यक्त व्हा. इथे फक्त आदर आणि मनःपूर्वक साथ मिळेल.',
      languages: JSON.stringify(['mr', 'hi']),
      city: 'Nashik',
      rating: 4.98,
      totalSessions: 215,
      hourlyRatePaise: 9900,
      skillCategorySlugs: ['family-concerns', 'grief-and-loss', 'relationship-difficulties', 'loneliness-and-emotional-support'],
    },
  ];

  for (const lSeed of listenersSeed) {
    const user = await prisma.user.create({
      data: {
        email: lSeed.email,
        passwordHash: defaultPasswordHash,
        fullName: lSeed.fullName,
        role: 'LISTENER',
        preferredLang: 'mr',
        isEmailVerified: true,
        profile: {
          create: {
            displayName: lSeed.displayName,
            city: lSeed.city,
            state: 'Maharashtra',
            bio: lSeed.bio,
          },
        },
      },
    });

    const listenerProfile = await prisma.listenerProfile.create({
      data: {
        userId: user.id,
        displayName: lSeed.displayName,
        headline: lSeed.headline,
        bio: lSeed.bio,
        languagesSpoken: lSeed.languages,
        isVerified: true,
        currentStatus: 'AVAILABLE',
        rating: lSeed.rating,
        totalSessions: lSeed.totalSessions,
        hourlyRatePaise: lSeed.hourlyRatePaise,
      },
    });

    // Add Skills
    for (const slug of lSeed.skillCategorySlugs) {
      const cat = createdCategories.find((c) => c.slug === slug);
      if (cat) {
        await prisma.listenerSkill.create({
          data: {
            listenerId: listenerProfile.id,
            categoryId: cat.id,
          },
        });
      }
    }

    // Add Availabilities (Mon - Sat)
    for (let day = 1; day <= 6; day++) {
      await prisma.listenerAvailability.create({
        data: {
          listenerId: listenerProfile.id,
          dayOfWeek: day,
          startTime: '09:00',
          endTime: '21:00',
          isActive: true,
        },
      });
    }
  }

  // 7. Create Donation Campaigns (Separate Charitable Ledger)
  await prisma.donationCampaign.create({
    data: {
      slug: 'sponsor-student-sessions',
      title: 'Sponsor Emotional Listening for Students (विद्यार्थ्यांना भावनिक साथ)',
      description: 'Help college and competitive exam students across Maharashtra access empathetic listeners without financial barriers.',
      targetPaise: 5000000, // ₹50,000
      raisedPaise: 1850000, // ₹18,500
      isActive: true,
    },
  });

  await prisma.donationCampaign.create({
    data: {
      slug: 'low-income-peer-support',
      title: 'Community Mental Wellness Fund for Low-Income Citizens',
      description: 'Providing subsidized listening access for daily wage workers, homemakers, and senior citizens living alone.',
      targetPaise: 10000000, // ₹1,00,000
      raisedPaise: 3420000, // ₹34,200
      isActive: true,
    },
  });

  // 8. Create Career Job Postings
  const careersSeed = [
    {
      slug: 'emotional-listening-associate-marathi',
      title: 'Emotional Listening Associate (मराठी संवादक)',
      department: 'Listening Services',
      location: 'Remote (Maharashtra)',
      employmentType: 'Part-time / Flexible Shifts',
      languagesReq: JSON.stringify(['mr', 'en']),
      description: 'Join ManMitra as a compassionate listener. Your role is to provide empathetic, non-judgmental human presence to individuals seeking a safe space to share their feelings.',
      responsibilities: 'Actively listen to customers via audio calls and text chat. Maintain strict confidentiality and emotional neutrality. Follow crisis escalation protocols when required.',
      requirements: 'Exceptional Marathi listening comprehension. Empathetic and warm demeanor. High emotional maturity and adherence to platform boundaries.',
      trainingInfo: 'Comprehensive 2-week paid onboarding in empathetic communication, active listening, and safeguarding protocols.',
    },
    {
      slug: 'emotional-listening-associate-hindi',
      title: 'Emotional Listening Associate (हिंदी संवादक)',
      department: 'Listening Services',
      location: 'Remote',
      employmentType: 'Part-time / Flexible Shifts',
      languagesReq: JSON.stringify(['hi', 'en']),
      description: 'Provide heartfelt peer listening in Hindi for individuals facing loneliness, relationship challenges, and everyday anxiety.',
      responsibilities: 'Conduct scheduled listening sessions, reflect emotions gently, and provide respectful human connection without giving unsolicited advice.',
      requirements: 'Fluent Hindi and English communication. Calm, patient, and non-judgmental nature.',
      trainingInfo: 'Full safeguarding, privacy, and active listening certification provided before onboarding.',
    },
    {
      slug: 'listener-supervisor-and-safeguarding-lead',
      title: 'Listener Supervisor & Safeguarding Lead',
      department: 'Operations',
      location: 'Pune / Hybrid',
      employmentType: 'Full-time',
      languagesReq: JSON.stringify(['mr', 'hi', 'en']),
      description: 'Manage live queue operations, oversee listener shift adherence, and coordinate crisis triage with national helplines.',
      responsibilities: 'Monitor live session load, assist listeners with boundary management, conduct de-briefing, and manage safety escalations.',
      requirements: 'Background in Psychology, Social Work, or Call-Center Customer Experience. Strong crisis management abilities.',
      trainingInfo: 'Certified crisis intervention protocol training.',
    },
  ];

  for (const job of careersSeed) {
    await prisma.careerJob.create({ data: job });
  }

  // 9. Initial Platform Settings
  await prisma.platformSetting.create({
    data: {
      key: 'PLATFORM_STATUS',
      value: 'ACTIVE',
      description: 'Overall platform availability status',
    },
  });

  await prisma.platformSetting.create({
    data: {
      key: 'INTRODUCTORY_OFFER_ENABLED',
      value: 'TRUE',
      description: 'Enable ₹1 introductory offer for eligible first-time users',
    },
  });

  console.log('✅ ManMitra seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during database seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
