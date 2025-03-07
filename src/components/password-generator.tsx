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

type PasswordType = 'random' | 'memorable' | 'pin'

export function PasswordGenerator() {
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
      newPassword = generateMemorablePassword(length, options)
    } else if (passwordType === 'pin') {
      newPassword = generatePin(length)
    }

    setPassword(newPassword)
  }

  const copyToClipboard = () => {
    if (!password) return

    navigator.clipboard.writeText(password)
    setCopied(true)
    toast({
      title: 'Copied to clipboard',
      description: 'Password has been copied to your clipboard',
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
        newPassword = generateMemorablePassword(length, options)
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col items-center mb-8 w-full">
        <div className="w-32 h-32 sm:w-40 sm:h-40 relative mb-2">
          <div className="w-full h-full flex items-center justify-center">
            {/* Colorful lock icon matching the shared image */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
              {/* Lock body */}
              <div className="absolute bottom-0 w-full h-3/5 rounded-md overflow-hidden">
                {/* Left side - teal gradient */}
                <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-br from-teal-400 to-blue-600"></div>
                {/* Right side - purple/red gradient */}
                <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-red-500 to-purple-600"></div>
                {/* Keyhole */}
                <div className="absolute left-1/2 top-1/2 w-1/4 h-1/4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                {/* Keyhole slot */}
                <div className="absolute left-1/2 bottom-1/4 w-[2px] h-1/5 bg-white transform -translate-x-1/2"></div>
              </div>
              {/* Lock arc */}
              <div className="absolute top-0 left-0 w-full h-3/5 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full rounded-t-full overflow-hidden">
                  {/* Left side - teal gradient */}
                  <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-teal-400 to-blue-500"></div>
                  {/* Right side - orange/red gradient */}
                  <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-red-500 to-orange-400"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-montserrat text-center dark:text-black">Top Password Generator</h1>
      </div>
      
      <Tabs defaultValue="random" onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8 bg-gray-100 shadow-sm">
          <TabsTrigger value="random" className="data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm">Random</TabsTrigger>
          <TabsTrigger value="memorable" className="data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm">Memorable</TabsTrigger>
          <TabsTrigger value="mnemonic" className="data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm">Mnemonic</TabsTrigger>
          <TabsTrigger value="pattern" className="data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm">Pattern</TabsTrigger>
          <TabsTrigger value="pin" className="data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm">PIN</TabsTrigger>
          <TabsTrigger value="qrcode" className="data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm">QR Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="random" className="w-full flex justify-center">
          <Card className="w-full">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-primary">Random Password</CardTitle>
              <CardDescription>
                Generate a secure random password with custom options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password-length">Password Length</Label>
                  <span className="text-sm text-gray-500">{length} characters</span>
                </div>
                <Slider
                  id="password-length"
                  min={4}
                  max={64}
                  step={1}
                  value={[length]}
                  onValueChange={(value) => setLength(value[0])}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="uppercase"
                    checked={options.uppercase}
                    onCheckedChange={(checked) =>
                      setOptions((prev) => ({ ...prev, uppercase: checked }))
                    }
                  />
                  <Label htmlFor="uppercase">Include Uppercase</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="lowercase"
                    checked={options.lowercase}
                    onCheckedChange={(checked) =>
                      setOptions((prev) => ({ ...prev, lowercase: checked }))
                    }
                  />
                  <Label htmlFor="lowercase">Include Lowercase</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="numbers"
                    checked={options.numbers}
                    onCheckedChange={(checked) =>
                      setOptions((prev) => ({ ...prev, numbers: checked }))
                    }
                  />
                  <Label htmlFor="numbers">Include Numbers</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="symbols"
                    checked={options.symbols}
                    onCheckedChange={(checked) =>
                      setOptions((prev) => ({ ...prev, symbols: checked }))
                    }
                  />
                  <Label htmlFor="symbols">Include Symbols</Label>
                </div>
              </div>
              
              <Button onClick={handleGenerate} className="w-full bg-primary hover:bg-primary/90">
                Generate Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="memorable" className="w-full flex justify-center">
          <Card className="w-full">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-primary">Memorable Password</CardTitle>
              <CardDescription>
                Generate an easy-to-remember password using common words
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="memorable-length">Number of Words</Label>
                  <span className="text-sm text-gray-500">{length} words</span>
                </div>
                <Slider
                  id="memorable-length"
                  min={2}
                  max={8}
                  step={1}
                  value={[length]}
                  onValueChange={(value) => setLength(value[0])}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="memorable-uppercase"
                    checked={options.uppercase}
                    onCheckedChange={(checked) =>
                      setOptions((prev) => ({ ...prev, uppercase: checked }))
                    }
                  />
                  <Label htmlFor="memorable-uppercase">Include Uppercase</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="memorable-lowercase"
                    checked={options.lowercase}
                    onCheckedChange={(checked) =>
                      setOptions((prev) => ({ ...prev, lowercase: checked }))
                    }
                  />
                  <Label htmlFor="memorable-lowercase">Include Lowercase</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="memorable-numbers"
                    checked={options.numbers}
                    onCheckedChange={(checked) =>
                      setOptions((prev) => ({ ...prev, numbers: checked }))
                    }
                  />
                  <Label htmlFor="memorable-numbers">Include Numbers</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="memorable-symbols"
                    checked={options.symbols}
                    onCheckedChange={(checked) =>
                      setOptions((prev) => ({ ...prev, symbols: checked }))
                    }
                  />
                  <Label htmlFor="memorable-symbols">Include Symbols</Label>
                </div>
              </div>
              
              <Button onClick={handleGenerate} className="w-full bg-primary hover:bg-primary/90">
                Generate Memorable Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pin" className="w-full flex justify-center">
          <Card className="w-full">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-primary">PIN Generator</CardTitle>
              <CardDescription>
                Generate a numeric PIN code for use with devices and accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="pin-length">PIN Length</Label>
                  <span className="text-sm text-gray-500">{length} digits</span>
                </div>
                <Slider
                  id="pin-length"
                  min={4}
                  max={12}
                  step={1}
                  value={[length]}
                  onValueChange={(value) => setLength(value[0])}
                />
              </div>
              
              <Button onClick={handleGenerate} className="w-full bg-primary hover:bg-primary/90">
                Generate PIN
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mnemonic" className="w-full flex justify-center">
          <MnemonicSection onPasswordGenerated={setPassword} />
        </TabsContent>
        
        <TabsContent value="pattern" className="w-full flex justify-center">
          <PatternSection onPasswordGenerated={setPassword} />
        </TabsContent>
        
        <TabsContent value="qrcode" className="w-full flex justify-center">
          <QRCodeSection password={password} />
        </TabsContent>
      </Tabs>
      
      {password && (activeTab === 'random' || activeTab === 'memorable' || activeTab === 'pin') && (
        <div className="mt-8">
          <Card className="w-full">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-primary">Generated Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Input
                  value={password}
                  readOnly
                  className="pr-10 font-mono text-lg text-black dark:text-white"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              
              {passwordStrength && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Strength: {passwordStrength.strength}</span>
                    <span className="text-sm text-gray-500">{passwordStrength.feedback}</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        passwordStrength.strength === 'weak'
                          ? 'bg-red-500'
                          : passwordStrength.strength === 'medium'
                          ? 'bg-accent'
                          : passwordStrength.strength === 'strong'
                          ? 'bg-primary'
                          : 'bg-secondary'
                      }`}
                      style={{
                        width: `${(passwordStrength.score / 6) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button
                  variant="outline"
                  className="flex-1 text-primary border-primary hover:bg-primary/10"
                  onClick={handleGenerate}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
                
                <Button
                  variant="outline"
                  className="flex-1 text-primary border-primary hover:bg-primary/10"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              </div>
              
              <div className="pt-2">
                <Button
                  variant="secondary"
                  className="w-full bg-secondary hover:bg-secondary/90"
                  onClick={checkBreach}
                  disabled={isCheckingBreach || !password}
                >
                  {isCheckingBreach ? 'Checking...' : 'Check if Password is Breached'}
                </Button>
                
                {breachResult && (
                  <div className={`mt-2 p-3 rounded-md ${breachResult.breached ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {breachResult.message}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <InContentAd className="mt-8" />
    </div>
  )
}
