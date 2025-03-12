import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Passwort-Sicherheitstipps - Beste Praktiken für sichere Passwörter'
  const description = 'Lernen Sie, wie Sie sichere Passwörter erstellen und verwalten. Expertentipps zum Schutz Ihrer Online-Konten und zur Verhinderung von Hacking.'
  
  return {
    title,
    description,
    keywords: 'Passwort-Tipps, sichere Passwörter, Passwort-Sicherheit, Konten schützen, Hacking verhindern',
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'de_DE',
    },
  }
}

export default function PasswordTipsPage() {
  const homePath = '/de'
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
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
    </div>
  )
}
