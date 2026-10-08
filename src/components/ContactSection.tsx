import { useState } from 'react';
import { Phone, MapPin, Send, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData.ts';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bikeModel: '',
    partRequired: '',
    quantity: '1',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    // Phone validation (accepting 10-digit Indian numbers, optional spaces or prefixes)
    const cleanedPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanedPhone) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (!/^[6-9]\d{9}$/.test(cleanedPhone) && cleanedPhone.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.partRequired.trim()) {
      newErrors.partRequired = 'Please specify the part you require.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setSubmittedData({ ...formData });
    setIsSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    if (!submittedData) return;
    const msg = `Hello Preeti Enterprises,\n` +
      `Enquiry from: ${submittedData.name} (${submittedData.phone})\n` +
      `Bike/Scooter Model: ${submittedData.bikeModel || 'Not specified'}\n` +
      `Part Required: ${submittedData.partRequired}\n` +
      `Quantity: ${submittedData.quantity || '1'}\n` +
      (submittedData.message ? `Message: ${submittedData.message}\n` : '') +
      `\nPlease let me know availability. Thank you!`;
    const url = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      bikeModel: '',
      partRequired: '',
      quantity: '1',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Direct Contact
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Need a Two-Wheeler Part? Let&apos;s Talk.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Call Preeti Enterprises for product availability, wholesale enquiries, or retail requirements.
            </p>

            {/* Direct Cards */}
            <div className="mt-8 space-y-4">
              {/* Phone Card */}
              <a
                href={BUSINESS_INFO.telLink}
                className="flex items-center gap-4 p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-orange-500/50 hover:bg-slate-900 transition-all duration-150 group"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-600 group-hover:text-white transition-all flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                    Phone (Call Directly)
                  </span>
                  <span className="text-lg sm:text-xl font-bold font-mono text-white group-hover:text-orange-400 transition-colors">
                    {BUSINESS_INFO.phone}
                  </span>
                </div>
              </a>

              {/* Address Card */}
              <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-orange-400 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                    Store Location
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white block mt-0.5">
                    Purnagard Chowk, Canal Road
                  </span>
                  <span className="text-xs sm:text-sm text-slate-300">
                    Jeypore, Odisha – 764003, India
                  </span>
                </div>
              </div>
            </div>

            {/* Notice regarding authentic local shop service */}
            <div className="mt-8 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <p className="text-xs text-slate-400 leading-normal">
                Preeti Enterprises serves two-wheeler riders, mechanics, workshops, and bulk resellers across Jeypore and surrounding areas.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-xl">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Enquiry Received</h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-md mx-auto">
                    Thank you, <span className="text-white font-semibold">{submittedData?.name}</span>. Your enquiry for{' '}
                    <span className="text-white font-semibold">{submittedData?.partRequired}</span> has been formatted.
                  </p>

                  <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-1.5 max-w-md mx-auto text-slate-300">
                    <p><span className="text-slate-400">Phone:</span> {submittedData?.phone}</p>
                    <p><span className="text-slate-400">Model:</span> {submittedData?.bikeModel || 'Not specified'}</p>
                    <p><span className="text-slate-400">Quantity:</span> {submittedData?.quantity}</p>
                    {submittedData?.message && (
                      <p><span className="text-slate-400">Note:</span> {submittedData?.message}</p>
                    )}
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleSendToWhatsApp}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send to WhatsApp ({BUSINESS_INFO.phone})</span>
                    </button>

                    <a
                      href={BUSINESS_INFO.telLink}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-md"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Now ({BUSINESS_INFO.phone})</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-6 text-xs text-slate-400 hover:text-slate-200 underline"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Send an Enquiry
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Your Name <span className="text-orange-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rajesh Kumar"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border ${
                          errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'
                        } text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Phone Number <span className="text-orange-500">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 9876543210"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border ${
                          errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'
                        } text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Bike/Scooter Model */}
                    <div>
                      <label htmlFor="contact-model" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Bike / Scooter Model
                      </label>
                      <input
                        id="contact-model"
                        type="text"
                        value={formData.bikeModel}
                        onChange={(e) => setFormData({ ...formData, bikeModel: e.target.value })}
                        placeholder="e.g. Hero Splendor, Pulsar, Activa"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm"
                      />
                    </div>

                    {/* Part Required */}
                    <div>
                      <label htmlFor="contact-part" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Part Required <span className="text-orange-500">*</span>
                      </label>
                      <input
                        id="contact-part"
                        type="text"
                        value={formData.partRequired}
                        onChange={(e) => setFormData({ ...formData, partRequired: e.target.value })}
                        placeholder="e.g. Brake Shoes, Piston, Cable"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border ${
                          errors.partRequired ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'
                        } text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm`}
                      />
                      {errors.partRequired && (
                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.partRequired}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label htmlFor="contact-qty" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Quantity
                    </label>
                    <input
                      id="contact-qty"
                      type="text"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      placeholder="e.g. 1 piece, 5 units, Bulk wholesale requirement"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-msg" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="contact-msg"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Any additional details or questions for Preeti Enterprises..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold text-sm shadow-lg shadow-orange-950/40 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Enquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
