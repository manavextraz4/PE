import { CompanyLogoMark } from './CompanyLogoMark.tsx';

interface LogoProps {
  variant?: 'light' | 'dark';
  compact?: boolean;
}

export function Logo({ variant = 'dark', compact = false }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Official Company Emblem: Gold P & Silver Ring */}
      <CompanyLogoMark size={compact ? 36 : 42} className="shadow-lg shadow-black/60 rounded-full" />

      <div className="flex flex-col">
        <span
          className={`font-extrabold tracking-tight font-display ${
            compact ? 'text-lg leading-tight' : 'text-xl sm:text-2xl leading-none'
          } ${variant === 'light' ? 'text-slate-900' : 'text-white'}`}
        >
          PREETI <span className="text-gradient-orange">ENTERPRISES</span>
        </span>
        <span
          className={`text-[10px] sm:text-xs font-medium tracking-normal mt-0.5 ${
            variant === 'light' ? 'text-slate-600' : 'text-slate-400'
          }`}
        >
          Wholesale & Retail Two-Wheeler Auto Parts Dealer
        </span>
      </div>
    </div>
  );
}
