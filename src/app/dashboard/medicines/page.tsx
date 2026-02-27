'use client';

import { useState } from 'react';
import {
  Upload,
  FileText,
  Pill,
  MapPin,
  StickyNote,
  XCircle,
  Clock,
  Package,
  Truck,
  CheckCircle,
  Phone,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/* ── Top‑level tabs ─────────────────────────────────────── */
type Tab = 'upload' | 'prescriptions' | 'order';

const tabs: { key: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'upload', label: 'Upload my prescription', icon: Upload },
  { key: 'prescriptions', label: 'My Prescriptions', icon: FileText },
  { key: 'order', label: 'Order My medicines', icon: Pill },
];

/* ── Mock data ──────────────────────────────────────────── */
const mockOrder = {
  id: 'ORD-20260225',
  items: [
    { name: 'Metformin Hydrochloride', dose: '500mg', qty: 30 },
    { name: 'Amlodipine Besylate', dose: '5mg', qty: 30 },
  ],
  address: '42, 2nd Cross, Indiranagar, Bangalore - 560038',
  deliveryInstructions: 'Leave at the door if not available',
  status: 'shipped' as const,
};

const mockHistory = [
  { id: 'ORD-20260210', date: '10 Feb 2026', items: 'Metformin 500mg x30, Amlodipine 5mg x30' },
  { id: 'ORD-20260115', date: '15 Jan 2026', items: 'Metformin 500mg x30' },
  { id: 'ORD-20251220', date: '20 Dec 2025', items: 'Amlodipine 5mg x30, Atorvastatin 10mg x30' },
];

const trackingSteps = [
  { label: 'Order placed', icon: CheckCircle, done: true },
  { label: 'Prescription verified', icon: FileText, done: true },
  { label: 'Processing & packed', icon: Package, done: true },
  { label: 'Shipped', icon: Truck, done: true },
  { label: 'Out for delivery', icon: Truck, done: false },
  { label: 'Delivered', icon: CheckCircle, done: false },
];

const mockPrescriptions = [
  { id: 'RX-001', doctor: 'Dr. Priya Sharma', date: '20 Feb 2026', medicines: 'Metformin 500mg, Amlodipine 5mg' },
  { id: 'RX-002', doctor: 'Dr. Rajesh Kumar', date: '05 Jan 2026', medicines: 'Atorvastatin 10mg' },
];

