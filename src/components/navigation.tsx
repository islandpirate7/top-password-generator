"use client"

import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const t = useTranslations('Navigation')
  const pathname = usePathname()
  
  // Determine the current locale from the pathname
  const locale = pathname.startsWith('/es') ? 'es' : 'en'
  
  // Create localized paths
  const homePath = locale === 'es' ? '/es' : '/'
  const tipsPath = locale === 'es' ? '/es/password-tips' : '/password-tips'
  
  // Hardcoded translations as fallback
  const title = locale === 'es' ? 'Generador de Contraseñas' : 'Password Generator'
  const generator = locale === 'es' ? 'Generador' : 'Generator'
  const tips = locale === 'es' ? 'Consejos de Contraseñas' : 'Password Tips'
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div>
            <Link 
              href={homePath}
              className="text-xl font-bold text-blue-600 hover:text-blue-800"
            >
              {title}
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link 
              href={homePath}
              className={`text-gray-700 hover:text-blue-600 ${pathname === '/' || pathname === '/es' ? 'font-medium text-blue-600' : ''}`}
            >
              {generator}
            </Link>
            <Link 
              href={tipsPath}
              className={`text-gray-700 hover:text-blue-600 ${pathname.includes('/password-tips') ? 'font-medium text-blue-600' : ''}`}
            >
              {tips}
            </Link>
            <div className="border-l border-gray-300 mx-2"></div>
            <Link 
              href={locale === 'es' ? pathname.replace('/es', '') : `/es${pathname}`}
              className="text-gray-700 hover:text-blue-600"
            >
              {locale === 'es' ? 'English' : 'Español'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
