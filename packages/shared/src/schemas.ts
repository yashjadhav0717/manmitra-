import { z } from 'zod';
import { UserRole, SessionFormat } from './enums.js';

// Auth Schemas
export const RegisterSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  phone: z.string().optional(),
  preferredLang: z.enum(['mr', 'hi', 'en']).default('mr'),
  termsConsent: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the Terms of Service & Privacy Policy' }),
  }),
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const ResetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

// Category & Listener Schemas
export const CategoryQuerySchema = z.object({
  lang: z.enum(['mr', 'hi', 'en']).optional(),
  activeOnly: z.boolean().optional().default(true),
});

export const ListenerFilterSchema = z.object({
  language: z.string().optional(),
  categoryId: z.string().optional(),
  format: z.nativeEnum(SessionFormat).optional(),
});

// Booking Schemas
export const CreateBookingSchema = z.object({
  listenerId: z.string().uuid('Invalid listener ID').optional(),
  categoryId: z.string().uuid('Invalid category ID'),
  pricingPlanCode: z.string().min(1, 'Pricing plan code required'),
  format: z.nativeEnum(SessionFormat).default(SessionFormat.AUDIO_CALL),
  scheduledStart: z.string().datetime('Must be valid ISO datetime string'),
  durationMinutes: z.number().int().positive().default(20),
});

// Payment Schemas
export const CreatePaymentOrderSchema = z.object({
  bookingId: z.string().uuid('Invalid booking ID'),
});

export const VerifyPaymentSchema = z.object({
  razorpayOrderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1),
  bookingId: z.string().uuid().optional(),
});

// AI Listening Schemas
export const AIChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1).max(2000),
});

export const AIChatRequestSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').max(1500),
  conversationHistory: z.array(AIChatMessageSchema).max(10).optional().default([]),
  language: z.enum(['mr', 'hi', 'en']).default('mr'),
});

export const AIFeedbackSchema = z.object({
  rating: z.enum(['helpful', 'neutral', 'unhelpful']),
  comment: z.string().max(500).optional(),
  messageSnippet: z.string().max(200).optional(),
});

// Donation Schemas
export const CreateDonationSchema = z.object({
  campaignSlug: z.string().optional(),
  amountRupees: z.number().int().min(1, 'Minimum donation is ₹1'),
  donorName: z.string().min(2).max(100).optional(),
  donorEmail: z.string().email().optional(),
  isAnonymous: z.boolean().default(false),
});

// Careers & Job Application
export const JobApplicationSchema = z.object({
  jobSlug: z.string().min(1),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid 10-digit mobile number required'),
  languagesSpoken: z.array(z.string()).min(1, 'At least one language must be selected'),
  motivationText: z.string().min(50, 'Please share your motivation in at least 50 characters'),
  resumeUrl: z.string().url().optional(),
  consentToProcessing: z.literal(true, {
    errorMap: () => ({ message: 'Consent to processing of application data is required' }),
  }),
});

// Support & Safeguarding Schemas
export const CreateSupportTicketSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

export const CreateSafetyReportSchema = z.object({
  sessionId: z.string().optional(),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH_RISK']).default('HIGH_RISK'),
  reason: z.string().min(5),
  details: z.string().optional(),
});
