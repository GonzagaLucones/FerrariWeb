import React from 'react';

interface GuideLinesProps {
  visible?: boolean;
}

export const GuideLines: React.FC<GuideLinesProps> = ({ visible = true }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0">
      <svg
        viewBox="0 0 1440 900"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Horizontal Guide Line across upper third */}
        <line
          x1="0"
          y1="305"
          x2="1440"
          y2="305"
          stroke="#ffffff"
          strokeWidth="0.75"
          strokeOpacity="0.25"
        />

        {/* Primary Vertical Guide Line at ~78.5% */}
        <line
          x1="1130"
          y1="0"
          x2="1130"
          y2="900"
          stroke="#ffffff"
          strokeWidth="0.75"
          strokeOpacity="0.25"
        />

        {/* Secondary Vertical Guide Line on the right margin (~89%) */}
        <line
          x1="1285"
          y1="0"
          x2="1285"
          y2="900"
          stroke="#ffffff"
          strokeWidth="0.5"
          strokeOpacity="0.15"
        />

        {/* Crosshair Target Mark at intersection (1130, 305) */}
        <g stroke="#ffffff" strokeWidth="1" strokeOpacity="0.85">
          {/* Horizontal crosshair arms */}
          <line x1="1116" y1="305" x2="1144" y2="305" />
          {/* Vertical crosshair arms */}
          <line x1="1130" y1="291" x2="1130" y2="319" />
          {/* Tiny center point */}
          <circle cx="1130" cy="305" r="1.5" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
};
