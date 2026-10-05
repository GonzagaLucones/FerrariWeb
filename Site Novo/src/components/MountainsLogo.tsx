import React from 'react';

interface MountainsLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const MountainsLogo: React.FC<MountainsLogoProps> = ({ className = '' }) => {
  return (
    <div
      className={`inline-flex items-center select-none text-white tracking-[0.5em] sm:tracking-[0.65em] text-[11px] sm:text-xs md:text-sm font-normal uppercase ${className}`}
      aria-label="FERRARI"
    >
      <span className="font-['DM_Sans',sans-serif]">F E R R A R I</span>
    </div>
  );
};
