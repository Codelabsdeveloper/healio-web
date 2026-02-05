import { Input } from '@/components/ui/Input';

export default function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-dark mb-6">Settings</h1>
      <div className="max-w-xl space-y-6">
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h2 className="font-semibold text-lg">Profile</h2>
          <Input label="Full name" placeholder="Your name" />
          <Input label="Mobile" type="tel" placeholder="10-digit mobile" />
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input label="Address" placeholder="Your address" />
          <button
            type="button"
            className="px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-700 transition"
          >
            Save changes
          </button>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-lg mb-4">Security</h2>
          <p className="text-sm text-gray-600 mb-4">
            Change 4-digit PIN or password for sign-in.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="px-4 py-2 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition"
            >
              Change PIN
            </button>
            <button
              type="button"
              className="px-4 py-2 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition"
            >
              Change password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
