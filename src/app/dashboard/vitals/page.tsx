'use client';

import { useState } from 'react';
import { Activity } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function VitalsPage() {
  const [form, setForm] = useState({
    temperature: '',
    heartRate: '',
    spo2: '',
    respiratoryRate: '',
    bpSystolic: '',
    bpDiastolic: '',
    weight: '',
    height: '',
    bloodGroup: '',
  });
  const [saved, setSaved] = useState(false);

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (saved) setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <Activity className="w-5 h-5" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-dark">Record vitals</h1>
      </div>
      <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
        Temperature, HR, SpO2, RR, blood pressure, body weight, height, blood group — enter manually or sync from EHR.
      </p>

      <div className="max-w-2xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Temperature (°F)"
            type="number"
            value={form.temperature}
            onChange={(e) => update('temperature', e.target.value)}
            placeholder="e.g. 98.6"
            inputMode="decimal"
          />
          <Input
            label="Heart rate (bpm)"
            type="number"
            value={form.heartRate}
            onChange={(e) => update('heartRate', e.target.value)}
            placeholder="e.g. 72"
            inputMode="numeric"
          />
          <Input
            label="SpO2 (%)"
            type="number"
            value={form.spo2}
            onChange={(e) => update('spo2', e.target.value)}
            placeholder="e.g. 98"
            inputMode="numeric"
          />
          <Input
            label="Respiratory rate (breaths/min)"
            type="number"
            value={form.respiratoryRate}
            onChange={(e) => update('respiratoryRate', e.target.value)}
            placeholder="e.g. 16"
            inputMode="numeric"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Blood pressure (mmHg)</label>
          <div className="flex items-center gap-2">
            <Input
              value={form.bpSystolic}
              onChange={(e) => update('bpSystolic', e.target.value)}
              placeholder="Systolic"
              type="number"
              inputMode="numeric"
            />
            <span className="text-gray-400 font-medium">/</span>
            <Input
              value={form.bpDiastolic}
              onChange={(e) => update('bpDiastolic', e.target.value)}
              placeholder="Diastolic"
              type="number"
              inputMode="numeric"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Body weight (kg)"
            type="number"
            value={form.weight}
            onChange={(e) => update('weight', e.target.value)}
            placeholder="e.g. 70"
            inputMode="decimal"
          />
          <Input
            label="Height (cm)"
            type="number"
            value={form.height}
            onChange={(e) => update('height', e.target.value)}
            placeholder="e.g. 170"
            inputMode="numeric"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Blood group</label>
          <div className="flex flex-wrap gap-2">
            {BLOOD_GROUPS.map((bg) => (
              <button
                key={bg}
                type="button"
                onClick={() => update('bloodGroup', form.bloodGroup === bg ? '' : bg)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition touch-manipulation ${
                  form.bloodGroup === bg
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-primary hover:bg-primary/5'
                }`}
              >
                {bg}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button onClick={handleSave} className="min-h-[48px] touch-manipulation w-full sm:w-auto" size="lg">
            Save vitals
          </Button>
        </div>

        {saved && (
          <p className="text-sm text-secondary font-medium">Vitals saved successfully.</p>
        )}
      </div>
    </div>
  );
}
