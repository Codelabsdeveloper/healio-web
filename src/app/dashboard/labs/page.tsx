'use client';

import { useState } from 'react';
import { FlaskConical, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { LabTestCard } from '@/types';

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
    instructions: ['No special preparation'],
  },
  {
    id: '3',
    name: 'Annual health pack',
    category: 'annual',
    sampleTimeline: 'As per pack',
    instructions: ['Fasting if advised', 'Carry previous reports'],
  },
];

export default function LabsPage() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-dark mb-2">Order labs</h1>
      <p className="text-gray-600 mb-8">
        Condition-specific, comprehensive, annual, or custom tests. Book by date and preferred
        time. Get confirmation and reminders (app, WhatsApp, call) and track from booking to
        report.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockTests.map((test) => (
          <div
            key={test.id}
            className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
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
              className="w-full"
              onClick={() => setSelectedTest(selectedTest === test.id ? null : test.id)}
            >
              Book now
            </Button>
          </div>
        ))}
      </div>

      {selectedTest && (
        <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-lg">
          <h3 className="font-bold mb-4">Select date & time for sample collection</h3>
          <p className="text-sm text-gray-500 mb-4">
            Confirmation and reminders (day before, day of) with instructions via app, WhatsApp,
            and pre-recorded call.
          </p>
          <div className="h-48 bg-gray-50 rounded-xl flex items-center justify-center gap-2 text-gray-500">
            <Calendar className="w-6 h-6" />
            Calendar grid – availability & preferred time
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" onClick={() => setSelectedTest(null)}>
              Cancel
            </Button>
            <Button>Confirm booking</Button>
          </div>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between p-4 bg-primary-50 rounded-xl">
        <div>
          <p className="font-medium text-dark">Track my order</p>
          <p className="text-sm text-gray-600">
            Track TAT from booking → phlebotomist → final reports
          </p>
        </div>
        <Button variant="outline" size="sm">
          Track
        </Button>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Call us for any lab-related escalation. When a doctor orders a test from their
        software, the same flow applies with automatic triggers.
      </p>
    </div>
  );
}
