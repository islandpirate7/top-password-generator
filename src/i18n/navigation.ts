import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './routing';

// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  defaultLocale
});
