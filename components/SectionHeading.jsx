import { Reveal } from '@/components/Motion';

// Shared heading for home page sections. Set `dark` on dark backgrounds.
export default function SectionHeading({ eyebrow, title, accent, children, dark = false }) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className={dark ? 'eyebrow-dark' : 'eyebrow'}>{eyebrow}</p>
        <h2 className="h-display mt-4 max-w-[18ch] text-[clamp(2.2rem,5vw,3.8rem)]">
          {title}
          {accent && (
            <>
              {' '}
              <span className={dark ? 'text-sunset' : 'font-medium text-ember'}>{accent}</span>
            </>
          )}
        </h2>
      </div>
      {children}
    </Reveal>
  );
}
