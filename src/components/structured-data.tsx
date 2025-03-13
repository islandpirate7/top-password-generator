'use client'

import { usePathname } from 'next/navigation'

export function StructuredData() {
  const pathname = usePathname()
  
  // Determine the current locale from the pathname
  const locale = pathname.startsWith('/es') 
    ? 'es' 
    : pathname.startsWith('/fr')
      ? 'fr'
      : pathname.startsWith('/de')
        ? 'de'
        : 'en'
  
  let name, description, url
  
  switch(locale) {
    case 'es':
      name = 'Generador de Contraseñas'
      description = 'Genera contraseñas seguras, fuertes y únicas al instante. Herramienta gratuita de generación de contraseñas aleatorias, PIN y frases memorables.'
      url = 'https://toppasswordgenerator.com/es'
      break
    case 'fr':
      name = 'Générateur de Mots de Passe'
      description = 'Générez instantanément des mots de passe sécurisés, forts et uniques. Outil gratuit de génération de mots de passe aléatoires, de codes PIN et de phrases mémorables.'
      url = 'https://toppasswordgenerator.com/fr'
      break
    case 'de':
      name = 'Passwort-Generator'
      description = 'Generieren Sie sofort sichere, starke und einzigartige Passwörter. Kostenloses Online-Tool zur Generierung von zufälligen Zeichenfolgen, PINs und einprägsamen Passwörtern.'
      url = 'https://toppasswordgenerator.com/de'
      break
    default: // English
      name = 'Password Generator'
      description = 'Generate strong, secure, and random passwords instantly. Free online password generator tool with options for random strings, PINs, and memorable phrases.'
      url = 'https://toppasswordgenerator.com'
  }
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': name,
    'description': description,
    'url': url,
    'applicationCategory': 'UtilityApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'inLanguage': locale,
    'availableLanguage': ['en', 'es', 'fr', 'de'],
    'potentialAction': {
      '@type': 'UseAction',
      'target': url
    }
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
