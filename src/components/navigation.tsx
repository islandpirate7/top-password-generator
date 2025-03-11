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
  const tipsPath = locale === 'es' ? '/es/password-tips' : '/password-tips'
  
  // Handle language change
  const handleLanguageChange = () => {
    const targetLocale = locale === 'es' ? 'en' : 'es'
    
    // Get the path without the locale prefix
    let pathWithoutLocale = pathname
    if (locale === 'es') {
      pathWithoutLocale = pathname.replace(/^\/es/, '')
    }
    
    // If we're at the root, handle specially
    if (pathWithoutLocale === '' || pathWithoutLocale === '/') {
      router.push(targetLocale === 'es' ? '/es' : '/')
      return
    }
    
    // Otherwise, construct the new path with the target locale
    const newPath = targetLocale === 'es' ? `/es${pathWithoutLocale}` : pathWithoutLocale
    router.push(newPath)
  }
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link 
              href={homePath}
              className="flex items-center"
            >
              <div className="w-12 h-12 relative">
                <Image 
                  src="/new-logo.svg" 
                  alt="Password Generator Logo" 
                  width={48} 
                  height={48} 
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
              {locale === 'es' ? 'Generador' : 'Generator'}
            </Link>
            <Link 
              href={tipsPath}
              className={`text-gray-700 hover:text-blue-600 ${pathname.includes('/password-tips') ? 'font-medium text-blue-600' : ''}`}
            >
              {locale === 'es' ? 'Consejos' : 'Tips'}
            </Link>
            <div className="border-l border-gray-300 mx-2"></div>
            <button 
              onClick={handleLanguageChange}
              className="text-gray-700 hover:text-blue-600"
            >
              {locale === 'es' ? 'English' : 'Español'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
