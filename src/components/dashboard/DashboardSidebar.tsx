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
  Activity,
  Coins,
  History,
  Settings,
  LogOut,
  LayoutDashboard,
  X,
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
  { href: ROUTES.DASHBOARD_VITALS, label: 'Record vitals', icon: Activity },
];

const moreNav = [
  { href: ROUTES.DASHBOARD_REDEEM_HISTORY, label: 'Redeem history', icon: History },
  { href: ROUTES.DASHBOARD_COINS, label: 'My Healio Coins', icon: Coins },
  { href: ROUTES.DASHBOARD_SETTINGS, label: 'Settings', icon: Settings },
];

interface DashboardSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function DashboardSidebar({ mobileOpen = false, onMobileClose }: DashboardSidebarProps) {
  const pathname = usePathname();

  const navContent = (
    <>
      <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
        <Link href={ROUTES.HOME} className="flex items-center gap-2" onClick={onMobileClose}>
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <SquarePlus className="text-white w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-lg font-bold leading-none block">Meds</span>
            <span className="text-[8px] uppercase tracking-widest text-gray-400 font-semibold">
              by Healio MedHealth
            </span>
          </div>
        </Link>
        {onMobileClose && (
          <button
            type="button"
            onClick={onMobileClose}
            className="md:hidden p-2 -mr-2 text-white hover:bg-white/10 rounded-lg touch-manipulation"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
          Main
        </p>
        {mainNav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onMobileClose}
            className={cn(
              'flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition touch-manipulation min-h-[44px]',
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
            onClick={onMobileClose}
            className={cn(
              'flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition touch-manipulation min-h-[44px]',
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
          onClick={onMobileClose}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition touch-manipulation min-h-[44px]"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          Logout
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile overlay */}
      {onMobileClose && (
        <div
          className={cn(
            'fixed inset-0 bg-black/50 z-40 transition-opacity md:hidden',
            mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          onClick={onMobileClose}
          aria-hidden
        />
      )}
      {/* Sidebar: drawer on mobile, static on desktop */}
      <aside
        className={cn(
          'bg-dark text-white flex flex-col shrink-0 z-50 transition-transform duration-300 ease-out',
          'w-64 min-h-screen',
          onMobileClose
            ? 'fixed inset-y-0 left-0 md:static md:translate-x-0'
            : '',
          onMobileClose && !mobileOpen ? '-translate-x-full md:translate-x-0' : '',
          onMobileClose && mobileOpen ? 'translate-x-0' : ''
        )}
      >
        {navContent}
      </aside>
    </>
  );
}
