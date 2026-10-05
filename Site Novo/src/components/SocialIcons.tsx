import React from 'react';

interface SocialIconsProps {
  className?: string;
  onSelect?: (network: string) => void;
}

export const SocialIcons: React.FC<SocialIconsProps> = ({ className = '', onSelect }) => {
  const handleClick = (network: string) => {
    if (onSelect) {
      onSelect(network);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-5 sm:gap-6 text-white ${className}`}
      aria-label="Social media links"
    >
      {/* Facebook Icon */}
      <button
        onClick={() => handleClick('Facebook')}
        aria-label="Facebook"
        className="text-white hover:opacity-80 transition-opacity p-1 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
        title="Facebook"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="#ffffff"
          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
        >
          <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5c0-.988.245-1.49 1.5-1.49h2.5V2.14C16.85 2.09 15.65 2 14.35 2 10.95 2 8.698 4.07 8.698 7.89v2.62H5.5v3.98h3.198v7.01z" />
        </svg>
      </button>

      {/* Instagram Icon */}
      <button
        onClick={() => handleClick('Instagram')}
        aria-label="Instagram"
        className="text-white hover:opacity-80 transition-opacity p-1 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
        title="Instagram"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
        </svg>
      </button>

      {/* Twitter Bird Icon (Original) */}
      <button
        onClick={() => handleClick('Twitter')}
        aria-label="Twitter"
        className="text-white hover:opacity-80 transition-opacity p-1 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
        title="Twitter"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="#ffffff"
          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
        >
          <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.18 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
        </svg>
      </button>
    </div>
  );
};
