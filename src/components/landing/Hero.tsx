import Link from 'next/link';
import { ArrowRight, Pill, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';

export function Hero() {
  return (
    <section className="pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-block px-4 py-1 bg-primary-100 text-primary text-sm font-bold rounded-full uppercase tracking-wider">
            Clinically Governed Platform
          </span>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Fixed Medicine Costs. <br />
            <span className="gradient-text">Zero Uncertainty.</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Convert unpredictable monthly medicine spending into a fixed ₹1,999 subscription.
            India&apos;s first clinically-governed adherence platform for chronic care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild href="#benefits" variant="primary" size="lg">
              Start Subscription <ArrowRight className="ml-2 w-5 h-5 inline" />
            </Button>
            <Button asChild href="#conditions" variant="outline" size="lg">
              View Medicines Covered
            </Button>
          </div>
          <div className="flex items-center gap-4 pt-6">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"
                  aria-hidden
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 font-medium">
              Join 5,000+ members managing chronic care
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10" />
          <div className="bg-white p-8 rounded-3xl shadow-2xl relative">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                NABL CERTIFIED TESTED
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Diabetes Management</p>
                    <p className="text-xs text-gray-500">Metformin 500mg, etc.</p>
                  </div>
                </div>
                <span className="text-secondary font-bold text-sm">Included</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center text-secondary">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Hypertension</p>
                    <p className="text-xs text-gray-500">Amlodipine 5mg, etc.</p>
                  </div>
                </div>
                <span className="text-secondary font-bold text-sm">Included</span>
              </div>
              <div className="p-6 bg-primary text-white rounded-2xl mt-4">
                <p className="text-sm opacity-80 uppercase tracking-wider mb-1">
                  Fixed Monthly Subscription
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">₹1,999</span>
                  <span className="text-sm">/ month</span>
                </div>
                <hr className="my-4 border-white/20" />
                <p className="text-xs leading-relaxed italic">
                  Unlimited access to 50+ commonly prescribed generic medicines for chronic
                  conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
