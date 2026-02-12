/**
 * Shared domain and UI types for Healio MedHealth.
 */

export interface UserProfile {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  mobile: string;
  email: string;
  address: string;
  aadhaarVerified?: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  priceMonthly: number;
  validityEnd: string;
  qrCode?: string;
}

export type ConsultationMode = 'online' | 'offline' | 'both';
export type AvailabilityTime = 'morning' | 'afternoon' | 'evening';

export interface DoctorCard {
  id: string;
  name: string;
  specialty: string;
  qualifications: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  address?: string;
  mapLink?: string;
  consultationHours?: string;
  /** City or area for location filter */
  location?: string;
  /** Online, in-clinic, or both */
  consultationMode?: ConsultationMode;
  /** When they are available (for time filter) */
  availability?: AvailabilityTime[];
}

export interface LabTestCard {
  id: string;
  name: string;
  category: 'condition' | 'comprehensive' | 'annual' | 'custom';
  sampleTimeline: string;
  instructions: string[];
}

export interface MedicineItem {
  id: string;
  name: string;
  strength: string;
  dateOfManufacture?: string;
  dateOfExpiry?: string;
  batchCertificateUrl?: string;
}

export type AuthMode = 'pin' | 'password';
