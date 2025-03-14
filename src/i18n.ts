import { getRequestConfig } from 'next-intl/server';
 
export default getRequestConfig(async ({locale, requestLocale}) => {
  // Use requestLocale instead of locale parameter to fix the deprecation warning
  const resolvedLocale = await requestLocale();
  
  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default
  };
});
