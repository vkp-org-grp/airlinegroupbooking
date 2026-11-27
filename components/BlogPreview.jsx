import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllPosts, formatDate } from '@/lib/blog';
import { Reveal } from '@/components/Motion';
import SectionHeading from '@/components/SectionHeading';

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);
  if (!posts.length) return null;

  return (
    <section className="py-24 sm:py-32">
      <div className="wrap">
        <SectionHeading eyebrow="Our blog" title="Guides for" accent="smarter group travel">
          <Link href="/blog" className="btn-ghost">
            All articles
          </Link>
        </SectionHeading>

        {/* covers contain artwork and text, so every card keeps the same wide frame to avoid cropping it */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={0.08 * i} className="h-full">
              <Link
                href={`/blog/${p.slug}`}
                className="group card flex h-full flex-col transition-transform duration-500 hover:-translate-y-2"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col items-start p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/50">{formatDate(p.date)}</p>
                  <h3 className="mt-3 font-display text-xl font-medium leading-snug">{p.title}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink/65">{p.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ember">
                    Read more
                    <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
