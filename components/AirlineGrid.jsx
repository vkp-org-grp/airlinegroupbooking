'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { airlines } from '@/data/airlines';
import { Reveal, Stagger, staggerItem } from '@/components/Motion';
import SectionHeading from '@/components/SectionHeading';

// bento layout (4 columns on large screens) for the 8 featured airlines
const SPANS = ['col-span-2 row-span-2', '', '', '', '', '', '', 'col-span-2'];

export default function AirlineGrid() {
  const featured = airlines.slice(0, 8);

  return (
    <section id="travel-in-groups" className="scroll-mt-24 pb-24 pt-24 sm:pb-32">
      <div className="wrap">
        <SectionHeading eyebrow="Travel in groups" title="Exclusive negotiated fares with" accent="multiple airlines">
          <p className="max-w-[38ch] text-[15px] leading-relaxed text-ink/65">
            Corporate team, student group, wedding party, or sports crew — pick a partner below or call the desk and
            we&apos;ll match the right airline to your route.
          </p>
        </SectionHeading>

        <Stagger className="mt-14 grid auto-rows-[210px] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:auto-rows-[230px]">
          {featured.map((a, i) => (
            <motion.div key={a.slug} variants={staggerItem} className={SPANS[i]}>
              <Link href={`/group-booking/${a.slug}`} className="group relative block h-full overflow-hidden rounded-3xl bg-ink text-white">
                <Image
                  src={a.img}
                  alt={a.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/5" />
                <span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-sunset group-hover:text-ink">
                  <ArrowUpRight size={18} />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <h3 className={`font-display font-medium leading-tight ${i === 0 ? 'text-2xl sm:text-4xl' : 'text-lg sm:text-xl'}`}>
                    {a.name}
                  </h3>
                  <p className={`mt-1.5 text-[12.5px] leading-relaxed text-white/75 ${i === 0 ? 'max-w-[40ch] sm:text-[15px]' : 'line-clamp-2'}`}>
                    {a.bestFor}
                  </p>
                  <span className="mt-2 inline-block text-[11px] font-bold uppercase tracking-[0.16em] text-amber">Get quote</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-10 text-center">
          <Link href="/group-booking" className="btn-ghost">
            View other airlines
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
