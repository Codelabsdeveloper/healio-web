'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
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
  X,
  Loader2,
  Eye,
  Stethoscope,
  Calendar,
  AlertCircle,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import Tesseract from 'tesseract.js';

/* ── Types ─────────────────────────────────────────────── */
interface ParsedMedicine {
  name: string;
  dosage: string;
  timing: string;
}

interface ParsedPrescription {
  id: string;
  doctor: string;
  date: string;
  diagnosis: string;
  patient: string;
  medicines: ParsedMedicine[];
  imageUrl: string;
}

/* ── Top-level tabs ─────────────────────────────────────── */
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

/* ── Prescription parser ────────────────────────────────── */
function parsePrescriptionText(text: string): Omit<ParsedPrescription, 'id' | 'imageUrl' | 'rawText'> {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);

  // Extract doctor name
  let doctor = 'Unknown Doctor';
  for (const line of lines) {
    const drMatch = line.match(/(?:DR\.?|Dr\.?)\s+([A-Z][A-Za-z\s.]+)/i);
    if (drMatch) {
      doctor = drMatch[0].replace(/^(DR\.?|Dr\.?)\s*/i, 'Dr. ').trim();
      // Remove trailing non-alpha chars
      doctor = doctor.replace(/[^A-Za-z.\s]+$/, '').trim();
      // Stop at common trailing words that aren't part of the name
      doctor = doctor.replace(/\s+(Clinic|Timings|MBBS|Hospital|Medical|General|Specialist|Consultant|MD|MS|DNB|FRCS|MCh|DM)\b.*/i, '').trim();
      break;
    }
  }

  // Extract date
  let date = '';
  for (const line of lines) {
    // Match: DD-Mon-YYYY, DD/MM/YYYY, DD.MM.YYYY, Date: ...
    const dateMatch = line.match(
      /(?:Date\s*[:\-]?\s*)?(\d{1,2}[\s\-/.](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\s\-/.]?\d{2,4}|\d{1,2}[/\-.]\d{1,2}[/\-.]\d{2,4})/i
    );
    if (dateMatch) {
      date = dateMatch[1] || dateMatch[0];
      date = date.replace(/^Date\s*[:\-]?\s*/i, '').trim();
      break;
    }
  }
  if (!date) date = new Date().toLocaleDateString('en-IN');

  // Extract diagnosis
  let diagnosis = '';
  for (const line of lines) {
    const diagMatch = line.match(/(?:Diagnosis|Dx|Clinical\s*Diagnosis)\s*[:\-]?\s*(.+)/i);
    if (diagMatch) {
      diagnosis = diagMatch[1].trim();
      break;
    }
  }

  // Extract patient name
  let patient = '';
  for (const line of lines) {
    const patMatch = line.match(/(?:Patient|Name|Mr\.|Mrs\.|Ms\.)\s*[:\-]?\s*([A-Za-z\s.]+)/i);
    if (patMatch) {
      patient = patMatch[1].trim().replace(/[^A-Za-z.\s]/g, '').trim();
      if (patient.length > 2) break;
    }
    // Pattern like "868 : Latha (52y, Female)"
    const numPatMatch = line.match(/\d+\s*:\s*([A-Za-z\s]+)\s*\(/);
    if (numPatMatch) {
      patient = numPatMatch[1].trim();
      break;
    }
  }

  // Extract medicines — look for numbered items or known medicine keywords
  const medicines: ParsedMedicine[] = [];

  // Common dosage forms to help identify medicine lines
  const dosageForms = /(?:TABLET|TAB|CAPSULE|CAP|SYRUP|SYR|INJECTION|INJ|CREAM|GEL|DROPS|OINTMENT|SUSPENSION|POWDER|SACHET|MG|MCG|ML|GM|IU)/i;
  const timingPatterns = /(?:After\s*Food|Before\s*Food|With\s*Food|Daily|Weekly|Twice|Thrice|Morning|Evening|Night|BD|TDS|OD|QID|SOS|PRN|HS)/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Match numbered medicine lines: "1) MESACOL OD TABLET 1.2GM" or "1. Metformin 500mg"
    const numberedMatch = line.match(/^\d+[\)\.\-\s]+\s*(.+)/);
    if (numberedMatch && dosageForms.test(line)) {
      const medText = numberedMatch[1].trim();
      let dosage = '';
      let timing = '';

      // Try to extract dosage pattern like "3 — 0 — 0" or "500mg"
      const dosageMatch = line.match(/(\d+\s*[-—]+\s*\d+\s*[-—]+\s*\d+)/);
      const strengthMatch = line.match(/(\d+(?:\.\d+)?\s*(?:mg|mcg|ml|gm|iu|%)\b)/i);

      if (dosageMatch) dosage = dosageMatch[1].replace(/\s+/g, '');
      else if (strengthMatch) dosage = strengthMatch[1];

      // Check next or same line for timing
      const timingMatch = line.match(timingPatterns);
      if (timingMatch) {
        // Get everything from timing match onward
        const timingStart = line.indexOf(timingMatch[0]);
        timing = line.slice(timingStart).trim();
      } else if (i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        const nextTimingMatch = nextLine.match(timingPatterns);
        if (nextTimingMatch) timing = nextLine.trim();
      }

      // Clean medicine name: remove dosage, timing, and duration portions
      let name = medText
        .replace(/\d+\s*[-—]+\s*\d+\s*[-—]+\s*\d+/, '')
        .replace(/After\s*Food.*|Before\s*Food.*|With\s*Food.*/i, '')
        .replace(/[-–]\s*(?:Daily|Weekly|Twice|Thrice|Monthly|BD|TDS|OD|QID|SOS|PRN|HS)\b.*/i, '')
        .replace(/\s*[-–]\s*\d+\s*(?:Month|Months|Week|Weeks|Day|Days)\b.*/i, '')
        .replace(timingPatterns, '')
        .replace(/\s*[-–—]\s*$/, '')
        .trim();
      if (name.length > 1) {
        medicines.push({ name, dosage, timing });
      }
    }
  }

  // Fallback: if no numbered medicines found, try to find medicine-like lines
  if (medicines.length === 0) {
    for (const line of lines) {
      if (dosageForms.test(line) && !line.match(/^(?:DR\.|Date|Diagnosis|Complaints|Composition|Phone|Clinic)/i)) {
        const strengthMatch = line.match(/(\d+(?:\.\d+)?\s*(?:mg|mcg|ml|gm|iu)\b)/i);
        const dosage = strengthMatch ? strengthMatch[1] : '';
        const name = line
          .replace(/\d+[\)\.\-]\s*/, '')
          .replace(/\d+\s*[-—]+\s*\d+\s*[-—]+\s*\d+/, '')
          .trim();
        if (name.length > 2) {
          medicines.push({ name, dosage, timing: '' });
        }
      }
    }
  }

  return { doctor, date, diagnosis, patient, medicines };
}

