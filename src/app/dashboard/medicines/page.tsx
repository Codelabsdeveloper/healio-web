'use client';

import { useState } from 'react';
import { Pill, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-dark mb-2">Order medicines</h1>
      <p className="text-gray-600 mb-8">
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
        <Button size="sm" variant="outline">
          Link prescription
        </Button>
      </div>

      <div className="space-y-4">
        {mockMedicines.map((med) => (
          <div
            key={med.id}
            className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
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
            <Button onClick={() => setOrderPlaced(true)}>Order now</Button>
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
        <Button variant="outline" size="sm" className="mt-3">
          Track
        </Button>
      </div>
    </div>
  );
}
