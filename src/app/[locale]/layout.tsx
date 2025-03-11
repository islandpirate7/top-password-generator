import { NextIntlClientProvider, useTranslations } from 'next-intl'
import { notFound } from 'next/navigation'
import { LanguageSwitcher } from '@/components/language-switcher'
import { Toaster } from "@/components/ui/toaster"
import { setRequestLocale } from 'next-intl/server'

// Define the locales we support
export const locales = ['en', 'es']

// Get messages for a specific locale
async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }
}

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Validate that the locale is supported
  if (!locales.includes(locale)) notFound()
  
  // Enable static rendering
  setRequestLocale(locale)

  const messages = await getMessages(locale)

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleLayoutContent locale={locale}>
        {children}
      </LocaleLayoutContent>
    </NextIntlClientProvider>
  )
}

// Client component to use translations
function LocaleLayoutContent({ 
  children, 
  locale 
}: { 
  children: React.ReactNode
  locale: string
}) {
  const t = useTranslations()
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl"></div>
          <LanguageSwitcher />
        </div>
      </header>
      
      {children}
      
      <footer className="mt-auto border-t py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <a href="/privacy-policy" className="hover:text-primary transition-colors">
                {t('footer.privacyPolicy')}
              </a>
              <span className="text-gray-400">•</span>
              <a href="/terms-of-service" className="hover:text-primary transition-colors">
                {t('footer.termsOfService')}
              </a>
              <span className="text-gray-400">•</span>
              <a href="/disclaimer" className="hover:text-primary transition-colors">
                {t('footer.disclaimer')}
              </a>
              <span className="text-gray-400">•</span>
              <a href="/cookie-policy" className="hover:text-primary transition-colors">
                {t('footer.cookiePolicy')}
              </a>
            </div>
            <div className="text-center text-sm text-gray-600">
              &copy; {new Date().getFullYear()} {t('appTitle')}. {t('footer.allRightsReserved')}.
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  )
}
