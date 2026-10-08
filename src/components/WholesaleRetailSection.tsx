import { User, Building2, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData.ts';

interface WholesaleRetailProps {
  onSelectWholesale?: () => void;
}

export function WholesaleRetailSection({ onSelectWholesale }: WholesaleRetailProps) {
  const handleWholesaleEnquiry = () => {
    if (onSelectWholesale) {
      onSelectWholesale();
    }
    const target = document.getElementById('requirement-finder');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="wholesale" className="py-16 sm:py-20 lg:py-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            No. 1 Wholesaler in Undivided Koraput District
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Wholesale & Retail — One Place for Your Two-Wheeler Parts Needs
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Whether you are an individual vehicle owner needing a single replacement part or a business sourcing in bulk quantities, we cater to both requirements across Jeypore and undivided Koraput district.
          </p>
        </div>

        {/* Two Large Cards */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Retail Customers */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-10 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl">
            <div>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <User className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400 font-mono">
                  Retail Channel
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white tracking-tight">
                Retail Customers
              </h3>
              <p className="mt-2 text-base font-semibold text-slate-300">
                Need a replacement part for your motorcycle or scooter?
              </p>

              <div className="mt-6 space-y-3.5">
                {[
                  'Individual requirements',
                  'Replacement parts',
                  'Maintenance-related components',
                  'Easy enquiry by phone',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-800">
              <a
                href={BUSINESS_INFO.telLink}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-orange-600 text-white font-semibold text-sm transition-all shadow-md group"
              >
                <Phone className="w-4 h-4 text-orange-400 group-hover:text-white transition-colors" />
                <span>Call for Availability</span>
                <span className="text-slate-400 group-hover:text-white/80 font-mono text-xs">
                  ({BUSINESS_INFO.phone})
                </span>
              </a>
            </div>
          </div>

          {/* Card 2: Wholesale Buyers */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-orange-500/30 p-8 sm:p-10 flex flex-col justify-between hover:border-orange-500/50 transition-all shadow-xl relative overflow-hidden">
            {/* Subtle highlight tag */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-600 to-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-bl-lg shadow-sm">
              No. 1 Wholesaler · Undivided Koraput District
            </div>

            <div>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400 font-mono">
                  Wholesale Channel
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white tracking-tight">
                Wholesale Buyers
              </h3>
              <p className="mt-2 text-base font-semibold text-slate-300">
                Looking for two-wheeler parts in larger bulk quantities?
              </p>

              <div className="mt-6 space-y-3.5">
                {[
                  'No. 1 bulk network across undivided Koraput district',
                  'Supply for retailers, garages, and workshops',
                  'Comprehensive 2-wheeler fast-moving & engine spares',
                  'Direct quantity-based enquiries and phone support',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-800">
              <button
                type="button"
                onClick={handleWholesaleEnquiry}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold text-sm transition-all shadow-lg shadow-orange-950/40"
              >
                <span>Enquire for Wholesale</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
