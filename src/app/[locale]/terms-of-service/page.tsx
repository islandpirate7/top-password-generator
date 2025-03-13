import { Metadata, Viewport } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  
  let title, description;
  
  switch(locale) {
    case 'es':
      title = 'Términos de Servicio - Generador de Contraseñas';
      description = 'Términos y condiciones para el uso de nuestro generador de contraseñas. Lea nuestras políticas antes de usar el servicio.';
      break;
    case 'fr':
      title = 'Conditions d\'Utilisation - Générateur de Mots de Passe';
      description = 'Termes et conditions pour l\'utilisation de notre générateur de mots de passe. Lisez nos politiques avant d\'utiliser le service.';
      break;
    case 'de':
      title = 'Nutzungsbedingungen - Passwort-Generator';
      description = 'Allgemeine Geschäftsbedingungen für die Nutzung unseres Passwort-Generators. Lesen Sie unsere Richtlinien, bevor Sie den Dienst nutzen.';
      break;
    default: // English
      title = 'Terms of Service - Password Generator';
      description = 'Terms and conditions for using our password generator. Read our policies before using the service.';
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
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-primary">
        Terms of Service
      </h1>
      
      <div className="prose prose-lg max-w-none">
        <h2>Acceptance of Terms</h2>
        <p>
          By accessing or using Top Password Generator, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
        </p>
        
        <h2>Use of Service</h2>
        <p>
          Top Password Generator provides tools for generating secure passwords. You agree to use these tools responsibly and in accordance with all applicable laws and regulations.
        </p>
        
        <h2>Password Security</h2>
        <p>
          While we strive to provide secure password generation tools, we are not responsible for:
        </p>
        <ul>
          <li>How you store or use the passwords you generate</li>
          <li>Any security breaches resulting from password compromise</li>
          <li>The strength of passwords if you modify our recommended settings</li>
        </ul>
        
        <h2>Intellectual Property</h2>
        <p>
          All content, features, and functionality of Top Password Generator, including but not limited to text, graphics, logos, and code, are the exclusive property of Top Password Generator and are protected by copyright, trademark, and other intellectual property laws.
        </p>
        
        <h2>Prohibited Activities</h2>
        <p>
          You agree not to:
        </p>
        <ul>
          <li>Use our service for any illegal purpose</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with or disrupt the service or servers</li>
          <li>Reverse engineer or decompile any aspect of the service</li>
        </ul>
        
        <h2>Termination</h2>
        <p>
          We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any reason whatsoever, including without limitation if you breach the Terms of Service.
        </p>
        
        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page.
        </p>
        
        <p className="text-sm text-gray-500 mt-8">
          Last updated: March 10, 2025
        </p>
      </div>
    </div>
  );
}
