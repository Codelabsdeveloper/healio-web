import { Coins } from 'lucide-react';

export default function CoinsPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-xl sm:text-2xl font-bold text-dark mb-4 sm:mb-6">My Healio Coins</h1>
      <div className="max-w-md p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
            <Coins className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-2xl font-bold text-dark">100</p>
            <p className="text-sm text-gray-500">Healio Coins</p>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Earn coins on subscriptions and partner activities. Use your dynamic QR at partner
          pharmacies to redeem.
        </p>
      </div>
    </div>
  );
}
