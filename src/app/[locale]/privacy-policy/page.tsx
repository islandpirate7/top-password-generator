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
      title = 'Política de Privacidad - Generador de Contraseñas';
      description = 'Nuestra política de privacidad explica cómo protegemos tu información cuando utilizas nuestro generador de contraseñas.';
      break;
    case 'fr':
      title = 'Politique de Confidentialité - Générateur de Mots de Passe';
      description = 'Notre politique de confidentialité explique comment nous protégeons vos informations lorsque vous utilisez notre générateur de mots de passe.';
      break;
    case 'de':
      title = 'Datenschutzrichtlinie - Passwort-Generator';
      description = 'Unsere Datenschutzrichtlinie erklärt, wie wir Ihre Informationen schützen, wenn Sie unseren Passwort-Generator verwenden.';
      break;
    default: // English
      title = 'Privacy Policy - Password Generator';
      description = 'Our privacy policy explains how we protect your information when you use our password generator.';
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

export default function PrivacyPolicy() {
  const t = useTranslations();
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-primary">
        {t('legal.privacyPolicy.title')}
      </h1>
      
      <div className="prose prose-lg max-w-none">
        <h2>{t('legal.privacyPolicy.introduction.title')}</h2>
        <p>
          {t('legal.privacyPolicy.introduction.description')}
        </p>
        
        <h2>{t('legal.privacyPolicy.dontCollect.title')}</h2>
        <p>
          {t('legal.privacyPolicy.dontCollect.description')}
        </p>
        <ul>
          <li>{t('legal.privacyPolicy.dontCollect.list.passwords')}</li>
          <li>{t('legal.privacyPolicy.dontCollect.list.history')}</li>
          <li>{t('legal.privacyPolicy.dontCollect.list.personal')}</li>
          <li>{t('legal.privacyPolicy.dontCollect.list.analytics')}</li>
        </ul>
        
        <h2>{t('legal.privacyPolicy.collect.title')}</h2>
        <p>
          {t('legal.privacyPolicy.collect.description')}
        </p>
        <ul>
          <li>{t('legal.privacyPolicy.collect.list.language')}</li>
          <li>{t('legal.privacyPolicy.collect.list.settings')}</li>
        </ul>
        
        <h2>{t('legal.privacyPolicy.thirdParty.title')}</h2>
        <p>
          {t('legal.privacyPolicy.thirdParty.description')}
        </p>
        <ul>
          <li>{t('legal.privacyPolicy.thirdParty.list.hosting')}</li>
          <li>{t('legal.privacyPolicy.thirdParty.list.ads')}</li>
        </ul>
        
        <h2>{t('legal.privacyPolicy.security.title')}</h2>
        <p>
          {t('legal.privacyPolicy.security.description')}
        </p>
        
        <h2>{t('legal.privacyPolicy.changes.title')}</h2>
        <p>
          {t('legal.privacyPolicy.changes.description')}
        </p>
        
        <p className="text-sm text-gray-500 mt-8">
          {t('legal.lastUpdated')}: {t('legal.privacyPolicy.lastUpdatedDate')}
        </p>
      </div>
    </div>
  );
}
