'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { PASSWORD_LENGTHS, PIN_LENGTHS } from '@/lib/constants'
import { generatePassword, generateMemorablePassword, generatePin, evaluatePasswordStrength, PasswordStrength } from '@/lib/utils'
import { checkPasswordBreach } from '@/lib/breach-check'
import { InContentAd } from '@/components/ad'
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
    
    // Reset length based on password type
    if (passwordType === 'random') {
      setLength(12)
      setOptions({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
      })
    } else if (passwordType === 'memorable') {
      setLength(3)
      setOptions({
        uppercase: false,
        lowercase: true,
        numbers: false,
        symbols: false,
      })
    } else if (passwordType === 'pin') {
      setLength(6)
    }
  }, [passwordType])

  // Evaluate password strength whenever password changes
  useEffect(() => {
    if (password) {
      setPasswordStrength(evaluatePasswordStrength(password))
    } else {
      setPasswordStrength(null)
    }
  }, [password])

  const generateNewPassword = () => {
    let newPassword = ''

    if (passwordType === 'random') {
      newPassword = generatePassword(length, options)
    } else if (passwordType === 'memorable') {
      newPassword = generateMemorablePassword(length, options, locale)
    } else if (passwordType === 'pin') {
      newPassword = generatePin(length)
    }

    setPassword(newPassword)
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    
    toast({
      title: t('copied'),
      description: t('copiedDescription'),
    })

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const handleGenerate = () => {
    let newPassword = ''

    switch (activeTab) {
      case 'random':
        newPassword = generatePassword(length, options)
        break
      case 'memorable':
        newPassword = generateMemorablePassword(length, options, locale)
        break
      case 'pin':
        newPassword = generatePin(length)
        break
    }

    setPassword(newPassword)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setPassword('')
    setBreachResult(null)

    // Set default options based on tab
    if (value === 'random') {
      setLength(12)
      setOptions({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
      })
    } else if (value === 'memorable') {
      setLength(3)
      setOptions({
        uppercase: false,
        lowercase: true,
        numbers: false,
        symbols: false,
      })
    } else if (value === 'pin') {
      setLength(6)
    }
  }

  const checkBreach = async () => {
    if (!password) return;
    
    setIsCheckingBreach(true);
    setBreachResult(null);
    
    try {
      const result = await checkPasswordBreach(password);
      setBreachResult(result);
    } catch (error) {
      console.error('Error checking breach:', error);
      setBreachResult({
        breached: false,
        count: 0,
        message: 'Error checking breach status. Please try again later.'
      });
    } finally {
      setIsCheckingBreach(false);
    }
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8 w-full header-container">
        <div className="w-32 h-32 sm:w-40 sm:h-40 relative mb-2 header-icon mx-auto">
          <div className="w-full h-full flex items-center justify-center">
            {/* Colorful lock icon matching the shared image */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
              {/* Lock body */}
              <div className="absolute inset-0 rounded-t-full overflow-hidden">
                <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-cyan-400 to-blue-500"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-r from-fuchsia-500 to-pink-500"></div>
              </div>
              
              {/* Lock base */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-r from-orange-500 to-red-500"></div>
              </div>
              
              {/* Lock hole */}
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-1/4 h-1/4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-montserrat text-black dark:text-white text-center">{t('appTitle')}</h1>
      </div>
      
      <Tabs defaultValue="random" onValueChange={handleTabChange} className="w-full">
        <div className="w-full tabs-container">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="random" className="data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm">{t('random')}</TabsTrigger>
            <TabsTrigger value="memorable" className="data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm">{t('memorable')}</TabsTrigger>
            <TabsTrigger value="mnemonic" className="data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm">{t('mnemonic')}</TabsTrigger>
          </TabsList>
          
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="pattern" className="data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm">{t('pattern')}</TabsTrigger>
            <TabsTrigger value="pin" className="data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm">{t('pin')}</TabsTrigger>
            <TabsTrigger value="qrcode" className="data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm">{t('qrcode')}</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="random" className="mt-4 w-full content-container">
          <Card className="w-full">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-primary">{t('randomPassword')}</CardTitle>
              <CardDescription className="text-left">{t('randomPasswordDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password-length">{t('passwordLength')}</Label>
                  <span className="text-sm text-gray-500">{length} {t('characters')}</span>
                </div>
                <Slider
                  id="password-length"
                  min={4}
                  max={64}
                  step={1}
                  value={[length]}
                  onValueChange={(value) => setLength(value[0])}
                  className="w-full mobile-slider-container"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="switch-container">
                  <Switch
                    id="uppercase"
                    checked={options.uppercase}
                    onCheckedChange={(checked) => setOptions({ ...options, uppercase: checked })}
                  />
                  <Label htmlFor="uppercase">{t('includeUppercase')}</Label>
                </div>
                
                <div className="switch-container">
                  <Switch
                    id="lowercase"
                    checked={options.lowercase}
                    onCheckedChange={(checked) => setOptions({ ...options, lowercase: checked })}
                  />
                  <Label htmlFor="lowercase">{t('includeLowercase')}</Label>
                </div>
                
                <div className="switch-container">
                  <Switch
                    id="numbers"
                    checked={options.numbers}
                    onCheckedChange={(checked) => setOptions({ ...options, numbers: checked })}
                  />
                  <Label htmlFor="numbers">{t('includeNumbers')}</Label>
                </div>
                
                <div className="switch-container">
                  <Switch
                    id="symbols"
                    checked={options.symbols}
                    onCheckedChange={(checked) => setOptions({ ...options, symbols: checked })}
                  />
                  <Label htmlFor="symbols">{t('includeSymbols')}</Label>
                </div>
              </div>
              
              <Button onClick={handleGenerate} className="w-full bg-primary hover:bg-primary/90">
                {t('generate')}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="memorable" className="mt-4 w-full content-container">
          <Card className="w-full">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-primary">{t('memorablePassword')}</CardTitle>
              <CardDescription className="text-left">{t('memorablePasswordDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="memorable-length">{t('numberOfWords')}</Label>
                  <span className="text-sm text-gray-500">{length} {t('words')}</span>
                </div>
                <Slider
                  id="memorable-length"
                  min={2}
                  max={8}
                  step={1}
                  value={[length]}
                  onValueChange={(value) => setLength(value[0])}
                  className="w-full mobile-slider-container"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="switch-container">
                  <Switch
                    id="memorable-uppercase"
                    checked={options.uppercase}
                    onCheckedChange={(checked) => setOptions({ ...options, uppercase: checked })}
                  />
                  <Label htmlFor="memorable-uppercase">{t('includeUppercase')}</Label>
                </div>
                
                <div className="switch-container">
                  <Switch
                    id="memorable-lowercase"
                    checked={options.lowercase}
                    onCheckedChange={(checked) => setOptions({ ...options, lowercase: checked })}
                  />
                  <Label htmlFor="memorable-lowercase">{t('includeLowercase')}</Label>
                </div>
                
                <div className="switch-container">
                  <Switch
                    id="memorable-numbers"
                    checked={options.numbers}
                    onCheckedChange={(checked) => setOptions({ ...options, numbers: checked })}
                  />
                  <Label htmlFor="memorable-numbers">{t('includeNumbers')}</Label>
                </div>
                
                <div className="switch-container">
                  <Switch
                    id="memorable-symbols"
                    checked={options.symbols}
                    onCheckedChange={(checked) => setOptions({ ...options, symbols: checked })}
                  />
                  <Label htmlFor="memorable-symbols">{t('includeSymbols')}</Label>
                </div>
              </div>
              
              <Button onClick={handleGenerate} className="w-full bg-primary hover:bg-primary/90">
                {t('generate')}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pin" className="mt-4 w-full content-container">
          <Card className="w-full">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-primary">{t('pinGenerator')}</CardTitle>
              <CardDescription className="text-left">{t('pinGeneratorDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="pin-length">{t('pinLength')}</Label>
                  <span className="text-sm text-gray-500">{length} {t('digits')}</span>
                </div>
                <Slider
                  id="pin-length"
                  min={4}
                  max={12}
                  step={1}
                  value={[length]}
                  onValueChange={(value) => setLength(value[0])}
                  className="w-full mobile-slider-container"
                />
              </div>
              
              <Button onClick={handleGenerate} className="w-full bg-primary hover:bg-primary/90">
                {t('generate')}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mnemonic" className="mt-4 w-full content-container">
          <MnemonicSection onPasswordGenerated={setPassword} />
        </TabsContent>
        
        <TabsContent value="pattern" className="mt-4 w-full content-container">
          <PatternSection onPasswordGenerated={setPassword} />
        </TabsContent>
        
        <TabsContent value="qrcode" className="mt-4 w-full content-container">
          <QRCodeSection password={password} />
        </TabsContent>
      </Tabs>
      
      {password && (
        <div className="mt-6 space-y-4">
          <div className="mb-4">
            {password && (
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-800">{t('generatedPassword')}</h3>
                {passwordStrength && (
                  <span className="text-sm text-gray-700">
                    {t('passwordStrength')}: 
                    <span className={`ml-1 font-medium ${
                      passwordStrength?.strength === 'weak' ? 'text-red-500' : 
                      passwordStrength?.strength === 'medium' ? 'text-yellow-500' : 
                      passwordStrength?.strength === 'strong' ? 'text-green-500' : 
                      'text-blue-500'
                    }`}>
                      {passwordStrength?.strength === 'weak' ? t('strengthWeak') : 
                       passwordStrength?.strength === 'medium' ? t('strengthMedium') : 
                       passwordStrength?.strength === 'strong' ? t('strengthStrong') : 
                       t('strengthVeryStrong')}
                    </span>
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="password-display-container">
            <div className="password-text">
              <code id="generated-password" className="text-sm font-mono break-all block p-2 border rounded-md bg-white text-gray-800 border-gray-300">{password}</code>
            </div>
            <div className="copy-button">
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopyToClipboard}
                className="border-gray-300 text-gray-700 hover:text-gray-900"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    {t('copied')}
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    {t('copy')}
                  </>
                )}
              </Button>
            </div>
          </div>
          {passwordStrength && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{t('passwordStrength')}: {passwordStrength.strength}</div>
                  <div className="text-sm text-gray-500">{passwordStrength.feedback}</div>
                </div>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getStrengthColorClass(passwordStrength.score)}`}
                  style={{ width: `${passwordStrength.score * 25}%` }}
                ></div>
              </div>
            </div>
          )}
          <div className="button-container">
            <Button
              variant="outline"
              onClick={generateNewPassword}
              className="border-gray-600 text-gray-900 hover:text-gray-900"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('regenerate')}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleCopyToClipboard}
              className="border-gray-600 text-gray-900 hover:text-gray-900"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  {t('copied')}
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  {t('copy')}
                </>
              )}
            </Button>
          </div>
          <div className="pt-2">
            <Button
              variant="secondary"
              className="w-full bg-secondary hover:bg-secondary/90"
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
      )}
      
      <InContentAd />
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
