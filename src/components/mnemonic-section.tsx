import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { NativeSlider } from './ui/slider';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { generateRandomMnemonicPassword, generateMnemonicForPassword, generatePasswordFromMnemonic } from '@/lib/mnemonic-generator';
import { evaluatePasswordStrength } from '@/lib/utils';
import { CopyIcon, RefreshCw, Check } from 'lucide-react';

interface MnemonicSectionProps {
  onPasswordGenerated: (password: string) => void;
}

export function MnemonicSection({ onPasswordGenerated }: MnemonicSectionProps) {
  const [length, setLength] = useState(8);
  const [options, setOptions] = useState({
    uppercase: false,
    includeNumbers: false,
    includeSymbols: false,
    wordCount: 4,
  });
  
  const [password, setPassword] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Generate a random mnemonic password
  const generateMnemonicPassword = () => {
    const newPassword = generateRandomMnemonicPassword({
      wordCount: options.wordCount,
      uppercase: options.uppercase,
      includeNumbers: options.includeNumbers,
      includeSymbols: options.includeSymbols
    });
    setPassword(newPassword.password);
    setMnemonic(newPassword.mnemonic);
    onPasswordGenerated(newPassword.password);
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
  
  const strength = getPasswordStrength(password);
  
  return (
    <Card className="w-full">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-primary">Mnemonic Password Generator</CardTitle>
        <CardDescription className="text-left">
          Create memorable passwords with mnemonic sentences to help you remember them
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-4 w-full">
        <div className="space-y-4 w-full">
          <div className="space-y-2 w-full">
            <div className="flex justify-between w-full">
              <Label htmlFor="mnemonic-length">Number of Words</Label>
              <span className="text-sm text-gray-500">{options.wordCount} words</span>
            </div>
            <NativeSlider
              id="mnemonic-length"
              min={3}
              max={10}
              step={1}
              value={options.wordCount}
              onChange={(e) => setOptions({ ...options, wordCount: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <div className="switch-container w-full">
              <Switch
                id="mnemonic-uppercase"
                checked={options.uppercase}
                onCheckedChange={(checked) => setOptions({ ...options, uppercase: checked })}
              />
              <Label htmlFor="mnemonic-uppercase">Include Uppercase</Label>
            </div>
            
            <div className="switch-container w-full">
              <Switch
                id="mnemonic-numbers"
                checked={options.includeNumbers}
                onCheckedChange={(checked) => setOptions({ ...options, includeNumbers: checked })}
              />
              <Label htmlFor="mnemonic-numbers">Include Numbers</Label>
            </div>
            
            <div className="switch-container w-full">
              <Switch
                id="mnemonic-symbols"
                checked={options.includeSymbols}
                onCheckedChange={(checked) => setOptions({ ...options, includeSymbols: checked })}
              />
              <Label htmlFor="mnemonic-symbols">Include Symbols</Label>
            </div>
          </div>
          
          <Button 
            onClick={generateMnemonicPassword} 
            className="w-full bg-primary hover:bg-primary/90"
          >
            Generate Mnemonic Password
          </Button>
        </div>
        
        {password && (
          <div className="space-y-4 w-full">
            <div className="space-y-2 w-full">
              <Label htmlFor="mnemonic-password">Generated Password</Label>
              <div className="password-display-container w-full">
                <div className="password-text w-full">
                  <code id="mnemonic-password" className="text-sm font-mono break-all block p-2 border rounded-md bg-gray-50 w-full">
                    {password}
                  </code>
                </div>
                <div className="copy-button w-full">
                  <Button
                    variant="outline"
                    onClick={() => {
                      copyPassword(password);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="w-full"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <CopyIcon className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            {strength && (
              <div className="space-y-2 w-full">
                <div className="flex justify-between w-full">
                  <Label>Password Strength</Label>
                  <span className="text-sm font-medium">{strength.strength}</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      strength.score < 2
                        ? 'bg-red-500'
                        : strength.score < 3
                        ? 'bg-orange-500'
                        : strength.score < 4
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${(strength.score / 4) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500">{strength.feedback}</p>
              </div>
            )}
            
            <div className="space-y-2 w-full">
              <Label htmlFor="mnemonic-sentence">Mnemonic Sentence</Label>
              <Textarea
                id="mnemonic-sentence"
                value={mnemonic}
                readOnly
                className="min-h-[80px] w-full"
              />
              <p className="text-sm text-gray-500">
                Remember this sentence to recall your password. The first letter of each word forms your password.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
