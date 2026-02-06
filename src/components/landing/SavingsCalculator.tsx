import { HandHelping, Shield, Clock } from 'lucide-react';

export function SavingsCalculator() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="bg-primary rounded-2xl sm:rounded-[3rem] p-4 sm:p-6 md:p-8 lg:p-16 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full -mr-24 sm:-mr-32 -mt-24 sm:-mt-32" />
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center relative">
            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
                Stop Overpaying for Essential Care
              </h2>
              <p className="text-blue-100 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
                Chronic patients in India routinely spend ₹3,000–₹6,000+ per month on repeat
                medications. Meds replaces this volatility with one predictable plan—without
                insurance complexity.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-end gap-2 border-b border-white/20 pb-2 text-sm sm:text-base">
                  <span className="min-w-0">Average Monthly Spend</span>
                  <span className="text-lg sm:text-2xl font-bold shrink-0">₹4,500</span>
                </div>
                <div className="flex justify-between items-end gap-2 border-b border-white/20 pb-2 text-sm sm:text-base">
                  <span className="min-w-0">Meds Subscription</span>
                  <span className="text-lg sm:text-2xl font-bold shrink-0">₹1,999</span>
                </div>
                <div className="flex justify-between items-end gap-2 pt-2 text-secondary font-bold text-sm sm:text-base">
                  <span className="text-base sm:text-lg">Annual Savings</span>
                  <span className="text-2xl sm:text-3xl shrink-0">₹30,012+</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/10">
              <h3 className="font-bold text-lg sm:text-xl mb-4 sm:mb-6">Why This Works</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                    <HandHelping className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <p className="text-xs sm:text-sm min-w-0">
                    Direct-to-patient model eliminates multiple middleman margins.
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <p className="text-xs sm:text-sm min-w-0">
                    In-house dispensing improves margins which we pass to you.
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <p className="text-xs sm:text-sm min-w-0">
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
