import { Metadata, Viewport } from 'next'
import { useTranslations } from 'next-intl'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  
  let title, description, keywords, ogLocale;
  
  switch(locale) {
    case 'es':
      title = 'Consejos para Contraseñas Seguras - Mejores Prácticas de Seguridad';
      description = 'Aprende cómo crear y gestionar contraseñas seguras. Consejos profesionales para proteger tus cuentas online y evitar hackeos.';
      keywords = 'consejos de contraseñas, contraseñas seguras, seguridad de contraseñas, proteger cuentas, evitar hackeos';
      ogLocale = 'es_ES';
      break;
    case 'fr':
      title = 'Conseils de Sécurité pour les Mots de Passe - Meilleures Pratiques';
      description = 'Apprenez à créer et à gérer des mots de passe sécurisés. Conseils d\'experts pour protéger vos comptes en ligne et prévenir le piratage.';
      keywords = 'conseils de mot de passe, mots de passe sécurisés, sécurité des mots de passe, protéger les comptes, prévenir le piratage';
      ogLocale = 'fr_FR';
      break;
    case 'de':
      title = 'Sichere Passwort-Tipps - Bewährte Sicherheitspraktiken';
      description = 'Lernen Sie, wie Sie sichere Passwörter erstellen und verwalten. Expertentipps zum Schutz Ihrer Online-Konten und zur Vermeidung von Hacking.';
      keywords = 'Passwort-Tipps, sichere Passwörter, Passwort-Sicherheit, Konten schützen, Hacking vermeiden';
      ogLocale = 'de_DE';
      break;
    default: // English
      title = 'Secure Password Tips - Best Security Practices';
      description = 'Learn how to create and manage secure passwords. Expert tips to protect your online accounts and prevent hacking.';
      keywords = 'password tips, secure passwords, password security, protect accounts, prevent hacking';
      ogLocale = 'en_US';
  }
  
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      locale: ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    metadataBase: new URL('https://toppasswordgenerator.com'),
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function PasswordTipsPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('PasswordTips');
  const locale = params.locale;
  
  const getContent = () => {
    switch(locale) {
      case 'es':
        return (
          <>
            <h1 className="text-3xl font-bold mb-6">
              Consejos y Mejores Prácticas de Seguridad para Contraseñas
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold mb-4">
                Por Qué Son Importantes las Contraseñas Fuertes
              </h2>
              <p className="mb-4">
                Las contraseñas fuertes son tu primera línea de defensa contra el acceso no autorizado a tus cuentas. Con las filtraciones de datos cada vez más comunes, tener contraseñas seguras y únicas para cada una de tus cuentas es más importante que nunca.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 mt-8">
                Mejores Prácticas para Contraseñas
              </h2>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Utiliza una contraseña única para cada cuenta</li>
                <li>Crea contraseñas de al menos 12 caracteres</li>
                <li>Combina letras mayúsculas, minúsculas, números y símbolos</li>
                <li>Evita usar información personal identificable</li>
                <li>No reutilices contraseñas en múltiples sitios</li>
                <li>Cambia tus contraseñas regularmente, al menos cada 3-6 meses</li>
                <li>Utiliza un gestor de contraseñas para almacenar tus credenciales de forma segura</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 mt-8">
                Señales de que Tu Contraseña ha Sido Comprometida
              </h2>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Actividad de inicio de sesión sospechosa en tus cuentas</li>
                <li>Correos electrónicos sobre inicios de sesión desde dispositivos o ubicaciones desconocidas</li>
                <li>Cambios en la configuración de tu cuenta que no realizaste</li>
                <li>Tu correo electrónico aparece en una notificación de filtración de datos</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 mt-8">
                Uso de Nuestro Generador de Contraseñas
              </h2>
              <p className="mb-4">
                Nuestro generador de contraseñas puede ayudarte a crear contraseñas fuertes y memorables. Aquí te mostramos cómo usarlo de manera efectiva:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Para contraseñas aleatorias, utiliza al menos 16 caracteres con todas las opciones habilitadas</li>
                <li>Para contraseñas memorables, elige al menos 4 palabras para una seguridad adecuada</li>
                <li>Utiliza la función de frase mnemotécnica para ayudarte a recordar contraseñas complejas</li>
                <li>Siempre verifica la fortaleza de la contraseña antes de usarla</li>
              </ul>
            </div>
          </>
        );
      case 'fr':
        return (
          <>
            <h1 className="text-3xl font-bold mb-6">
              Conseils de Sécurité et Meilleures Pratiques pour les Mots de Passe
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold mb-4">
                Pourquoi les Mots de Passe Forts Sont Importants
              </h2>
              <p className="mb-4">
                Les mots de passe forts constituent votre première ligne de défense contre les accès non autorisés à vos comptes. Avec les violations de données de plus en plus courantes, avoir des mots de passe sécurisés et uniques pour chacun de vos comptes est plus important que jamais.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 mt-8">
                Meilleures Pratiques pour les Mots de Passe
              </h2>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Utilisez un mot de passe unique pour chaque compte</li>
                <li>Créez des mots de passe d'au moins 12 caractères</li>
                <li>Combinez des lettres majuscules, minuscules, des chiffres et des symboles</li>
                <li>Évitez d'utiliser des informations personnelles identifiables</li>
                <li>Ne réutilisez pas les mots de passe sur plusieurs sites</li>
                <li>Changez vos mots de passe régulièrement, au moins tous les 3-6 mois</li>
                <li>Utilisez un gestionnaire de mots de passe pour stocker vos identifiants en toute sécurité</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 mt-8">
                Signes que Votre Mot de Passe a Été Compromis
              </h2>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Activité de connexion suspecte à vos comptes</li>
                <li>Emails concernant des connexions depuis des appareils ou des emplacements inconnus</li>
                <li>Modifications de vos paramètres de compte que vous n'avez pas effectuées</li>
                <li>Votre email apparaît dans une notification de violation de données</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 mt-8">
                Utilisation de Notre Générateur de Mots de Passe
              </h2>
              <p className="mb-4">
                Notre générateur de mots de passe peut vous aider à créer des mots de passe forts et mémorables. Voici comment l'utiliser efficacement:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Pour les mots de passe aléatoires, utilisez au moins 16 caractères avec toutes les options activées</li>
                <li>Pour les mots de passe mémorables, choisissez au moins 4 mots pour une sécurité adéquate</li>
                <li>Utilisez la fonction de phrase mnémonique pour vous aider à mémoriser des mots de passe complexes</li>
                <li>Vérifiez toujours la force du mot de passe avant de l'utiliser</li>
              </ul>
            </div>
          </>
        );
      case 'de':
        return (
          <>
            <h1 className="text-3xl font-bold mb-6">
              Passwort-Sicherheitstipps & Beste Praktiken
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold mb-4">
                Warum starke Passwörter wichtig sind
              </h2>
              <p className="mb-4">
                Starke Passwörter sind Ihre erste Verteidigungslinie gegen unbefugten Zugriff auf Ihre Konten. Da Datenschutzverletzungen immer häufiger vorkommen, ist es wichtiger denn je, sichere, einzigartige Passwörter für jedes Ihrer Konten zu haben.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 mt-8">
                Beste Praktiken für Passwörter
              </h2>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Verwenden Sie für jedes Konto ein einzigartiges Passwort</li>
                <li>Erstellen Sie Passwörter mit mindestens 12 Zeichen</li>
                <li>Kombinieren Sie Groß- und Kleinbuchstaben, Zahlen und Symbole</li>
                <li>Vermeiden Sie die Verwendung identifizierbarer persönlicher Informationen</li>
                <li>Verwenden Sie Passwörter nicht für mehrere Websites wieder</li>
                <li>Ändern Sie Ihre Passwörter regelmäßig, mindestens alle 3-6 Monate</li>
                <li>Verwenden Sie einen Passwort-Manager, um Ihre Anmeldedaten sicher zu speichern</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 mt-8">
                Anzeichen dafür, dass Ihr Passwort kompromittiert wurde
              </h2>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Verdächtige Anmeldeaktivitäten bei Ihren Konten</li>
                <li>E-Mails über Anmeldungen von unbekannten Geräten oder Standorten</li>
                <li>Änderungen an Ihren Kontoeinstellungen, die Sie nicht vorgenommen haben</li>
                <li>Ihre E-Mail erscheint in einer Benachrichtigung über eine Datenschutzverletzung</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 mt-8">
                Verwendung unseres Passwort-Generators
              </h2>
              <p className="mb-4">
                Unser Passwort-Generator kann Ihnen helfen, starke und einprägsame Passwörter zu erstellen. So verwenden Sie ihn effektiv:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Verwenden Sie für zufällige Passwörter mindestens 16 Zeichen mit allen aktivierten Optionen</li>
                <li>Wählen Sie für einprägsame Passwörter mindestens 4 Wörter für angemessene Sicherheit</li>
                <li>Verwenden Sie die mnemonische Phrasenfunktion, um sich komplexe Passwörter zu merken</li>
                <li>Überprüfen Sie immer die Stärke des Passworts, bevor Sie es verwenden</li>
              </ul>
            </div>
          </>
        );
      default: // English
        return (
          <>
            <h1 className="text-3xl font-bold mb-6">
              Password Security Tips & Best Practices
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold mb-4">
                Why Strong Passwords Matter
              </h2>
              <p className="mb-4">
                Strong passwords are your first line of defense against unauthorized access to your accounts. With data breaches becoming increasingly common, having secure, unique passwords for each of your accounts is more important than ever.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 mt-8">
                Password Best Practices
              </h2>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Use a unique password for each account</li>
                <li>Create passwords that are at least 12 characters long</li>
                <li>Combine uppercase letters, lowercase letters, numbers, and symbols</li>
                <li>Avoid using identifiable personal information</li>
                <li>Don't reuse passwords across multiple sites</li>
                <li>Change your passwords regularly, at least every 3-6 months</li>
                <li>Use a password manager to store your credentials securely</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 mt-8">
                Signs Your Password Has Been Compromised
              </h2>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Suspicious login activity on your accounts</li>
                <li>Emails about logins from unknown devices or locations</li>
                <li>Changes to your account settings that you didn't make</li>
                <li>Your email appears in a data breach notification</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 mt-8">
                Using Our Password Generator
              </h2>
              <p className="mb-4">
                Our password generator can help you create strong and memorable passwords. Here's how to use it effectively:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>For random passwords, use at least 16 characters with all options enabled</li>
                <li>For memorable passwords, choose at least 4 words for adequate security</li>
                <li>Use the mnemonic phrase feature to help you remember complex passwords</li>
                <li>Always check the password strength before using it</li>
              </ul>
            </div>
          </>
        );
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {getContent()}
    </div>
  );
}
