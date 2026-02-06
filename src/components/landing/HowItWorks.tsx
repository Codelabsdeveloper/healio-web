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
    <section className="py-12 sm:py-16 md:py-20 bg-white" id="how-it-works">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
            Redefining Chronic Care Delivery
          </h2>
          <p className="text-gray-600 text-base sm:text-lg px-2">
            Meds addresses the fundamental problem of India&apos;s self-pay healthcare system:
            volatility and lack of clinical oversight.
          </p>
        </div>

        <div className="mb-12 sm:mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative">
            <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-gray-100 -z-10" />
            {steps.map(({ icon: Icon, title, description, step, highlight }) => (
              <div key={step} className="text-center px-2 sm:px-4">
                <div
                  className={`w-14 h-14 sm:w-20 sm:h-20 ${
                    highlight ? 'bg-secondary' : 'bg-primary'
                  } text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-6 shadow-xl relative`}
                >
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs border-2 sm:border-4 border-white">
                    {step}
                  </div>
                </div>
                <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">{title}</h4>
                <p className="text-[11px] sm:text-xs text-gray-500">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map(({ icon: Icon, title, description, bullets }) => (
            <div key={title} className="p-4 sm:p-6 md:p-8 bg-light rounded-2xl sm:rounded-3xl hover-lift">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white shadow-md rounded-xl sm:rounded-2xl flex items-center justify-center text-primary mb-4 sm:mb-6">
                <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{title}</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">{description}</p>
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
