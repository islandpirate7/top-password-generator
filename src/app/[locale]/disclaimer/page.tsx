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
      title = 'Aviso Legal - Generador de Contraseñas';
      description = 'Nuestro aviso legal explica las limitaciones de responsabilidad al usar nuestro generador de contraseñas.';
      break;
    case 'fr':
      title = 'Avis de Non-Responsabilité - Générateur de Mots de Passe';
      description = 'Notre avis de non-responsabilité explique les limitations de responsabilité lors de l\'utilisation de notre générateur de mots de passe.';
      break;
    case 'de':
      title = 'Haftungsausschluss - Passwort-Generator';
      description = 'Unser Haftungsausschluss erklärt die Haftungsbeschränkungen bei der Verwendung unseres Passwort-Generators.';
      break;
    default: // English
      title = 'Disclaimer - Password Generator';
      description = 'Our disclaimer explains the limitations of liability when using our password generator.';
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

export default function Disclaimer() {
  const t = useTranslations();
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-primary">
        {t('legal.disclaimer.title')}
      </h1>
      
      <div className="prose prose-lg max-w-none">
        <h2>{t('legal.disclaimer.passwordSecurity.title')}</h2>
        <p>
          {t('legal.disclaimer.passwordSecurity.description')}
        </p>
        
        <h2>{t('legal.disclaimer.noStorage.title')}</h2>
        <p>
          {t('legal.disclaimer.noStorage.description')}
        </p>
        
        <h2>{t('legal.disclaimer.noGuarantee.title')}</h2>
        <p>
          {t('legal.disclaimer.noGuarantee.description')}
        </p>
        
        <h2>{t('legal.disclaimer.limitation.title')}</h2>
        <p>
          {t('legal.disclaimer.limitation.description')}
        </p>
        
        <h2>{t('legal.disclaimer.userResponsibility.title')}</h2>
        <p>
          {t('legal.disclaimer.userResponsibility.description')}
        </p>
        <ul>
          <li>{t('legal.disclaimer.userResponsibility.list.unique')}</li>
          <li>{t('legal.disclaimer.userResponsibility.list.manager')}</li>
          <li>{t('legal.disclaimer.userResponsibility.list.mfa')}</li>
          <li>{t('legal.disclaimer.userResponsibility.list.update')}</li>
        </ul>
        
        <p className="text-sm text-gray-500 mt-8">
          {t('legal.lastUpdated')}: {t('legal.disclaimer.lastUpdatedDate')}
        </p>
      </div>
    </div>
  );
}
