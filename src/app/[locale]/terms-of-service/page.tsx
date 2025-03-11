'use client';

import LegalPageWrapper from '@/components/legal-page-wrapper';

export default function TermsOfService() {
  return (
    <LegalPageWrapper titleKey="footer.termsOfService">
      <>
        <h2>Acceptance of Terms</h2>
        <p>
          By accessing or using Top Password Generator, you agree to be bound by these Terms of Service. 
          If you do not agree to these terms, please do not use our service.
        </p>
        
        <h2>Description of Service</h2>
        <p>
          Top Password Generator provides a free online tool for generating secure passwords. 
          We offer various password generation options, including customizable length, character sets, 
          and mnemonic password generation in both English and Spanish.
        </p>
        
        <h2>User Responsibilities</h2>
        <p>
          You are responsible for:
        </p>
        <ul>
          <li>Using the generated passwords at your own risk</li>
          <li>Storing and managing your passwords securely</li>
          <li>Complying with any applicable laws and regulations</li>
        </ul>
        
        <h2>No Warranty</h2>
        <p>
          The service is provided "as is" without warranties of any kind, either express or implied. 
          We do not guarantee that the service will be uninterrupted, secure, or error-free.
        </p>
        
        <h2>Limitation of Liability</h2>
        <p>
          We shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages 
          resulting from your use of or inability to use the service.
        </p>
        
        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Continued use of the service after any such changes 
          constitutes your acceptance of the new terms.
        </p>
        
        <h2>Governing Law</h2>
        <p>
          These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which 
          we operate, without regard to its conflict of law provisions.
        </p>
        
        <p className="text-sm text-gray-500 mt-8">
          Last updated: March 10, 2025
        </p>
      </>
    </LegalPageWrapper>
  );
}
