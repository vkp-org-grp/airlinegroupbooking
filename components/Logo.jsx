import Image from 'next/image';

export default function Logo({ variant = 'dark' }) {
  const light = variant === 'light';

  return (
    <span className="flex items-center gap-3">
      <span className="relative h-10 w-10 shrink-0">
        <Image src={light ? '/logo-w.png' : '/logo.png'} alt="Airlines Group Bookings" fill sizes="40px" className="object-contain" />
      </span>
      <span className="leading-none">
        <span className={`block font-display text-[17px] font-semibold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
          Airlines Group Bookings
        </span>
        <span className={`mt-1 block font-mono text-[9px] uppercase tracking-[0.24em] max-[520px]:hidden xl:hidden min-[1400px]:block ${light ? 'text-white/50' : 'text-ink/45'}`}>
          Seamless Solutions for Group Travel
        </span>
      </span>
    </span>
  );
}
