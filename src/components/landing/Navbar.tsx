'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/cn';

const navLinks = [
  { href: '#how-it-works', label: 'How it Works' },
  { href: '#benefits', label: 'Benefits' },
  { href: '#conditions', label: 'Conditions' },
  { href: '#app', label: 'The App' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed w-full z-50 glass-morphism shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Logo />
          <div className="hidden md:flex gap-10 items-center font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary transition text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild href={ROUTES.GET_STARTED} variant="primary" size="md">
              Get Started
            </Button>
          </div>
          <button
            type="button"
            className="md:hidden p-2 text-2xl text-foreground"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <div
        className={cn(
          'fixed inset-0 bg-dark/95 z-[60] flex flex-col items-center justify-center gap-6 sm:gap-8 text-white text-xl sm:text-2xl font-bold transition-transform duration-300 safe-area-padding',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <button
          type="button"
          className="absolute top-6 right-6 text-4xl p-2"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X className="w-8 h-8" />
        </button>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-primary transition"
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href={ROUTES.GET_STARTED}
          className="bg-primary px-8 py-3 rounded-full hover:bg-primary-700 transition min-h-[44px] inline-flex items-center justify-center touch-manipulation"
          onClick={() => setMobileOpen(false)}
        >
          Get Started
        </Link>
      </div>
    </>
  );
}
