import { useState } from 'react';
import { 
  X, 
  LogOut, 
  Clock, 
  PlusCircle, 
  User, 
  PackageCheck, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Search, 
  FileText,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { useCustomerAuth } from '../context/CustomerAuthContext.tsx';
import { CustomerType, CustomerEnquiry } from '../types/customer.ts';
import { BUSINESS_INFO, COMMON_VEHICLES } from '../data/businessData.ts';

interface CustomerDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CustomerDashboardModal({ isOpen, onClose }: CustomerDashboardModalProps) {
  const { 
    currentUser, 
    customerProfile, 
    enquiries, 
    logout, 
    updateProfileType, 
    submitEnquiry 
  } = useCustomerAuth();

  const [activeTab, setActiveTab] = useState<'history' | 'new-enquiry' | 'profile'>('history');
  const [selectedEnquiry, setSelectedEnquiry] = useState<CustomerEnquiry | null>(null);

  // New Enquiry Form State
  const [vehicleModel, setVehicleModel] = useState('');
  const [partName, setPartName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [customerType, setCustomerType] = useState<CustomerType>(customerProfile?.customerType || 'Retail');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [phoneInput, setPhoneInput] = useState(customerProfile?.phone || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);

  if (!isOpen || !currentUser) return null;

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const handleCreateEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partName.trim() || !vehicleModel.trim()) return;

    setIsSubmitting(true);
    setSubmissionSuccess(null);

    try {
      const trackingId = await submitEnquiry({
        customerName: customerProfile?.name || currentUser.displayName || 'Customer',
        customerPhone: phoneInput.trim() || customerProfile?.phone || 'Not provided',
        customerType: customerType,
        vehicleModel: vehicleModel.trim(),
        partRequired: partName.trim(),
        quantity: quantity.trim() || '1',
        additionalNotes: additionalNotes.trim(),
        userEmail: currentUser.email || '',
      });

      // Update phone if edited
      if (phoneInput.trim() && phoneInput !== customerProfile?.phone) {
        await updateProfileType(customerType, phoneInput.trim());
      }

      setSubmissionSuccess(trackingId);
      setPartName('');
      setVehicleModel('');
      setAdditionalNotes('');
      setQuantity('1');

      // Switch to history tab to show the new enquiry
      setTimeout(() => {
        setActiveTab('history');
        setSubmissionSuccess(null);
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppFollowUp = (enquiry: CustomerEnquiry) => {
    const text = `Hello Preeti Enterprises,\n` +
      `I am following up on my enquiry [${enquiry.id}]:\n` +
      `• Part: ${enquiry.partRequired}\n` +
      `• Model: ${enquiry.vehicleModel}\n` +
      `• Quantity: ${enquiry.quantity}\n` +
      `• Current Status: ${enquiry.status}\n` +
      `\nPlease update me on part availability. Thank you!`;
    const url = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Available for Pickup':
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {status}
          </span>
        );
      case 'Checking Stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Checking Warehouse
          </span>
        );
      case 'Received':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            Enquiry Received
          </span>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3.5">
            {currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt={currentUser.displayName || 'Customer'}
                className="w-11 h-11 rounded-full border border-orange-500/40 shadow-sm"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-orange-600/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold">
                {currentUser.displayName?.[0] || 'C'}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
                  {currentUser.displayName || 'Customer Account'}
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  {customerProfile?.customerType || 'Retail'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {currentUser.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLogout}
              className="p-2 sm:px-3 sm:py-2 text-xs font-semibold text-slate-400 hover:text-red-400 hover:bg-slate-800/80 rounded-xl transition-colors flex items-center gap-1.5"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 border-b border-slate-800 bg-slate-950/40 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'history'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Enquiry Progress & History</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-slate-300 font-mono">
              {enquiries.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('new-enquiry')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'new-enquiry'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Direct Enquiry</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>My Profile</span>
          </button>
        </div>

        {/* Tab Contents (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-slate-900/60">
          {/* TAB 1: Enquiry History & Live Progress */}
          {activeTab === 'history' && (
            <div>
              {enquiries.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500 mx-auto mb-4">
                    <FileText className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-white">No Enquiries Yet</h3>
                  <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto">
                    You haven&apos;t sent any two-wheeler part enquiries from this account yet. Submit your first enquiry to track stock availability.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('new-enquiry')}
                    className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Create Part Enquiry</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Showing your saved enquiries synced with Preeti Enterprises</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('new-enquiry')}
                      className="text-orange-400 hover:text-orange-300 font-semibold inline-flex items-center gap-1"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Send New Part Enquiry</span>
                    </button>
                  </div>

                  {enquiries.map((enquiry) => (
                    <div
                      key={enquiry.id}
                      className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all shadow-md"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs font-bold text-orange-400 px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20">
                            {enquiry.id}
                          </span>
                          <span className="text-xs text-slate-400">
                            {new Date(enquiry.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        {getStatusBadge(enquiry.status)}
                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-slate-400 block">Part Required</span>
                          <span className="text-white font-bold text-sm block mt-0.5">
                            {enquiry.partRequired}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Vehicle Model</span>
                          <span className="text-slate-200 font-medium block mt-0.5">
                            {enquiry.vehicleModel}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Quantity / Type</span>
                          <span className="text-slate-200 font-medium block mt-0.5">
                            {enquiry.quantity} · {enquiry.customerType}
                          </span>
                        </div>
                      </div>

                      {enquiry.additionalNotes && (
                        <div className="mt-3 text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                          <span className="font-semibold text-slate-300">Note: </span>
                          {enquiry.additionalNotes}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                        <div className="text-[11px] text-slate-500">
                          Warehouse Stock Check: <strong className="text-slate-300">Purnagard Chowk, Jeypore</strong>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleWhatsAppFollowUp(enquiry)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp Status</span>
                          </button>

                          <a
                            href={BUSINESS_INFO.telLink}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
                          >
                            <Phone className="w-3.5 h-3.5 text-orange-400" />
                            <span>Call Shop</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: New Direct Enquiry */}
          {activeTab === 'new-enquiry' && (
            <form onSubmit={handleCreateEnquiry} className="max-w-2xl mx-auto space-y-5">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Send Direct Part Enquiry
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Enquiries submitted here are directly saved to your Google account history and monitored by the team.
                </p>
              </div>

              {submissionSuccess && (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Enquiry Created Successfully!</p>
                    <p>Tracking Reference: <strong className="font-mono text-white">{submissionSuccess}</strong></p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Vehicle Model */}
                <div>
                  <label htmlFor="dash-model" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Vehicle Model <span className="text-orange-500">*</span>
                  </label>
                  <input
                    id="dash-model"
                    type="text"
                    required
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    placeholder="e.g. Hero Splendor, Pulsar, Activa"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm"
                  />
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {COMMON_VEHICLES.slice(0, 3).map((v) => (
                      <button
                        type="button"
                        key={v}
                        onClick={() => setVehicleModel(v.split('/')[0].trim())}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white"
                      >
                        {v.split('/')[0].trim()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Part Required */}
                <div>
                  <label htmlFor="dash-part" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Part Name / Requirement <span className="text-orange-500">*</span>
                  </label>
                  <input
                    id="dash-part"
                    type="text"
                    required
                    value={partName}
                    onChange={(e) => setPartName(e.target.value)}
                    placeholder="e.g. ROLON Chain Kit, Brake Shoes"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Quantity */}
                <div>
                  <label htmlFor="dash-qty" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Quantity
                  </label>
                  <input
                    id="dash-qty"
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 1 piece, 5 sets, Bulk wholesale"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm"
                  />
                </div>

                {/* Phone Contact */}
                <div>
                  <label htmlFor="dash-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Contact Phone Number
                  </label>
                  <input
                    id="dash-phone"
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm"
                  />
                </div>
              </div>

              {/* Customer Type Radio */}
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Order Channel
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCustomerType('Retail')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 ${
                      customerType === 'Retail'
                        ? 'bg-orange-600/20 border-orange-500 text-white'
                        : 'bg-slate-950 border-slate-700 text-slate-400'
                    }`}
                  >
                    <span>Retail (Individual)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomerType('Wholesale')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 ${
                      customerType === 'Wholesale'
                        ? 'bg-orange-600/20 border-orange-500 text-white'
                        : 'bg-slate-950 border-slate-700 text-slate-400'
                    }`}
                  >
                    <span>Wholesale (Garage / Bulk)</span>
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="dash-notes" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="dash-notes"
                  rows={2}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Brand preference, specific vehicle year or requirement details..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold text-sm shadow-md transition-all disabled:opacity-50"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{isSubmitting ? 'Recording Enquiry...' : 'Submit & Track in My Account'}</span>
              </button>
            </form>
          )}

          {/* TAB 3: Profile Settings */}
          {activeTab === 'profile' && (
            <div className="max-w-md mx-auto space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Profile Details</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Manage your contact preferences and account settings.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Name (From Google)</span>
                  <span className="text-white font-bold text-sm">{currentUser.displayName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Google Account Email</span>
                  <span className="text-white font-mono">{currentUser.email}</span>
                </div>
                <div>
                  <label htmlFor="prof-phone" className="text-slate-400 block mb-1">Phone Number</label>
                  <input
                    id="prof-phone"
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={async () => {
                  await updateProfileType(customerType, phoneInput.trim());
                  alert('Profile saved!');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition-colors"
              >
                Save Profile Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
