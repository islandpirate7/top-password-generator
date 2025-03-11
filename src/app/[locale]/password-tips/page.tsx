import React from 'react'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Dynamically import the PasswordStrengthChecker component with no SSR
const PasswordStrengthChecker = dynamic(
  () => import('@/components/password-strength-checker').then(mod => ({ default: mod.PasswordStrengthChecker })),
  { ssr: false }
)

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const title = locale === 'es' 
    ? 'Consejos para Contraseñas Seguras - Mejores Prácticas de Seguridad'
    : 'Password Security Tips - Best Practices for Secure Passwords'
    
  const description = locale === 'es'
    ? 'Aprende cómo crear y gestionar contraseñas seguras. Consejos profesionales para proteger tus cuentas online y evitar hackeos.'
    : 'Learn how to create and manage secure passwords. Expert tips to protect your online accounts and prevent hacking.'
  
  return {
    title,
    description,
    keywords: locale === 'es' 
      ? 'consejos de contraseñas, contraseñas seguras, seguridad de contraseñas, proteger cuentas, evitar hackeos'
      : 'password tips, secure passwords, password security, protect accounts, prevent hacking',
    openGraph: {
      title,
      description,
      type: 'article',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
    },
  }
}

export default function PasswordTipsPage({ params }: { params: { locale: string } }) {
  const isSpanish = params.locale === 'es'
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        {isSpanish ? 'Consejos y Mejores Prácticas de Seguridad para Contraseñas' : 'Password Security Tips & Best Practices'}
      </h1>
      
      <div className="mb-10">
        <PasswordStrengthChecker />
      </div>
      
      <div className="prose prose-lg max-w-none">
        <h2 className="text-2xl font-semibold mb-4">
          {isSpanish ? 'Por Qué Son Importantes las Contraseñas Fuertes' : 'Why Strong Passwords Matter'}
        </h2>
        <p className="mb-4">
          {isSpanish 
            ? 'Las contraseñas fuertes son tu primera línea de defensa contra el acceso no autorizado a tus cuentas. Con las filtraciones de datos cada vez más comunes, tener contraseñas seguras y únicas para cada una de tus cuentas es más importante que nunca.'
            : 'Strong passwords are your first line of defense against unauthorized access to your accounts. With data breaches becoming increasingly common, having secure, unique passwords for each of your accounts is more important than ever.'}
        </p>
        
        <h2 className="text-2xl font-semibold mb-4 mt-8">
          {isSpanish ? 'Mejores Prácticas para Contraseñas' : 'Password Best Practices'}
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            {isSpanish 
              ? 'Usa un mínimo de 12 caracteres, con una mezcla de mayúsculas, minúsculas, números y símbolos'
              : 'Use a minimum of 12 characters, with a mix of uppercase, lowercase, numbers, and symbols'}
          </li>
          <li>
            {isSpanish 
              ? 'Evita usar información personal como nombres, fechas de nacimiento o palabras comunes'
              : 'Avoid using personal information like names, birthdays, or common words'}
          </li>
          <li>
            {isSpanish 
              ? 'Crea contraseñas únicas para cada cuenta para evitar que una sola filtración comprometa múltiples cuentas'
              : 'Create unique passwords for each account to prevent a single breach from compromising multiple accounts'}
          </li>
          <li>
            {isSpanish 
              ? 'Considera usar un gestor de contraseñas para almacenar y generar contraseñas complejas de forma segura'
              : 'Consider using a password manager to securely store and generate complex passwords'}
          </li>
          <li>
            {isSpanish 
              ? 'Activa la autenticación de dos factores (2FA) siempre que sea posible para una capa adicional de seguridad'
              : 'Enable two-factor authentication (2FA) whenever possible for an extra layer of security'}
          </li>
          <li>
            {isSpanish 
              ? 'Cambia las contraseñas inmediatamente si sospechas que una cuenta ha sido comprometida'
              : 'Change passwords immediately if you suspect an account has been compromised'}
          </li>
          <li>
            {isSpanish 
              ? 'Utiliza técnicas mnemotécnicas para crear contraseñas memorables pero seguras'
              : 'Use mnemonic techniques to create memorable but secure passwords'}
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4 mt-8">
          {isSpanish ? 'Uso de Técnicas Mnemotécnicas' : 'Using Mnemonic Techniques'}
        </h2>
        <p className="mb-4">
          {isSpanish 
            ? 'Las contraseñas mnemotécnicas son más fáciles de recordar sin dejar de ser seguras. Nuestro generador de contraseñas puede crear contraseñas mnemotécnicas tanto en inglés como en español, utilizando listas de palabras y reglas gramaticales específicas de cada idioma.'
            : 'Mnemonic passwords are easier to remember while still being secure. Our password generator can create mnemonic passwords in both English and Spanish, using language-specific word lists and grammar rules.'}
        </p>
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h3 className="font-medium mb-2">
            {isSpanish ? 'Ejemplo de una Contraseña Mnemotécnica' : 'Example of a Mnemonic Password'}
          </h3>
          <p className="italic">
            {isSpanish 
              ? 'En lugar de "C0ntr@señ4", prueba "Los5ElefantesVerdesBailaronFelizmente!" - Es más larga, más compleja, pero también más fácil de recordar porque crea una imagen mental.'
              : 'Instead of "P@ssw0rd123", try "The5GreenElephantsDancedHappily!" - It\'s longer, more complex, but also easier to remember because it creates a mental image.'}
          </p>
        </div>
        
        <h2 className="text-2xl font-semibold mb-4 mt-8">
          {isSpanish ? 'Errores Comunes de Contraseñas a Evitar' : 'Common Password Mistakes to Avoid'}
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            {isSpanish 
              ? 'Usar la misma contraseña en múltiples sitios'
              : 'Using the same password across multiple sites'}
          </li>
          <li>
            {isSpanish 
              ? 'Crear contraseñas demasiado cortas o simples'
              : 'Creating passwords that are too short or simple'}
          </li>
          <li>
            {isSpanish 
              ? 'Usar información personal obvia (nombres de mascotas, fechas de nacimiento, etc.)'
              : 'Using obvious personal information (pet names, birthdays, etc.)'}
          </li>
          <li>
            {isSpanish 
              ? 'Anotar contraseñas en papel o en notas digitales no seguras'
              : 'Writing passwords down on paper or in unsecured digital notes'}
          </li>
          <li>
            {isSpanish 
              ? 'No cambiar las contraseñas después de una filtración de datos conocida'
              : 'Not changing passwords after a known data breach'}
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4 mt-8">
          {isSpanish ? 'El Papel de los Gestores de Contraseñas' : 'The Role of Password Managers'}
        </h2>
        <p className="mb-4">
          {isSpanish 
            ? 'Los gestores de contraseñas son aplicaciones seguras que almacenan y administran tus contraseñas. Pueden generar contraseñas fuertes y únicas para cada sitio que uses, y solo necesitas recordar una contraseña maestra para acceder a todas ellas.'
            : 'Password managers are secure applications that store and manage your passwords. They can generate strong, unique passwords for each site you use, and you only need to remember one master password to access them all.'}
        </p>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
          <p className="font-medium">
            {isSpanish ? 'Consejo Profesional:' : 'Pro Tip:'}
          </p>
          <p>
            {isSpanish 
              ? 'Nuestro generador de contraseñas crea contraseñas fuertes que puedes usar con tu gestor de contraseñas. La opción mnemotécnica es perfecta para crear una contraseña maestra fuerte que realmente puedas recordar.'
              : 'Our password generator creates strong passwords that you can use with your password manager. The mnemonic option is perfect for creating a strong master password that you can actually remember.'}
          </p>
        </div>
        
        <h2 className="text-2xl font-semibold mb-4 mt-8">
          {isSpanish ? 'Conclusión' : 'Conclusion'}
        </h2>
        <p className="mb-4">
          {isSpanish 
            ? 'Tomar en serio la seguridad de las contraseñas es esencial en el mundo digital actual. Siguiendo estas mejores prácticas y utilizando herramientas como nuestro generador de contraseñas, puedes reducir significativamente el riesgo de comprometer tus cuentas y sufrir robo de identidad.'
            : 'Taking password security seriously is essential in today\'s digital world. By following these best practices and using tools like our password generator, you can significantly reduce your risk of account compromise and identity theft.'}
        </p>
        
        <div className="mt-8 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">
            {isSpanish ? 'Prueba Nuestro Generador de Contraseñas' : 'Try Our Password Generator'}
          </h3>
          <p className="mb-4">
            {isSpanish 
              ? '¿Listo para crear contraseñas más fuertes? Nuestro generador de contraseñas gratuito crea contraseñas aleatorias y seguras al instante. También cuenta con una opción única de contraseña mnemotécnica para crear contraseñas memorables pero seguras tanto en inglés como en español.'
              : 'Ready to create stronger passwords? Our free password generator creates random, secure passwords instantly. It also features a unique mnemonic password option to create memorable but secure passwords in both English and Spanish.'}
          </p>
          <a href={params.locale === 'es' ? '/es' : '/'} className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            {isSpanish ? 'Generar una Contraseña Ahora' : 'Generate a Password Now'}
          </a>
        </div>
      </div>
    </div>
  )
}
