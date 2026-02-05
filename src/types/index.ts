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
