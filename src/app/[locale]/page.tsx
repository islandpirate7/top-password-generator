import { PasswordGenerator } from '@/components/password-generator'
import { SidebarAd, BottomBannerAd } from '@/components/ad'
import { useTranslations } from 'next-intl'
import type { Metadata, Viewport } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  
  const title = locale === 'es' 
    ? 'Generador de Contraseñas - Crea Contraseñas Seguras y Fuertes'
    : 'Password Generator - Create Strong & Secure Random Passwords'
    
  const description = locale === 'es'
    ? 'Genera contraseñas seguras, fuertes y únicas al instante. Herramienta gratuita de generación de contraseñas aleatorias, PIN y frases memorables.'
    : 'Generate strong, secure, and random passwords instantly. Free online password generator tool with options for random strings, PINs, and memorable phrases.'
    
  const keywords = locale === 'es'
    ? 'generador de contraseñas, contraseña segura, contraseña fuerte, contraseña aleatoria, generador de PIN, contraseña memorable, frase mnemotécnica, seguridad de contraseñas'
    : 'password generator, strong password, secure password, random password, PIN generator, memorable password, mnemonic password, password security, secure password generator'
  
  return {
    title,
    description,
    keywords,
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      url: locale === 'es' ? 'https://toppasswordgenerator.com/es' : 'https://toppasswordgenerator.com/',
      siteName: locale === 'es' ? 'Generador de Contraseñas' : 'Top Password Generator',
      title,
      description,
      images: [
        {
          url: locale === 'es' ? '/images/og-image-es.jpg' : '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [locale === 'es' ? '/images/twitter-image-es.jpg' : '/images/twitter-image.jpg'],
      creator: '@toppasswordgen',
    },
    alternates: {
      canonical: locale === 'es' ? 'https://toppasswordgenerator.com/es' : 'https://toppasswordgenerator.com',
      languages: {
        'en': 'https://toppasswordgenerator.com',
        'es': 'https://toppasswordgenerator.com/es',
      },
    },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function Home() {
  const t = useTranslations()
  
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1">
            <PasswordGenerator />
          </div>
          <aside className="w-full lg:w-auto">
            <SidebarAd />
          </aside>
        </div>
        
        <div className="mt-12">
          <BottomBannerAd />
        </div>
      </main>
    </div>
  )
}
