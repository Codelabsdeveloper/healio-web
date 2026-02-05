import { HandHelping, Shield, Clock } from 'lucide-react';

export function SavingsCalculator() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-primary rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
          <div className="grid md:grid-cols-2 gap-12 items-center relative">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Stop Overpaying for Essential Care
              </h2>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Chronic patients in India routinely spend ₹3,000–₹6,000+ per month on repeat
                medications. Meds replaces this volatility with one predictable plan—without
                insurance complexity.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-white/20 pb-2">
                  <span>Average Monthly Spend</span>
                  <span className="text-2xl font-bold">₹4,500</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/20 pb-2">
                  <span>Meds Subscription</span>
                  <span className="text-2xl font-bold">₹1,999</span>
                </div>
                <div className="flex justify-between items-end pt-2 text-secondary font-bold">
                  <span className="text-lg">Annual Savings</span>
                  <span className="text-3xl">₹30,012+</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10">
              <h3 className="font-bold text-xl mb-6">Why This Works</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                    <HandHelping className="w-5 h-5" />
                  </div>
                  <p className="text-sm">
                    Direct-to-patient model eliminates multiple middleman margins.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <p className="text-sm">
                    In-house dispensing improves margins which we pass to you.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <p className="text-sm">
                    Subscription focus builds predictable revenue and high retention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
