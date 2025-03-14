import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/routing';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale,
  // Always include the locale prefix in URLs
  localePrefix: 'always'
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
