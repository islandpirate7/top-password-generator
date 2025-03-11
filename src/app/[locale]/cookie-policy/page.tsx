'use client';

import LegalPageWrapper from '@/components/legal-page-wrapper';

export default function CookiePolicy() {
  return (
    <LegalPageWrapper titleKey="footer.cookiePolicy">
      <>
        <h2>What Are Cookies</h2>
        <p>
          Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
          They are widely used to make websites work more efficiently and provide information to the website owners.
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
          These cookies are necessary for the website to function properly. They enable core functionality such as 
          language preferences. The website cannot function properly without these cookies.
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
          Most web browsers allow you to control cookies through their settings. You can usually find these settings 
          in the "Options" or "Preferences" menu of your browser. You can delete existing cookies and block new cookies 
          from being set, but this may affect the functionality of our website.
        </p>
        
        <h2>Changes to Our Cookie Policy</h2>
        <p>
          We may update our Cookie Policy from time to time. Any changes will be posted on this page.
        </p>
        
        <p className="text-sm text-gray-500 mt-8">
          Last updated: March 10, 2025
        </p>
      </>
    </LegalPageWrapper>
  );
}
