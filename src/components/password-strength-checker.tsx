import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, XCircle } from 'lucide-react'

export function PasswordStrengthChecker() {
  const t = useTranslations('PasswordStrengthChecker')
  const [password, setPassword] = useState('')
  
  // Calculate password strength
  const calculateStrength = (pwd: string): number => {
    if (!pwd) return 0
    
    let score = 0
    
    // Length check
    if (pwd.length >= 8) score += 20
    if (pwd.length >= 12) score += 10
    
    // Character variety checks
    if (/[A-Z]/.test(pwd)) score += 15 // uppercase
    if (/[a-z]/.test(pwd)) score += 15 // lowercase
    if (/[0-9]/.test(pwd)) score += 15 // numbers
    if (/[^A-Za-z0-9]/.test(pwd)) score += 15 // special chars
    
    // Complexity bonus
    if (score >= 60 && pwd.length >= 10) score += 10
    
    return Math.min(score, 100)
  }
  
  const strength = calculateStrength(password)
  
  // Get strength label
  const getStrengthLabel = (score: number): string => {
    if (score < 30) return t('veryWeak')
    if (score < 50) return t('weak')
    if (score < 70) return t('moderate')
    if (score < 90) return t('strong')
    return t('veryStrong')
  }
  
  // Get strength color
  const getStrengthColor = (score: number): string => {
    if (score < 30) return 'bg-red-500'
    if (score < 50) return 'bg-orange-500'
    if (score < 70) return 'bg-yellow-500'
    if (score < 90) return 'bg-green-500'
    return 'bg-emerald-500'
  }
  
  // Password requirements
  const requirements = [
    { id: 'length', label: t('atLeast8Chars'), met: password.length >= 8 },
    { id: 'uppercase', label: t('uppercase'), met: /[A-Z]/.test(password) },
    { id: 'lowercase', label: t('lowercase'), met: /[a-z]/.test(password) },
    { id: 'number', label: t('number'), met: /[0-9]/.test(password) },
    { id: 'special', label: t('specialChar'), met: /[^A-Za-z0-9]/.test(password) },
  ]
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder={t('enterPassword')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{t('strength')}: {getStrengthLabel(strength)}</span>
                <span>{strength}%</span>
              </div>
              <Progress value={strength} className={`h-2 ${getStrengthColor(strength)}`} />
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">{t('requirements')}</h4>
            <ul className="space-y-1">
              {requirements.map((req) => (
                <li key={req.id} className="flex items-center text-sm">
                  {req.met ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <span className={req.met ? 'text-green-700' : 'text-red-700'}>
                    {req.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          {strength >= 70 && (
            <div className="text-sm text-green-600 font-medium">
              {t('goodPassword')}
            </div>
          )}
          
          {strength > 0 && strength < 70 && (
            <div className="text-sm text-orange-600 font-medium">
              {t('improvePassword')}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
