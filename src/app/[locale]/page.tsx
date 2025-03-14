import { PasswordGenerator } from '@/components/password-generator'
import { SidebarAd, BottomBannerAd } from '@/components/ad'
import { useTranslations } from 'next-intl'
import type { Metadata, Viewport, NextPage } from 'next'
import { locales } from '@/i18n/routing'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  // Get the locale from params
  const locale = params.locale;
  
  // Validate that the incoming locale is supported
  if (!locales.includes(locale as any)) {
    notFound();
  }
  
  // Enable static rendering
  setRequestLocale(locale);
  
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
      description = 'Generieren Sie sofort sichere, starke und einzigartige Passwörter. Kostenloses Online-Tool zur Generierung von zufälligen Zeichenfolgen, PINs und einprägsamen Phrasen.';
      keywords = 'Passwort-Generator, sicheres Passwort, starkes Passwort, zufälliges Passwort, PIN-Generator, einprägsames Passwort, mnemonische Phrase, Passwortsicherheit';
      ogLocale = 'de_DE';
      ogImage = '/images/og-image.jpg';
      twitterImage = '/images/twitter-image.jpg';
      canonical = 'https://toppasswordgenerator.com/de';
      break;
    default: // 'en'
      title = 'Password Generator - Create Strong & Secure Random Passwords';
      description = 'Generate strong, secure, and random passwords instantly. Free online password generator tool with options for random strings, PINs, and memorable phrases.';
      keywords = 'password generator, random password, strong password, secure password, password creator, online password generator, free password generator, PIN generator, password tool';
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
      siteName: 'Password Generator',
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
      canonical,
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
  userScalable: false
};

export default function Home({
  params,
}: {
  params: { locale: string }
}) {
  // Validate locale and enable static rendering
  const locale = params.locale;
  if (!locales.includes(locale as any)) {
    notFound();
  }
  
  // Set the locale for the request
  setRequestLocale(locale);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4">
          <PasswordGenerator />
        </div>
        <div className="lg:w-1/4">
          <SidebarAd />
        </div>
      </div>
      <div className="mt-8">
        <BottomBannerAd />
      </div>
    </div>
  )
}
