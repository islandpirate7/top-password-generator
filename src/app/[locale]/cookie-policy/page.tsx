import { Metadata, Viewport } from 'next';

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
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-primary">
        Cookie Policy
      </h1>
      
      <div className="prose prose-lg max-w-none">
        <h2>What Are Cookies</h2>
        <p>
          Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
        </p>
        
        <h2>How We Use Cookies</h2>
        <p>
          Top Password Generator uses cookies in a very limited way, primarily to:
        </p>
        <ul>
          <li>Remember your language preference (English or Spanish)</li>
          <li>Store your interface preferences</li>
          <li>Enable essential website functionality</li>
        </ul>
        
        <h2>Types of Cookies We Use</h2>
        <h3>Essential Cookies</h3>
        <p>
          These cookies are necessary for the website to function properly. They enable core functionality such as language preferences. The website cannot function properly without these cookies.
        </p>
        
        <h3>What We Don't Use</h3>
        <p>
          We do not use:
        </p>
        <ul>
          <li>Analytics cookies that track your browsing habits</li>
          <li>Advertising cookies that are used to deliver targeted advertisements</li>
          <li>Third-party cookies from social media platforms or other external services</li>
        </ul>
        
        <h2>Cookie Management</h2>
        <p>
          Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "Options" or "Preferences" menu of your browser. You can delete existing cookies and block new cookies from being set, but this may affect the functionality of our website.
        </p>
        
        <h2>Changes to Our Cookie Policy</h2>
        <p>
          We may update our Cookie Policy from time to time. Any changes will be posted on this page.
        </p>
        
        <p className="text-sm text-gray-500 mt-8">
          Last updated: March 10, 2025
        </p>
      </div>
    </div>
  );
}
