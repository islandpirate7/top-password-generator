import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { generateRandomMnemonicPassword, generateMnemonicForPassword, generatePasswordFromMnemonic } from '@/lib/mnemonic-generator';
import { evaluatePasswordStrength } from '@/lib/utils';
import { CopyIcon, RefreshCw } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

interface MnemonicSectionProps {
  onPasswordGenerated: (password: string) => void;
}

export function MnemonicSection({ onPasswordGenerated }: MnemonicSectionProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [length, setLength] = useState(8);
  const [options, setOptions] = useState({
    uppercase: false,
    includeNumbers: false,
    includeSymbols: false,
  });
  
  const [password, setPassword] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  
  // Generate a random mnemonic password
  const generateMnemonic = () => {
    const result = generateRandomMnemonicPassword({
      wordCount: length,
      uppercase: options.uppercase,
      includeNumbers: options.includeNumbers,
      includeSymbols: options.includeSymbols,
      locale: locale
    });
    setPassword(result.password);
    setMnemonic(result.mnemonic);
    onPasswordGenerated(result.password);
  };
  
  // Copy password to clipboard
  const copyPassword = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  
  // Get password strength
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return null;
    return evaluatePasswordStrength(pwd);
  };
  
  // Generate a mnemonic for an existing password
  const generateMnemonicFromPassword = (pwd: string) => {
    if (!pwd) return;
    const mnemonicText = generateMnemonicForPassword(pwd, locale);
    setMnemonic(mnemonicText);
  };
  
  // Generate a password from a mnemonic phrase
  const extractPasswordFromMnemonic = (phrase: string) => {
    if (!phrase) return;
    const extractedPassword = generatePasswordFromMnemonic(phrase, {
      uppercase: options.uppercase,
      includeNumbers: options.includeNumbers,
      includeSymbols: options.includeSymbols
    });
    setPassword(extractedPassword);
    onPasswordGenerated(extractedPassword);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('mnemonicTitle')}</CardTitle>
        <CardDescription>{t('mnemonicDescription')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>{t('wordCount')}</Label>
          <Slider 
            value={[length]} 
            min={3} 
            max={12} 
            step={1} 
            onValueChange={(value) => setLength(value[0])} 
          />
          <div className="text-xs text-muted-foreground text-right">{length} {t('words')}</div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="uppercase">{t('uppercase')}</Label>
            <Switch 
              id="uppercase" 
              checked={options.uppercase} 
              onCheckedChange={(checked) => setOptions({...options, uppercase: checked})} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="includeNumbers">{t('includeNumbers')}</Label>
            <Switch 
              id="includeNumbers" 
              checked={options.includeNumbers} 
              onCheckedChange={(checked) => setOptions({...options, includeNumbers: checked})} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="includeSymbols">{t('includeSymbols')}</Label>
            <Switch 
              id="includeSymbols" 
              checked={options.includeSymbols} 
              onCheckedChange={(checked) => setOptions({...options, includeSymbols: checked})} 
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">{t('password')}</Label>
          <div className="flex space-x-2">
            <Input 
              id="password" 
              value={password} 
              onChange={(e) => {
                setPassword(e.target.value);
                onPasswordGenerated(e.target.value);
              }}
              placeholder={t('enterOrGeneratePassword')}
            />
            <Button variant="outline" size="icon" onClick={() => copyPassword(password)}>
              <CopyIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => generateMnemonicFromPassword(password)}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="mnemonic">{t('mnemonicPhrase')}</Label>
          <div className="flex space-x-2">
            <Textarea 
              id="mnemonic" 
              value={mnemonic} 
              onChange={(e) => setMnemonic(e.target.value)}
              placeholder={t('enterOrGenerateMnemonic')}
              className="min-h-[80px]"
            />
            <div className="flex flex-col space-y-2">
              <Button variant="outline" size="icon" onClick={() => copyPassword(mnemonic)}>
                <CopyIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => extractPasswordFromMnemonic(mnemonic)}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={generateMnemonic} className="w-full">
          {t('generateMnemonic')}
        </Button>
      </CardFooter>
    </Card>
  );
}
