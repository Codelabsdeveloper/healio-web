'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { ROUTES } from '@/lib/constants';

export const FAQ_ITEMS = [
  {
    id: '1',
    question: 'How do I book a video consultation?',
    answer:
      'Sign in to your dashboard, go to "Book appointment", choose your doctor, and select a date and time. You can opt for video consultation when booking. You’ll get a confirmation and a link to join the call via the app, WhatsApp, or email.',
  },
  {
    id: '2',
    question: 'How do I book for an In-clinic visit?',
    answer:
      'From the dashboard, open "Book appointment", pick your doctor and preferred slot. Select "In-clinic visit" as the consultation type. The confirmation will include the clinic address and any instructions for your visit.',
  },
  {
    id: '3',
    question: 'Where can I see my upcoming or past appointments/consultations?',
    answer:
      'All your appointments appear under "Book appointment" on your dashboard. You can see upcoming visits and past consultations in one place, along with reminders for upcoming ones.',
  },
  {
    id: '4',
    question: 'Can I cancel/reschedule a booking?',
    answer:
      'Yes. Open the appointment from your dashboard and use the cancel or reschedule option. We recommend doing this at least 24 hours in advance. You’ll get a confirmation once the change is done.',
  },
  {
    id: '5',
    question: 'Can I search the Doctor of my choice?',
    answer:
      'Yes. On the "Book appointment" page you’ll see our partner doctors listed by specialty, qualifications, experience, and ratings. You can choose the doctor you prefer and book an available slot.',
  },
] as const;

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: readonly FAQItem[] | FAQItem[];
  title?: string;
  className?: string;
}

/** Reusable accordion for FAQ items (e.g. in dashboard sections). */
export function FAQAccordion({ items, title = 'FAQs', className }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const list = Array.isArray(items) ? items : [...items];

  return (
    <div className={className}>
      <h2 className="text-lg sm:text-xl font-bold text-dark mb-4">{title}</h2>
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
        {list.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              'border-b border-gray-200 last:border-b-0',
              index === 0 && 'rounded-t-xl'
            )}
          >
            <button
              type="button"
              onClick={() => setOpenId(openId === item.id ? null : item.id)}
              className="w-full flex items-center justify-between gap-4 py-3 sm:py-4 px-4 sm:px-5 text-left hover:bg-gray-50/80 transition touch-manipulation min-h-[44px]"
              aria-expanded={openId === item.id}
            >
              <span className="font-medium text-gray-800 pr-2 text-sm sm:text-base">{item.question}</span>
              <ChevronRight
                className={cn(
                  'w-5 h-5 shrink-0 text-gray-500 transition-transform',
                  openId === item.id && 'rotate-90'
                )}
              />
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-200',
                openId === item.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div className="px-4 sm:px-5 pb-3 sm:pb-4 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface FAQSectionProps {
  /** Show only first N items; rest are on "View All" page. If undefined, show all. */
  limit?: number;
  /** Section title */
  title?: string;
  /** Show "View All" link */
  showViewAll?: boolean;
}

export function FAQSection({ limit = 5, title = 'FAQs', showViewAll = true }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const items = limit ? FAQ_ITEMS.slice(0, limit) : [...FAQ_ITEMS];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white" id="faqs">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-6 sm:mb-8">{title}</h2>
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  'border-b border-gray-200 last:border-b-0',
                  index === 0 && 'rounded-t-xl'
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between gap-4 py-4 sm:py-5 px-4 sm:px-5 text-left hover:bg-gray-50/80 transition touch-manipulation min-h-[48px]"
                  aria-expanded={openId === item.id}
                >
                  <span className="font-medium text-gray-800 pr-2">{item.question}</span>
                  <ChevronRight
                    className={cn(
                      'w-5 h-5 shrink-0 text-gray-500 transition-transform',
                      openId === item.id && 'rotate-90'
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-200',
                    openId === item.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showViewAll && (
            <Link
              href={ROUTES.FAQS}
              className="mt-4 inline-flex items-center gap-1 text-primary font-medium hover:underline"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
