import { Metadata, Viewport } from 'next';
import { getTranslations } from 'next-intl/server';

// Separate metadata and viewport exports to fix the warnings
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  // Access locale properly to avoid the "params.locale" error
  const locale = params.locale;
  
  // Metadata for different locales
  let title, description;
  
  switch(locale) {
    case 'es':
      title = 'Aviso Legal - Generador de Contraseñas';
      description = 'Aviso legal para el uso de nuestro generador de contraseñas. Limitaciones de responsabilidad y condiciones de uso.';
      break;
    case 'fr':
      title = 'Avis de Non-Responsabilité - Générateur de Mots de Passe';
      description = 'Avis de non-responsabilité pour l\'utilisation de notre générateur de mots de passe. Limitations de responsabilité et conditions d\'utilisation.';
      break;
    case 'de':
      title = 'Haftungsausschluss - Passwort-Generator';
      description = 'Haftungsausschluss für die Nutzung unseres Passwort-Generators. Haftungsbeschränkungen und Nutzungsbedingungen.';
      break;
    default: // English
      title = 'Disclaimer - Password Generator';
      description = 'Legal disclaimer for using our password generator. Liability limitations and terms of use.';
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

export default async function Disclaimer({ params }: { params: { locale: string } }) {
  // Use getTranslations instead of useTranslations for server components
  const t = await getTranslations({ locale: params.locale, namespace: 'Legal' });
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-primary">
        Disclaimer
      </h1>
      
      <div className="prose prose-lg max-w-none">
        <h2>Password Security</h2>
        <p>
          While Top Password Generator strives to provide secure password generation tools, we cannot guarantee that passwords generated using our service will be immune to all forms of attack. The security of your passwords depends on various factors, including how you store and use them.
        </p>
        
        <h2>No Warranty</h2>
        <p>
          The password generation service is provided "as is" without any warranties, expressed or implied. We do not warrant that the service will be error-free, uninterrupted, or free from harmful components.
        </p>
        
        <h2>Limitation of Liability</h2>
        <p>
          Top Password Generator shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages resulting from your use of the service, including but not limited to damages for loss of profits, goodwill, data, or other intangible losses.
        </p>
        
        <h2>User Responsibility</h2>
        <p>
          You are solely responsible for:
        </p>
        <ul>
          <li>Selecting appropriate password generation settings</li>
          <li>Securely storing your passwords</li>
          <li>Determining the suitability of generated passwords for your specific needs</li>
          <li>Implementing appropriate security measures to protect your accounts</li>
        </ul>
        
        <h2>Changes to This Disclaimer</h2>
        <p>
          We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting on this page.
        </p>
        
        <p className="text-sm text-gray-500 mt-8">
          Last updated: March 10, 2025
        </p>
      </div>
    </div>
  );
}
