import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Conseils de Sécurité pour les Mots de Passe - Meilleures Pratiques'
  const description = 'Apprenez à créer et à gérer des mots de passe sécurisés. Conseils d\'experts pour protéger vos comptes en ligne et prévenir le piratage.'
  
  return {
    title,
    description,
    keywords: 'conseils de mot de passe, mots de passe sécurisés, sécurité des mots de passe, protéger les comptes, prévenir le piratage',
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'fr_FR',
    },
  }
}

export default function PasswordTipsPage() {
  const homePath = '/fr'
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
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
    </div>
  )
}
