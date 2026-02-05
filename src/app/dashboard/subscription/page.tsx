import { QrCode } from 'lucide-react';

export default function SubscriptionPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-dark mb-6">My subscription</h1>
      <div className="max-w-2xl space-y-6">
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="font-bold text-lg mb-2">Meds Chronic Plan</h2>
          <p className="text-gray-600 text-sm mb-4">
            Unlimited 50+ common generic medicines, specialist consultation, personalized
            dispensing, digital adherence tracker, NABL quality tested.
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">₹1,999</span>
            <span className="text-gray-500">/ month</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Validity: Active until 5 Mar 2026</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold mb-2">Dynamic QR code</h3>
          <p className="text-sm text-gray-600 mb-4">
            Use this QR at partner pharmacies for authentication and coin redeem process.
          </p>
          <div className="w-40 h-40 bg-gray-100 rounded-xl flex items-center justify-center">
            <QrCode className="w-24 h-24 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
