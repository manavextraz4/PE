import { Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData.ts';
import { CompanyLogoMark } from './CompanyLogoMark.tsx';

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Image & Location Badge Card */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              {/* Decorative background glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-2xl blur-xl opacity-50" />

              {/* Main Image Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1000&q=80"
                  alt="Two-wheeler motorcycle parts and technician servicing motorcycle components"
                  className="w-full h-80 sm:h-96 object-cover object-center filter contrast-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700">
                  <div className="flex items-center gap-3">
                    <CompanyLogoMark size={42} className="flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-orange-400">
                        Preeti Enterprises
                      </p>
                      <p className="text-sm font-bold text-white">
                        Purnagard Chowk, Canal Road, Jeypore
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4">
              No. 1 Wholesaler in Undivided Koraput District
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Your Trusted Two-Wheeler Auto Parts Partner
            </h2>

            <div className="mt-6 space-y-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              <p>
                Preeti Enterprises is the <span className="text-white font-semibold">No. 1 wholesale and retail two-wheeler auto parts dealer</span> located at{' '}
                <span className="text-white font-medium">Purnagard Chowk, Canal Road, Jeypore, Odisha</span>.
                We serve individual riders looking for replacement parts and components for their everyday bikes and scooters, as well as garages, retailers, and commercial buyers requiring bulk wholesale supply across undivided Koraput district.
              </p>

              <p>
                Whether you are replacing a worn-out component, maintaining your motorcycle or
                scooter, or sourcing parts for business requirements, Preeti Enterprises aims to
                make finding the right two-wheeler parts simple, reliable, and convenient.
              </p>
            </div>

            {/* Practical highlights */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-bold text-white block">Retail Customers</span>
                  <span className="text-xs text-slate-400">Single replacements & wear parts</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-bold text-white block">Wholesale Buyers</span>
                  <span className="text-xs text-slate-400">Bulk & quantity-based sourcing</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={BUSINESS_INFO.telLink}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-colors shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>

              <a
                href={BUSINESS_INFO.mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
              >
                <MapPin className="w-4 h-4 text-orange-400" />
                <span>Locate on Map</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
