import { z } from 'zod';
import {
  RegisterSchema,
  LoginSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  CreateBookingSchema,
  CreatePaymentOrderSchema,
  VerifyPaymentSchema,
  AIChatRequestSchema,
  AIFeedbackSchema,
  CreateDonationSchema,
  JobApplicationSchema,
  CreateSupportTicketSchema,
  CreateSafetyReportSchema,
} from './schemas.js';
import { UserRole, BookingStatus, SessionFormat, ListenerStatus, PaymentStatus } from './enums.js';

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;

export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;
export type CreatePaymentOrderInput = z.infer<typeof CreatePaymentOrderSchema>;
export type VerifyPaymentInput = z.infer<typeof VerifyPaymentSchema>;

export type AIChatRequest = z.infer<typeof AIChatRequestSchema>;
export type AIFeedbackInput = z.infer<typeof AIFeedbackSchema>;

export type CreateDonationInput = z.infer<typeof CreateDonationSchema>;
export type JobApplicationInput = z.infer<typeof JobApplicationSchema>;
export type CreateSupportTicketInput = z.infer<typeof CreateSupportTicketSchema>;
export type CreateSafetyReportInput = z.infer<typeof CreateSafetyReportSchema>;

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  phone?: string | null;
  role: UserRole;
  preferredLang: string;
  isEmailVerified: boolean;
}

export interface CategoryDto {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconKey: string;
  displayOrder: number;
  safetyNotice?: string | null;
  names: {
    mr: string;
    hi: string;
    en: string;
  };
}

export interface ListenerDto {
  id: string;
  userId: string;
  displayName: string;
  headline: string;
  bio: string;
  avatarUrl?: string | null;
  languagesSpoken: string[];
  isVerified: boolean;
  currentStatus: ListenerStatus;
  rating: number;
  totalSessions: number;
  hourlyRatePaise: number;
  categories: { id: string; name: string; slug: string }[];
}

export interface BookingDto {
  id: string;
  bookingNumber: string;
  customerId: string;
  listenerId?: string | null;
  listenerName?: string | null;
  categoryName: string;
  categorySlug: string;
  pricingPlanTitle: string;
  format: SessionFormat;
  status: BookingStatus;
  scheduledStart: string;
  scheduledEnd: string;
  amountPaise: number;
  roomToken?: string | null;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}
