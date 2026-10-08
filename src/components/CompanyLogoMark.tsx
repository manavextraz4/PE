interface CompanyLogoMarkProps {
  className?: string;
  size?: number;
}

export function CompanyLogoMark({ className = '', size = 48 }: CompanyLogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`flex-shrink-0 ${className}`}
      aria-label="Preeti Enterprises Official Logo"
    >
      <defs>
        {/* Rich Metallic Gold Gradient */}
        <linearGradient id="goldGradient" x1="40" y1="30" x2="160" y2="170" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DFBF60" />
          <stop offset="20%" stopColor="#F9EAA2" />
          <stop offset="45%" stopColor="#D4AD3F" />
          <stop offset="70%" stopColor="#B38927" />
          <stop offset="90%" stopColor="#F5E49B" />
          <stop offset="100%" stopColor="#9C731A" />
        </linearGradient>

        {/* Polished Metallic Silver / Chrome Gradient */}
        <linearGradient id="silverGradient" x1="165" y1="35" x2="65" y2="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#CBD5E1" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="75%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>

        {/* Depth shadow */}
        <filter id="metalShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.7" />
        </filter>
      </defs>

      {/* Dark Circular Background Disc */}
      <circle cx="100" cy="100" r="97" fill="#0b0f17" />
      <circle cx="100" cy="100" r="96" stroke="#1e293b" strokeWidth="1.5" />

      {/* Silver Outer Ring Arc (Clockwise from ~11 o'clock to ~5:30) */}
      <path
        d="M 64 36
           A 76 76 0 1 1 106 174
           L 106 158
           A 60 60 0 1 0 74 48
           Z"
        fill="url(#silverGradient)"
        filter="url(#metalShadow)"
      />

      {/* Gold Left Outer Ring & Connecting Arc */}
      <path
        d="M 64 36
           A 76 76 0 0 0 98 174
           L 98 156
           A 60 60 0 0 1 48 100
           C 48 83 55 68 64 56
           L 52 56
           C 41 70 34 87 34 100
           A 68 68 0 0 0 86 166
           L 78 166
           Z"
        fill="url(#goldGradient)"
        filter="url(#metalShadow)"
      />

      {/* Primary Gold 'P' Monogram */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 49 56
           H 122
           C 144 56 156 70 156 94
           C 156 118 144 132 122 132
           H 92
           V 174
           H 74
           V 56
           H 49
           Z
           M 92 74
           V 114
           H 118
           C 128 114 136 107 136 94
           C 136 81 128 74 118 74
           H 92
           Z"
        fill="url(#goldGradient)"
        filter="url(#metalShadow)"
      />

      {/* Distinctive Left Crescent Accent (Connecting P stem to outer circle) */}
      <path
        d="M 52 56
           L 74 56
           V 152
           L 98 174
           A 76 76 0 0 1 24 100
           C 24 78 35 59 52 56
           Z
           M 46 72
           C 38 82 34 94 34 100
           A 66 66 0 0 0 82 163
           L 74 152
           V 72
           H 46
           Z"
        fill="url(#goldGradient)"
      />
    </svg>
  );
}
