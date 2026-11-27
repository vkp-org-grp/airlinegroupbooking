'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Phone, PlaneTakeoff, Users } from 'lucide-react';
import { site } from '@/data/site';
import { destinations } from '@/data/destinations';
import SearchWidget from '@/components/SearchWidget';

// Background slides are real destination pages, so each caption links somewhere useful.
const SLIDES = ['london', 'dubai', 'singapore', 'paris']
  .map((slug) => destinations.find((d) => d.slug === slug))
  .filter(Boolean);

const SLIDE_INTERVAL = 6500;
const EASE = [0.22, 1, 0.36, 1];
const POINTS = ['Special group-only fares', 'Lock seats, add names later', 'Dedicated agent support'];

export default function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  useEffect(() => {
    if (reduce) return undefined;
    const id = setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_INTERVAL);
    return () => clearTimeout(id);
  }, [reduce, index]);

  // Entrance is a CSS slide only. Content is never hidden while waiting for JavaScript,
  // so the text (the mobile LCP element) paints with the first frame.
  const rise = (delay) => ({ style: { animationDelay: `${delay}s` } });

  return (
    <>
      <section className="relative flex min-h-[640px] items-center overflow-hidden bg-ink pb-40 pt-[130px] text-white lg:min-h-[92vh]">
        <div className="absolute inset-0" aria-hidden>
          <AnimatePresence initial={false}>
            <motion.div
              key={slide.slug}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.04 }}
                animate={{ scale: reduce ? 1.04 : 1.16 }}
                transition={{ duration: (SLIDE_INTERVAL + 1600) / 1000, ease: 'linear' }}
              >
                <Image src={slide.img} alt="" fill priority={index === 0} sizes="100vw" className="object-cover" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
          <div className="absolute -left-32 top-1/4 h-[420px] w-[420px] animate-aurora rounded-full bg-coral/20 blur-[120px]" />
          <div className="absolute -right-24 bottom-0 h-[380px] w-[380px] animate-aurora rounded-full bg-mint/15 blur-[120px] [animation-delay:-7s]" />
        </div>

        {/* flight route */}
        <svg
          className="pointer-events-none absolute right-[3%] top-[17%] hidden h-[36%] w-[25%] min-[1360px]:block"
          viewBox="0 0 600 360"
          fill="none"
          aria-hidden
        >
          <path
            id="hero-route"
            d="M20 320 C 150 90, 360 20, 560 120"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            className="animate-route"
          />
          <circle cx="20" cy="320" r="5" fill="#FF6B4A" />
          <circle cx="560" cy="120" r="5" fill="#FFB547" />
          {!reduce && (
            <path d="M12 0 L-8 -9 L-4 0 L-8 9 Z" fill="#fff">
              <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
                <mpath href="#hero-route" />
              </animateMotion>
            </path>
          )}
        </svg>

        <div className="wrap relative z-10">
          <p {...rise(0)} className="animate-rise eyebrow-dark">
            <Users size={13} />
            {site.minGroupSize}+ passengers · negotiated fares
          </p>

          <h1 {...rise(0.1)} className="animate-rise h-display mt-6 max-w-[14ch] text-[clamp(3rem,8.4vw,6.6rem)]">
            Let&apos;s travel the world <span className="text-sunset">together.</span>
          </h1>

          <p {...rise(0.22)} className="animate-rise mt-6 max-w-[54ch] text-[17px] leading-relaxed text-white/80">
            Organizing a trip for {site.minGroupSize} or more people? We simplify group air travel with negotiated
            fares, flexible terms, and a dedicated specialist for every itinerary — corporate teams, school tours,
            weddings, and sports crews alike.
          </p>

          <div {...rise(0.32)} className="animate-rise mt-9 flex flex-wrap items-center gap-3">
            {/*
            <a href={site.phoneHref} className="btn-accent py-4 text-base">
              <Phone size={18} strokeWidth={2.5} />
              Call {site.phone}
            </a>
            */}
            <a href="#book" className="btn-accent px-7 py-4">
              Start your group quote
              <ArrowRight size={16} strokeWidth={2.5} />
            </a>
            <a href="#travel-in-groups" className="btn-ghost-light px-7 py-4">
              See airline partners
            </a>
          </div>

          <ul {...rise(0.44)} className="animate-rise mt-9 flex flex-wrap gap-x-7 gap-y-3 text-[13px] font-semibold text-white/75">
            {POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <Check size={15} strokeWidth={3} className="text-mint" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* destination caption + slide progress */}
        <div className="absolute bottom-32 right-[max(2rem,calc((100%-1216px)/2))] z-10 hidden w-[270px] lg:block">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <Link
                href={`/destinations/${slide.slug}`}
                className="group flex items-center gap-4 rounded-2xl bg-white/95 p-4 text-ink shadow-float"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sunset">
                  <PlaneTakeoff size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-ember">{slide.country}</span>
                  <span className="block truncate font-display text-lg font-medium">{slide.name}</span>
                  <span className="block text-xs text-ink/55 group-hover:text-ink">Explore group flights →</span>
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 flex justify-end gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${s.name}`}
                aria-current={i === index}
                className="relative h-[3px] w-10 overflow-hidden rounded-full bg-white/30"
              >
                {i === index && (
                  <motion.span
                    key={index}
                    className="absolute inset-0 origin-left bg-white"
                    initial={{ scaleX: reduce ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: SLIDE_INTERVAL / 1000, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div id="book" className="wrap relative z-20 -mt-24 scroll-mt-28">
        <div {...rise(0.5)} className="animate-rise">
          <SearchWidget />
        </div>
      </div>
    </>
  );
}
