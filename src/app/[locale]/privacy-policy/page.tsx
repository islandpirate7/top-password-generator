import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  
  return {
    title: t('privacyPolicy')
  };
}

export default async function PrivacyPolicy({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale });
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-primary">
        {t('footer.privacyPolicy')}
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
          <li>Collect personally identifiable information</li>
          <li>Share any data with third parties</li>
        </ul>
        
        <h2>Client-Side Processing</h2>
        <p>
          All password generation occurs entirely in your browser. Your passwords are never transmitted to our servers.
        </p>
        
        <h2>Cookies</h2>
        <p>
          We use only essential cookies to remember your language preference and other basic settings. 
          No tracking or advertising cookies are used.
        </p>
        
        <h2>QR Code Expiration</h2>
        <p>
          If you use our QR code feature with expiration enabled, we store only a timestamp and encrypted hash to 
          validate expiration. This data cannot be used to recover your password and is automatically deleted after 
          the expiration period.
        </p>
        
        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
          Privacy Policy on this page.
        </p>
        
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at privacy@toppasswordgenerator.com.
        </p>
        
        <p className="text-sm text-gray-500 mt-8">
          Last updated: March 10, 2025
        </p>
      </div>
    </div>
  );
}
