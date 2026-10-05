import React from 'react';
import { motion } from 'motion/react';
import { PrancingHorse } from './PrancingHorse';

interface CardItem {
  num: string;
  title: string;
  description: string;
}

const CARDS_DATA: CardItem[] = [
  {
    num: '01',
    title: 'The Art of Motion',
    description:
      'There is a moment when engineering stops being numbers and becomes emotion. The sound. The response. The acceleration. The feeling of control. That moment is Ferrari.',
  },
  {
    num: '02',
    title: 'Nothing is Accidental',
    description:
      'Power without control is noise. Speed without precision is meaningless. True performance is the harmony between the two. Every curve has a purpose. Every detail serves a function. Every movement is engineered with intention.',
  },
  {
    num: '03',
    title: 'Beyond the Road',
    description:
      'There are cars that take you somewhere. And then there are cars that remind you why you wanted to go there in the first place. A Ferrari is not about arriving. It is about becoming.',
  },
  {
    num: '04',
    title: 'Drive the Dream',
    description:
      'Drive the dream. Leave the mark. Built with obsession. Driven with purpose. Remembered forever.',
  },
];

export const SecondFold: React.FC = () => {
  return (
    <section
      id="second-fold"
      className="w-full bg-black text-white font-['DM_Sans',sans-serif] relative overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Main Second Fold Container */}
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 pt-24 sm:pt-32 pb-24 relative">
        {/* 1. Reveal on scroll: Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-4"
        >
          <span className="font-['DM_Sans',sans-serif] text-xs sm:text-sm font-medium tracking-[0.3em] uppercase text-white/90">
            THE PURSUIT OF SOMETHING GREATER
          </span>
        </motion.div>

        {/* 2. Reveal on scroll: Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-6"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight font-['DM_Sans',sans-serif] uppercase">
            WHEN PERFORMANCE BECOMES PURPOSE.
          </h2>
        </motion.div>

        {/* 3. Reveal on scroll: Subtitle Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
        >
          <p className="text-sm sm:text-base font-light text-white leading-relaxed opacity-95">
            A Ferrari is not simply built to move. It is built to make you feel.
            Years of engineering, thousands of decisions, and an uncompromising obsession with perfection
            come together in one singular experience.
            <br className="my-2" />
            Because the road is not where the journey ends. It is where it begins.
          </p>
        </motion.div>

        {/* 4. Reveal on scroll: Four Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {CARDS_DATA.map((card, idx) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative bg-black border border-white/15 hover:border-white/40 rounded-2xl p-7 sm:p-8 min-h-[320px] sm:min-h-[360px] flex flex-col justify-between transition-colors duration-300 hover:-translate-y-1"
            >
              {/* Top Text Content */}
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: idx * 0.12 + 0.1, ease: 'easeOut' }}
                  className="text-xl sm:text-2xl font-medium tracking-tight text-white mb-3 sm:mb-4 leading-snug"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: idx * 0.12 + 0.2, ease: 'easeOut' }}
                  className="text-xs sm:text-[13px] font-light text-white leading-relaxed opacity-85"
                >
                  {card.description}
                </motion.p>
              </div>

              {/* Bottom Visual Elements: Station Number */}
              <div className="relative w-full pt-10 flex items-end justify-end">
                <div className="select-none">
                  <span className="font-['DM_Sans',sans-serif] text-2xl sm:text-3xl font-medium text-white tracking-wider opacity-90 group-hover:opacity-100 transition-opacity">
                    {card.num}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 5. Reveal on scroll: Concluding Statement */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-28 sm:mt-36 pt-16 border-t border-white/15 text-center select-none"
        >
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-[10px] sm:text-xs uppercase tracking-[0.4em] font-medium text-white/80 block mb-3"
          >
            Built with obsession · Driven with purpose · Remembered forever.
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 25, filter: 'blur(3px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 uppercase"
          >
            DRIVE THE DREAM. LEAVE THE MARK.
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="text-xl sm:text-2xl font-normal tracking-[0.7em] uppercase text-white/90"
          >
            FERRARI
          </motion.div>

          {/* White Ferrari Prancing Horse logo */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 flex justify-center items-center"
          >
            <PrancingHorse
              size={60}
              className="hover:scale-110 transition-transform duration-300 cursor-pointer"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
