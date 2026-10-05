import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MountainsLogo } from './MountainsLogo';
import { PrancingHorse } from './PrancingHorse';
import { GuideLines } from './GuideLines';
import { MenuDrawer } from './MenuDrawer';

interface MountainsBannerProps {
  className?: string;
  isFramed?: boolean;
}

export const MountainsBanner: React.FC<MountainsBannerProps> = ({
  className = '',
  isFramed = false,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start start', 'end start'],
  });

  // Dynamic subtle scroll-driven parallax shift from left for description text
  const textScrollX = useTransform(scrollYProgress, [0, 0.8], [0, -35]);

  // Scroll effect: ferrari text rises from bottom with scroll effect
  const ferrariScrollY = useTransform(scrollYProgress, [0, 0.9], [40, -90]);

  return (
    <div
      ref={bannerRef}
      className={`relative w-full overflow-hidden bg-black text-white select-none ${
        isFramed
          ? 'aspect-[16/10] max-w-[1320px] mx-auto rounded-none shadow-2xl border border-white/10'
          : 'min-h-screen w-full flex flex-col justify-between'
      } ${className}`}
      style={{ backgroundColor: '#000000' }}
    >
      {/* 1. Subtle Architectural Guides & Crosshair */}
      <GuideLines visible={true} />

      {/* 2. Top Header Bar */}
      <header className="relative z-20 w-full px-8 sm:px-12 md:px-16 pt-8 sm:pt-10 md:pt-12 flex items-center justify-between">
        {/* Left Corner: Ferrari Prancing Horse (Cavallino Rampante) in pure white */}
        <div className="w-12 sm:w-16 flex items-center justify-start">
          <PrancingHorse
            size={40}
            className="hover:scale-105 transition-transform duration-200 cursor-pointer"
          />
        </div>

        {/* Center Logo: F E R R A R I */}
        <div className="flex-1 flex justify-center">
          <MountainsLogo />
        </div>

        {/* Top Right Hamburger Menu (two horizontal white bars) */}
        <div className="w-12 sm:w-16 flex justify-end">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open Navigation Menu"
            className="group flex flex-col items-end justify-center gap-1.5 p-2 -mr-2 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            <span className="w-5 sm:w-6 h-[1.5px] bg-white transition-transform group-hover:scale-x-110" />
            <span className="w-5 sm:w-6 h-[1.5px] bg-white transition-transform group-hover:scale-x-90" />
          </button>
        </div>
      </header>

      {/* 3. Main Center Content Canvas */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-8 sm:px-12 md:px-20 lg:px-24 my-auto">
        <div className="relative w-full max-w-[1280px] mx-auto">
          {/* Pre-title kicker from copy */}
          <div className="text-center mb-1">
            <span className="font-['DM_Sans',sans-serif] text-[11px] sm:text-xs font-medium tracking-[0.35em] text-white uppercase opacity-90 select-none">
              BUILT TO BE REMEMBERED.
            </span>
          </div>

          {/* Monumental Hero Word: "ferrari" appearing from bottom behind the graph with scroll effect */}
          <motion.div
            initial={{ opacity: 0, y: 100, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ y: ferrariScrollY }}
            className="w-full flex justify-center items-center text-center relative z-10 pointer-events-none"
          >
            <h1
              className="font-['DM_Sans',sans-serif] font-bold text-center tracking-tight leading-none text-[clamp(4.5rem,14vw,11.5rem)] select-none lowercase bg-clip-text text-transparent"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                backgroundImage: 'linear-gradient(180deg, #ffffff 12%, rgba(255, 255, 255, 0.65) 55%, rgba(255, 255, 255, 0.16) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ferrari
            </h1>
          </motion.div>

          {/* Description Paragraph: Exact copy from user with scroll effect from left */}
          <motion.div
            initial={{ opacity: 0, x: -80, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ x: textScrollX }}
            className="relative mt-2 sm:mt-4 md:-mt-6 lg:-mt-10 ml-0 sm:ml-4 md:ml-12 lg:ml-20 max-w-[480px] z-30"
          >
            <p
              className="font-['DM_Sans',sans-serif] font-normal text-white text-xs sm:text-[13px] md:text-sm leading-relaxed sm:leading-relaxed text-left"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: '#ffffff',
              }}
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Some dreams are meant to be chased.
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                Others are meant to be driven.
              </motion.span>
              <motion.span
                className="block mt-1.5"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.75, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-semibold">Ferrari.</span> Where engineering becomes emotion.
              </motion.span>
            </p>
          </motion.div>
        </div>
      </main>

      {/* Spacing spacer replacing removed footer */}
      <div className="h-8 sm:h-12" />

      {/* Navigation Slide Drawer */}
      <MenuDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
};
