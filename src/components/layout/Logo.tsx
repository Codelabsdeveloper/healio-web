import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/lib/constants';

export function Logo() {
  return (
    <Link href={ROUTES.HOME} className="flex items-center">
      <Image
        src="/logo.png"
        alt="Healio MedHealth"
        width={160}
        height={48}
        className="h-16 w-auto"
        priority
      />
    </Link>
  );
}
