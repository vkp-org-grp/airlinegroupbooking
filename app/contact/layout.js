import { pageSeo } from '@/lib/seo';

export const metadata = {
  title: 'Contact Us',
  ...pageSeo('/contact/'),
};

export default function ContactLayout({ children }) {
  return children;
}
