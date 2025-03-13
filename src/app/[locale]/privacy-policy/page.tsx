import { Metadata, Viewport } from 'next';

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
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-primary">
        Privacy Policy
      </h1>
      
      <div className="prose prose-lg max-w-none">
        <h2>Introduction</h2>
        <p>
          This Privacy Policy explains how Top Password Generator ("we", "us", or "our") collects, uses, and protects 
          your information when you use our password generation service.
        </p>
        
        <h2>Information We Don't Collect</h2>
        <p>
          Our password generator is designed with privacy in mind. We do not:
        </p>
        <ul>
          <li>Store any passwords you generate</li>
          <li>Track your password generation history</li>
          <li>Collect personal information about you</li>
          <li>Use analytics to track your behavior</li>
        </ul>
        
        <h2>Information We Do Collect</h2>
        <p>
          We collect minimal information necessary to provide our service:
        </p>
        <ul>
          <li>Your language preference (stored in your browser)</li>
          <li>Your password generation settings (stored locally in your browser)</li>
        </ul>
        
        <h2>Third-Party Services</h2>
        <p>
          Our website may use third-party services for specific functions:
        </p>
        <ul>
          <li>Hosting services to serve the website</li>
          <li>Advertising services to display ads</li>
        </ul>
        
        <h2>Security</h2>
        <p>
          We prioritize the security of your information. Since we don't collect passwords or personal data, there is minimal risk to your privacy when using our service.
        </p>
        
        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
        
        <p className="text-sm text-gray-500 mt-8">
          Last updated: March 10, 2025
        </p>
      </div>
    </div>
  );
}
