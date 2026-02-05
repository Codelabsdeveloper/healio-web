'use client';

import { useState } from 'react';
import { MapPin, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { DoctorCard } from '@/types';

// Mock data per document: name, specialty, qualifications, experience, ratings, address, consultation hours
const mockDoctors: DoctorCard[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    specialty: 'Endocrinology',
    qualifications: 'MD, DM (Endo)',
    experienceYears: 12,
    rating: 4.8,
    reviewCount: 124,
    address: 'Apollo Clinic, Indiranagar, Bangalore',
    mapLink: '#',
    consultationHours: 'Mon–Fri 9 AM – 5 PM',
  },
  {
    id: '2',
    name: 'Dr. Rajesh Kumar',
    specialty: 'Cardiology',
    qualifications: 'MD, DM (Cardio)',
    experienceYears: 15,
    rating: 4.9,
    reviewCount: 89,
    address: 'Fortis Hospital, Koramangala',
    consultationHours: 'Tue–Sat 10 AM – 4 PM',
  },
];

export default function AppointmentsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-dark mb-2">Book an appointment</h1>
      <p className="text-gray-600 mb-8">
        Partner doctors across specialties. Select a doctor, choose a slot, and get confirmation
        plus reminders via app, WhatsApp, and call.
      </p>

      <div className="space-y-6">
        <h2 className="font-semibold text-lg">Available doctors</h2>
        <div className="grid gap-4">
          {mockDoctors.map((doc) => (
            <div
              key={doc.id}
              className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg">{doc.name}</h3>
                  <p className="text-primary font-medium">
                    {doc.specialty} · {doc.qualifications}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {doc.experienceYears} years experience
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="w-4 h-4 text-accent fill-current" />
                    <span className="text-sm font-medium">{doc.rating}</span>
                    <span className="text-sm text-gray-500">({doc.reviewCount} reviews)</span>
                  </div>
                  {doc.address && (
                    <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 shrink-0" />
                      {doc.address}
                    </div>
                  )}
                  {doc.consultationHours && (
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <Calendar className="w-4 h-4 shrink-0" />
                      {doc.consultationHours}
                    </p>
                  )}
                </div>
                <div className="shrink-0">
                  <Button
                    onClick={() => {
                      setSelectedDoctor(doc.id);
                      setShowCalendar(true);
                    }}
                  >
                    Book appointment
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCalendar && selectedDoctor && (
        <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-lg">
          <h3 className="font-bold mb-4">Select date & time</h3>
          <p className="text-sm text-gray-500 mb-4">
            Choose an available slot. You&apos;ll get a confirmation and reminders before the
            appointment.
          </p>
          <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500">
            Calendar grid (availability and timings) – integrate with your booking API
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => setShowCalendar(false)} variant="outline">
              Cancel
            </Button>
            <Button>Confirm booking</Button>
          </div>
        </div>
      )}
    </div>
  );
}
