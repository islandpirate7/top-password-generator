export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-primary text-center">
        Terms of Service
      </h1>
      
      <div className="prose prose-lg max-w-none bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Acceptance of Terms</h2>
        <p className="text-gray-700 mb-6">
          By accessing or using Top Password Generator, you agree to be bound by these Terms of Service. 
          If you do not agree to these terms, please do not use our service.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Description of Service</h2>
        <p className="text-gray-700 mb-6">
          Top Password Generator provides a tool for generating secure, random passwords and mnemonic phrases in 
          multiple languages. All password generation occurs client-side in your browser.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Use Restrictions</h2>
        <p className="text-gray-700 mb-3">
          You agree not to:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
          <li>Use our service for any illegal purposes</li>
          <li>Attempt to reverse-engineer our code</li>
          <li>Interfere with the proper functioning of the service</li>
          <li>Access the service through automated means without our permission</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Password Security</h2>
        <p className="text-gray-700 mb-3">
          While we strive to generate secure passwords, you acknowledge that:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
          <li>No password system is 100% secure</li>
          <li>You are responsible for storing your passwords securely</li>
          <li>We are not liable for any security breaches resulting from password compromise</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Intellectual Property</h2>
        <p className="text-gray-700 mb-6">
          The content, code, and materials on Top Password Generator are owned by us and are protected by 
          copyright, trademark, and other intellectual property laws.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Disclaimer of Warranties</h2>
        <p className="text-gray-700 mb-6">
          Top Password Generator is provided "as is" without any warranties, expressed or implied. 
          We do not warrant that the service will be error-free or uninterrupted.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Limitation of Liability</h2>
        <p className="text-gray-700 mb-6">
          We shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
          resulting from your use of or inability to use our service.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Changes to Terms</h2>
        <p className="text-gray-700 mb-6">
          We reserve the right to modify these terms at any time. Continued use of the service after such 
          changes constitutes your acceptance of the new terms.
        </p>
        
        <p className="text-sm text-gray-500 mt-10 pt-4 border-t">
          Last updated: March 10, 2025
        </p>
      </div>
    </div>
  );
}
