import { PasswordGenerator } from '@/components/password-generator'
import { SidebarAd, BottomBannerAd } from '@/components/ad'
import { useTranslations } from 'next-intl'
import type { Metadata, Viewport } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  
  let title, description, keywords, ogLocale, twitterImage, ogImage, canonical;
  
  switch(locale) {
    case 'es':
      title = 'Generador de Contraseñas - Crea Contraseñas Seguras y Fuertes';
      description = 'Genera contraseñas seguras, fuertes y únicas al instante. Herramienta gratuita de generación de contraseñas aleatorias, PIN y frases memorables.';
      keywords = 'generador de contraseñas, contraseña segura, contraseña fuerte, contraseña aleatoria, generador de PIN, contraseña memorable, frase mnemotécnica, seguridad de contraseñas';
      ogLocale = 'es_ES';
      ogImage = '/images/og-image-es.jpg';
      twitterImage = '/images/twitter-image-es.jpg';
      canonical = 'https://toppasswordgenerator.com/es';
      break;
    case 'fr':
      title = 'Générateur de Mots de Passe - Créez des Mots de Passe Forts et Sécurisés';
      description = 'Générez instantanément des mots de passe sécurisés, forts et uniques. Outil gratuit de génération de mots de passe aléatoires, de codes PIN et de phrases mémorables.';
      keywords = 'générateur de mots de passe, mot de passe sécurisé, mot de passe fort, mot de passe aléatoire, générateur de PIN, mot de passe mémorable, phrase mnémonique, sécurité des mots de passe';
      ogLocale = 'fr_FR';
      ogImage = '/images/og-image.jpg';
      twitterImage = '/images/twitter-image.jpg';
      canonical = 'https://toppasswordgenerator.com/fr';
      break;
    case 'de':
      title = 'Passwort-Generator - Erstellen Sie Starke und Sichere Passwörter';
      description = 'Generieren Sie sofort sichere, starke und einzigartige Passwörter. Kostenloses Online-Tool zur Generierung von zufälligen Zeichenfolgen, PINs und einprägsamen Passwörtern.';
      keywords = 'Passwort-Generator, starkes Passwort, sicheres Passwort, zufälliges Passwort, PIN-Generator, einprägsames Passwort, mnemonisches Passwort, Passwort-Sicherheit';
      ogLocale = 'de_DE';
      ogImage = '/images/og-image.jpg';
      twitterImage = '/images/twitter-image.jpg';
      canonical = 'https://toppasswordgenerator.com/de';
      break;
    default: // English
      title = 'Password Generator - Create Strong & Secure Random Passwords';
      description = 'Generate strong, secure, and random passwords instantly. Free online password generator tool with options for random strings, PINs, and memorable phrases.';
      keywords = 'password generator, strong password, secure password, random password, PIN generator, memorable password, mnemonic password, password security, secure password generator';
      ogLocale = 'en_US';
      ogImage = '/images/og-image.jpg';
      twitterImage = '/images/twitter-image.jpg';
      canonical = 'https://toppasswordgenerator.com';
  }
  
  return {
    title,
    description,
    keywords,
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: canonical,
      siteName: locale === 'es' ? 'Generador de Contraseñas' : 
               locale === 'fr' ? 'Générateur de Mots de Passe' :
               locale === 'de' ? 'Passwort-Generator' : 'Top Password Generator',
      title,
      description,
      images: [
        {
          url: ogImage,
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
      images: [twitterImage],
      creator: '@toppasswordgen',
    },
    alternates: {
      canonical: canonical,
      languages: {
        'en': 'https://toppasswordgenerator.com',
        'es': 'https://toppasswordgenerator.com/es',
        'fr': 'https://toppasswordgenerator.com/fr',
        'de': 'https://toppasswordgenerator.com/de',
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
