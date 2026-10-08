import { Phone, MapPin, Navigation, ArrowUp } from 'lucide-react';
import { Logo } from './Logo.tsx';
import { BUSINESS_INFO } from '../data/businessData.ts';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/90 text-slate-400 pb-16 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <Logo />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mt-3">
              Serving individual riders, mechanics, and wholesale commercial buyers with reliable two-wheeler replacement components and accessories in Jeypore, Odisha.
            </p>
            <div className="pt-2 text-xs text-slate-400">
              <span className="text-orange-400 font-semibold">No. 1 Wholesaler in Undivided Koraput District</span> · Wholesale & Retail Two-Wheeler Auto Parts
            </div>
          </div>

          {/* Quick Links Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Quick Navigation
            </span>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#home" className="hover:text-orange-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-orange-400 transition-colors">About</a>
              </li>
              <li>
                <a href="#brands" className="hover:text-orange-400 transition-colors">Authorized Brands</a>
              </li>
              <li>
                <a href="#products" className="hover:text-orange-400 transition-colors">Products & Categories</a>
              </li>
              <li>
                <a href="#wholesale" className="hover:text-orange-400 transition-colors">Wholesale & Retail</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-orange-400 transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-orange-400 transition-colors">Contact</a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Get Directions</span>
                  <Navigation className="w-3 h-3 text-orange-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Store Location & Contact */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Dealership Address
            </span>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Purnagard Chowk, Canal Road</p>
                  <p className="text-slate-400">Jeypore, Odisha – 764003, India</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <a
                  href={BUSINESS_INFO.telLink}
                  className="text-white hover:text-orange-400 font-mono font-semibold transition-colors"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={BUSINESS_INFO.telLink}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Preeti Enterprises. All rights reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            aria-label="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
