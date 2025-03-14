import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { LanguageSwitcher } from '@/components/language-switcher'
import { Navigation } from '@/components/navigation'
import { MultilingualStructuredData } from '@/components/multilingual-structured-data'
import { LocalizedLegalLink } from '@/components/localized-legal-link'
import { locales } from '@/i18n/routing'
import { setRequestLocale } from 'next-intl/server'

// Get messages for a specific locale
async function getMessages(locale: string) {
  try {
    return (await import(`@/messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Get the locale from params
  const locale = params.locale;
  
  // Validate that the incoming locale is supported
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);
  
  let messages;
  try {
    messages = await getMessages(locale);
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="relative flex min-h-screen flex-col">
        <Navigation />
        <div className="flex-1">
          {children}
        </div>
        <footer className="bg-gray-100 py-6 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} Top Password Generator. All rights reserved.
                </p>
              </div>
              <div className="flex space-x-6">
                <LocalizedLegalLink href="/privacy-policy" className="text-sm text-gray-500 hover:text-blue-600">
                  Privacy Policy
                </LocalizedLegalLink>
                <LocalizedLegalLink href="/terms-of-service" className="text-sm text-gray-500 hover:text-blue-600">
                  Terms of Service
                </LocalizedLegalLink>
                <LocalizedLegalLink href="/disclaimer" className="text-sm text-gray-500 hover:text-blue-600">
                  Disclaimer
                </LocalizedLegalLink>
                <LocalizedLegalLink href="/cookie-policy" className="text-sm text-gray-500 hover:text-blue-600">
                  Cookie Policy
                </LocalizedLegalLink>
              </div>
            </div>
          </div>
        </footer>
        <MultilingualStructuredData locale={locale} />
      </div>
    </NextIntlClientProvider>
  )
}
