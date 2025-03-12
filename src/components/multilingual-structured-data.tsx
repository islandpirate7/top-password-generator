'use client'

import { usePathname } from 'next/navigation'

export function MultilingualStructuredData() {
  const pathname = usePathname()
  
  // Determine the current locale from the pathname
  const locale = pathname.startsWith('/es') 
    ? 'es' 
    : pathname.startsWith('/fr')
      ? 'fr'
      : pathname.startsWith('/de')
        ? 'de'
        : 'en'
  
  // Define language-specific content
  const content = {
    en: {
      name: 'Password Generator',
      description: 'Generate strong, secure, and random passwords instantly. Free online password generator tool with options for random strings, PINs, and memorable phrases.',
      url: 'https://toppasswordgenerator.com',
      ogLocale: 'en_US',
      faq: [
        {
          question: 'What makes a strong password?',
          answer: 'A strong password should be at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special characters. Avoid using personal information or common words.'
        },
        {
          question: 'How does a random password generator work?',
          answer: 'Random password generators create secure passwords by using algorithms to randomly select characters from different sets (letters, numbers, symbols). This ensures the passwords are unpredictable and difficult to crack.'
        },
        {
          question: 'Are password generators safe to use?',
          answer: 'Yes, reputable password generators like ours are safe to use. Our generator creates passwords directly in your browser without storing them on any server, ensuring your passwords remain private and secure.'
        }
      ]
    },
    es: {
      name: 'Generador de Contraseñas',
      description: 'Genera contraseñas seguras, fuertes y únicas al instante. Herramienta gratuita de generación de contraseñas aleatorias, PIN y frases memorables.',
      url: 'https://toppasswordgenerator.com/es',
      ogLocale: 'es_ES',
      faq: [
        {
          question: '¿Qué hace que una contraseña sea fuerte?',
          answer: 'Una contraseña fuerte debe tener al menos 12 caracteres e incluir una combinación de letras mayúsculas, minúsculas, números y caracteres especiales. Evita usar información personal o palabras comunes.'
        },
        {
          question: '¿Cómo funciona un generador de contraseñas aleatorias?',
          answer: 'Los generadores de contraseñas aleatorias crean contraseñas seguras utilizando algoritmos para seleccionar aleatoriamente caracteres de diferentes conjuntos (letras, números, símbolos). Esto asegura que las contraseñas sean impredecibles y difíciles de descifrar.'
        },
        {
          question: '¿Es seguro usar generadores de contraseñas?',
          answer: 'Sí, los generadores de contraseñas de buena reputación como el nuestro son seguros de usar. Nuestro generador crea contraseñas directamente en tu navegador sin almacenarlas en ningún servidor, garantizando que tus contraseñas permanezcan privadas y seguras.'
        }
      ]
    },
    fr: {
      name: 'Générateur de Mots de Passe',
      description: 'Générez instantanément des mots de passe sécurisés, forts et uniques. Outil gratuit de génération de mots de passe aléatoires, de codes PIN et de phrases mémorables.',
      url: 'https://toppasswordgenerator.com/fr',
      ogLocale: 'fr_FR',
      faq: [
        {
          question: 'Qu\'est-ce qui fait un mot de passe fort?',
          answer: 'Un mot de passe fort doit comporter au moins 12 caractères et inclure un mélange de lettres majuscules, de lettres minuscules, de chiffres et de caractères spéciaux. Évitez d\'utiliser des informations personnelles ou des mots courants.'
        },
        {
          question: 'Comment fonctionne un générateur de mots de passe aléatoires?',
          answer: 'Les générateurs de mots de passe aléatoires créent des mots de passe sécurisés en utilisant des algorithmes pour sélectionner aléatoirement des caractères de différents ensembles (lettres, chiffres, symboles). Cela garantit que les mots de passe sont imprévisibles et difficiles à pirater.'
        },
        {
          question: 'Les générateurs de mots de passe sont-ils sûrs à utiliser?',
          answer: 'Oui, les générateurs de mots de passe réputés comme le nôtre sont sûrs à utiliser. Notre générateur crée des mots de passe directement dans votre navigateur sans les stocker sur aucun serveur, garantissant que vos mots de passe restent privés et sécurisés.'
        }
      ]
    },
    de: {
      name: 'Passwort-Generator',
      description: 'Generieren Sie sofort sichere, starke und einzigartige Passwörter. Kostenloses Online-Tool zur Generierung von zufälligen Zeichenfolgen, PINs und einprägsamen Passwörtern.',
      url: 'https://toppasswordgenerator.com/de',
      ogLocale: 'de_DE',
      faq: [
        {
          question: 'Was macht ein starkes Passwort aus?',
          answer: 'Ein starkes Passwort sollte mindestens 12 Zeichen lang sein und eine Mischung aus Großbuchstaben, Kleinbuchstaben, Zahlen und Sonderzeichen enthalten. Vermeiden Sie die Verwendung persönlicher Informationen oder häufiger Wörter.'
        },
        {
          question: 'Wie funktioniert ein Zufallspasswortgenerator?',
          answer: 'Zufallspasswortgeneratoren erstellen sichere Passwörter, indem sie Algorithmen verwenden, um zufällig Zeichen aus verschiedenen Zeichensätzen (Buchstaben, Zahlen, Symbole) auszuwählen. Dies stellt sicher, dass die Passwörter unvorhersehbar und schwer zu knacken sind.'
        },
        {
          question: 'Sind Passwortgeneratoren sicher zu verwenden?',
          answer: 'Ja, seriöse Passwortgeneratoren wie unserer sind sicher zu verwenden. Unser Generator erstellt Passwörter direkt in Ihrem Browser, ohne sie auf einem Server zu speichern, wodurch sichergestellt wird, dass Ihre Passwörter privat und sicher bleiben.'
        }
      ]
    }
  }
  
  // Get the content for the current locale
  const currentContent = content[locale] || content.en
  
  // Create application structured data
  const applicationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': currentContent.name,
    'description': currentContent.description,
    'url': currentContent.url,
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
      'target': currentContent.url
    }
  }
  
  // Create FAQ structured data
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': currentContent.faq.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  )
}
