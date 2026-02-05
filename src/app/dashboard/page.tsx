import Link from 'next/link';
import {
  CreditCard,
  FileText,
  Calendar,
  FlaskConical,
  Pill,
  ArrowRight,
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';

const cards = [
  {
    href: ROUTES.DASHBOARD_SUBSCRIPTION,
    title: 'My subscription',
    description: 'Plan details, validity, and dynamic QR for authentication.',
    icon: CreditCard,
  },
  {
    href: ROUTES.DASHBOARD_HEALTH_RECORDS,
    title: 'My health records',
    description: 'Doctor notes, scans, labs, prescriptions—all in one place.',
    icon: FileText,
  },
  {
    href: ROUTES.DASHBOARD_APPOINTMENTS,
    title: 'Book an appointment',
    description: 'Partner doctors across specialties. Book slots and get reminders.',
    icon: Calendar,
  },
  {
    href: ROUTES.DASHBOARD_LABS,
    title: 'Order labs',
    description: 'Condition-specific, comprehensive, or custom tests. Home collection.',
    icon: FlaskConical,
  },
  {
    href: ROUTES.DASHBOARD_MEDICINES,
    title: 'Order medicines',
    description: 'E-prescription linked orders, track delivery, refill reminders.',
    icon: Pill,
  },
];

export default function DashboardHomePage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark">Welcome back</h1>
        <p className="text-gray-600 mt-1">
          Manage your subscription, appointments, labs, and medicines from one dashboard.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(({ href, title, description, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group block p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition">
              <Icon className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-dark mb-2">{title}</h2>
            <p className="text-sm text-gray-600 mb-4">{description}</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
              Open <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
