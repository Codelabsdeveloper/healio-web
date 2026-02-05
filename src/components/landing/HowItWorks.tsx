import {
  Stethoscope,
  FileText,
  PackageOpen,
  Truck,
  User,
  Shield,
  Package,
  Check,
} from 'lucide-react';

const steps = [
  {
    icon: Stethoscope,
    title: 'Specialist Consult',
    description: 'Guided therapy initiation with a local or chosen specialist.',
    step: 1,
  },
  {
    icon: FileText,
    title: 'Pharmacist Review',
    description: 'Dual-validation for dosage, interactions, and safety.',
    step: 2,
  },
  {
    icon: PackageOpen,
    title: 'Custom Dispensing',
    description: 'Personalized labeling in our managed, licensed facilities.',
    step: 3,
  },
  {
    icon: Truck,
    title: 'Doorstep Refills',
    description: 'Predictable, automated delivery every single month.',
    step: 4,
    highlight: true,
  },
];

const features = [
  {
    icon: User,
    title: 'Clinician-Led Onboarding',
    description:
      'Every member starts with a specialist consultation to ensure guideline-aligned treatment initiation.',
    bullets: ['Local Specialist Access', 'Guideline-Driven care', 'No self-medication'],
  },
  {
    icon: Shield,
    title: 'Dual Validation Model',
    description:
      'Unique second layer of validation by licensed in-house pharmacists for dosage and safety.',
    bullets: ['Pharmacist-Led Review', 'Drug-Interaction Checks', 'Strict Clinical Safety'],
  },
  {
    icon: Package,
    title: 'Personalized Packaging',
    description:
      "India's first personalized dispensing model replaces blister strips with patient-specific bottles.",
    bullets: ['Clear Dosage Labels', 'Improved Adherence', 'Reduced Errors'],
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-white" id="how-it-works">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Redefining Chronic Care Delivery
          </h2>
          <p className="text-gray-600 text-lg">
            Meds addresses the fundamental problem of India&apos;s self-pay healthcare system:
            volatility and lack of clinical oversight.
          </p>
        </div>

        <div className="mb-20">
          <div className="grid md:grid-cols-4 gap-4 relative">
            <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-gray-100 -z-10" />
            {steps.map(({ icon: Icon, title, description, step, highlight }) => (
              <div key={step} className="text-center px-4">
                <div
                  className={`w-20 h-20 ${
                    highlight ? 'bg-secondary' : 'bg-primary'
                  } text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative`}
                >
                  <Icon className="w-8 h-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold text-xs border-4 border-white">
                    {step}
                  </div>
                </div>
                <h4 className="font-bold mb-2">{title}</h4>
                <p className="text-xs text-gray-500">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description, bullets }) => (
            <div key={title} className="p-8 bg-light rounded-3xl hover-lift">
              <div className="w-14 h-14 bg-white shadow-md rounded-2xl flex items-center justify-center text-primary text-2xl mb-6">
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{title}</h3>
              <p className="text-gray-600 mb-4">{description}</p>
              <ul className="text-sm space-y-2 text-gray-500">
                {bullets.map((b) => (
                  <li key={b}>
                    <Check className="inline w-4 h-4 text-secondary mr-2" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
