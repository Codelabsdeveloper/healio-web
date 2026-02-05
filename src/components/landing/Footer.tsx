import Link from 'next/link';
import { SquarePlus } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

const platformLinks = [
  { label: 'Medicines Covered', href: '#conditions' },
  { label: 'Subscription Model', href: '#benefits' },
  { label: 'Partner Pharmacies', href: '#' },
  { label: 'Personalized Packaging', href: '#how-it-works' },
];

const clinicalLinks = [
  { label: 'NABL Lab Results', href: '#' },
  { label: 'Clinical Guidelines', href: '#' },
  { label: 'Pharmacist Validation', href: '#' },
  { label: 'Specialist Network', href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <SquarePlus className="text-white w-4 h-4" />
              </div>
              <div>
                <span className="text-lg font-bold text-white leading-none block">Meds</span>
                <span className="text-[8px] uppercase tracking-widest text-gray-400 font-semibold">
                  by Healio MedHealth
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Rebuilding trust in medicines through clinical governance and personalized care.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Platform</h4>
            <ul className="text-gray-400 space-y-3 text-sm">
              {platformLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Clinical</h4>
            <ul className="text-gray-400 space-y-3 text-sm">
              {clinicalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="#"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"
                aria-label="Twitter"
              >
                𝕏
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"
                aria-label="Instagram"
              >
                📷
              </a>
            </div>
            <p className="text-sm text-gray-400">Available in Select Cities Across India</p>
          </div>
        </div>
        <hr className="border-white/10 mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Healio MedHealth. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
