'use client';

import { useState, useMemo } from 'react';
import { MapPin, Star, Calendar, ChevronLeft, ChevronRight, X, MapPinned, Video, Building2, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FAQAccordion, FAQ_ITEMS } from '@/components/landing/FAQ';
import type { DoctorCard } from '@/types';
import { cn } from '@/lib/cn';

const LOCATIONS = ['All', 'Bangalore', 'Indiranagar', 'Koramangala', 'Whitefield'];
const SPECIALTIES = ['All', 'Endocrinology', 'Cardiology', 'General Physician', 'Dermatology'];
const TIME_OPTIONS = ['All', 'Morning (6 AM – 12 PM)', 'Afternoon (12 PM – 5 PM)', 'Evening (5 PM – 9 PM)'];
const MODE_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'online', label: 'Online' },
  { value: 'offline', label: 'In-clinic' },
  { value: 'both', label: 'Both' },
];

// Mock data with location, specialty, consultation mode, availability
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
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Apollo+Clinic+Indiranagar+Bangalore',
    consultationHours: 'Mon–Fri 9 AM – 5 PM',
    location: 'Indiranagar',
    consultationMode: 'both',
    availability: ['morning', 'afternoon'],
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
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Fortis+Hospital+Koramangala',
    consultationHours: 'Tue–Sat 10 AM – 4 PM',
    location: 'Koramangala',
    consultationMode: 'offline',
    availability: ['morning', 'afternoon'],
  },
  {
    id: '3',
    name: 'Dr. Anitha Reddy',
    specialty: 'General Physician',
    qualifications: 'MBBS, MD',
    experienceYears: 8,
    rating: 4.7,
    reviewCount: 56,
    address: 'Manipal Hospital, Whitefield, Bangalore',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Manipal+Hospital+Whitefield+Bangalore',
    consultationHours: 'Mon–Sat 8 AM – 8 PM',
    location: 'Whitefield',
    consultationMode: 'both',
    availability: ['morning', 'afternoon', 'evening'],
  },
  {
    id: '4',
    name: 'Dr. Suresh Menon',
    specialty: 'Dermatology',
    qualifications: 'MBBS, MD (Derm)',
    experienceYears: 10,
    rating: 4.6,
    reviewCount: 42,
    address: 'Online consultations only',
    consultationHours: 'Mon–Fri 2 PM – 6 PM',
    location: 'Bangalore',
    consultationMode: 'online',
    availability: ['afternoon'],
  },
];

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00',
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDaysInMonth(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const daysInMonth = last.getDate();
  const startPad = first.getDay();
  return { daysInMonth, startPad };
}

function isToday(d: number, year: number, month: number) {
  const today = new Date();
  return today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
}

