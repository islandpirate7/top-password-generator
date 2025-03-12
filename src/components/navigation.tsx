"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

export function Navigation() {
  const t = useTranslations('Navigation')
  const pathname = usePathname()
  const router = useRouter()
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  
  // Determine the current locale from the pathname
  const locale = pathname.startsWith('/es') 
    ? 'es' 
    : pathname.startsWith('/fr')
      ? 'fr'
      : pathname.startsWith('/de')
        ? 'de'
        : 'en'
  
  // Create localized paths
  const getLocalizedPath = (path = '') => {
    if (locale === 'en') return path ? `/en${path}` : '/'
    return `/${locale}${path}`
  }
  
  const homePath = getLocalizedPath()
  const tipsPath = getLocalizedPath('/password-tips')
  
  // Handle language change
  const handleLanguageChange = (newLocale: string) => {
    // Close the dropdown
    setShowLanguageMenu(false)
    
    // Get the current path without locale prefix
    let currentPath = ''
    if (pathname.includes('/password-tips')) {
      currentPath = '/password-tips'
    }
    
    // Navigate to the new locale path
    if (newLocale === 'en' && currentPath === '') {
      router.push('/')
    } else if (newLocale === 'en') {
      router.push(`/en${currentPath}`)
    } else {
      router.push(`/${newLocale}${currentPath}`)
    }
  }
  
  // Get the current language name for display
  const getCurrentLanguageName = () => {
    switch(locale) {
      case 'es': return 'Español'
      case 'fr': return 'Français'
      case 'de': return 'Deutsch'
      default: return 'English'
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
              className={`text-gray-700 hover:text-blue-600 ${pathname === '/' || pathname.endsWith('/') && pathname.length <= 4 ? 'font-medium text-blue-600' : ''}`}
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
            <div className="relative">
              <button 
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="text-gray-700 hover:text-blue-600 flex items-center"
              >
                {getCurrentLanguageName()}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${locale === 'en' ? 'bg-gray-100' : ''}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange('es')}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${locale === 'es' ? 'bg-gray-100' : ''}`}
                  >
                    Español
                  </button>
                  <button
                    onClick={() => handleLanguageChange('fr')}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${locale === 'fr' ? 'bg-gray-100' : ''}`}
                  >
                    Français
                  </button>
                  <button
                    onClick={() => handleLanguageChange('de')}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${locale === 'de' ? 'bg-gray-100' : ''}`}
                  >
                    Deutsch
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
