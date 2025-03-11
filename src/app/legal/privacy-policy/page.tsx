export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-primary text-center">
        Privacy Policy
      </h1>
      
      <div className="prose prose-lg max-w-none bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Introduction</h2>
        <p className="text-gray-700 mb-6">
          This Privacy Policy explains how Top Password Generator ("we", "us", or "our") collects, uses, and protects 
          your information when you use our password generation service.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Information We Don't Collect</h2>
        <p className="text-gray-700 mb-3">
          Our password generator is designed with privacy in mind. We do not:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
          <li>Store any passwords you generate</li>
          <li>Track your password generation history</li>
          <li>Collect personally identifiable information</li>
          <li>Share any data with third parties</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Client-Side Processing</h2>
        <p className="text-gray-700 mb-6">
          All password generation occurs entirely in your browser. Your passwords are never transmitted to our servers.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Cookies</h2>
        <p className="text-gray-700 mb-6">
          We use only essential cookies to remember your language preference and other basic settings. 
          No tracking or advertising cookies are used.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">QR Code Expiration</h2>
        <p className="text-gray-700 mb-6">
          If you use our QR code feature with expiration enabled, we store only a timestamp and encrypted hash to 
          validate expiration. This data cannot be used to recover your password and is automatically deleted after 
          the expiration period.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Changes to This Policy</h2>
        <p className="text-gray-700 mb-6">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
          Privacy Policy on this page.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-6">
          If you have any questions about this Privacy Policy, please contact us at privacy@toppasswordgenerator.com.
        </p>
        
        <p className="text-sm text-gray-500 mt-10 pt-4 border-t">
          Last updated: March 10, 2025
        </p>
      </div>
    </div>
  );
}