function isPast(d: number, year: number, month: number) {
  const date = new Date(year, month, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date < today;
}

function getTimeFilterValue(option: string): 'morning' | 'afternoon' | 'evening' | null {
  if (option === 'All') return null;
  if (option.startsWith('Morning')) return 'morning';
  if (option.startsWith('Afternoon')) return 'afternoon';
  if (option.startsWith('Evening')) return 'evening';
  return null;
}

export default function AppointmentsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarYear, setCalendarYear] = useState(() => new Date().getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(() => new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const [filterLocation, setFilterLocation] = useState('All');
  const [filterSpecialty, setFilterSpecialty] = useState('All');
  const [filterTime, setFilterTime] = useState('All');
  const [filterMode, setFilterMode] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<'online' | 'clinics'>('online');

  const filteredDoctors = useMemo(() => {
    let list = [...mockDoctors];

    // Tab filter: Online shows online + both, Clinics shows offline + both
    if (activeTab === 'online') {
      list = list.filter((d) => d.consultationMode === 'online' || d.consultationMode === 'both');
    } else {
      list = list.filter((d) => d.consultationMode === 'offline' || d.consultationMode === 'both');
    }

    if (filterLocation !== 'All') {
      list = list.filter((d) => d.location === filterLocation);
    }
    if (filterSpecialty !== 'All') {
      list = list.filter((d) => d.specialty === filterSpecialty);
    }
    const timeVal = getTimeFilterValue(filterTime);
    if (timeVal) {
      list = list.filter((d) => d.availability?.includes(timeVal));
    }
    if (filterMode !== 'all') {
      list = list.filter((d) => d.consultationMode === filterMode || d.consultationMode === 'both');
    }
    return list;
  }, [activeTab, filterLocation, filterSpecialty, filterTime, filterMode]);

  const activeFilterCount = [filterLocation, filterSpecialty, filterTime, filterMode].filter(
    (v) => v !== 'All' && v !== 'all'
  ).length;

  const { daysInMonth, startPad } = useMemo(
    () => getDaysInMonth(calendarYear, calendarMonth),
    [calendarYear, calendarMonth]
  );

  const goPrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((y) => y - 1);
    } else setCalendarMonth((m) => m - 1);
  };

  const goNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((y) => y + 1);
    } else setCalendarMonth((m) => m + 1);
  };

  const today = new Date();
  const minDate = today.toISOString().slice(0, 10);

  const handleConfirmBooking = () => {
    if (selectedDate && selectedTime) setBooked(true);
  };

  const resetBookingFlow = () => {
    setShowCalendar(false);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setBooked(false);
    setCalendarYear(new Date().getFullYear());
    setCalendarMonth(new Date().getMonth());
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-xl sm:text-2xl font-bold text-dark mb-2">Book an appointment</h1>
      <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
        Partner doctors across specialties. Select a doctor, choose a slot, and get confirmation
        plus reminders via app, WhatsApp, and call.
      </p>

      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold text-lg">Available doctors</h2>
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className={cn(
              'inline-flex items-center justify-center w-10 h-10 rounded-xl border text-sm font-medium transition touch-manipulation relative shrink-0',
              showFilters
                ? 'border-primary bg-primary-50 text-primary'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            )}
            aria-expanded={showFilters}
            aria-label={showFilters ? 'Hide filters' : 'Show filters'}
          >
            <SlidersHorizontal className="w-5 h-5" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Online / Clinics tabs */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('online')}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition touch-manipulation',
                activeTab === 'online'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              )}
            >
              <Video className="w-4 h-4" />
              Online
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('clinics')}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition touch-manipulation',
                activeTab === 'clinics'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              )}
            >
              <Building2 className="w-4 h-4" />
              Clinics / Hospitals
            </button>
          </div>
          {activeTab === 'online' && (
            <p className="text-sm text-gray-500">
              Compulsory Tele Consultation for SOS / 1st Opinion
            </p>
          )}
        </div>

        {showFilters && (
          <div className="p-4 sm:p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Specialty</label>
              <select
                value={filterSpecialty}
                onChange={(e) => setFilterSpecialty(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {SPECIALTIES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Time</label>
              <select
                value={filterTime}
                onChange={(e) => setFilterTime(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Consultation mode</label>
              <select
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {MODE_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-4">
          {filteredDoctors.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No doctors match your filters. Try changing them.</p>
          ) : (
            filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-lg">{doc.name}</h3>
                    <p className="text-primary font-medium">
                      {doc.specialty} · {doc.qualifications}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {doc.experienceYears} years experience
                    </p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                        {doc.consultationMode === 'online' && <Video className="w-3.5 h-3.5" />}
                        {doc.consultationMode === 'offline' && <Building2 className="w-3.5 h-3.5" />}
                        {doc.consultationMode === 'both' && (
                          <>
                            <Video className="w-3.5 h-3.5" />
                            <Building2 className="w-3.5 h-3.5" />
                          </>
                        )}
                        {doc.consultationMode === 'online' && 'Online'}
                        {doc.consultationMode === 'offline' && 'In-clinic'}
                        {doc.consultationMode === 'both' && 'Online & In-clinic'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Star className="w-4 h-4 text-accent fill-current" />
                      <span className="text-sm font-medium">{doc.rating}</span>
                      <span className="text-sm text-gray-500">({doc.reviewCount} reviews)</span>
                    </div>
                    {doc.address && (
                      <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span>{doc.address}</span>
                      </div>
                    )}
                    {doc.consultationHours && (
                      <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                        <Calendar className="w-4 h-4 shrink-0" />
                        {doc.consultationHours}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    {(doc.mapLink || doc.address) && (
                      <a
                        href={doc.mapLink ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doc.address ?? '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium touch-manipulation"
                        aria-label="Open in Google Maps"
                      >
                        <MapPinned className="w-4 h-4" />
                        Map
                      </a>
                    )}
                    <Button
                      onClick={() => {
                        setSelectedDoctor(doc.id);
                        setShowCalendar(true);
                      }}
                      className="min-h-[44px] touch-manipulation w-full sm:w-auto"
                    >
                      Book appointment
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showCalendar && selectedDoctor && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={resetBookingFlow}
            aria-hidden
          />
          {/* Popup modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div
              className="relative w-full max-w-2xl bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-xl my-auto"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-modal-title"
            >
              <button
                type="button"
                onClick={resetBookingFlow}
                className="absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-4 sm:p-6">
          {booked ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mx-auto text-white text-2xl mb-4">
                ✓
              </div>
              <h3 className="font-bold text-lg mb-2">Appointment booked</h3>
              <p className="text-sm text-gray-600 mb-4">
                {selectedDate && selectedTime && (
                  <>
                    {selectedDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    <br />
                    at {selectedTime}
                  </>
                )}
              </p>
              <p className="text-xs text-gray-500 mb-6">
                You&apos;ll receive confirmation and reminders via app, WhatsApp, and call.
              </p>
              <Button onClick={resetBookingFlow}>Book another</Button>
            </div>
          ) : (
            <>
              <h3 id="booking-modal-title" className="font-bold mb-4 pr-10">Select date & time</h3>
              <p className="text-sm text-gray-500 mb-4">
                Choose an available slot. You&apos;ll get a confirmation and reminders before the
                appointment.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Left: Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <Input
                    type="date"
                    min={minDate}
                    value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ''}
                    onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value + 'T12:00:00') : null)}
                  />
                  {/* Calendar grid (desktop) */}
                  <div className="mt-4 hidden sm:block">
                    <div className="flex items-center justify-between mb-3">
                      <button
                        type="button"
                        onClick={goPrevMonth}
                        className="p-2 rounded-lg hover:bg-gray-100 touch-manipulation"
                        aria-label="Previous month"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <span className="font-semibold text-gray-800">
                        {MONTHS[calendarMonth]} {calendarYear}
                      </span>
                      <button
                        type="button"
                        onClick={goNextMonth}
                        className="p-2 rounded-lg hover:bg-gray-100 touch-manipulation"
                        aria-label="Next month"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {DAYS.map((d) => (
                        <div key={d} className="text-xs font-medium text-gray-500 py-1">
                          {d}
                        </div>
                      ))}
                      {Array.from({ length: startPad }, (_, i) => (
                        <div key={`pad-${i}`} className="py-2" />
                      ))}
                      {Array.from({ length: daysInMonth }, (_, i) => {
                        const d = i + 1;
                        const past = isPast(d, calendarYear, calendarMonth);
                        const today = isToday(d, calendarYear, calendarMonth);
                        const isSelected =
                          selectedDate &&
                          selectedDate.getDate() === d &&
                          selectedDate.getMonth() === calendarMonth &&
                          selectedDate.getFullYear() === calendarYear;
                        return (
                          <button
                            key={d}
                            type="button"
                            disabled={past}
                            onClick={() => !past && setSelectedDate(new Date(calendarYear, calendarMonth, d))}
                            className={cn(
                              'py-2 rounded-lg text-sm font-medium transition touch-manipulation',
                              past && 'text-gray-300 cursor-not-allowed',
                              !past && 'hover:bg-primary-100 text-gray-800',
                              today && !past && 'ring-1 ring-primary',
                              isSelected && 'bg-primary text-white hover:bg-primary-700'
                            )}
                          >
                            {d}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right: Time slots (after selecting date) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  {selectedDate ? (
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={cn(
                            'py-2.5 rounded-xl text-sm font-medium border transition touch-manipulation',
                            selectedTime === slot
                              ? 'border-primary bg-primary text-white'
                              : 'border-gray-200 hover:border-primary hover:bg-primary-50 text-gray-800'
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 py-4">Select a date first to see available times.</p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse sm:flex-row gap-2">
                <Button onClick={resetBookingFlow} variant="outline" className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmBooking}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full sm:w-auto min-h-[48px] touch-manipulation"
                >
                  Confirm booking
                </Button>
              </div>
            </>
          )}
              </div>
            </div>
          </div>
        </>
      )}

      <section className="mt-10 sm:mt-12 pt-8 border-t border-gray-200">
        <FAQAccordion items={FAQ_ITEMS} title="FAQs" />
      </section>
    </div>
  );
}
