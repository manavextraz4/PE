import { MapPin, Navigation, Phone, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData.ts';

export function LocationSection() {
  return (
    <section id="location" className="py-16 sm:py-20 lg:py-24 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Shop Location
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Visit Preeti Enterprises
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Conveniently situated in Jeypore, Odisha for retail walk-ins and wholesale pickup or supply coordination.
          </p>
        </div>

        {/* Location Info & Map Container */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Address Card & Direction Action */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Preeti Enterprises</h3>
                  <p className="text-xs text-orange-400 font-medium">Auto Parts Dealership</p>
                </div>
              </div>

              {/* Exact Address */}
              <div className="space-y-2 py-4 border-y border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                  Store Address
                </span>
                <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                  Purnagard Chowk, Canal Road
                </p>
                <p className="text-sm text-slate-300">
                  Jeypore, Odisha – 764003, India
                </p>
              </div>

              {/* Contact info shortcut */}
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-orange-400 flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Direct Assistance</span>
                  <a
                    href={BUSINESS_INFO.telLink}
                    className="text-sm sm:text-base font-bold font-mono text-white hover:text-orange-400 transition-colors"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
              <a
                href={BUSINESS_INFO.mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold text-sm shadow-md transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <p className="text-[11px] text-center text-slate-400">
                Opens Google Maps with verified address in Jeypore, Odisha.
              </p>
            </div>
          </div>

          {/* Right Column: Embedded Map */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950 min-h-[350px] sm:min-h-[420px] relative">
            <iframe
              title="Preeti Enterprises Location Map"
              src={BUSINESS_INFO.mapsEmbedUrl}
              className="w-full h-full min-h-[350px] sm:min-h-[420px] border-0 filter contrast-105"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            {/* Overlay hint */}
            <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-300 font-medium">
              Purnagard Chowk · Jeypore
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
