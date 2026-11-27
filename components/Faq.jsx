'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Reveal } from '@/components/Motion';

export default function Faq({ items, eyebrow = 'Questions', heading = 'Frequently asked' }) {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="scroll-mt-24 py-24 sm:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h-display mt-4 text-[clamp(2rem,4.4vw,3rem)]">{heading}</h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="space-y-3">
            {items.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className={`rounded-3xl bg-white px-6 transition-shadow sm:px-7 ${isOpen ? 'shadow-card' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className={`flex w-full items-start justify-between gap-6 pt-6 text-left ${isOpen ? 'pb-2' : 'pb-6'}`}
                  >
                    <span className="font-display text-lg font-medium leading-snug">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${
                        isOpen ? 'bg-sunset text-ink' : 'bg-ink/5 text-ink/60'
                      }`}
                    >
                      <Plus size={16} strokeWidth={2.5} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[62ch] pb-6 pr-6 text-[15px] leading-relaxed text-ink/65">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
