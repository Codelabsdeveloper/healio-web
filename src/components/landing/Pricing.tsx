import Link from 'next/link';
import { Check } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

const benefits = [
  'Unlimited 50+ Common Generic Medicines',
  'Specialist Consultation Included',
  'Personalized Bottle Dispensing',
  'Digital Adherence Tracker',
  'NABL Quality Tested Batch Assurance',
];

export function Pricing() {
  return (
    <section className="py-20 bg-light" id="benefits">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              Most Popular
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-2">Meds Chronic Plan</h3>
          <div className="flex justify-center items-baseline mb-6 gap-2">
            <span className="text-5xl font-extrabold text-primary">₹1,999</span>
            <span className="text-gray-500">/ month</span>
          </div>
          <div className="text-left space-y-4 mb-8">
            {benefits.map((text) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-secondary-20 text-secondary rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-gray-700">{text}</span>
              </div>
            ))}
          </div>
          <Link
            href={ROUTES.GET_STARTED}
            className="block w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary-700 transition shadow-lg text-center"
          >
            Join Subscription Now
          </Link>
          <p className="mt-4 text-xs text-gray-400">
            Not insurance. Designed for out-of-pocket medical spending.
          </p>
        </div>
      </div>
    </section>
  );
}
