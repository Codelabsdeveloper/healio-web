import { FileText, Upload } from 'lucide-react';

export default function HealthRecordsPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-xl sm:text-2xl font-bold text-dark mb-4 sm:mb-6">My health records</h1>
      <p className="text-gray-600 mb-6 sm:mb-8 max-w-2xl text-sm sm:text-base">
        Records from visits within Healio MedHealth (doctor notes, scans, labs, prescriptions)
        and any records you upload. Stored securely in our backend.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {['Doctor notes', 'Scans', 'Labs', 'Prescriptions'].map((cat) => (
          <div
            key={cat}
            className="p-4 bg-white rounded-xl border border-gray-100 flex items-center gap-3"
          >
            <FileText className="w-8 h-8 text-primary shrink-0" />
            <div>
              <p className="font-medium">{cat}</p>
              <p className="text-sm text-gray-500">0 documents</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 sm:p-8 border-2 border-dashed border-gray-200 rounded-xl sm:rounded-2xl text-center max-w-md">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="font-medium text-dark mb-1">Upload medical records</p>
        <p className="text-sm text-gray-500 mb-4">
          Scan or upload prescriptions, reports, or notes. We&apos;ll store them securely.
        </p>
        <button
          type="button"
          className="px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-700 transition"
        >
          Choose file
        </button>
      </div>
    </div>
  );
}
