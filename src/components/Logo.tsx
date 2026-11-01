import React from 'react';

interface LogoProps {
  variant?: 'horizontal' | 'icon' | 'badge';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'horizontal', size = 'md', className = '' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const IconElement = (
    <div
      className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-teal-500 shadow-md shadow-indigo-500/20 text-white ${iconSizes[size]}`}
      style={{
        width: size === 'sm' ? '28px' : size === 'lg' ? '48px' : '36px',
        height: size === 'sm' ? '28px' : size === 'lg' ? '48px' : '36px',
        minWidth: size === 'sm' ? '28px' : size === 'lg' ? '48px' : '36px',
        minHeight: size === 'sm' ? '28px' : size === 'lg' ? '48px' : '36px',
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: '60%', height: '60%' }}
        className="w-3/5 h-3/5"
      >
        {/* Open Book Foundation */}
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        {/* Connected AI Node / Neural Core */}
        <circle cx="12" cy="9" r="1.8" fill="currentColor" stroke="none" />
        <path d="M12 9v5" />
        <circle cx="9" cy="14" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="15" cy="14" r="1.2" fill="currentColor" stroke="none" />
        {/* Top Confidence Star */}
        <path d="M16 4.5l.8 1.5 1.7.2-1.3 1.2.4 1.7-1.6-.9-1.6.9.4-1.7-1.3-1.2 1.7-.2z" fill="#38bdf8" stroke="none" />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{IconElement}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {IconElement}
      <div className="flex flex-col">
        <span className={`font-bold tracking-tight text-slate-900 leading-tight ${textSizes[size]}`}>
          AI Exam <span className="text-indigo-600">Predictor</span>
        </span>
        {size !== 'sm' && (
          <span className="text-[10px] uppercase tracking-wider font-semibold text-teal-600">
            Learn Smart • Teach Better
          </span>
        )}
      </div>
    </div>
  );
};
