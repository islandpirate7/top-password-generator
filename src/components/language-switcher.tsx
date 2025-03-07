'use client'

import { useState } from 'react'
import { Button } from './ui/button'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' }
]

export function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState('en')

  const switchLanguage = (locale: string) => {
    setCurrentLanguage(locale)
    // In a real app, we would change the language here
    // For now, we'll just update the state
    console.log(`Language switched to ${locale}`)
  }

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={currentLanguage === lang.code ? "default" : "outline"}
          size="sm"
          onClick={() => switchLanguage(lang.code)}
        >
          {lang.name}
        </Button>
      ))}
    </div>
  )
}
