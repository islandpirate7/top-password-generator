import { Metadata, Viewport } from 'next';
import { useTranslations } from 'next-intl';

// Separate metadata and viewport exports to fix the warnings
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  // Access locale properly to avoid the "params.locale" error
  const locale = params.locale;
  
  // Metadata for different locales
  let title, description;
  
  switch(locale) {
    case 'es':
      title = 'Política de Cookies - Generador de Contraseñas';
      description = 'Nuestra política de cookies explica cómo usamos cookies para mejorar tu experiencia en nuestro generador de contraseñas.';
      break;
    case 'fr':
      title = 'Politique de Cookies - Générateur de Mots de Passe';
      description = 'Notre politique de cookies explique comment nous utilisons les cookies pour améliorer votre expérience sur notre générateur de mots de passe.';
      break;
    case 'de':
      title = 'Cookie-Richtlinie - Passwort-Generator';
      description = 'Unsere Cookie-Richtlinie erklärt, wie wir Cookies verwenden, um Ihre Erfahrung mit unserem Passwort-Generator zu verbessern.';
      break;
    default: // English
      title = 'Cookie Policy - Password Generator';
      description = 'Our cookie policy explains how we use cookies to improve your experience on our password generator.';
  }
  
  return {
    title,
    description,
    metadataBase: new URL('https://toppasswordgenerator.com'),
  };
}

// Separate viewport export to fix the warning
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function CookiePolicy() {
  const t = useTranslations();
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-primary">
        {t('legal.cookiePolicy.title')}
      </h1>
      
      <div className="prose prose-lg max-w-none">
        <h2>{t('legal.cookiePolicy.whatAreCookies.title')}</h2>
        <p>
          {t('legal.cookiePolicy.whatAreCookies.description')}
        </p>
        
        <h2>{t('legal.cookiePolicy.howWeUse.title')}</h2>
        <p>
          {t('legal.cookiePolicy.howWeUse.description')}
        </p>
        <ul>
          <li>{t('legal.cookiePolicy.howWeUse.list.language')}</li>
          <li>{t('legal.cookiePolicy.howWeUse.list.interface')}</li>
          <li>{t('legal.cookiePolicy.howWeUse.list.functionality')}</li>
        </ul>
        
        <h2>{t('legal.cookiePolicy.types.title')}</h2>
        <h3>{t('legal.cookiePolicy.types.essential.title')}</h3>
        <p>
          {t('legal.cookiePolicy.types.essential.description')}
        </p>
        
        <h3>{t('legal.cookiePolicy.types.dontUse.title')}</h3>
        <p>
          {t('legal.cookiePolicy.types.dontUse.description')}
        </p>
        <ul>
          <li>{t('legal.cookiePolicy.types.dontUse.list.analytics')}</li>
          <li>{t('legal.cookiePolicy.types.dontUse.list.advertising')}</li>
          <li>{t('legal.cookiePolicy.types.dontUse.list.thirdParty')}</li>
        </ul>
        
        <h2>{t('legal.cookiePolicy.management.title')}</h2>
        <p>
          {t('legal.cookiePolicy.management.description')}
        </p>
        
        <h2>{t('legal.cookiePolicy.changes.title')}</h2>
        <p>
          {t('legal.cookiePolicy.changes.description')}
        </p>
        
        <p className="text-sm text-gray-500 mt-8">
          {t('legal.lastUpdated')}: {t('legal.cookiePolicy.lastUpdatedDate')}
        </p>
      </div>
    </div>
  );
}
