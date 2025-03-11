import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  
  return {
    title: t('termsOfService')
  };
}

export default async function TermsOfService({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale });
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-primary">
        {t('footer.termsOfService')}
      </h1>
      
      <div className="prose prose-lg max-w-none">
        <h2>Acceptance of Terms</h2>
        <p>
          By accessing or using the Top Password Generator service, you agree to be bound by these Terms of Service.
        </p>
        
        <h2>Description of Service</h2>
        <p>
          Top Password Generator provides tools for generating secure passwords, including random passwords, 
          memorable passwords, PINs, pattern-based passwords, and QR code generation for passwords.
        </p>
        
        <h2>Use of the Service</h2>
        <p>
          You agree to use the service only for lawful purposes and in accordance with these Terms. You are responsible 
          for maintaining the security of any passwords you generate using our service.
        </p>
        
        <h2>No Warranty</h2>
        <p>
          The service is provided "as is" without warranties of any kind, either express or implied. We do not warrant 
          that the service will be uninterrupted, secure, or error-free.
        </p>
        
        <h2>Limitation of Liability</h2>
        <p>
          In no event shall Top Password Generator be liable for any indirect, incidental, special, consequential, or 
          punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
        </p>
        
        <h2>Password Security</h2>
        <p>
          While we strive to provide tools for generating secure passwords, we cannot guarantee that passwords generated 
          using our service will be immune to all forms of attack. You should always follow best practices for password 
          management, including using different passwords for different services and changing passwords regularly.
        </p>
        
        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. We will provide notice of any material changes by 
          posting the new Terms on this page.
        </p>
        
        <h2>Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which 
          Top Password Generator operates, without regard to its conflict of law provisions.
        </p>
        
        <p className="text-sm text-gray-500 mt-8">
          Last updated: March 10, 2025
        </p>
      </div>
    </div>
  );
}
