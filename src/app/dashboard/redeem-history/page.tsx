export default function RedeemHistoryPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-xl sm:text-2xl font-bold text-dark mb-4 sm:mb-6">Redeem history</h1>
      <div className="p-4 sm:p-8 bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm text-center text-gray-500 text-sm sm:text-base">
        <p>No redemptions yet.</p>
        <p className="text-sm mt-2">
          Use your subscription QR at partner pharmacies to redeem and see history here.
        </p>
      </div>
    </div>
  );
}
