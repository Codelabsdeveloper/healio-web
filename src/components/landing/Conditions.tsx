import {
  Droplets,
  Heart,
  Brain,
  Activity,
  Leaf,
  UtensilsCrossed,
  Wind,
  MoreHorizontal,
} from 'lucide-react';

const conditions = [
  { icon: Droplets, label: 'Diabetes' },
  { icon: Heart, label: 'Hypertension' },
  { icon: Brain, label: 'Anxiety' },
  { icon: Activity, label: 'CVD' },
  { icon: Leaf, label: 'Thyroid' },
  { icon: UtensilsCrossed, label: 'GERD' },
    { icon: Wind, label: 'Asthma' },
  { icon: MoreHorizontal, label: 'Many more...' },
];

export function Conditions() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white" id="conditions">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 px-2">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Commonly Managed Conditions</h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Our subscription covers 50+ essential medicines for the most prevalent chronic
            conditions in India.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {conditions.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="p-4 sm:p-6 bg-light rounded-xl sm:rounded-2xl text-center border border-gray-100 hover:border-primary transition group touch-manipulation min-h-[100px] sm:min-h-0 flex flex-col items-center justify-center"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-sm group-hover:bg-primary group-hover:text-white transition text-primary shrink-0">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="font-bold text-sm sm:text-base">{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 md:p-8 bg-primary-50 rounded-2xl sm:rounded-3xl text-center">
          <p className="text-gray-700 italic text-sm sm:text-base">
            &quot;Medicines are the entry point. Adherence is the moat. Predictable care is the
            outcome.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
