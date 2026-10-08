import { useState } from 'react';
import { X, ShieldCheck, Clock, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useCustomerAuth } from '../context/CustomerAuthContext.tsx';
import { CompanyLogoMark } from './CompanyLogoMark.tsx';

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CustomerAuthModal({ isOpen, onClose, onSuccess }: CustomerAuthModalProps) {
  const { loginWithGoogle, currentUser } = useCustomerAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await loginWithGoogle();
      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      if (error?.code !== 'auth/popup-closed-by-user') {
        setErrorMessage('Unable to complete Google sign-in. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Company Logo */}
        <div className="text-center">
          <div className="inline-flex justify-center mb-3">
            <CompanyLogoMark size={56} className="shadow-lg shadow-black/80" />
          </div>
          <h2 id="auth-modal-title" className="text-2xl font-extrabold text-white tracking-tight">
            Customer Account
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Sign in directly with your Google account to submit enquiries and track parts status.
          </p>
        </div>

        {/* Value features */}
        <div className="mt-6 space-y-2.5 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 text-xs">
          <div className="flex items-center gap-2.5 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
            <span>Send parts enquiries directly without re-entering details</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300">
            <Clock className="w-4 h-4 text-orange-400 flex-shrink-0" />
            <span>Track live warehouse stock check and pickup readiness</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-orange-400 flex-shrink-0" />
            <span>Full historical log of all your retail & wholesale requests</span>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-4 p-3 rounded-xl bg-red-950/50 border border-red-800 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Direct Google Sign-In Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-md transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none"
          >
            {/* Google G logo */}
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
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
            <span>{isSubmitting ? 'Signing in with Google...' : 'Continue with Google'}</span>
          </button>
        </div>

        <p className="mt-4 text-center text-[11px] text-slate-500">
          Secure authentication managed by Google & Firebase.
        </p>
      </div>
    </div>
  );
}
