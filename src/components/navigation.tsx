"use client"

import React, { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import Image from 'next/image'
import { locales } from '@/i18n/routing'

export function Navigation() {
  const t = useTranslations('Navigation')
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  
  // Handle language change
  const handleLanguageChange = (newLocale: string) => {
    // Close the dropdown
    setShowLanguageMenu(false)
    
    // Validate locale before navigation
    if (locales.includes(newLocale as any)) {
      // Navigate to the new locale path
      router.replace(pathname, { locale: newLocale })
    }
  }
  
  // Get the current language name for display
  const getCurrentLanguageName = () => {
    switch(locale) {
      case 'es': return t('spanish')
      case 'fr': return t('french')
      case 'de': return t('german')
      default: return t('english')
    }
  }
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 overflow-visible">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              locale={locale}
              className="flex items-center space-x-2"
            >
              <div className="relative w-8 h-8">
                <Image 
                  src="/new-logo.svg" 
                  alt={t('logoAlt')} 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-bold text-lg text-primary hidden sm:inline-block">
                {t('appTitle')}
              </span>
            </Link>
            
            <div className="hidden md:flex space-x-6">
              <Link 
                href="/"
                locale={locale}
                className={`text-gray-700 hover:text-blue-600 ${pathname === '/' || pathname.endsWith('/') && pathname.length <= 4 ? 'font-medium text-blue-600' : ''}`}
              >
                {t('generator')}
              </Link>
              <Link 
                href="/password-tips"
                locale={locale}
                className={`text-gray-700 hover:text-blue-600 ${pathname.includes('/password-tips') ? 'font-medium text-blue-600' : ''}`}
              >
                {t('tips')}
              </Link>
            </div>
          </div>
          <div className="flex space-x-6">
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
                    {t('english')}
                  </button>
                  <button
                    onClick={() => handleLanguageChange('es')}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${locale === 'es' ? 'bg-gray-100' : ''}`}
                  >
                    {t('spanish')}
                  </button>
                  <button
                    onClick={() => handleLanguageChange('fr')}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${locale === 'fr' ? 'bg-gray-100' : ''}`}
                  >
                    {t('french')}
                  </button>
                  <button
                    onClick={() => handleLanguageChange('de')}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${locale === 'de' ? 'bg-gray-100' : ''}`}
                  >
                    {t('german')}
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
