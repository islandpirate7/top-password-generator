import { Metadata, Viewport } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  
  let title, description;
  
  switch(locale) {
    case 'es':
      title = 'Términos de Servicio - Generador de Contraseñas';
      description = 'Nuestros términos de servicio establecen las reglas y pautas para el uso de nuestro generador de contraseñas.';
      break;
    case 'fr':
      title = 'Conditions d\'Utilisation - Générateur de Mots de Passe';
      description = 'Nos conditions d\'utilisation établissent les règles et directives pour l\'utilisation de notre générateur de mots de passe.';
      break;
    case 'de':
      title = 'Nutzungsbedingungen - Passwort-Generator';
      description = 'Unsere Nutzungsbedingungen legen die Regeln und Richtlinien für die Verwendung unseres Passwort-Generators fest.';
      break;
    default: // English
      title = 'Terms of Service - Password Generator';
      description = 'Our terms of service establish the rules and guidelines for using our password generator.';
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
          You may use our password generation service for lawful purposes only. You agree not to:
        </p>
        <ul>
          <li>Use the service to violate any laws or regulations</li>
          <li>Attempt to interfere with or disrupt the service</li>
          <li>Reverse engineer or attempt to extract the source code of our service</li>
          <li>Use automated methods to access or use the service</li>
        </ul>
        
        <h2>Intellectual Property</h2>
        <p>
          All content, features, and functionality of Top Password Generator, including but not limited to text, graphics, logos, and code, are the exclusive property of Top Password Generator and are protected by copyright, trademark, and other intellectual property laws.
        </p>
        
        <h2>Modifications to Service</h2>
        <p>
          We reserve the right to modify, suspend, or discontinue any part of the service at any time without prior notice. We will not be liable to you or any third party for any modification, suspension, or discontinuation of the service.
        </p>
        
        <h2>Termination</h2>
        <p>
          We may terminate or suspend your access to the service immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users of the service, us, or third parties, or for any other reason.
        </p>
        
        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on this page. Your continued use of the service after any changes indicates your acceptance of the new terms.
        </p>
        
        <p className="text-sm text-gray-500 mt-8">
          Last updated: March 10, 2025
        </p>
      </div>
    </div>
  );
}
