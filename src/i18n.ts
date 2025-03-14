import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './i18n/routing';

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is a valid string
  const validLocale = typeof locale === 'string' && locales.includes(locale as any) 
    ? locale 
    : defaultLocale;
  
  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default
  };
});
