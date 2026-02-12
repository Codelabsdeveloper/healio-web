'use client';

import { useState, useMemo } from 'react';
import { FlaskConical, ChevronLeft, ChevronRight, X, Package, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { LabTestCard } from '@/types';
import { cn } from '@/lib/cn';

const mockTests: LabTestCard[] = [
  {
    id: '1',
    name: 'Diabetes panel',
    category: 'condition',
    sampleTimeline: 'Fasting 8–10 hrs',
    instructions: ['Fasting 8–10 hours', 'No alcohol 24 hours before'],
  },
  {
    id: '2',
    name: 'Complete blood count',
    category: 'comprehensive',
    sampleTimeline: 'Same day',
    instructions: ['No special preparation', 'Carry previous reports'],
  },
  {
    id: '3',
    name: 'Annual health pack',
    category: 'annual',
    sampleTimeline: 'As per pack',
    instructions: ['Fasting if advised', 'Carry previous reports'],
  },
];

const TIME_SLOTS = [
  '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00',
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDaysInMonth(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  return { daysInMonth: last.getDate(), startPad: first.getDay() };
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

export default function LabsPage() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [selectedTestName, setSelectedTestName] = useState<string>('');
  const [calendarYear, setCalendarYear] = useState(() => new Date().getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(() => new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false);

  const { daysInMonth, startPad } = useMemo(
    () => getDaysInMonth(calendarYear, calendarMonth),
    [calendarYear, calendarMonth]
  );

  const today = new Date();
  const minDate = today.toISOString().slice(0, 10);

  const openBooking = (test: LabTestCard) => {
    setSelectedTest(test.id);
    setSelectedTestName(test.name);
    setSelectedDate(null);
    setSelectedTime(null);
    setBooked(false);
    setCalendarYear(today.getFullYear());
    setCalendarMonth(today.getMonth());
  };

  const closeBooking = () => {
    setSelectedTest(null);
    setSelectedTestName('');
    setSelectedDate(null);
    setSelectedTime(null);
    setBooked(false);
  };

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

  const handleConfirmBooking = () => {
    if (selectedDate && selectedTime) setBooked(true);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-xl sm:text-2xl font-bold text-dark mb-2">Order labs</h1>
      <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
        Condition-specific, comprehensive, annual, or custom tests. Book by date and preferred
        time. Get confirmation and reminders (app, WhatsApp, call) and track from booking to
        report.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {mockTests.map((test) => (
          <div
            key={test.id}
            className="p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className="flex items-center gap-2 text-primary mb-2">
              <FlaskConical className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {test.category}
              </span>
            </div>
            <h3 className="font-bold text-lg mb-2">{test.name}</h3>
            <p className="text-sm text-gray-500 mb-2">Sample: {test.sampleTimeline}</p>
            <ul className="text-sm text-gray-600 list-disc list-inside mb-4">
              {test.instructions.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <Button
              className="w-full min-h-[44px] touch-manipulation"
              onClick={() => openBooking(test)}
            >
              Book now
            </Button>
          </div>
        ))}
      </div>

      {selectedTest && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeBooking}
            aria-hidden
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div
              className="relative w-full max-w-2xl bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-xl my-auto"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="lab-booking-modal-title"
            >
              <button
                type="button"
                onClick={closeBooking}
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
                    <h3 className="font-bold text-lg mb-2">Lab booked</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {selectedTestName}
                      <br />
                      {selectedDate &&
                        selectedDate.toLocaleDateString('en-IN', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      <br />
                      Sample collection at {selectedTime}
                    </p>
                    <p className="text-xs text-gray-500 mb-6">
                      Confirmation and reminders (day before, day of) via app, WhatsApp, and
                      pre-recorded call.
                    </p>
                    <Button onClick={closeBooking}>Done</Button>
                  </div>
                ) : (
                  <>
                    <h3 id="lab-booking-modal-title" className="font-bold mb-1 pr-10">
                      Select date & time for sample collection
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">{selectedTestName}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Confirmation and reminders (day before, day of) with instructions via app,
                      WhatsApp, and pre-recorded call.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date
                        </label>
                        <Input
                          type="date"
                          min={minDate}
                          value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ''}
                          onChange={(e) =>
                            setSelectedDate(
                              e.target.value ? new Date(e.target.value + 'T12:00:00') : null
                            )
                          }
                        />
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
                              const todayCell = isToday(d, calendarYear, calendarMonth);
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
                                  onClick={() =>
                                    !past &&
                                    setSelectedDate(new Date(calendarYear, calendarMonth, d))
                                  }
                                  className={cn(
                                    'py-2 rounded-lg text-sm font-medium transition touch-manipulation',
                                    past && 'text-gray-300 cursor-not-allowed',
                                    !past && 'hover:bg-primary-100 text-gray-800',
                                    todayCell && !past && 'ring-1 ring-primary',
                                    isSelected &&
                                      'bg-primary text-white hover:bg-primary-700'
                                  )}
                                >
                                  {d}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred time
                        </label>
                        {selectedDate ? (
                          <div className="grid grid-cols-3 gap-2 max-h-[280px] overflow-y-auto">
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
                          <p className="text-sm text-gray-500 py-4">
                            Select a date first to see available times.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col-reverse sm:flex-row gap-2">
                      <Button
                        onClick={closeBooking}
                        variant="outline"
                        className="w-full sm:w-auto"
                      >
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

      <div className="mt-8 flex items-center justify-between p-4 bg-primary-50 rounded-xl">
        <div>
          <p className="font-medium text-dark">Track my order</p>
          <p className="text-sm text-gray-600">
            Track TAT from booking → phlebotomist → final reports
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowTrackModal(true)}>
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
                  Track lab orders
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Booking → phlebotomist visit → sample collected → report ready
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <Package className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-dark">No lab orders yet</p>
                      <p className="text-sm text-gray-500">
                        Book a test from the list above. Your orders will appear here with status
                        updates.
                      </p>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-4 text-sm text-gray-600">
                    <p className="font-medium text-gray-700 mb-2">Typical timeline</p>
                    <ul className="space-y-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                        Booked – confirmation sent
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                        Phlebotomist assigned – you&apos;ll get a call
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                        Sample collected
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                        Report ready – view in app
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
      <p className="mt-4 text-sm text-gray-500">
        Call us for any lab-related escalation. When a doctor orders a test from their
        software, the same flow applies with automatic triggers.
      </p>
    </div>
  );
}
