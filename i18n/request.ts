import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from '../src/i18n/routing';

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is a string and is valid
  const validLocale = typeof locale === 'string' && locales.includes(locale as any) 
    ? locale 
    : defaultLocale;
  
  return {
    locale: validLocale,
    messages: (await import(`../src/messages/${validLocale}.json`)).default
  };
});
