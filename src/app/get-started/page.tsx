import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-light flex flex-col">
      {/*   <header className="border-b border-gray-200 bg-white">
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
      </header> */}
       {/* Logo + tagline */}
       <div className="flex flex-col items-center text-center mt-50 ">
            <Image
              src="/logo.png"
              alt="Healio MedHealth"
              width={220}
              height={80}
              className="h-28 w-auto -mb-4"
            />
            <p className="text-sm font-bold text-[#18627a]">Care Made Simple. Health Made Accessible.</p>
          </div>
      <main className="flex-1 flex items-center justify-center px-4 sm:px-16 py-8 sm:py-12 mb-80" >
        <div className="max-w-md w-full text-center space-y-6 sm:space-y-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#18627a]">
            Get started with Meds
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Create an account to subscribe, book appointments, order labs and medicines, and
            manage your health in one place.
          </p>
          <div className="flex flex-col gap-3 sm:gap-4">
            <Link
              href={ROUTES.SIGN_UP}
              className="w-full bg-primary text-white px-6 py-3 sm:py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition min-h-[48px] touch-manipulation"
            >
              Create account <ArrowRight className="w-5 h-5 shrink-0" />
            </Link>
            <Link
              href={ROUTES.SIGN_IN}
              className="w-full border-2 border-gray-200 text-gray-700 px-6 py-3 sm:py-4 rounded-xl font-bold hover:bg-gray-50 transition text-center min-h-[48px] flex items-center justify-center touch-manipulation"
            >
              I already have an account
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
