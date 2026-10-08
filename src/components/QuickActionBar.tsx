import { Phone, MapPin, Boxes, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData.ts';

export function QuickActionBar() {
  return (
    <section className="bg-slate-900 border-b border-slate-800 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {/* Card 1: Call Us */}
          <a
            href={BUSINESS_INFO.telLink}
            className="flex items-center justify-between p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-orange-500/50 hover:bg-slate-950 transition-all duration-150 group shadow-sm"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-orange-600/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-600 text-orange-400 group-hover:text-white transition-all">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                  Call Us
                </span>
                <span className="text-base sm:text-lg font-bold font-mono text-white tracking-wide">
                  {BUSINESS_INFO.phone}
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition-colors" />
          </a>

          {/* Card 2: Visit Us */}
          <a
            href={BUSINESS_INFO.mapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-orange-500/50 hover:bg-slate-950 transition-all duration-150 group shadow-sm"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-700 text-orange-400 transition-all">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                  Visit Us
                </span>
                <span className="text-sm sm:text-base font-semibold text-white line-clamp-1">
                  Purnagard Chowk, Canal Road, Jeypore
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition-colors" />
          </a>

          {/* Card 3: Wholesale & Retail */}
          <a
            href="#wholesale"
            className="flex items-center justify-between p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-orange-500/50 hover:bg-slate-950 transition-all duration-150 group shadow-sm"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-700 text-orange-400 transition-all">
                <Boxes className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                  Wholesale & Retail
                </span>
                <span className="text-xs sm:text-sm font-semibold text-orange-400">
                  No. 1 Wholesaler in Undivided Koraput Dist.
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
}
