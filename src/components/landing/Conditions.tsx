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
    <section className="py-20 bg-white" id="conditions">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Commonly Managed Conditions</h2>
          <p className="text-gray-600">
            Our subscription covers 50+ essential medicines for the most prevalent chronic
            conditions in India.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {conditions.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="p-6 bg-light rounded-2xl text-center border border-gray-100 hover:border-primary transition group"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:bg-primary group-hover:text-white transition text-primary">
                <Icon className="w-6 h-6" />
              </div>
              <span className="font-bold">{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-12 p-8 bg-primary-50 rounded-3xl text-center">
          <p className="text-gray-700 italic">
            &quot;Medicines are the entry point. Adherence is the moat. Predictable care is the
            outcome.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
