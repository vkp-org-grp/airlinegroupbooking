import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import { airlines } from '@/data/airlines';
import { pageSeo } from '@/lib/seo';

export const metadata = {
  ...pageSeo('/group-booking/'),
  title: 'Group Flight Booking — All Airline Partners',
  description: 'Negotiated group airfare across 18 airline partners for parties of 10 or more passengers.',
};

export default function GroupBookingIndex() {
  return (
    <>
      <PageHero
        eyebrow="Travel in groups"
        title="Group flight booking, airline by airline"
        body="Pick your preferred airline for route, hub, and group-perk details — or call the desk and a specialist will match the right carrier to your itinerary."
      />
      <section className="bg-paper py-20">
        <div className="wrap">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {airlines.map((a, i) => (
                <Link
                  key={a.slug}
                  href={`/group-booking/${a.slug}`}
                  className="group card flex flex-col"
                >
                  <div className="relative h-36 overflow-hidden">
                    <Image priority={i === 0} src={a.img} alt={a.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <h2 className="font-display text-lg font-medium">{a.name}</h2>
                      <p className="mt-2 text-[13px] leading-relaxed text-ink/55">{a.bestFor}</p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-teal">
                      Get quote <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
        </div>
      </section>
      {/* <CTASection /> */}
    </>
  );
}
