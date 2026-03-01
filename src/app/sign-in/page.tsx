'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ROUTES } from '@/lib/constants';

type Mode = 'identifier' | 'otp' | 'pin' | 'password';

export default function SignInPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('identifier');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isEmail = identifier.includes('@');

  const sendOtp = () => {
    setError('');
    if (!identifier.trim()) {
      setError('Enter mobile number or email');
      return;
    }
    setMode('otp');
  };

  const verifyOtp = () => {
    setError('');
    if (!otp.trim()) {
      setError('Enter the OTP we sent you');
      return;
    }
    router.push(ROUTES.DASHBOARD);
  };

  const signInWithPin = () => {
    setError('');
    if (pin.length !== 4) {
      setError('Enter your 4-digit PIN');
      return;
    }
    router.push(ROUTES.DASHBOARD);
  };

  const signInWithPassword = () => {
    setError('');
    if (!password) {
      setError('Enter your password');
      return;
    }
    router.push(ROUTES.DASHBOARD);
  };

  return (
    <div className="min-h-screen bg-light flex flex-col">
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Link href={ROUTES.HOME} className="w-fit">
            <Image
              src="/logo.png"
              alt="Healio MedHealth"
              width={160}
              height={48}
              className="h-16 w-auto"
              priority
            />
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center px-4 sm:px-6 pt-10 sm:pt-16 pb-6 sm:pb-8 overflow-auto">
        <div className="w-full max-w-md space-y-4 sm:space-y-6">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center text-center mb-16">
            <Image
              src="/logo.png"
              alt="Healio MedHealth"
              width={220}
              height={80}
              className="h-28 w-auto -mb-4"
            />
            <p className="text-sm font-bold text-[#18627a]">Care Made Simple. Health Made Accessible.</p>
          </div>

         {/* <h1 className="text-xl sm:text-2xl font-bold text-dark text-center">Sign in </h1> */}

          {mode === 'identifier' && (
            <>
              
              <Input
                label="Mobile or email"
                type={isEmail ? 'email' : 'tel'}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. 9876543210 or you@example.com"
              />
              <p className="text-gray-600 text-sm">
                Enter your mobile number or email to receive an OTP, or sign in with PIN/password.
              </p>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button className="w-full min-h-[48px] touch-manipulation" size="lg" onClick={sendOtp}>
                Send OTP
              </Button>
              <div className="flex gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => setMode('pin')}
                  className="text-sm text-primary hover:underline"
                >
                  Sign in with PIN
                </button>
                <button
                  type="button"
                  onClick={() => setMode('password')}
                  className="text-sm text-primary hover:underline"
                >
                  Sign in with password
                </button>
              </div>
            </>
          )}

          {mode === 'otp' && (
            <>
              <p className="text-gray-600 text-sm">
                Enter the 6-digit OTP sent to {identifier}.
              </p>
              <Input
                label="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                maxLength={6}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button className="w-full min-h-[48px] touch-manipulation" size="lg" onClick={verifyOtp}>
                Verify & sign in
              </Button>
              <button
                type="button"
                onClick={() => setMode('identifier')}
                className="block w-full text-sm text-primary hover:underline"
              >
                Use different number/email
              </button>
            </>
          )}

          {mode === 'pin' && (
            <>
              <p className="text-gray-600 text-sm">
                Enter your 4-digit PIN to sign in.
              </p>
              <Input
                label="4-digit PIN"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="••••"
                maxLength={4}
                inputMode="numeric"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button className="w-full min-h-[48px] touch-manipulation" size="lg" onClick={signInWithPin}>
                Sign in
              </Button>
              <button
                type="button"
                onClick={() => setMode('identifier')}
                className="block w-full text-sm text-primary hover:underline"
              >
                Use OTP or password instead
              </button>
            </>
          )}

          {mode === 'password' && (
            <>
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button className="w-full min-h-[48px] touch-manipulation" size="lg" onClick={signInWithPassword}>
                Sign in
              </Button>
              <button
                type="button"
                onClick={() => setMode('identifier')}
                className="block w-full text-sm text-primary hover:underline"
              >
                Use OTP or PIN instead
              </button>
            </>
          )}

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href={ROUTES.SIGN_UP} className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
