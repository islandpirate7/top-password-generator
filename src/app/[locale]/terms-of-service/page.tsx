import { Metadata, Viewport } from 'next';
import { useTranslations } from 'next-intl';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  
  let title, description;
  
  switch(locale) {
    case 'es':
      title = 'Términos de Servicio - Generador de Contraseñas';
      description = 'Nuestros términos de servicio establecen las reglas para el uso de nuestro generador de contraseñas.';
      break;
    case 'fr':
      title = 'Conditions d\'Utilisation - Générateur de Mots de Passe';
      description = 'Nos conditions d\'utilisation établissent les règles d\'utilisation de notre générateur de mots de passe.';
      break;
    case 'de':
      title = 'Nutzungsbedingungen - Passwort-Generator';
      description = 'Unsere Nutzungsbedingungen legen die Regeln für die Verwendung unseres Passwort-Generators fest.';
      break;
    default: // English
      title = 'Terms of Service - Password Generator';
      description = 'Our terms of service establish the rules for using our password generator.';
  }
  
  return {
    title,
    description,
    metadataBase: new URL('https://toppasswordgenerator.com'),
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function TermsOfService() {
  const t = useTranslations();
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-primary">
        {t('legal.termsOfService.title')}
      </h1>
      
      <div className="prose prose-lg max-w-none">
        <h2>{t('legal.termsOfService.acceptance.title')}</h2>
        <p>
          {t('legal.termsOfService.acceptance.description')}
        </p>
        
        <h2>{t('legal.termsOfService.description.title')}</h2>
        <p>
          {t('legal.termsOfService.description.description')}
        </p>
        
        <h2>{t('legal.termsOfService.userConduct.title')}</h2>
        <p>
          {t('legal.termsOfService.userConduct.description')}
        </p>
        <ul>
          <li>{t('legal.termsOfService.userConduct.list.illegal')}</li>
          <li>{t('legal.termsOfService.userConduct.list.interfere')}</li>
          <li>{t('legal.termsOfService.userConduct.list.circumvent')}</li>
          <li>{t('legal.termsOfService.userConduct.list.scrape')}</li>
        </ul>
        
        <h2>{t('legal.termsOfService.intellectualProperty.title')}</h2>
        <p>
          {t('legal.termsOfService.intellectualProperty.description')}
        </p>
        
        <h2>{t('legal.termsOfService.limitation.title')}</h2>
        <p>
          {t('legal.termsOfService.limitation.description')}
        </p>
        
        <h2>{t('legal.termsOfService.changes.title')}</h2>
        <p>
          {t('legal.termsOfService.changes.description')}
        </p>
        
        <h2>{t('legal.termsOfService.contact.title')}</h2>
        <p>
          {t('legal.termsOfService.contact.description')}
        </p>
        
        <p className="text-sm text-gray-500 mt-8">
          {t('legal.lastUpdated')}: {t('legal.termsOfService.lastUpdatedDate')}
        </p>
      </div>
    </div>
  );
}
