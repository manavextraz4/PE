import { Shield, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { DEALER_BRANDS } from '../data/businessData.ts';

interface BrandsSectionProps {
  onSelectBrand?: (brandName: string) => void;
}

export function BrandsSection({ onSelectBrand }: BrandsSectionProps) {
  const handleBrandClick = (brandName: string, productHint?: string) => {
    if (onSelectBrand) {
      onSelectBrand(productHint ? `${brandName} (${productHint})` : `Brand: ${brandName}`);
    }
    const target = document.getElementById('requirement-finder');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="brands" className="py-16 sm:py-20 bg-slate-900/80 border-b border-slate-800 relative overflow-hidden">
      {/* Background subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Authorized Dealerships & OEM Brands</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Dealers of Leading Two-Wheeler Auto Brands
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Preeti Enterprises is a trusted wholesale and retail dealer for India&apos;s most reputed two-wheeler manufacturers. Explore brand-wise genuine replacement parts, batteries, cables, lubricants, and components below.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {DEALER_BRANDS.map((brand, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-orange-500/40 hover:bg-slate-950 transition-all duration-200 group flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-orange-400 font-bold tracking-wider uppercase bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                    Dealer
                  </span>
                  <CheckCircle className="w-4 h-4 text-slate-600 group-hover:text-orange-400 transition-colors" />
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight group-hover:text-orange-400 transition-colors font-display">
                  {brand.name}
                </h3>

                <p className="mt-1 text-xs text-orange-300/90 font-medium">
                  {brand.specialty}
                </p>

                {/* Specific items list */}
                <div className="mt-4 pt-3 border-t border-slate-850 flex flex-wrap gap-1.5">
                  {brand.products.map((item, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => handleBrandClick(brand.name, item)}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-900 hover:bg-orange-600/30 text-slate-300 hover:text-white border border-slate-800 hover:border-orange-500/40 transition-colors text-left"
                      title={`Enquire for ${brand.name} ${item}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-900 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleBrandClick(brand.name)}
                  className="text-xs font-semibold text-slate-400 group-hover:text-orange-400 flex items-center gap-1 transition-colors"
                >
                  <span>Enquire {brand.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}

          {/* And Many More Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-orange-500/30 flex flex-col justify-between group shadow-md">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-orange-400 font-bold tracking-wider uppercase bg-orange-500/20 px-2 py-0.5 rounded border border-orange-500/30">
                  Extended Lineup
                </span>
                <Sparkles className="w-4 h-4 text-orange-400" />
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight font-display">
                AND MANY MORE
              </h3>

              <p className="mt-1 text-xs text-slate-300 font-medium">
                Comprehensive 2-Wheeler Spares Range
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 leading-relaxed">
                Stocking fast-moving & engine components for Hero, Honda, Bajaj, TVS, Yamaha & Suzuki models.
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800">
              <a
                href="#requirement-finder"
                className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
              >
                <span>Ask for any specific brand</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Brands Banner / Call to Action */}
        <div className="mt-10 p-5 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-slate-300 text-center sm:text-left">
            <span className="font-bold text-white">Genuine parts from India&apos;s leading manufacturers: </span>
            UNO MINDA batteries & switches, SUPRAJIT cables & filters, BOSCH spark plugs & lubricants, PRICOL gauges & pumps, SAI fiber body & drums, KING QUALITY levers, and more.
          </div>

          <a
            href="#requirement-finder"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs transition-colors flex-shrink-0 shadow-sm"
          >
            <span>Ask for Brand Availability</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
