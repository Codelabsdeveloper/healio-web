import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { PersonalizedDispensing } from '@/components/landing/PersonalizedDispensing';
import { AppFeatures } from '@/components/landing/AppFeatures';
import { Conditions } from '@/components/landing/Conditions';
import { SavingsCalculator } from '@/components/landing/SavingsCalculator';
import { Pricing } from '@/components/landing/Pricing';
import { FAQSection } from '@/components/landing/FAQ';
import { Footer } from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <div className="bg-light text-foreground font-sans scroll-smooth min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <PersonalizedDispensing />
        <AppFeatures />
        <Conditions />
        <SavingsCalculator />
        <Pricing />
        {/* <FAQSection limit={5} showViewAll /> */}
      </main>
      <Footer />
    </div>
  );
}
