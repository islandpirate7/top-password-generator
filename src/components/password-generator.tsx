'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { PASSWORD_LENGTHS, PIN_LENGTHS } from '@/lib/constants'
import { generatePassword, generateMemorablePassword, generatePin, evaluatePasswordStrength, PasswordStrength } from '@/lib/utils'
import { checkPasswordBreach } from '@/lib/breach-check'
import { InContentAd, MobileBottomAd } from '@/components/ad'
import { Copy, Check, RefreshCw, Lock } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { QRCodeSection } from './qr-code-section'
import { MnemonicSection } from './mnemonic-section'
import { PatternSection } from './pattern-section'
import { useTranslations, useLocale } from 'next-intl'

type PasswordType = 'random' | 'memorable' | 'pin'

export function PasswordGenerator() {
  const t = useTranslations()
  const locale = useLocale()
  const [passwordType, setPasswordType] = useState<PasswordType>('random')
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })
  const [copied, setCopied] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    strength: PasswordStrength;
    feedback: string;
  } | null>(null)
  const [breachResult, setBreachResult] = useState<{ breached: boolean; count: number; message: string } | null>(null)
  const [isCheckingBreach, setIsCheckingBreach] = useState(false)
  const [activeTab, setActiveTab] = useState('random')
  const { toast } = useToast()

  // Clear password when changing password type
  useEffect(() => {
    setPassword('')
    setPasswordStrength(null)
    setBreachResult(null)
  }, [passwordType])

  // Generate a password on initial load
  useEffect(() => {
    generateNewPassword()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Generate a new password based on the current settings
  const generateNewPassword = () => {
    let newPassword = ''
    
    if (passwordType === 'random') {
      newPassword = generatePassword(length, options)
    } else if (passwordType === 'memorable') {
      newPassword = generateMemorablePassword(locale)
    } else if (passwordType === 'pin') {
      newPassword = generatePin(length)
    }
    
    setPassword(newPassword)
    setBreachResult(null)
    
    // Only evaluate strength for random and memorable passwords
    if (passwordType !== 'pin') {
      const strength = evaluatePasswordStrength(newPassword)
      setPasswordStrength(strength)
    } else {
      setPasswordStrength(null)
    }
  }

  // Copy the password to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      toast({
        title: t('passwordCopied'),
        description: t('passwordCopiedDesc'),
      })
      
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
      toast({
        title: t('copyFailed'),
        description: t('copyFailedDesc'),
        variant: 'destructive',
      })
    }
  }

  // Handle option changes for random passwords
  const handleOptionChange = (option: keyof typeof options) => {
    // Prevent disabling all options
    const newOptions = { ...options, [option]: !options[option] }
    if (!newOptions.uppercase && !newOptions.lowercase && !newOptions.numbers && !newOptions.symbols) {
      toast({
        title: t('invalidOptions'),
        description: t('invalidOptionsDesc'),
        variant: 'destructive',
      })
      return
    }
    
    setOptions(newOptions)
  }

  // Handle length changes for random passwords and PINs
  const handleLengthChange = (newLength: number[]) => {
    setLength(newLength[0])
  }

  // Check if the password has been breached
  const checkBreach = async () => {
    if (!password) return
    
    setIsCheckingBreach(true)
    try {
      const result = await checkPasswordBreach(password)
      setBreachResult(result)
    } catch (error) {
      console.error('Error checking breach:', error)
      toast({
        title: t('breachCheckError'),
        description: t('breachCheckErrorDesc'),
        variant: 'destructive',
      })
    } finally {
      setIsCheckingBreach(false)
    }
  }

  return (
    <div className="password-generator-container">
      <Tabs defaultValue="random" value={activeTab} onValueChange={(value) => {
        setActiveTab(value)
        setPasswordType(value as PasswordType)
      }}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="random">{t('randomPassword')}</TabsTrigger>
          <TabsTrigger value="memorable">{t('memorablePassword')}</TabsTrigger>
          <TabsTrigger value="pin">{t('pinCode')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="random">
          <Card>
            <CardHeader>
              <CardTitle>{t('generateRandomPassword')}</CardTitle>
              <CardDescription>{t('randomPasswordDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>{t('length')}: {length}</Label>
                  <span className="text-sm text-muted-foreground">{length} {t('characters')}</span>
                </div>
                <Slider
                  value={[length]}
                  min={PASSWORD_LENGTHS.min}
                  max={PASSWORD_LENGTHS.max}
                  step={1}
                  onValueChange={handleLengthChange}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="uppercase"
                    checked={options.uppercase}
                    onCheckedChange={() => handleOptionChange('uppercase')}
                  />
                  <Label htmlFor="uppercase">{t('uppercase')}</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="lowercase"
                    checked={options.lowercase}
                    onCheckedChange={() => handleOptionChange('lowercase')}
                  />
                  <Label htmlFor="lowercase">{t('lowercase')}</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="numbers"
                    checked={options.numbers}
                    onCheckedChange={() => handleOptionChange('numbers')}
                  />
                  <Label htmlFor="numbers">{t('numbers')}</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="symbols"
                    checked={options.symbols}
                    onCheckedChange={() => handleOptionChange('symbols')}
                  />
                  <Label htmlFor="symbols">{t('symbols')}</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="memorable">
          <Card>
            <CardHeader>
              <CardTitle>{t('generateMemorablePassword')}</CardTitle>
              <CardDescription>{t('memorablePasswordDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <MnemonicSection locale={locale} onPasswordGenerated={setPassword} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pin">
          <Card>
            <CardHeader>
              <CardTitle>{t('generatePin')}</CardTitle>
              <CardDescription>{t('pinDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>{t('length')}: {length}</Label>
                  <span className="text-sm text-muted-foreground">{length} {t('digits')}</span>
                </div>
                <Slider
                  value={[length]}
                  min={PIN_LENGTHS.min}
                  max={PIN_LENGTHS.max}
                  step={1}
                  onValueChange={handleLengthChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Input
                type="text"
                value={password}
                readOnly
                className="pr-10 font-mono"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={copyToClipboard}
                title={t('copyToClipboard')}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={generateNewPassword}
              title={t('generateNew')}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          
          {passwordStrength && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t('passwordStrength')}: {t(passwordStrength.strength)}</span>
                <span>{passwordStrength.score}/4</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full ${getStrengthColorClass(passwordStrength.score)}`}
                  style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                />
              </div>
              {passwordStrength.feedback && (
                <p className="text-sm text-muted-foreground">{passwordStrength.feedback}</p>
              )}
            </div>
          )}
          
          <div className="flex flex-col space-y-4">
            <QRCodeSection password={password} />
            <PatternSection password={password} />
            
            <Button
              className="w-full bg-secondary hover:bg-secondary/90 breach-check-button text-white"
              onClick={checkBreach}
              disabled={isCheckingBreach || !password}
            >
              {isCheckingBreach ? 'Checking...' : t('checkBreach')}
            </Button>
            
            {breachResult && (
              <div className={`mt-2 p-3 rounded-md ${breachResult.breached ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                {breachResult.message}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <InContentAd />
      <MobileBottomAd />
    </div>
  )
}

function getStrengthColorClass(score: number) {
  if (score < 2) {
    return 'bg-red-500';
  } else if (score < 4) {
    return 'bg-accent';
  } else {
    return 'bg-primary';
  }
}
