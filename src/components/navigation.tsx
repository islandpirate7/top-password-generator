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
    const newLocale = locale === 'es' ? 'en' : 'es'
    let newPath = pathname
    
    if (locale === 'es') {
      // Remove /es from the beginning of the path
      newPath = pathname.replace(/^\/es/, '')
      if (newPath === '') newPath = '/'
    } else {
      // Add /es to the beginning of the path
      newPath = `/es${pathname === '/' ? '' : pathname}`
    }
    
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
              <div className="w-8 h-8 mr-2 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M50,0 L100,50 L50,100 L0,50 Z" fill="#3B82F6" />
                  <circle cx="50" cy="50" r="25" fill="white" />
                  <circle cx="50" cy="50" r="15" fill="#3B82F6" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-800">Top Password Generator</span>
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
