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
        <CardDescription>
          Create memorable passwords with mnemonic sentences to help you remember them
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
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
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <div className="switch-container">
              <Switch
                id="mnemonic-uppercase"
                checked={options.uppercase}
                onCheckedChange={(checked) => setOptions({ ...options, uppercase: checked })}
              />
              <Label htmlFor="mnemonic-uppercase">Include Uppercase</Label>
            </div>
            
            <div className="switch-container">
              <Switch
                id="mnemonic-numbers"
                checked={options.includeNumbers}
                onCheckedChange={(checked) => setOptions({ ...options, includeNumbers: checked })}
              />
              <Label htmlFor="mnemonic-numbers">Include Numbers</Label>
            </div>
            
            <div className="switch-container">
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
            className="w-full bg-primary hover:bg-primary/90 text-center"
          >
            Generate Mnemonic Password
          </Button>
          
          {password && (
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="generated-mnemonic">Generated Password</Label>
                <div className="password-display-container">
                  <div className="password-text">
                    <div className="flex items-center p-2 border rounded-md bg-gray-50">
                      <code id="generated-mnemonic" className="text-sm font-mono break-all">{password}</code>
                    </div>
                  </div>
                  <div className="copy-button">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(password);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
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
              
              <div>
                <Label htmlFor="mnemonic-sentence">Mnemonic Sentence</Label>
                <Textarea
                  id="mnemonic-sentence"
                  value={mnemonic}
                  readOnly
                  className="min-h-[80px] font-medium"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Use this sentence to help you remember your password
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  onClick={generateMnemonicPassword} 
                  className="flex-1"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => copyPassword(mnemonic)}
                >
                  <CopyIcon className="h-4 w-4 mr-2" />
                  Copy Mnemonic
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="text-sm text-gray-500 flex flex-col items-start">
        <p>
          Mnemonic passwords help you remember complex passwords by associating them with a memorable sentence.
        </p>
        <p className="mt-2">
          Example: "The Quick Brown Fox Jumps Over The Lazy Dog" → "TQBFJOtLD"
        </p>
      </CardFooter>
    </Card>
  );
}
