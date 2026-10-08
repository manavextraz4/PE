import { useState } from 'react';
import { Phone, Menu, X, MapPin, User, Clock } from 'lucide-react';
import { Logo } from './Logo.tsx';
import { BUSINESS_INFO } from '../data/businessData.ts';
import { useCustomerAuth } from '../context/CustomerAuthContext.tsx';
import { CustomerAuthModal } from './CustomerAuthModal.tsx';
import { CustomerDashboardModal } from './CustomerDashboardModal.tsx';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [dashboardModalOpen, setDashboardModalOpen] = useState(false);

  const { currentUser, enquiries } = useCustomerAuth();

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Brands', href: '#brands' },
    { label: 'Products', href: '#products' },
    { label: 'Wholesale & Retail', href: '#wholesale' },
    { label: 'Why Choose Us', href: '#why-us' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <a
              href="#home"
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg"
              aria-label="Preeti Enterprises - Home"
            >
              <Logo />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors duration-150 py-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Action: Customer Account + Phone Button */}
            <div className="hidden sm:flex items-center gap-3">
              {currentUser ? (
                <button
                  type="button"
                  onClick={() => setDashboardModalOpen(true)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700 hover:border-orange-500/50 text-xs font-semibold shadow-sm transition-all"
                >
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'Customer'}
                      className="w-5 h-5 rounded-full border border-orange-500/40"
                    />
                  ) : (
                    <User className="w-4 h-4 text-orange-400" />
                  )}
                  <span className="max-w-[100px] truncate">{currentUser.displayName?.split(' ')[0] || 'Account'}</span>
                  {enquiries.length > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-orange-600 text-[10px] text-white font-mono font-bold">
                      {enquiries.length}
                    </span>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold shadow-sm transition-colors"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.27-2.09 3.645-5.17 3.645-9.15z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.12 0-5.77-2.1-6.72-4.94H1.26v3.13C3.25 21.31 7.31 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.13-1.54.38-2.26V6.61H1.26C.46 8.23 0 10.06 0 12s.46 3.77 1.26 5.39l4.02-3.13z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.69 1.26 6.61l4.02 3.13c.95-2.84 3.6-4.99 6.72-4.99z"
                    />
                  </svg>
                  <span>Google Sign In</span>
                </button>
              )}

              <a
                href={BUSINESS_INFO.telLink}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-semibold text-xs shadow-md shadow-orange-950/50 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                aria-label={`Call Preeti Enterprises at ${BUSINESS_INFO.phone}`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Mobile Right Controls: Sign In / Account + Hamburger */}
            <div className="flex sm:hidden items-center gap-2">
              {currentUser ? (
                <button
                  type="button"
                  onClick={() => setDashboardModalOpen(true)}
                  className="p-2 rounded-lg bg-slate-900 border border-orange-500/40 text-orange-400 text-xs flex items-center gap-1 font-semibold"
                >
                  <User className="w-4 h-4" />
                  <span>Enquiries</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(true)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.27-2.09 3.645-5.17 3.645-9.15z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.12 0-5.77-2.1-6.72-4.94H1.26v3.13C3.25 21.31 7.31 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.13-1.54.38-2.26V6.61H1.26C.46 8.23 0 10.06 0 12s.46 3.77 1.26 5.39l4.02-3.13z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.69 1.26 6.61l4.02 3.13c.95-2.84 3.6-4.99 6.72-4.99z"
                    />
                  </svg>
                  <span>Sign In</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-white rounded-lg border border-slate-800 bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 animate-fadeIn">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="px-3 py-2.5 rounded-md text-base font-medium text-slate-200 hover:bg-slate-900 hover:text-orange-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col gap-3">
              {currentUser ? (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setDashboardModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-slate-900 text-orange-400 border border-orange-500/30 font-semibold text-sm shadow-sm"
                >
                  <Clock className="w-4 h-4" />
                  <span>My Enquiries & Live Progress ({enquiries.length})</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white text-slate-900 font-bold text-sm shadow-md"
                >
                  <span>Sign in with Google</span>
                </button>
              )}

              <a
                href={BUSINESS_INFO.telLink}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold text-sm shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call Preeti Enterprises ({BUSINESS_INFO.phone})</span>
              </a>

              <a
                href={BUSINESS_INFO.mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs border border-slate-800"
              >
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>Purnagard Chowk, Canal Road, Jeypore</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <CustomerAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => setDashboardModalOpen(true)}
      />

      {/* Dashboard Modal */}
      <CustomerDashboardModal
        isOpen={dashboardModalOpen}
        onClose={() => setDashboardModalOpen(false)}
      />
    </>
  );
}

