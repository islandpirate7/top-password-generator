import React from 'react'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { PasswordStrengthChecker } from '@/components/password-strength-checker'

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
  const t = useTranslations('PasswordTips')
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      
      <div className="mb-10">
        <PasswordStrengthChecker />
      </div>
      
      <div className="prose prose-lg max-w-none">
        <h2 className="text-2xl font-semibold mb-4">{t('whyImportant')}</h2>
        <p className="mb-4">{t('importanceDescription')}</p>
        
        <h2 className="text-2xl font-semibold mb-4 mt-8">{t('bestPractices')}</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>{t('tip1')}</li>
          <li>{t('tip2')}</li>
          <li>{t('tip3')}</li>
          <li>{t('tip4')}</li>
          <li>{t('tip5')}</li>
          <li>{t('tip6')}</li>
          <li>{t('tip7')}</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4 mt-8">{t('mnemonicTechniques')}</h2>
        <p className="mb-4">{t('mnemonicDescription')}</p>
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h3 className="font-medium mb-2">{t('exampleTitle')}</h3>
          <p className="italic">{t('exampleText')}</p>
        </div>
        
        <h2 className="text-2xl font-semibold mb-4 mt-8">{t('commonMistakes')}</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>{t('mistake1')}</li>
          <li>{t('mistake2')}</li>
          <li>{t('mistake3')}</li>
          <li>{t('mistake4')}</li>
          <li>{t('mistake5')}</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4 mt-8">{t('passwordManagers')}</h2>
        <p className="mb-4">{t('managersDescription')}</p>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
          <p className="font-medium">{t('tipBoxTitle')}</p>
          <p>{t('tipBoxContent')}</p>
        </div>
        
        <h2 className="text-2xl font-semibold mb-4 mt-8">{t('conclusion')}</h2>
        <p className="mb-4">{t('conclusionText')}</p>
        
        <div className="mt-8 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">{t('tryGenerator')}</h3>
          <p className="mb-4">{t('generatorPromo')}</p>
          <a href={params.locale === 'es' ? '/es' : '/'} className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            {t('generateButton')}
          </a>
        </div>
      </div>
    </div>
  )
}
