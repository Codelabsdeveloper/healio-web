'use client';

import { useState } from 'react';
import { User, CreditCard, Users, Plus, QrCode, ChevronRight, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

type SettingsTab = 'profile' | 'manage-ids' | 'health-account';

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [showAddFamilyModal, setShowAddFamilyModal] = useState(false);
  const [showAbdmCardModal, setShowAbdmCardModal] = useState(false);
  const [showRelinkModal, setShowRelinkModal] = useState(false);
  const [showSelfProfileModal, setShowSelfProfileModal] = useState(false);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [addName, setAddName] = useState('');
  const [addRelation, setAddRelation] = useState('');

  const [profileFullName, setProfileFullName] = useState('Ayush Verma');
  const [profileMobile, setProfileMobile] = useState('9876543210');
  const [profileEmail, setProfileEmail] = useState('ayush.verma@example.com');
  const [profileAddress, setProfileAddress] = useState('123, MG Road, Indiranagar, Bangalore - 560038');

  const tabs: { id: SettingsTab; label: string; icon: typeof User }[] = [
    { id: 'profile', label: 'Profile Details', icon: User },
    { id: 'manage-ids', label: 'Manage IDs', icon: CreditCard },
    { id: 'health-account', label: 'Health Account', icon: Users },
  ];

  const handleAddFamily = (e: React.FormEvent) => {
    e.preventDefault();
    const name = addName.trim();
    const relation = addRelation.trim() || 'Family member';
    if (!name) return;
    setFamilyMembers((prev) => [
      ...prev,
      { id: `fam-${Date.now()}`, name, relation },
    ]);
    setAddName('');
    setAddRelation('');
    setShowAddFamilyModal(false);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* Sub-navigation - like reference "My Profile" sidebar */}
      <aside className="lg:w-56 shrink-0">
        <h2 className="font-bold text-lg text-dark mb-3 hidden lg:block">My Profile</h2>
        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium text-sm whitespace-nowrap transition',
                activeTab === id
                  ? 'bg-primary text-white'
                  : 'bg-white lg:bg-gray-50/80 text-gray-700 hover:bg-gray-100 border border-gray-100'
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
              <ChevronRight className="w-4 h-4 ml-auto lg:ml-0 lg:hidden opacity-70" />
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {activeTab === 'profile' && (
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-xl sm:text-2xl font-bold text-dark">Profile Details</h1>
            <div className="p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <Input
                label="Full name"
                placeholder="Your name"
                value={profileFullName}
                onChange={(e) => setProfileFullName(e.target.value)}
              />
              <Input
                label="Mobile"
                type="tel"
                placeholder="10-digit mobile"
                value={profileMobile}
                onChange={(e) => setProfileMobile(e.target.value)}
              />
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
              />
              <Input
                label="Address"
                placeholder="Your address"
                value={profileAddress}
                onChange={(e) => setProfileAddress(e.target.value)}
              />
              <button
                type="button"
                className="px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-700 transition"
              >
                Save changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'manage-ids' && (
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-xl sm:text-2xl font-bold text-dark">Manage IDs</h1>

            {/* ABDM ID card */}
            <div className="p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="font-semibold text-lg text-dark mb-1">ABDM Health ID</h2>
              <p className="text-sm text-gray-500 mb-4">
                Your Ayushman Bharat Digital Mission (ABDM) Health ID links your health records across partners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center p-4 bg-primary-50 rounded-xl border border-primary-100">
                <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-white border border-primary-100 shrink-0">
                  <QrCode className="w-12 h-12 sm:w-14 sm:h-14 text-primary" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Health ID</p>
                  <p className="font-mono font-semibold text-dark text-lg tracking-wide">12-3456-7890-1234</p>
                  <span className="inline-flex items-center gap-1.5 mt-2 px-2 py-1 rounded-lg bg-secondary-100 text-secondary text-xs font-medium">
                    Linked
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowAbdmCardModal(true)}
                    className="px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-700 transition text-sm cursor-pointer touch-manipulation"
                  >
                    View ABDM ID card
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRelinkModal(true)}
                    className="px-4 py-2.5 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition text-sm cursor-pointer touch-manipulation"
                  >
                    Refresh / Re-link
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'health-account' && (
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-xl sm:text-2xl font-bold text-dark">Health Account</h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="font-semibold text-lg text-dark">Select family profile</h2>
              <button
                type="button"
                onClick={() => setShowAddFamilyModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-700 transition shrink-0 touch-manipulation cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                Add Family
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              {/* Self profile card - like reference */}
              <button
                type="button"
                onClick={() => setShowSelfProfileModal(true)}
                className="flex items-center gap-4 p-4 w-full sm:w-auto min-w-0 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary-200 transition text-left cursor-pointer touch-manipulation"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-dark truncate">Self</p>
                  <p className="text-sm text-gray-500 truncate">Primary account</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
              </button>
              {familyMembers.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  className="flex items-center gap-4 p-4 w-full sm:w-auto min-w-0 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary-200 transition text-left"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-dark truncate">{member.name}</p>
                    <p className="text-sm text-gray-500 truncate">{member.relation}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Add Family modal */}
      {showAddFamilyModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowAddFamilyModal(false)}
            aria-hidden
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div
              className="relative w-full max-w-md bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-xl my-auto"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="add-family-title"
            >
              <button
                type="button"
                onClick={() => setShowAddFamilyModal(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <form onSubmit={handleAddFamily} className="p-4 sm:p-6">
                <h3 id="add-family-title" className="font-bold text-lg pr-10 mb-4">
                  Add family member
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Name"
                    placeholder="Full name"
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                    required
                  />
                  <Input
                    label="Relation"
                    placeholder="e.g. Spouse, Child, Parent"
                    value={addRelation}
                    onChange={(e) => setAddRelation(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowAddFamilyModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Add
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Self / Primary account modal */}
      {showSelfProfileModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowSelfProfileModal(false)}
            aria-hidden
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div
              className="relative w-full max-w-md bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-xl my-auto"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="self-profile-title"
            >
              <button
                type="button"
                onClick={() => setShowSelfProfileModal(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-4 sm:p-6">
                <h3 id="self-profile-title" className="font-bold text-lg pr-10 mb-4">
                  Primary account
                </h3>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark">Self</p>
                    <p className="text-sm text-gray-500">Your main health account. Appointments, records, and subscriptions are linked here.</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  To update your name, mobile, or address, go to <strong>Profile Details</strong> in the menu.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowSelfProfileModal(false);
                      setActiveTab('profile');
                    }}
                  >
                    Edit profile
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => setShowSelfProfileModal(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Refresh / Re-link ABDM modal */}
      {showRelinkModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowRelinkModal(false)}
            aria-hidden
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div
              className="relative w-full max-w-md bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-xl my-auto"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="relink-modal-title"
            >
              <button
                type="button"
                onClick={() => setShowRelinkModal(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-4 sm:p-6">
                <h3 id="relink-modal-title" className="font-bold text-lg pr-10 mb-4">
                  Refresh / Re-link ABDM Health ID
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Refresh to sync your Health ID status, or re-link if you have a new ABDM account. You may need to verify with OTP on your registered mobile.
                </p>
                <div className="flex gap-2 mt-6">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowRelinkModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => setShowRelinkModal(false)}
                  >
                    Re-link now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ABDM ID card modal */}
      {showAbdmCardModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowAbdmCardModal(false)}
            aria-hidden
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div
              className="relative w-full max-w-sm bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-xl my-auto"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="abdm-card-title"
            >
              <button
                type="button"
                onClick={() => setShowAbdmCardModal(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-4 sm:p-6">
                <h3 id="abdm-card-title" className="font-bold text-lg pr-10 mb-4">
                  ABDM Health ID card
                </h3>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100/50 border-2 border-primary-200">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                    Ayushman Bharat Digital Mission
                  </p>
                  <div className="flex justify-center my-4">
                    <div className="w-32 h-32 rounded-xl bg-white border-2 border-primary-200 flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-primary" aria-hidden />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 text-center mb-1">Health ID</p>
                  <p className="font-mono font-bold text-dark text-center text-lg tracking-wider">
                    12-3456-7890-1234
                  </p>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Scan QR at partner facilities to share health records
                  </p>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={() => setShowAbdmCardModal(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
