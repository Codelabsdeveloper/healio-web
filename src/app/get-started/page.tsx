import { redirect } from 'next/navigation';
import Link from 'next/link';
import { SquarePlus, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function GetStartedPage() {
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
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-md w-full text-center space-y-6 sm:space-y-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-dark">
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
