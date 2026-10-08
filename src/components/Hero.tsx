import { Phone, Navigation, PackageCheck, Bike, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData.ts';

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-slate-950 pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-800">
      {/* Background Photography with Dark Automotive Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1920&q=80"
          alt="Motorcycle mechanical components and parts in workshop"
          className="w-full h-full object-cover object-center opacity-25 filter grayscale contrast-125 brightness-75 transform scale-105"
          loading="eager"
        />
        {/* Multi-layered dark cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
        <div className="absolute inset-0 bg-carbon-pattern opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Location & Industry Sub-headline Tag */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-xs font-bold tracking-wide text-orange-400 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>No. 1 Wholesaler in Undivided Koraput District</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-medium text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>Purnagard Chowk, Canal Road · Jeypore</span>
            </div>
          </div>

          {/* Hero Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Quality Two-Wheeler Auto Parts for{' '}
            <span className="text-gradient-orange">Wholesale & Retail</span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal">
            Preeti Enterprises is your trusted destination and the <strong className="text-white font-semibold">No. 1 wholesaler in undivided Koraput district</strong> for two-wheeler auto parts. Explore parts and accessories for your motorcycle or scooter, whether you need a single replacement part or wholesale bulk quantities.
          </p>

          {/* Primary & Secondary Call to Actions */}
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-4 items-center">
            <a
              href={BUSINESS_INFO.telLink}
              className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold text-base shadow-lg shadow-orange-950/60 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
              <span className="font-mono text-sm text-orange-100 border-l border-white/25 pl-2.5">
                {BUSINESS_INFO.phone}
              </span>
            </a>

            <a
              href={BUSINESS_INFO.mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-semibold text-base border border-slate-700 hover:border-slate-600 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              <Navigation className="w-5 h-5 text-orange-400" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Quick info note */}
          <div className="mt-4 text-xs text-slate-400 flex items-center gap-2">
            <span>Direct phone support available for part queries and availability check.</span>
          </div>
        </div>

        {/* Hero Trust Indicators (3 Badges / Cards) */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: Wholesale & Retail */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800/90 hover:border-orange-500/30 transition-all duration-200 group">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                <PackageCheck className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">No. 1 Wholesaler & Retail</h2>
                <p className="mt-1 text-xs text-slate-400 leading-normal">
                  Serving undivided Koraput district & local riders
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Two-Wheeler Parts */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800/90 hover:border-orange-500/30 transition-all duration-200 group">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/20 transition-colors">
                <Bike className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">Two-Wheeler Parts</h2>
                <p className="mt-1 text-xs text-slate-400 leading-normal">
                  Parts and accessories for motorcycles and scooters
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Jeypore, Odisha */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800/90 hover:border-orange-500/30 transition-all duration-200 group">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                <MapPin className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">Jeypore, Odisha</h2>
                <p className="mt-1 text-xs text-slate-400 leading-normal">
                  Conveniently located at Purnagard Chowk, Canal Road
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
