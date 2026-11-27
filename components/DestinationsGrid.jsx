'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { Reveal } from '@/components/Motion';
import SectionHeading from '@/components/SectionHeading';

export default function DestinationsGrid() {
  const track = useRef(null);
  const scroll = (dir) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: 'smooth' });
  const arrow =
    'grid h-12 w-12 place-items-center rounded-full border border-white/25 transition-colors hover:border-white hover:bg-white hover:text-ink';

  return (
    <section className="overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="wrap">
        <SectionHeading dark eyebrow="Choose your destination" title="Popular group" accent="destinations">
          <div className="flex gap-2">
            <button type="button" onClick={() => scroll(-1)} aria-label="Previous destinations" className={arrow}>
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="More destinations" className={arrow}>
              <ChevronRight size={20} />
            </button>
          </div>
        </SectionHeading>

        <Reveal delay={0.1}>
          <ul
            ref={track}
            className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {destinations.map((d) => (
              <li key={d.slug} className="w-[72%] shrink-0 snap-start sm:w-[42%] lg:w-[calc((100%-3rem)/4)]">
                <Link href={`/destinations/${d.slug}`} className="group relative block aspect-[3/4.2] overflow-hidden rounded-[28px]">
                  <Image
                    src={d.img}
                    alt={d.name}
                    fill
                    sizes="(max-width: 640px) 72vw, (max-width: 1024px) 42vw, 25vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  <span className="absolute inset-x-5 bottom-5">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-amber">{d.country}</span>
                    <span className="mt-1 block font-display text-3xl font-light">{d.name}</span>
                    <span className="mt-3 block h-[2px] w-8 rounded-full bg-sunset transition-all duration-500 group-hover:w-full" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