export default function MedicinesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('order');

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-xl sm:text-2xl font-bold text-dark mb-2">Order medicines</h1>
      <p className="text-gray-600 mb-6 text-sm sm:text-base">
        E-prescription linked orders, track delivery, refill reminders.
      </p>

      {/* ── Tab bar ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={cn(
              'flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-semibold transition touch-manipulation text-left',
              activeTab === key
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-primary/30 hover:bg-primary/5'
            )}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {label}
          </button>
        ))}
      </div>

      {/* ── Upload tab ──────────────────────────────────── */}
      {activeTab === 'upload' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 sm:p-12 text-center hover:border-primary/50 transition cursor-pointer">
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
            <p className="font-semibold text-dark mb-1">Upload your prescription</p>
            <p className="text-sm text-gray-500 mb-4">
              Drag & drop or click to browse. Supports JPG, PNG, PDF.
            </p>
            <Button variant="outline" size="sm">Browse files</Button>
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            Prescription will be verified by our team before processing your order.
          </p>
        </div>
      )}

      {/* ── Prescriptions tab ───────────────────────────── */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-3">
          {mockPrescriptions.map((rx) => (
            <div
              key={rx.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5 flex items-start gap-3"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-dark">{rx.id}</p>
                  <span className="text-xs text-gray-400 shrink-0">{rx.date}</span>
                </div>
                <p className="text-sm text-gray-600 mt-0.5">{rx.doctor}</p>
                <p className="text-sm text-gray-500 mt-1">{rx.medicines}</p>
              </div>
              <button className="text-primary text-sm font-medium hover:underline shrink-0 self-center">
                View
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── Order tab (main layout) ─────────────────────── */}
      {activeTab === 'order' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* ─ Left: My order details ─ */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5 flex flex-col">
            <h2 className="font-bold text-dark mb-4">My order details</h2>

            {/* Medicine list */}
            <div className="space-y-3 mb-4">
              {mockOrder.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-2 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 min-w-0">
                    <Pill className="w-4 h-4 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-dark truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">Dose: {item.dose} · Qty: {item.qty}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivering address */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg mb-3">
              <MapPin className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Delivering to</p>
                <p className="text-sm text-dark mt-0.5">{mockOrder.address}</p>
              </div>
            </div>

            {/* Delivery instructions */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg mb-4">
              <StickyNote className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery instructions</p>
                <p className="text-sm text-dark mt-0.5">{mockOrder.deliveryInstructions}</p>
              </div>
            </div>

            <div className="mt-auto pt-2">
              <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 w-full sm:w-auto">
                <XCircle className="w-4 h-4 mr-2" />
                Cancel the order
              </Button>
            </div>
          </div>

          {/* ─ Right column ─ */}
          <div className="flex flex-col gap-4">
            {/* Order History */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
              <h2 className="font-bold text-dark mb-3">Order history</h2>
              <div className="space-y-3">
                {mockHistory.map((order) => (
                  <div key={order.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-dark">{order.id}</p>
                        <span className="text-xs text-gray-400 shrink-0">{order.date}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{order.items}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 self-center" />
                  </div>
                ))}
              </div>
            </div>

            {/* Track my order */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
              <h2 className="font-bold text-dark mb-1">Track my order</h2>
              <p className="text-xs text-gray-500 mb-4">
                Real-time update on order status right from order receiving till delivery.
              </p>
              <div className="relative pl-4">
                {trackingSteps.map((step, i) => {
                  const Icon = step.icon;
                  const isLast = i === trackingSteps.length - 1;
                  return (
                    <div key={step.label} className="flex items-start gap-3 pb-4 last:pb-0 relative">
                      {/* Vertical line */}
                      {!isLast && (
                        <div className={cn(
                          'absolute left-[7px] top-6 w-0.5 h-[calc(100%-12px)]',
                          step.done ? 'bg-secondary' : 'bg-gray-200'
                        )} />
                      )}
                      <div className={cn(
                        'w-4 h-4 rounded-full flex items-center justify-center shrink-0 relative z-10',
                        step.done ? 'text-secondary' : 'text-gray-300'
                      )}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <p className={cn(
                        'text-sm font-medium -mt-0.5',
                        step.done ? 'text-dark' : 'text-gray-400'
                      )}>
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Call my doctor */}
            <button
              type="button"
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5 flex items-center gap-3 hover:border-primary/30 hover:bg-primary/5 transition touch-manipulation w-full text-left"
            >
              <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-dark">Call my doctor</p>
                <p className="text-sm text-gray-500">Speak to your prescribing doctor</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 ml-auto shrink-0" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Old code (commented out) ────────────────────────────
import { useState } from 'react';
import { Pill, FileText, X, Package, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';
import type { MedicineItem } from '@/types';

const mockMedicines: MedicineItem[] = [
  {
    id: '1',
    name: 'Metformin Hydrochloride',
    strength: '500mg',
    dateOfManufacture: '01/2025',
    dateOfExpiry: '12/2026',
  },
  {
    id: '2',
    name: 'Amlodipine Besylate',
    strength: '5mg',
    dateOfManufacture: '02/2025',
    dateOfExpiry: '01/2027',
  },
];

export default function MedicinesPage() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-xl sm:text-2xl font-bold text-dark mb-2">Order medicines</h1>
      <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
        Scrollable list of medicines with details. E-prescription from partner doctors is
        verified; orders are back-linked to health records. Backend checks and telephonic
        verification apply. For Schedule G/X and when prompted, push notification to prescribing
        doctor for verification. Track order from place to delivery; refill and prescription
        re-verification reminders via app, WhatsApp, and calls.
      </p>

      <div className="mb-6 p-4 bg-primary-50 rounded-xl flex items-center gap-3">
        <FileText className="w-8 h-8 text-primary shrink-0" />
        <div>
          <p className="font-medium text-dark">E-prescription</p>
          <p className="text-sm text-gray-600">
            Link or upload prescription from partner doctor for seamless ordering.
          </p>
        </div>
        <Button asChild size="sm" variant="outline" href={ROUTES.DASHBOARD_HEALTH_RECORDS}>
          Link prescription
        </Button>
      </div>

      <div className="space-y-4">
        {mockMedicines.map((med) => (
          <div
            key={med.id}
            className="p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                <Pill className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">{med.name}</h3>
                <p className="text-sm text-gray-600">Strength: {med.strength}</p>
                {med.dateOfManufacture && (
                  <p className="text-xs text-gray-500">
                    Mfg: {med.dateOfManufacture} · Exp: {med.dateOfExpiry}
                  </p>
                )}
                {med.batchCertificateUrl && (
                  <a
                    href={med.batchCertificateUrl}
                    className="text-sm text-primary hover:underline"
                  >
                    Batch certificate
                  </a>
                )}
              </div>
            </div>
            <Button onClick={() => setOrderPlaced(true)} className="min-h-[44px] touch-manipulation w-full sm:w-auto">Order now</Button>
          </div>
        ))}
      </div>

      {orderPlaced && (
        <div className="mt-8 p-6 bg-secondary-100 border border-secondary/30 rounded-2xl">
          <p className="font-medium text-dark">
            Order placed. Backend will verify e-prescription and may perform telephonic
            verification. For Schedule G/X, doctor verification will be requested. Track your
            order below.
          </p>
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-50 rounded-xl">
        <p className="font-medium text-dark mb-2">Track my order</p>
        <p className="text-sm text-gray-600">
          From order placed till delivery. Reminders for refill and prescription
          re-verification via app, WhatsApp, and pre-recorded calls.
        </p>
        <Button variant="outline" size="sm" className="mt-3" onClick={() => setShowTrackModal(true)}>
          Track
        </Button>
      </div>

      {showTrackModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowTrackModal(false)}
            aria-hidden
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div
              className="relative w-full max-w-md bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-xl my-auto"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="track-modal-title"
            >
              <button
                type="button"
                onClick={() => setShowTrackModal(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-4 sm:p-6">
                <h3 id="track-modal-title" className="font-bold text-lg pr-10 mb-4">
                  Track medicine orders
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  From order placed till delivery at your door
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <Package className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-dark">No orders yet</p>
                      <p className="text-sm text-gray-500">
                        Place an order from the list above. You can track status and delivery here.
                      </p>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-4 text-sm text-gray-600">
                    <p className="font-medium text-gray-700 mb-2">Order timeline</p>
                    <ul className="space-y-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                        Order placed – prescription verified
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                        Processing &amp; packing
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                        Shipped – track delivery
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                        Delivered
                      </li>
                    </ul>
                  </div>
                </div>
                <Button className="w-full mt-4" onClick={() => setShowTrackModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
──────────────────────────────────────────────────────── */
