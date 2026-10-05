import React from 'react';

// Card 01: Tilted hollow rectangular crystal prism
export const RectangularPrism: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 160 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-28 h-36 drop-shadow-[0_10px_20px_rgba(255,255,255,0.08)] ${className}`}
    >
      {/* Back facets */}
      <polygon
        points="35,165 48,158 135,172 120,182"
        fill="rgba(255,255,255,0.04)"
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeOpacity="0.4"
      />
      {/* Left outer thickness */}
      <polygon
        points="22,50 35,42 48,158 35,165"
        fill="rgba(255,255,255,0.08)"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeOpacity="0.75"
      />
      {/* Front left pillar */}
      <polygon
        points="22,50 38,45 52,150 35,165"
        fill="rgba(255,255,255,0.12)"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeOpacity="0.9"
      />
      {/* Top frame */}
      <polygon
        points="22,50 110,25 125,32 38,58"
        fill="rgba(255,255,255,0.1)"
        stroke="#ffffff"
        strokeWidth="1.4"
        strokeOpacity="0.85"
      />
      {/* Inner opening cutout */}
      <polygon
        points="42,62 108,44 122,142 54,152"
        fill="rgba(0,0,0,0.6)"
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeOpacity="0.5"
      />
      {/* Right outer pillar */}
      <polygon
        points="110,25 125,32 140,155 126,150"
        fill="rgba(255,255,255,0.15)"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeOpacity="0.9"
      />
      {/* Specular high-light edges */}
      <line x1="22" y1="50" x2="35" y2="165" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.95" />
      <line x1="22" y1="50" x2="110" y2="25" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.95" />
      <line x1="110" y1="25" x2="126" y2="150" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.9" />
      <line x1="35" y1="165" x2="126" y2="175" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.85" />
      {/* Crystal corner flares */}
      <circle cx="22" cy="50" r="1.5" fill="#ffffff" />
      <circle cx="110" cy="25" r="1.5" fill="#ffffff" />
      <circle cx="35" cy="165" r="1.5" fill="#ffffff" />
    </svg>
  );
};

// Card 03: Floating faceted hexagonal crystal prism plate
export const HexagonalPrism: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-32 h-32 drop-shadow-[0_10px_25px_rgba(255,255,255,0.09)] ${className}`}
    >
      {/* Back thickness facet */}
      <polygon
        points="32,70 82,32 138,52 148,110 98,148 44,128"
        fill="rgba(255,255,255,0.03)"
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeOpacity="0.35"
      />
      {/* Front primary hexagon face */}
      <polygon
        points="24,62 76,22 132,42 144,102 92,142 36,120"
        fill="rgba(255,255,255,0.08)"
        stroke="#ffffff"
        strokeWidth="1.3"
        strokeOpacity="0.8"
      />
      {/* Facet bevel connections */}
      <polygon
        points="24,62 76,22 82,32 32,70"
        fill="rgba(255,255,255,0.18)"
        stroke="#ffffff"
        strokeWidth="1"
        strokeOpacity="0.85"
      />
      <polygon
        points="76,22 132,42 138,52 82,32"
        fill="rgba(255,255,255,0.12)"
        stroke="#ffffff"
        strokeWidth="1"
        strokeOpacity="0.75"
      />
      <polygon
        points="132,42 144,102 148,110 138,52"
        fill="rgba(255,255,255,0.15)"
        stroke="#ffffff"
        strokeWidth="1"
        strokeOpacity="0.85"
      />
      <polygon
        points="144,102 92,142 98,148 148,110"
        fill="rgba(255,255,255,0.2)"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeOpacity="0.9"
      />
      <polygon
        points="92,142 36,120 44,128 98,148"
        fill="rgba(255,255,255,0.14)"
        stroke="#ffffff"
        strokeWidth="1"
        strokeOpacity="0.8"
      />
      {/* Highlight edge rim */}
      <line x1="24" y1="62" x2="76" y2="22" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.95" />
      <line x1="76" y1="22" x2="132" y2="42" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.95" />
      <line x1="144" y1="102" x2="92" y2="142" stroke="#ffffff" strokeWidth="2" strokeOpacity="1" />
      <circle cx="76" cy="22" r="1.8" fill="#ffffff" />
      <circle cx="92" cy="142" r="1.8" fill="#ffffff" />
    </svg>
  );
};

// Card 04: Glass pyramid / tetrahedron crystal with internal reflections
export const PyramidPrism: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 170 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-32 h-32 drop-shadow-[0_10px_25px_rgba(255,255,255,0.1)] ${className}`}
    >
      {/* Base shadow/ground reflection */}
      <polygon
        points="22,140 148,132 110,154"
        fill="rgba(255,255,255,0.05)"
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeOpacity="0.4"
      />
      {/* Left pyramid face */}
      <polygon
        points="85,25 22,140 110,154"
        fill="rgba(255,255,255,0.1)"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeOpacity="0.8"
      />
      {/* Right pyramid face */}
      <polygon
        points="85,25 110,154 148,132"
        fill="rgba(255,255,255,0.2)"
        stroke="#ffffff"
        strokeWidth="1.3"
        strokeOpacity="0.9"
      />
      {/* Internal optical refraction facet */}
      <polygon
        points="85,25 70,115 110,154"
        fill="rgba(255,255,255,0.12)"
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeOpacity="0.6"
      />
      {/* Apex & ridge razor-sharp highlights */}
      <line x1="85" y1="25" x2="110" y2="154" stroke="#ffffff" strokeWidth="2.2" strokeOpacity="1" />
      <line x1="85" y1="25" x2="22" y2="140" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.85" />
      <line x1="85" y1="25" x2="148" y2="132" stroke="#ffffff" strokeWidth="1.6" strokeOpacity="0.9" />
      <line x1="22" y1="140" x2="110" y2="154" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.85" />
      <line x1="110" y1="154" x2="148" y2="132" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.95" />
      {/* Sparkle apex point */}
      <circle cx="85" cy="25" r="2.2" fill="#ffffff" />
    </svg>
  );
};
