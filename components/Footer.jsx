import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Twitter, Plane } from 'lucide-react';
import { footerLinks, site } from '@/data/site';
import Logo from '@/components/Logo';
import { airlines } from '@/data/airlines';

const badges = [
  // { src: '/ARC-logo.png', alt: 'ARC accredited agency', width: 149, height: 59 },
  // { src: '/iata-logo-header.svg', alt: 'IATA', width: 67, height: 42 },
  { src: '/visa.png', alt: 'Visa', width: 160, height: 103 },
  { src: '/master.png', alt: 'Mastercard', width: 160, height: 103 },
  { src: '/americon.png', alt: 'American Express', width: 160, height: 99 },
  { src: '/discover.png', alt: 'Discover', width: 160, height: 103 },
  { src: '/paypal.png', alt: 'PayPal', width: 160, height: 94 },
  { src: '/cloudflare-logo.webp', alt: 'Cloudflare secured', width: 115, height: 40 },
];

const socials = [
  { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61594790276864' },
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/_airlinesgroupbookings/' },
  { Icon: Twitter, label: 'X', href: 'https://x.com/Airlinesgrx9o' },
  // { Icon: Linkedin, label: 'LinkedIn', href: '#' }, // add the profile URL to show this icon
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink pb-12 pt-16 text-white">
      <div className="wrap mb-16">
        <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[32px] bg-sunset p-8 text-ink sm:p-12 lg:flex-row lg:items-center">
          <Plane size={220} strokeWidth={0.8} className="pointer-events-none absolute -right-8 -top-10 rotate-12 text-ink/10" aria-hidden />
          <div className="relative">
            <p className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light leading-tight">Planning a trip for your group?</p>
            <p className="mt-2 max-w-[52ch] text-[15px] font-semibold text-ink/75">
              Send your route, dates, and headcount — the group desk replies within 24 business hours.
            </p>
          </div>
          <Link href="/contact" className="btn-ink relative shrink-0 px-8 py-4">
            Request a group quote
          </Link>
        </div>
      </div>

      <div className="mb-16 overflow-hidden border-y border-white/[0.07] py-4">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...airlines, ...airlines].map((a, i) => (
            <span key={i} className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/25">
              {a.short} <span className="text-coral/60">·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="wrap grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
        <div>
          <Logo variant="light" />
          <p className="mt-6 max-w-[36ch] text-sm leading-relaxed text-white/50">
            At {site.name}, we specialize in simplifying air travel for groups of {site.minGroupSize} or more —
            corporate teams, student tours, weddings, and community trips, booked at the best possible fares.
          </p>
          <div className="mt-7 flex gap-2">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-white/60 transition-colors hover:-translate-y-1 hover:border-coral hover:bg-coral hover:text-ink"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-mono text-[10px] uppercase tracking-[0.24em] text-coral">Explore</h4>
          <ul className="mt-5 space-y-3">
            {footerLinks.company.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-white/55 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/group-booking" className="text-sm text-white/55 transition-colors hover:text-white">
                Group bookings
              </Link>
            </li>
            <li>
              <Link href="/deals" className="text-sm text-white/55 transition-colors hover:text-white">
                Special deals
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[10px] uppercase tracking-[0.24em] text-coral">Legal</h4>
          <ul className="mt-5 space-y-3">
            {footerLinks.legal.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-white/55 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[10px] uppercase tracking-[0.24em] text-coral">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/55">
            {/* {site.address.map((l) => (
              <li key={l}>{l}</li>
            ))} */}
            {/*
            <li>
              <a href={site.phoneHref} className="transition-colors hover:text-white">
                {site.phone}
              </a>
            </li>
            */}
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap mt-16">
        {/*
        <p className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 text-[12px] leading-relaxed text-white/45">
          California Seller of Travel <strong className="font-bold text-white/60">Reg. No. 2173867-50</strong>.
          Registration as a seller of travel does not constitute approval by the State of California. Participant in
          the Travel Consumer Restitution Corporation (<strong className="font-bold text-white/60">TCRC-710561</strong>).
        </p>
        */}

        {/*
        <p className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 text-[12px] leading-relaxed text-white/45">
          {site.name} is a service of {site.legalName}, an independent travel agency. We are not an airline and are
          not affiliated with, endorsed by, or acting on behalf of any airline named on this site. Airline names and
          logos are the property of their respective owners and are used only to describe the group fares we can
          arrange. Fares are subject to availability and confirmed at the time of booking.
        </p>
        */}

        <div className="mt-8 rounded-xl bg-white px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-10">
            {badges.map((b) => (
              <Image
                key={b.src}
                src={b.src}
                alt={b.alt}
                width={b.width}
                height={b.height}
                className="h-8 w-auto object-contain sm:h-9"
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-8 text-[12px] text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()}{/* {site.legalName}. */} All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.16em]">{site.domain}</p>
        </div>
      </div>
    </footer>
  );
}