/* ── Component ──────────────────────────────────────────── */
export default function MedicinesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanError, setScanError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Prescriptions state
  const [uploadedPrescriptions, setUploadedPrescriptions] = useState<ParsedPrescription[]>([]);
  const [viewingPrescription, setViewingPrescription] = useState<ParsedPrescription | null>(null);

  // Load prescriptions from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('healio_prescriptions');
      if (stored) {
        setUploadedPrescriptions(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const handleFile = useCallback((file: File) => {
    setScanError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setScanError('Unsupported file type. Please upload JPG, PNG, or PDF.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setScanError('File size exceeds 10MB limit.');
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }, []);

  const clearFile = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setScanError(null);
    setScanProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [previewUrl]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleScan = useCallback(async () => {
    if (!selectedFile || !previewUrl) return;

    setScanning(true);
    setScanError(null);
    setScanProgress(0);

    try {
      const result = await Tesseract.recognize(previewUrl, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setScanProgress(Math.round((m.progress || 0) * 100));
          }
        },
      });

      const { text: rawText } = result.data;
      if (!rawText || rawText.trim().length < 10) {
        setScanError('Could not read text from the image. Please ensure the prescription is clear and well-lit.');
        setScanning(false);
        return;
      }

      const parsed = parsePrescriptionText(rawText);
      const newPrescription: ParsedPrescription = {
        id: `RX-${Date.now().toString(36).toUpperCase()}`,
        ...parsed,
        imageUrl: '',
      };

      setUploadedPrescriptions((prev) => {
        const updated = [newPrescription, ...prev];
        localStorage.setItem('healio_prescriptions', JSON.stringify(updated));
        return updated;
      });
      setScanning(false);
      setScanProgress(100);

      // Auto-switch to prescriptions tab after short delay
      setTimeout(() => {
        setActiveTab('prescriptions');
        clearFile();
      }, 1000);
    } catch {
      setScanError('Failed to scan prescription. Please try again with a clearer image.');
      setScanning(false);
    }
  }, [selectedFile, previewUrl, clearFile]);

  // Combine mock + uploaded prescriptions for the Prescriptions tab
  const allPrescriptions: ParsedPrescription[] = [
    ...uploadedPrescriptions,
    // Convert mock prescriptions to ParsedPrescription format
    ...([
      {
        id: 'RX-001',
        doctor: 'Dr. Priya Sharma',
        date: '20 Feb 2026',
        diagnosis: '',
        patient: '',
        medicines: [
          { name: 'Metformin', dosage: '500mg', timing: 'After Food - Daily' },
          { name: 'Amlodipine', dosage: '5mg', timing: 'After Food - Daily' },
        ],
        imageUrl: '',
      },
      {
        id: 'RX-002',
        doctor: 'Dr. Rajesh Kumar',
        date: '05 Jan 2026',
        diagnosis: '',
        patient: '',
        medicines: [{ name: 'Atorvastatin', dosage: '10mg', timing: 'After Food - Daily' }],
        imageUrl: '',
      },
    ] as ParsedPrescription[]),
  ];

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
            {key === 'prescriptions' && uploadedPrescriptions.length > 0 && (
              <span className="ml-auto bg-white/20 text-xs px-2 py-0.5 rounded-full">
                {allPrescriptions.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Upload tab ──────────────────────────────────── */}
      {activeTab === 'upload' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8">
          {!selectedFile ? (
            <>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  'border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition cursor-pointer',
                  isDragging
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-300 hover:border-primary/50'
                )}
              >
                <Upload className={cn('w-10 h-10 mx-auto mb-4', isDragging ? 'text-primary' : 'text-gray-400')} />
                <p className="font-semibold text-dark mb-1">Upload your prescription</p>
                <p className="text-sm text-gray-500 mb-4">
                  Drag & drop or click to browse. Supports JPG, PNG, PDF.
                </p>
                <Button variant="outline" size="sm" type="button">
                  Browse files
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                  }}
                />
              </div>

              {scanError && (
                <div className="mt-4 flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg" role="alert">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {scanError}
                </div>
              )}

              <p className="text-xs text-gray-400 mt-4 text-center">
                Prescription will be verified by our team before processing your order.
              </p>
            </>
          ) : (
            <>
              {/* File preview */}
              <div className="flex flex-col items-center">
                <div className="relative w-full max-w-md mb-4">
                  {selectedFile.type === 'application/pdf' ? (
                    <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-8 border border-gray-200">
                      <FileText className="w-16 h-16 text-primary mb-2" />
                      <p className="text-sm font-medium text-dark">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden border border-gray-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previewUrl!}
                        alt="Prescription preview"
                        className="w-full max-h-[400px] object-contain bg-gray-50"
                      />
                    </div>
                  )}

                  {/* Remove file button */}
                  <button
                    type="button"
                    onClick={clearFile}
                    disabled={scanning}
                    className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-sm hover:bg-red-50 hover:text-red-500 transition disabled:opacity-50"
                    aria-label="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-1">{selectedFile.name}</p>
                <p className="text-xs text-gray-400 mb-4">{(selectedFile.size / 1024).toFixed(1)} KB</p>

                {/* Scan progress */}
                {scanning && (
                  <div className="w-full max-w-md mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Loader2 className="w-4 h-4 text-primary animate-spin" />
                      <span className="text-sm text-gray-600">Scanning prescription... {scanProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Success message */}
                {scanProgress === 100 && !scanning && (
                  <div className="flex items-center gap-2 text-green-600 text-sm mb-4">
                    <CheckCircle className="w-4 h-4" />
                    Prescription scanned successfully! Redirecting...
                  </div>
                )}

                {scanError && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg mb-4 w-full max-w-md" role="alert">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {scanError}
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" onClick={clearFile} disabled={scanning}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleScan}
                    disabled={scanning || scanProgress === 100}
                  >
                    {scanning ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Scan Prescription
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Prescriptions tab ───────────────────────────── */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-3">
          {allPrescriptions.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="font-semibold text-dark mb-1">No prescriptions yet</p>
              <p className="text-sm text-gray-500 mb-4">
                Upload a prescription to get started. We&apos;ll scan and extract the details automatically.
              </p>
              <Button variant="outline" size="sm" onClick={() => setActiveTab('upload')}>
                <Upload className="w-4 h-4 mr-2" />
                Upload prescription
              </Button>
            </div>
          ) : (
            allPrescriptions.map((rx) => (
              <div
                key={rx.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5"
              >
                <div className="flex items-start gap-3">
                  {/* Thumbnail or icon */}
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-primary/10 flex items-center justify-center">
                    {rx.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={rx.imageUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <FileText className="w-5 h-5 text-primary" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-dark">{rx.id}</p>
                      <span className="text-xs text-gray-400 shrink-0">{rx.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Stethoscope className="w-3.5 h-3.5 text-gray-400" />
                      <p className="text-sm text-gray-600">{rx.doctor}</p>
                    </div>
                    {rx.diagnosis && (
                      <p className="text-xs text-gray-500 mt-1">Diagnosis: {rx.diagnosis}</p>
                    )}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Pill className="w-3.5 h-3.5 text-primary" />
                      <p className="text-sm text-gray-500">
                        {rx.medicines.length} medicine{rx.medicines.length !== 1 ? 's' : ''}
                        {rx.medicines.length > 0 && (
                          <span className="text-gray-400">
                            {' '}&middot; {rx.medicines.map((m) => m.name.split(' ')[0]).slice(0, 3).join(', ')}
                            {rx.medicines.length > 3 && '...'}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setViewingPrescription(rx)}
                    className="text-primary text-sm font-medium hover:underline shrink-0 self-center"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ── Prescription detail modal ────────────────────── */}
      {viewingPrescription && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setViewingPrescription(null)}
            aria-hidden
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div
              className="relative w-full max-w-lg bg-white rounded-xl border border-gray-100 shadow-xl my-auto max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="rx-modal-title"
            >
              <button
                type="button"
                onClick={() => setViewingPrescription(null)}
                className="absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-5 sm:p-6">
                <h3 id="rx-modal-title" className="font-bold text-lg text-dark pr-10 mb-1">
                  Prescription {viewingPrescription.id}
                </h3>

                {/* Meta info */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-gray-400" />
                    {viewingPrescription.doctor}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {viewingPrescription.date}
                  </span>
                </div>

                {viewingPrescription.patient && (
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium text-gray-700">Patient:</span> {viewingPrescription.patient}
                  </p>
                )}
                {viewingPrescription.diagnosis && (
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-medium text-gray-700">Diagnosis:</span> {viewingPrescription.diagnosis}
                  </p>
                )}

                {/* Prescription image */}
                {viewingPrescription.imageUrl && (
                  <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={viewingPrescription.imageUrl}
                      alt="Prescription"
                      className="w-full max-h-[250px] object-contain bg-gray-50"
                    />
                  </div>
                )}

                {/* Medicines table */}
                <h4 className="font-semibold text-dark text-sm mb-3 flex items-center gap-2">
                  <Pill className="w-4 h-4 text-primary" />
                  Medicines ({viewingPrescription.medicines.length})
                </h4>

                {viewingPrescription.medicines.length > 0 ? (
                  <div className="space-y-2">
                    {viewingPrescription.medicines.map((med, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-dark">{med.name}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
                          {med.dosage && (
                            <span className="text-xs text-gray-500">Dosage: {med.dosage}</span>
                          )}
                          {med.timing && (
                            <span className="text-xs text-gray-500">Timing: {med.timing}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">No medicines could be extracted from this prescription.</p>
                )}

                <Button className="w-full mt-5" onClick={() => setViewingPrescription(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Order tab (main layout) ─────────────────────── */}
      {activeTab === 'order' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left: My order details */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5 flex flex-col">
            <h2 className="font-bold text-dark mb-4">My order details</h2>

            <div className="space-y-3 mb-4">
              {mockOrder.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-2 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 min-w-0">
                    <Pill className="w-4 h-4 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-dark truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">Dose: {item.dose} &middot; Qty: {item.qty}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg mb-3">
              <MapPin className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Delivering to</p>
                <p className="text-sm text-dark mt-0.5">{mockOrder.address}</p>
              </div>
            </div>

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

          {/* Right column */}
          <div className="flex flex-col gap-4">
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
