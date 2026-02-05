import Link from 'next/link';
import { SquarePlus } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export function Logo() {
  return (
    <Link href={ROUTES.HOME} className="flex items-center gap-2">
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
  );
}
