import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { FAQSection } from '@/components/landing/FAQ';
import { ROUTES } from '@/lib/constants';

export default function FAQsPage() {
  return (
    <div className="min-h-screen bg-light">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link
            href={ROUTES.HOME + '#faqs'}
            className="inline-flex items-center gap-1 text-gray-600 hover:text-primary font-medium text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </header>
      <main>
        <FAQSection limit={99} title="FAQs" showViewAll={false} />
      </main>
    </div>
  );
}
