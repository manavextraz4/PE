import { Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData.ts';

export function FloatingMobileBar() {
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello Preeti Enterprises, I am inquiring about two-wheeler auto parts availability.'
  )}`;

  return (
    <aside aria-label="Quick contact actions" className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-2xl">
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        {/* Call Now Button */}
        <a
          href={BUSINESS_INFO.telLink}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-orange-600 active:bg-orange-700 text-white font-bold text-sm shadow-md text-center"
          aria-label={`Call Preeti Enterprises at ${BUSINESS_INFO.phone}`}
        >
          <Phone className="w-4 h-4 fill-current" />
          <span>Call Now</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-bold text-sm shadow-md text-center"
          aria-label="Enquire via WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>
      </div>
    </aside>
  );
}
