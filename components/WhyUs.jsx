'use client';

import { motion } from 'framer-motion';
import { CalendarClock, Headset, Phone, Send, UsersRound } from 'lucide-react';
import { whyUs, stats } from '@/data/content';
import { site } from '@/data/site';
import { CountUp, Reveal, Stagger, staggerItem } from '@/components/Motion';
import SectionHeading from '@/components/SectionHeading';

// one icon per whyUs entry, in the same order
const ICONS = [UsersRound, CalendarClock, Phone, Send, Headset];
// bento: two wide cards on top, three below (6 columns on large screens)
const SPANS = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'sm:col-span-2 lg:col-span-2'];

export default function WhyUs() {
  return (
    <section id="why" className="night-sky scroll-mt-24 overflow-hidden py-24 text-white sm:py-32">
      <div className="wrap">
        <SectionHeading dark eyebrow="Why travel with us" title="Group flights, without the" accent="group chat chaos.">
          <p className="max-w-[30ch] text-[15px] text-white/65">Confirm your group fare in minutes.</p>
        </SectionHeading>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {whyUs.map((w, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={w.title}
                variants={staggerItem}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors duration-500 hover:border-coral/50 sm:p-8 ${SPANS[i] || ''}`}
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-coral/0 blur-3xl transition-colors duration-500 group-hover:bg-coral/30" />
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-amber transition-all duration-500 group-hover:-rotate-6 group-hover:bg-sunset group-hover:text-ink">
                  <Icon size={21} />
                </span>
                <h3 className="mt-6 font-display text-2xl font-medium leading-snug">{w.title}</h3>
                <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-white/65">{w.body}</p>
              </motion.div>
            );
          })}
        </Stagger>

        <Reveal delay={0.15}>
          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/10 pt-12 text-center sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-[clamp(2.4rem,5vw,3.8rem)] font-light leading-none">
                    <span className="text-sunset">{s.text ? s.text : <CountUp to={s.value} suffix={s.suffix} />}</span>
                  </span>
                  <span className="mt-3 block text-[11px] font-bold uppercase leading-relaxed tracking-[0.18em] text-white/55">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
        {/*
        <a href={site.phoneHref} className="btn-accent mt-12">
          <Phone size={16} strokeWidth={2.5} />
          Call {site.phone}
        </a>
        */}
      </div>
    </section>
  );
}
