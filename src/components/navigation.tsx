"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

export function Navigation() {
  const t = useTranslations('Navigation')
  const pathname = usePathname()
  const router = useRouter()
  
  // Determine the current locale from the pathname
  const locale = pathname.startsWith('/es') ? 'es' : 'en'
  
  // Create localized paths
  const homePath = locale === 'es' ? '/es' : '/'
  const tipsPath = locale === 'es' ? '/es/password-tips' : '/en/password-tips'
  
  // Handle language change
  const handleLanguageChange = () => {
    // Simply switch between root paths for English and Spanish
    // This avoids complex path manipulation that could lead to errors
    if (locale === 'es') {
      // Currently in Spanish, switch to English
      if (pathname.includes('/password-tips')) {
        router.push('/en/password-tips')
      } else {
        router.push('/')
      }
    } else {
      // Currently in English, switch to Spanish
      if (pathname.includes('/password-tips')) {
        router.push('/es/password-tips')
      } else {
        router.push('/es')
      }
    }
  }
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 overflow-visible">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link 
              href={homePath}
              className="flex items-center"
            >
              <div className="h-14 w-14 relative flex items-center justify-center">
                <Image 
                  src="/new-logo.svg" 
                  alt="Password Generator Logo" 
                  width={36} 
                  height={36} 
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link 
              href={homePath}
              className={`text-gray-700 hover:text-blue-600 ${pathname === '/' || pathname === '/es' ? 'font-medium text-blue-600' : ''}`}
            >
              {t('generator')}
            </Link>
            <Link 
              href={tipsPath}
              className={`text-gray-700 hover:text-blue-600 ${pathname.includes('/password-tips') ? 'font-medium text-blue-600' : ''}`}
            >
              {t('tips')}
            </Link>
            <div className="border-l border-gray-300 mx-2"></div>
            <button 
              onClick={handleLanguageChange}
              className="text-gray-700 hover:text-blue-600"
            >
              {locale === 'es' ? t('english') : t('spanish')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
