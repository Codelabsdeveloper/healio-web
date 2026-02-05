import { RefreshCw, Bot, TrendingUp, Apple } from 'lucide-react';
import Image from 'next/image';

export function AppFeatures() {
  const items = [
    {
      icon: RefreshCw,
      title: 'Auto-Refill Support',
      description: 'Uninterrupted therapy with automated shipping based on your cycle.',
    },
    {
      icon: Bot,
      title: 'AI-Enabled EMR Hub',
      description:
        'Continuity of care through longitudinal health tracking and AI-driven clinical decision workflows.',
    },
    {
      icon: TrendingUp,
      title: 'Health Progress Monitoring',
      description: 'Track vitals, adherence levels, and health trends in one intuitive dashboard.',
    },
    {
      icon: Apple,
      title: 'Multidisciplinary Guidance',
      description:
        'Integrated lifestyle, diet, and physical activity support tailored for chronic conditions.',
    },
  ];

  return (
    <section className="py-20 bg-light" id="app">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <div className="relative rounded-[3rem] shadow-2xl border-8 border-white overflow-hidden aspect-[4/5] bg-gray-200">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="App Interface"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2 space-y-6">
            <h2 className="text-4xl font-bold">Your Health Care Hub</h2>
            <p className="text-gray-600 text-lg">
              The Meds mobile app acts as the command center for your long-term health. Built on
              AI-enabled EMR systems, it bridges the gap between medicine and outcomes.
            </p>
            <div className="space-y-4">
              {items.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100"
                >
                  <div className="text-primary text-xl">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">{title}</h4>
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
