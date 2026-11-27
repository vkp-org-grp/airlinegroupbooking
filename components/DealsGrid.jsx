'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Plane } from 'lucide-react';
import { deals } from '@/data/deals';
import { Reveal, Stagger, staggerItem } from '@/components/Motion';
import SectionHeading from '@/components/SectionHeading';

export default function DealsGrid() {
  const featured = deals.slice(0, 6);

  return (
    <section id="deals" className="scroll-mt-24 py-24 sm:py-32">
      <div className="wrap">
        <SectionHeading eyebrow="Special deals" title="Save more with" accent="seasonal group airfare" />

        {/* boarding-pass cards */}
        <Stagger className="mt-14 grid gap-5 lg:grid-cols-2">
          {featured.map((d) => (
            <motion.div key={d.slug} variants={staggerItem} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
              <Link
                href={`/deals/${d.slug}`}
                className="group flex h-full overflow-hidden rounded-3xl bg-white shadow-card"
              >
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <span className="w-fit rounded-full bg-teal/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-teal">
                    {d.tag}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-medium leading-snug">{d.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{d.summary}</p>
                </div>

                {/* tear-off stub */}
                <div className="relative flex w-[86px] shrink-0 flex-col items-center justify-center gap-3 border-l-2 border-dashed border-paper bg-ink text-white transition-colors duration-500 group-hover:bg-ink2 sm:w-[120px]">
                  <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-paper" aria-hidden />
                  <span className="absolute -bottom-3 -left-3 h-6 w-6 rounded-full bg-paper" aria-hidden />
                  <Plane size={24} className="text-amber transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:translate-x-1.5" />
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.16em]">
                    Explore
                    <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-10 text-center">
          <Link href="/deals" className="btn-ghost">
            View all special deals
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
