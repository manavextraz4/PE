import { useState, useEffect } from 'react';
import { MessageSquare, Phone, Send, Check, Copy, UserCheck, Clock, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO, COMMON_VEHICLES } from '../data/businessData.ts';
import { useCustomerAuth } from '../context/CustomerAuthContext.tsx';

interface PartRequirementFinderProps {
  initialPart?: string;
}

export function PartRequirementFinder({ initialPart = '' }: PartRequirementFinderProps) {
  const { currentUser, customerProfile, submitEnquiry } = useCustomerAuth();

  const [vehicleModel, setVehicleModel] = useState('');
  const [partName, setPartName] = useState(initialPart);
  const [quantity, setQuantity] = useState('1');
  const [customerType, setCustomerType] = useState<'Retail' | 'Wholesale'>(customerProfile?.customerType || 'Retail');
  const [additionalRequirement, setAdditionalRequirement] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [generatedTrackingId, setGeneratedTrackingId] = useState<string | null>(null);

  useEffect(() => {
    if (customerProfile?.customerType) {
      setCustomerType(customerProfile.customerType);
    }
  }, [customerProfile]);

  // Quick part update if initialPart changed
  useEffect(() => {
    if (initialPart) {
      setPartName(initialPart);
    }
  }, [initialPart]);

  const generateEnquiryText = (trackingId?: string) => {
    return `Hello Preeti Enterprises, I want to enquire about two-wheeler auto parts:\n` +
      (trackingId ? `• Tracking ID: ${trackingId}\n` : '') +
      `• Vehicle/Bike Model: ${vehicleModel.trim() || 'Not specified'}\n` +
      `• Part Name: ${partName.trim() || 'General Enquiry'}\n` +
      `• Quantity: ${quantity}\n` +
      `• Customer Type: ${customerType}\n` +
      (currentUser?.displayName ? `• Customer: ${currentUser.displayName}\n` : '') +
      (additionalRequirement.trim() ? `• Additional Requirement: ${additionalRequirement.trim()}\n` : '') +
      `\nPlease let me know if this is available. Thank you!`;
  };

  const handleWhatsAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let trackingId: string | undefined = undefined;

    // If logged in with Google, save to their account in Firestore!
    if (currentUser) {
      try {
        trackingId = await submitEnquiry({
          customerName: customerProfile?.name || currentUser.displayName || 'Customer',
          customerPhone: customerProfile?.phone || 'Provided via WhatsApp',
          customerType: customerType,
          vehicleModel: vehicleModel.trim() || 'General Requirement',
          partRequired: partName.trim(),
          quantity: quantity,
          additionalNotes: additionalRequirement.trim(),
          userEmail: currentUser.email || '',
        });
        setGeneratedTrackingId(trackingId);
      } catch (err) {
        console.error(err);
      }
    }

    const text = generateEnquiryText(trackingId);
    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encoded}`;
    setSubmitted(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = () => {
    const text = generateEnquiryText(generatedTrackingId || undefined);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="requirement-finder" className="py-16 sm:py-20 lg:py-24 bg-slate-900 border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card Wrapper */}
        <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle decorative background lights */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Quick Part Enquiry
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Looking for a Specific Part?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              Tell us what bike or scooter you ride and which part you need. We will help you check
              availability whether you need a single piece or wholesale quantities.
            </p>

            {currentUser && (
              <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300">
                <UserCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  Signed in as <strong>{currentUser.displayName}</strong>. Your enquiry will be automatically logged to your account for live progress tracking!
                </span>
              </div>
            )}
          </div>

          {/* Interactive Form */}
          <form onSubmit={handleWhatsAppSubmit} className="mt-8 sm:mt-10 relative z-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vehicle / Bike Model */}
              <div>
                <label htmlFor="vehicle-model" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Vehicle / Bike Model <span className="text-orange-500">*</span>
                </label>
                <input
                  id="vehicle-model"
                  type="text"
                  required
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  placeholder="e.g. Hero Splendor, Bajaj Pulsar 150, Activa"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm transition-colors"
                />

                {/* Quick suggestions pills for convenience */}
                <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[11px] text-slate-400 mr-1">Quick fill:</span>
                  {COMMON_VEHICLES.slice(0, 4).map((vehicle) => (
                    <button
                      type="button"
                      key={vehicle}
                      onClick={() => setVehicleModel(vehicle)}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/60"
                    >
                      {vehicle.split('/')[0].trim()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Part Name */}
              <div>
                <label htmlFor="part-name" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Part Name <span className="text-orange-500">*</span>
                </label>
                <input
                  id="part-name"
                  type="text"
                  required
                  value={partName}
                  onChange={(e) => setPartName(e.target.value)}
                  placeholder="e.g. Brake Shoe, Clutch Plate, Air Filter, Piston"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm transition-colors"
                />

                {/* Popular brand tags */}
                <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[11px] text-slate-400 mr-1">Brand:</span>
                  {['ROLON', 'GABRIEL', 'BOSCH', 'UNO MINDA', 'SUPRAJIT', 'PRICOL', 'JK FENNER', 'SAI', 'KING QUALITY', 'SHRI RAM (USHA)'].map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setPartName((prev) => (prev ? `${prev} (${b})` : b))}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/60"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Quantity Required
                </label>
                <div className="flex gap-2">
                  <input
                    id="quantity"
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 1 set, 10 pcs, 50 units"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm transition-colors"
                  />
                  {/* Preset quick counts */}
                  <button
                    type="button"
                    onClick={() => setQuantity('1')}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                      quantity === '1' ? 'bg-orange-600 border-orange-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-300'
                    }`}
                  >
                    1
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuantity('10+ (Wholesale)')}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                      quantity === '10+ (Wholesale)' ? 'bg-orange-600 border-orange-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-300'
                    }`}
                  >
                    Bulk
                  </button>
                </div>
              </div>

              {/* Customer Type: Retail or Wholesale */}
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Customer Type
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCustomerType('Retail')}
                    className={`py-3 px-4 rounded-xl border font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                      customerType === 'Retail'
                        ? 'bg-orange-600/20 border-orange-500 text-white shadow-sm'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                      customerType === 'Retail' ? 'border-orange-500 bg-orange-500' : 'border-slate-500'
                    }`} />
                    <span>Retail (Individual)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCustomerType('Wholesale')}
                    className={`py-3 px-4 rounded-xl border font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                      customerType === 'Wholesale'
                        ? 'bg-orange-600/20 border-orange-500 text-white shadow-sm'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                      customerType === 'Wholesale' ? 'border-orange-500 bg-orange-500' : 'border-slate-500'
                    }`} />
                    <span>Wholesale (Bulk)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Requirement */}
            <div>
              <label htmlFor="additional" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Additional Requirement / Notes (Optional)
              </label>
              <textarea
                id="additional"
                rows={2}
                value={additionalRequirement}
                onChange={(e) => setAdditionalRequirement(e.target.value)}
                placeholder="Specify vehicle year, specific brand preference, or any other detail..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm transition-colors resize-none"
              />
            </div>

            {/* Action Buttons Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Enquiry via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition-colors"
                title="Copy enquiry text to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>

              <a
                href={BUSINESS_INFO.telLink}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-md transition-all duration-150"
              >
                <Phone className="w-4 h-4" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </div>

            {submitted && (
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Enquiry formatted & WhatsApp opened!</span>
                </p>
                {generatedTrackingId && (
                  <p>
                    Saved to your account with Reference ID: <strong className="font-mono text-white bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">{generatedTrackingId}</strong>. You can view its live progress anytime in your Customer Account.
                  </p>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
