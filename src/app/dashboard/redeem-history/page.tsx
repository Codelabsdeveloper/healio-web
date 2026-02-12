'use client';

import { ShoppingBag, MapPin, Calendar, Coins } from 'lucide-react';

const DUMMY_REDEMPTIONS = [
  {
    id: '1',
    date: '2025-02-03',
    time: '14:32',
    partner: 'Apollo Pharmacy, Indiranagar',
    location: 'Bangalore',
    coinsRedeemed: 25,
    orderRef: 'ORD-2847',
    status: 'Completed',
  },
  {
    id: '2',
    date: '2025-01-28',
    time: '11:15',
    partner: 'MedPlus, Koramangala',
    location: 'Bangalore',
    coinsRedeemed: 50,
    orderRef: 'ORD-2801',
    status: 'Completed',
  },
  {
    id: '3',
    date: '2025-01-18',
    time: '09:45',
    partner: '1mg (Online)',
    location: '—',
    coinsRedeemed: 15,
    orderRef: 'ORD-2755',
    status: 'Completed',
  },
  {
    id: '4',
    date: '2025-01-10',
    time: '16:20',
    partner: 'Apollo Pharmacy, Whitefield',
    location: 'Bangalore',
    coinsRedeemed: 40,
    orderRef: 'ORD-2712',
    status: 'Completed',
  },
  {
    id: '5',
    date: '2024-12-22',
    time: '13:00',
    partner: 'Fortis Pharmacy',
    location: 'Koramangala',
    coinsRedeemed: 30,
    orderRef: 'ORD-2688',
    status: 'Completed',
  },
];

function formatDisplayDate(iso: string) {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function RedeemHistoryPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-xl sm:text-2xl font-bold text-dark mb-4 sm:mb-6">Redeem history</h1>
      <p className="text-gray-600 text-sm sm:text-base mb-6">
        Use your subscription QR at partner pharmacies to redeem. Your recent redemptions appear below.
      </p>

      <ul className="space-y-4">
        {DUMMY_REDEMPTIONS.map((r) => (
          <li
            key={r.id}
            className="p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-dark">{r.partner}</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDisplayDate(r.date)} · {r.time}
                    </span>
                    {r.location !== '—' && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {r.location}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Ref: {r.orderRef}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 sm:flex-col sm:items-end">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent/15 text-accent font-medium text-sm">
                  <Coins className="w-4 h-4" />
                  {r.coinsRedeemed} coins
                </span>
                <span className="text-xs font-medium text-secondary">{r.status}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
