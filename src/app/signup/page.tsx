'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ROUTES } from '@/lib/constants';

type Step = 'details' | 'aadhaar' | 'aadhaar-otp' | 'pin' | 'success';

const STEPS: Step[] = [
  'details',
  'aadhaar',
  'aadhaar-otp',
  'pin',
  'success',
];

export default function SignUpPage() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    mobile: '',
    email: '',
    aadhaar: '',
    otpAadhaar: '',
    pin: '',
    pinConfirm: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const step = STEPS[stepIndex];

  const update = (key: string, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: '' }));
  };

  /*const validateStep = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 'details') {
      if (!form.name.trim()) e.name = 'Name is required';
      if (!form.dateOfBirth) e.dateOfBirth = 'Date of birth is required';
      if (!form.gender) e.gender = 'Please select gender';
      if (!form.address.trim()) e.address = 'Address is required';
      if (!form.mobile.trim()) e.mobile = 'Mobile number is required';
      if (!form.email.trim()) e.email = 'Email is required';
    }
    if (step === 'aadhaar') {
      // Aadhaar validation disabled — no validations for Aadhaar number
      // if (!form.aadhaar.trim()) e.aadhaar = 'Aadhaar number is required';
      // else if (!/^\d{12}$/.test(form.aadhaar.replace(/\s/g, ''))) e.aadhaar = 'Enter valid 12-digit Aadhaar';
    }
    if (step === 'aadhaar-otp' && !form.otpAadhaar.trim()) e.otpAadhaar = 'Enter OTP';
    if (step === 'pin') {
      if (form.pin.length !== 4) e.pin = 'PIN must be 4 digits';
      if (form.pin !== form.pinConfirm) e.pinConfirm = 'PINs do not match';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };*/

  const next = () => {
    // TODO: Uncomment this when validation is implemented
    //  if (!validateStep()) return;
    if (stepIndex < STEPS.length - 1) setStepIndex(stepIndex + 1);
    else router.push(ROUTES.SIGN_IN);
  };

  return (
    <div className="min-h-screen bg-light flex flex-col">
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Link href={ROUTES.HOME} className="flex items-center gap-2 w-fit">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <SquarePlus className="text-white w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold text-primary leading-none block">Meds</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
                by Healio MedHealth
              </span>
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8 overflow-auto">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <p className="text-sm text-gray-500">
              Step {stepIndex + 1} of {STEPS.length}
            </p>
            <div className="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          {step === 'details' && (
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-xl sm:text-2xl font-bold text-dark">Create your account</h1>
              <p className="text-gray-600 text-xs sm:text-sm">
                Enter your details as per Aadhaar. Next you&apos;ll verify with Aadhaar OTP.
              </p>
              <Input
                label="Full name"
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                error={errors.name}
                placeholder="As per Aadhaar"
              />
              <Input
                label="Date of birth"
                type="date"
                required
                value={form.dateOfBirth}
                onChange={(e) => update('dateOfBirth', e.target.value)}
                error={errors.dateOfBirth}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  {['male', 'female', 'other'].map((g) => (
                    <label key={g} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={form.gender === g}
                        onChange={(e) => update('gender', e.target.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="capitalize">{g}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && (
                  <p className="text-sm text-red-500 mt-1">{errors.gender}</p>
                )}
              </div>
              <Input
                label="Address"
                required
                value={form.address}
                onChange={(e) => update('address', e.target.value)}
                error={errors.address}
                placeholder="As per Aadhaar"
              />
              <Input
                label="Mobile number"
                type="tel"
                required
                value={form.mobile}
                onChange={(e) => update('mobile', e.target.value)}
                error={errors.mobile}
                placeholder="10-digit mobile"
              />
              <Input
                label="Email"
                type="email"
                required
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                error={errors.email}
              />
              <Button className="w-full min-h-[48px] touch-manipulation" size="lg" onClick={next}>
                Continue to Aadhaar verification
              </Button>
            </div>
          )}

          {step === 'aadhaar' && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Aadhaar verification (KYC)</h1>
              <p className="text-gray-600 text-sm">
                We&apos;ll send an OTP to your registered mobile to verify your Aadhaar.
              </p>
              {/* Aadhaar: no validation — error prop omitted */}
              <Input
                label="Aadhaar number"
                value={form.aadhaar}
                onChange={(e) =>
                  update('aadhaar', e.target.value.replace(/\D/g, '').slice(0, 12))
                }
                placeholder="12-digit Aadhaar"
                maxLength={12}
              />
              <Button className="w-full min-h-[48px] touch-manipulation" size="lg" onClick={next}>
                Generate OTP
              </Button>
            </div>
          )}

          {step === 'aadhaar-otp' && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Aadhaar OTP</h1>
              <p className="text-gray-600 text-sm">
                Enter the OTP sent to your Aadhaar-linked mobile.
              </p>
              <Input
                label="OTP"
                value={form.otpAadhaar}
                onChange={(e) =>
                  update('otpAadhaar', e.target.value.replace(/\D/g, '').slice(0, 6))
                }
                error={errors.otpAadhaar}
                placeholder="000000"
                maxLength={6}
              />
              <Button className="w-full min-h-[48px] touch-manipulation" size="lg" onClick={next}>
                Verify Aadhaar
              </Button>
            </div>
          )}

          {step === 'pin' && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Set your 4-digit PIN</h1>
              <p className="text-gray-600 text-sm">
                Use this PIN or your password to sign in securely.
              </p>
              <Input
                label="4-digit PIN"
                type="password"
                value={form.pin}
                onChange={(e) =>
                  update('pin', e.target.value.replace(/\D/g, '').slice(0, 4))
                }
                error={errors.pin}
                placeholder="••••"
                maxLength={4}
                inputMode="numeric"
              />
              <Input
                label="Confirm PIN"
                type="password"
                value={form.pinConfirm}
                onChange={(e) =>
                  update('pinConfirm', e.target.value.replace(/\D/g, '').slice(0, 4))
                }
                error={errors.pinConfirm}
                placeholder="••••"
                maxLength={4}
                inputMode="numeric"
              />
              <Button className="w-full min-h-[48px] touch-manipulation" size="lg" onClick={next}>
                Complete signup
              </Button>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto text-white text-3xl">
                ✓
              </div>
              <h1 className="text-2xl font-bold">Signup successful</h1>
              <p className="text-gray-600">
                You can now Sign in to your account.
              </p>
              <Button className="w-full min-h-[48px] touch-manipulation" size="lg" onClick={() => router.push(ROUTES.DASHBOARD)}>
                Go to Dashboard
              </Button>
            </div>
          )}

         {/* <p className="mt-6 text-center text-sm text-gray-500">
         //   Already have an account?{' '}
         //   <Link href={ROUTES.SIGN_IN} className="text-primary font-medium hover:underline">
         //     Sign in
         //   </Link>
          // </p>
          */}
        </div>
      </main>
    </div>
  );
}
