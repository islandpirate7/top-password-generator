import { Metadata } from 'next';
import LegalPageWrapper from '@/components/legal-page-wrapper';

export const metadata: Metadata = {
  title: 'Terms of Service - Top Password Generator',
};

export default function TermsOfService() {
  return (
    <LegalPageWrapper titleKey="footer.termsOfService">
      {(t) => (
        <>
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing or using Top Password Generator, you agree to be bound by these Terms of Service. If you 
            disagree with any part of the terms, you may not access the service.
          </p>
          
          <h2>Description of Service</h2>
          <p>
            Top Password Generator provides tools for generating secure passwords and related services. We offer 
            these tools as-is and make no guarantees about their suitability for your specific needs.
          </p>
          
          <h2>User Responsibilities</h2>
          <p>
            You are responsible for:
          </p>
          <ul>
            <li>Keeping any passwords you generate secure</li>
            <li>Using the service in compliance with all applicable laws</li>
            <li>Not attempting to disrupt or compromise the security of the service</li>
          </ul>
          
          <h2>Intellectual Property</h2>
          <p>
            The service, including all content, features, and functionality, is owned by Top Password Generator and 
            is protected by international copyright, trademark, and other intellectual property laws.
          </p>
          
          <h2>Limitation of Liability</h2>
          <p>
            In no event shall Top Password Generator be liable for any indirect, incidental, special, consequential 
            or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible 
            losses, resulting from your access to or use of or inability to access or use the service.
          </p>
          
          <h2>Modifications to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. It is your responsibility to check 
            the Terms periodically for changes. Your continued use of the service following the posting of any changes 
            constitutes acceptance of those changes.
          </p>
          
          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by the laws of the jurisdiction in which Top Password Generator operates, 
            without regard to its conflict of law provisions.
          </p>
          
          <p className="text-sm text-gray-500 mt-8">
            Last updated: March 10, 2025
          </p>
        </>
      )}
    </LegalPageWrapper>
  );
}
