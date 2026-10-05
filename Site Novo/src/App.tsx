import React from 'react';
import { MountainsBanner } from './components/MountainsBanner';
import { SecondFold } from './components/SecondFold';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-['DM_Sans',sans-serif] relative selection:bg-white selection:text-black scroll-smooth">
      {/* 1. Hero Section: Mountains explore banner with bottom fade */}
      <div id="hero-section" className="relative w-full">
        <MountainsBanner isFramed={false} />
      </div>

      {/* 2. Second Fold Section: From the reference image */}
      <SecondFold />
    </div>
  );
}
