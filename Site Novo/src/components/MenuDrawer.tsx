import React from 'react';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md h-full bg-black border-l border-white/20 p-8 sm:p-12 flex flex-col justify-between font-['DM_Sans',sans-serif] text-white"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10">
          <span className="text-xs uppercase tracking-[0.3em] text-white">Ferrari Maranello</span>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-white hover:opacity-75 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-8 my-auto py-8">
          <nav className="flex flex-col gap-6 text-xl sm:text-2xl font-light tracking-wide">
            <a
              href="#hero-section"
              onClick={onClose}
              className="text-white hover:translate-x-2 transition-transform duration-200 flex items-center justify-between group"
            >
              <span>01. Built to be Remembered</span>
              <span className="text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Hero</span>
            </a>
            <a
              href="#second-fold"
              onClick={onClose}
              className="text-white hover:translate-x-2 transition-transform duration-200 flex items-center justify-between group"
            >
              <span>02. Performance & Purpose</span>
              <span className="text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Vision</span>
            </a>
            <a
              href="#second-fold"
              onClick={onClose}
              className="text-white hover:translate-x-2 transition-transform duration-200 flex items-center justify-between group"
            >
              <span>03. The Art of Motion</span>
              <span className="text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Emotion</span>
            </a>
            <a
              href="#second-fold"
              onClick={onClose}
              className="text-white hover:translate-x-2 transition-transform duration-200 flex items-center justify-between group"
            >
              <span>04. Beyond the Road</span>
              <span className="text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Destiny</span>
            </a>
          </nav>

          <div className="pt-8 border-t border-white/10 text-xs text-white/80 leading-relaxed font-light">
            <p>
              "There is a moment when engineering stops being numbers and becomes emotion. The sound. The response. The acceleration. The feeling of control. That moment is Ferrari."
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-white tracking-widest uppercase">
          <span>LAT 44.5326° N</span>
          <span>LONG 10.8644° E</span>
        </div>
      </div>
    </div>
  );
};
