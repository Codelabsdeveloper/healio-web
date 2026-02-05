'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SquarePlus,
  CreditCard,
  FileText,
  Calendar,
  FlaskConical,
  Pill,
  Coins,
  History,
  Settings,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { ROUTES } from '@/lib/constants';

const mainNav = [
  { href: ROUTES.DASHBOARD, label: 'Home', icon: LayoutDashboard },
  { href: ROUTES.DASHBOARD_SUBSCRIPTION, label: 'My subscription', icon: CreditCard },
  { href: ROUTES.DASHBOARD_HEALTH_RECORDS, label: 'My health records', icon: FileText },
  { href: ROUTES.DASHBOARD_APPOINTMENTS, label: 'Book appointment', icon: Calendar },
  { href: ROUTES.DASHBOARD_LABS, label: 'Order labs', icon: FlaskConical },
  { href: ROUTES.DASHBOARD_MEDICINES, label: 'Order medicines', icon: Pill },
];

const moreNav = [
  { href: ROUTES.DASHBOARD_REDEEM_HISTORY, label: 'Redeem history', icon: History },
  { href: ROUTES.DASHBOARD_COINS, label: 'My Healio Coins', icon: Coins },
  { href: ROUTES.DASHBOARD_SETTINGS, label: 'Settings', icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-dark text-white flex flex-col shrink-0">
      <div className="p-6 border-b border-white/10">
        <Link href={ROUTES.HOME} className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <SquarePlus className="text-white w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold leading-none block">Meds</span>
            <span className="text-[8px] uppercase tracking-widest text-gray-400 font-semibold">
              by Healio MedHealth
            </span>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
          Main
        </p>
        {mainNav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition',
              pathname === href
                ? 'bg-primary text-white'
                : 'text-gray-300 hover:bg-white/5 hover:text-white'
            )}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {label}
          </Link>
        ))}
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mt-6 mb-2">
          More
        </p>
        {moreNav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition',
              pathname === href
                ? 'bg-primary text-white'
                : 'text-gray-300 hover:bg-white/5 hover:text-white'
            )}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <Link
          href={ROUTES.SIGN_IN}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          Logout
        </Link>
      </div>
    </aside>
  );
}
