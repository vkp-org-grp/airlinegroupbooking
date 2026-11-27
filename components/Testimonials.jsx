'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
// import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/data/content';
import { Reveal } from '@/components/Motion';

const AUTOPLAY_INTERVAL = 6000;

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const t = testimonials[i];
  const dir = 1;

  const next = () => setI((v) => (v + 1) % testimonials.length);
  const prev = () => setI((v) => (v - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (reduce || paused) return undefined;
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [reduce, paused, i]);

  return (
    <section className="night-sky py-24 text-white sm:py-32">
      <div className="wrap flex max-w-[900px] flex-col items-center text-center">
        <Reveal className="flex flex-col items-center">
          <p className="eyebrow-dark">Customer reviews</p>
          <h2 className="h-display mt-4 text-[clamp(2.2rem,5vw,3.8rem)]">
            What our travelers <span className="text-sunset">say about us</span>
          </h2>
          <div className="mt-8 flex justify-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous review"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next review"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 w-full">
          <div
            className="relative min-h-[300px] rounded-[32px] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-sm sm:p-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <Quote className="mx-auto text-coral" size={36} />
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24 * dir }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 * dir }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mt-6 font-display text-[clamp(1.3rem,2.6vw,1.9rem)] font-light leading-relaxed text-white">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-7 flex items-center justify-center gap-3">
                  {/* <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-sm">
                    <Image src={t.avatar} alt={t.name} fill sizes="44px" className="object-cover" />
                  </span> */}
                  <span>
                    <p className="font-display text-lg font-medium">{t.name}</p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">{t.role}</p>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-center gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setI(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${idx === i ? 'w-7 bg-sunset' : 'w-1.5 bg-white/25'}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
