'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { GlobeIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function LanguageSwitcher() {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()

  const languages = [
    { code: 'en', name: t('english') },
    { code: 'es', name: t('spanish') },
  ]

  const switchLanguage = (newLocale: string) => {
    const path = window.location.pathname
    const segments = path.split('/')
    
    // Handle the case where we're at the root or the locale is already in the path
    if (segments.length > 1 && (segments[1] === 'en' || segments[1] === 'es')) {
      segments[1] = newLocale
    } else {
      segments.splice(1, 0, newLocale)
    }
    
    const newPath = segments.join('/')
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <GlobeIcon className="h-4 w-4" />
          {t('languageSwitcher')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={locale === lang.code ? 'bg-muted' : ''}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
