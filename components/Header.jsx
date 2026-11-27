'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { site } from '@/data/site';
import { airlines } from '@/data/airlines';
import { businessClass } from '@/data/businessClass';
import { deals } from '@/data/deals';
import Logo from '@/components/Logo';

const MENUS = {
  'group-booking': {
    label: 'Group Bookings',
    href: '/group-booking',
    items: airlines.map((a) => ({ label: a.name, href: `/group-booking/${a.slug}` })),
  },
  'business-class': {
    label: 'Business Class',
    href: '/business-class',
    items: businessClass.map((b) => ({ label: b.name, href: `/business-class/${b.slug}` })),
  },
  deals: {
    label: 'Special Deals',
    href: '/deals',
    items: deals.map((d) => ({ label: d.name, href: `/deals/${d.slug}` })),
  },
};

const SIMPLE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoverMenu, setHoverMenu] = useState(null);
  const [mobileSection, setMobileSection] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={`mx-auto flex h-[68px] max-w-[1280px] items-center justify-between gap-4 rounded-full border pl-4 pr-3 transition-all duration-500 sm:pl-6 ${
          scrolled || open
            ? 'border-white/10 bg-ink/90 shadow-float backdrop-blur-xl'
            : 'border-white/15 bg-white/[0.06] backdrop-blur-md'
        }`}
      >
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Logo variant="light" />
        </Link>

        <nav className="hidden items-center xl:flex" aria-label="Main">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/about" className="nav-link">
            About
          </Link>

          {Object.entries(MENUS).map(([key, menu]) => (
            <div
              key={key}
              className="relative"
              onMouseEnter={() => setHoverMenu(key)}
              onMouseLeave={() => setHoverMenu((h) => (h === key ? null : h))}
            >
              <Link href={menu.href} className="nav-link">
                {menu.label}
                <ChevronDown size={14} className={`transition-transform ${hoverMenu === key ? 'rotate-180' : ''}`} />
              </Link>

              <AnimatePresence>
                {hoverMenu === key && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-5"
                  >
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 rounded-3xl bg-white p-4 shadow-float">
                      {menu.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="truncate rounded-xl px-3 py-2 text-sm text-ink/70 transition-all hover:translate-x-1 hover:bg-paper hover:text-ember"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <Link href="/blog" className="nav-link">
            Blog
          </Link>
          <Link href="/contact" className="nav-link">
            Contact
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {/*
          <a href={site.phoneHref} className="btn-accent hidden py-3 text-[13px] sm:inline-flex">
            <Phone size={16} strokeWidth={2.5} />
            {site.phone}
          </a>
          */}
          <Link href="/contact" className="btn-accent hidden px-5 py-3 text-[13px] sm:inline-flex">
            Get a quote
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white xl:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-h-[calc(100vh-100px)] max-w-[1280px] overflow-y-auto rounded-3xl bg-white shadow-float xl:hidden"
          >
            <div className="flex flex-col px-6 py-3">
              {SIMPLE_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-ink/5 py-4 font-display text-lg font-medium text-ink"
                >
                  {item.label}
                </Link>
              ))}

              {Object.entries(MENUS).map(([key, menu]) => (
                <div key={key} className="border-b border-ink/5">
                  <button
                    type="button"
                    onClick={() => setMobileSection((s) => (s === key ? null : key))}
                    className="flex w-full items-center justify-between py-4 font-display text-lg font-medium text-ink"
                  >
                    {menu.label}
                    <ChevronDown size={18} className={`transition-transform ${mobileSection === key ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileSection === key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-1 pb-4">
                          {menu.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className="rounded-lg px-2 py-2 text-sm text-ink/65"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/*
              <a href={site.phoneHref} className="btn-accent mt-5">
                <Phone size={16} strokeWidth={2.5} />
                Call {site.phone}
              </a>
              */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
