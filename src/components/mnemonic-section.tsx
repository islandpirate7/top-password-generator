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

interface MnemonicSectionProps {
  onPasswordGenerated: (password: string) => void;
}

export function MnemonicSection({ onPasswordGenerated }: MnemonicSectionProps) {
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
    const result = generateRandomMnemonicPassword(length, options);
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
  
  const strength = getPasswordStrength(password);
  
  return (
    <Card className="w-full">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-primary">Mnemonic Password Generator</CardTitle>
        <CardDescription>
          Create memorable passwords with mnemonic sentences to help you remember them
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password-length">Password Length</Label>
              <span className="text-sm text-gray-500">{length} characters</span>
            </div>
            <Slider
              id="password-length"
              min={4}
              max={16}
              step={1}
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="uppercase"
                checked={options.uppercase}
                onCheckedChange={(checked) => setOptions({ ...options, uppercase: checked })}
              />
              <Label htmlFor="uppercase">Uppercase</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="include-numbers"
                checked={options.includeNumbers}
                onCheckedChange={(checked) => setOptions({ ...options, includeNumbers: checked })}
              />
              <Label htmlFor="include-numbers">Include Numbers</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="include-symbols"
                checked={options.includeSymbols}
                onCheckedChange={(checked) => setOptions({ ...options, includeSymbols: checked })}
              />
              <Label htmlFor="include-symbols">Include Symbols</Label>
            </div>
          </div>
          
          <Button 
            onClick={generateMnemonic} 
            className="w-full bg-primary hover:bg-primary/90"
          >
            Generate Mnemonic Password
          </Button>
          
          {password && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="generated-password">Generated Password</Label>
                <div className="relative">
                  <Input
                    id="generated-password"
                    value={password}
                    readOnly
                    className="pr-10 font-mono"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => copyPassword(password)}
                  >
                    <CopyIcon className="h-4 w-4" />
                  </Button>
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
                  onClick={generateMnemonic} 
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
