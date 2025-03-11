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
    if (locale === 'es') {
      // From Spanish to English
      const newPath = pathname.replace(/^\/es/, '')
      router.push(newPath || '/')
    } else {
      // From English to Spanish
      const newPath = `/es${pathname === '/' ? '' : pathname}`
      router.push(newPath)
    }
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
              <div className="w-10 h-10 relative">
                <Image 
                  src="/logo.png" 
                  alt="Password Generator Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain"
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
