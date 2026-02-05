# Meds by Healio MedHealth – Web Application

Production-ready Next.js application for **Healio MedHealth**: India's clinically-governed subscription medicine and chronic care platform.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React

## Structure

```
src/
├── app/                    # App Router routes
│   ├── page.tsx            # Landing page
│   ├── get-started/        # Entry to signup/sign-in
│   ├── signup/             # Multi-step signup (OTP, Aadhaar KYC, PIN)
│   ├── sign-in/            # Sign in (OTP / PIN / password)
│   └── dashboard/          # Authenticated dashboard
│       ├── subscription    # Plan, validity, dynamic QR
│       ├── health-records  # Doctor notes, scans, labs, uploads
│       ├── appointments    # Book doctors, calendar slots
│       ├── labs            # Order tests, book collection
│       ├── medicines       # Order medicines, e-prescription, track
│       ├── settings        # Profile, PIN/password
│       ├── coins           # Healio Coins
│       └── redeem-history  # Redemption history
├── components/
│   ├── ui/                 # Button, Input
│   ├── layout/             # Logo
│   ├── landing/            # Navbar, Hero, HowItWorks, etc.
│   └── dashboard/          # Sidebar
├── lib/                    # cn(), constants (ROUTES)
└── types/                  # UserProfile, DoctorCard, LabTestCard, etc.
```

## Scripts

```bash
npm run dev    # Development (http://localhost:3000)
npm run build  # Production build
npm run start  # Start production server
npm run lint   # ESLint
```

## Environment

Copy `.env.example` to `.env.local` and set any API or auth keys when integrating with backend services.

## Design

- **Landing:** Matches the provided index.html (Healio MedHealth branding, primary #0F52BA, secondary #2ECC71, accent #F39C12).
- **Flows:** Aligned with *Healio MedHealth consumer onboard journey v1.1*: signup (details → mobile OTP → email OTP → Aadhaar → Aadhaar OTP → 4-digit PIN), sign-in (OTP / PIN / password), dashboard (subscription, health records, book appointment, order labs, order medicines, sidebar: redeem history, coins, settings, logout).

## Production Notes

- Centralized routes in `src/lib/constants.ts`.
- Reusable UI in `src/components/ui/`; layout and feature components are modular.
- Types in `src/types` for domain models.
- Ready for API integration: replace mock data in dashboard pages with fetch/React Query and add auth guards (e.g. middleware or layout checks) when backend auth is available.
