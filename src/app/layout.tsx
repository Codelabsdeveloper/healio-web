import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Meds by Healio MedHealth | India\'s Leading Subscription Medicine Platform',
  description:
    'Fixed medicine costs, zero uncertainty. India\'s first clinically-governed adherence platform for chronic care. ₹1,999/month subscription.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased min-h-screen overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
