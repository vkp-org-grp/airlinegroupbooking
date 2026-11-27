import { site } from '@/data/site';
import { airlines } from '@/data/airlines';
import { businessClass } from '@/data/businessClass';
import { deals } from '@/data/deals';
import { destinations } from '@/data/destinations';
import { homeFaqs } from '@/data/content';
import { getAllPosts } from '@/lib/blog';

// /llms.txt: a plain-text (Markdown) guide to the site for AI tools, following
// the llmstxt.org proposal. It is built from the same data as the pages, so new
// airlines, deals, destinations and blog posts appear here automatically.
export const dynamic = 'force-static';

const link = (title, path, note) => `- [${title}](${site.url}${path})${note ? `: ${note}` : ''}`;
const section = (heading, lines) => `## ${heading}\n\n${lines.join('\n')}`;

export function GET() {
  const body = [
    `# ${site.name}`,
    `> Group flight booking requests for ${site.minGroupSize} or more passengers: family, school, corporate, sports and event travel. Visitors share their route, dates and headcount to ask for a group fare quote.`,
    `Fares depend on live airline availability, so this file lists no prices. Contact: ${site.email}`,
    section('Main pages', [
      link('Home and quote request form', '/'),
      link('About', '/about/'),
      link('Contact', '/contact/'),
      link('Airline group booking', '/group-booking/'),
      link('Business class', '/business-class/'),
      link('Special deals', '/deals/'),
      link('Destinations', '/destinations/'),
      link('Blog', '/blog/'),
    ]),
    section('Frequently asked questions', homeFaqs.map((f) => `### ${f.q}\n\n${f.a}\n`)),
    section('Group booking by airline', airlines.map((a) => link(a.name, `/group-booking/${a.slug}/`, a.bestFor))),
    section('Business class', businessClass.map((b) => link(`${b.name} (${b.cabin})`, `/business-class/${b.slug}/`, b.highlight))),
    section('Deals', deals.map((d) => link(d.name, `/deals/${d.slug}/`, d.summary))),
    section('Destinations', destinations.map((d) => link(`${d.name}, ${d.country}`, `/destinations/${d.slug}/`, d.summary))),
    section('Policies', [
      link('Privacy policy', '/privacy-policy/'),
      link('Cancellation and refund policy', '/refund-policy/'),
      link('Terms and conditions', '/terms-condition/'),
    ]),
    section('Blog articles', getAllPosts().map((p) => link(p.title, `/blog/${p.slug}/`))),
  ].join('\n\n');

  return new Response(`${body}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
