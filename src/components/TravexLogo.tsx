import React from 'react';

interface TravexLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const TravexLogo: React.FC<TravexLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  showTagline = false
}) => {
  // Size configurations
  const sizeMap = {
    sm: { icon: 24, text: 'text-lg', sub: 'text-[8px]' },
    md: { icon: 32, text: 'text-2xl', sub: 'text-[9px]' },
    lg: { icon: 42, text: 'text-3xl', sub: 'text-[11px]' },
    xl: { icon: 54, text: 'text-4xl', sub: 'text-xs' }
  };

  const currentSize = sizeMap[size];

  // Colors based on variant
  const isLight = variant === 'light' || variant === 'white';
  const textPrimary = isLight ? 'text-white' : 'text-slate-900';
  const textSecondary = isLight ? 'text-teal-300' : 'text-teal-600';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Bespoke Geometric Travel Emblem: Modern stylized compass needle & soaring winged apex */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="travex-grad-primary" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0d9488" />
            <stop offset="0.5" stopColor="#06b6d4" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
          <linearGradient id="travex-grad-accent" x1="8" y1="32" x2="32" y2="8" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0f766e" />
            <stop offset="1" stopColor="#14b8a6" />
          </linearGradient>
          <filter id="travex-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0d9488" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Outer diamond / shield compass frame */}
        <rect
          x="4"
          y="4"
          width="32"
          height="32"
          rx="10"
          transform="rotate(0 20 20)"
          fill="url(#travex-grad-primary)"
          filter="url(#travex-glow)"
        />

        {/* Inner geometric negative-space dynamic path: soaring avian / compass needle 'T' + 'V' */}
        {/* Left Wing / North Arrow */}
        <path
          d="M20 9L29 20L20 17L11 20L20 9Z"
          fill="#ffffff"
          opacity="0.95"
        />
        {/* Right Shaded Wing */}
        <path
          d="M20 9L29 20L20 17V9Z"
          fill="#e0f2fe"
          opacity="0.85"
        />
        {/* Lower Southern Anchor Apex forming the 'V' & travel path */}
        <path
          d="M20 20L26 27L20 31L14 27L20 20Z"
          fill="#042f2e"
          opacity="0.4"
        />
        <path
          d="M20 22L20 30L15 26.5L20 22Z"
          fill="#ffffff"
          opacity="0.9"
        />
        <path
          d="M20 22L25 26.5L20 30V22Z"
          fill="#cbd5e1"
          opacity="0.7"
        />

        {/* Center glowing navigational star bead */}
        <circle cx="20" cy="19.5" r="2.2" fill="#38bdf8" />
        <circle cx="20" cy="19.5" r="1.2" fill="#ffffff" />
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center tracking-tight font-black">
          <span className={`font-editorial ${currentSize.text} ${textPrimary} tracking-tight font-extrabold`}>
            TRAVEX
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 ml-0.5 mb-1" />
        </div>
        {showTagline && (
          <span className={`${currentSize.sub} font-bold tracking-[0.22em] uppercase ${textSecondary} -mt-0.5`}>
            TOURS & EXPEDITIONS
          </span>
        )}
      </div>
    </div>
  );
};
