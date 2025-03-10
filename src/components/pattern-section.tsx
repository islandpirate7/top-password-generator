import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  PatternElement, 
  PatternTemplate, 
  generatePasswordFromPattern,
  commonPatterns,
  loadCustomPatterns,
  addCustomPattern,
  deleteCustomPattern,
  getAllPatterns
} from '@/lib/pattern-generator';
import { evaluatePasswordStrength } from '@/lib/utils';
import { CopyIcon, PlusIcon, Trash2Icon, RefreshCw } from 'lucide-react';

interface PatternSectionProps {
  onPasswordGenerated: (password: string) => void;
}

export function PatternSection({ onPasswordGenerated }: PatternSectionProps) {
  const [patterns, setPatterns] = useState<PatternTemplate[]>([]);
  const [selectedPatternId, setSelectedPatternId] = useState<string>('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('manage');
  const [copied, setCopied] = useState(false);
  
  // New pattern form
  const [newPatternName, setNewPatternName] = useState('');
  const [newPatternElements, setNewPatternElements] = useState<PatternElement[]>([]);
  
  // Load patterns on mount
  useEffect(() => {
    const allPatterns = getAllPatterns();
    setPatterns(allPatterns);
    
    if (allPatterns.length > 0) {
      setSelectedPatternId(allPatterns[0].id);
    }
  }, []);
  
  // Clear password when component mounts
  useEffect(() => {
    setPassword('');
    setActiveTab('manage');
  }, []);
  
  // Get the selected pattern
  const selectedPattern = patterns.find(p => p.id === selectedPatternId);
  
  // Generate a password based on the selected pattern
  const generatePassword = () => {
    if (!selectedPattern) return;
    
    const newPassword = generatePasswordFromPattern(selectedPattern.pattern);
    setPassword(newPassword);
    onPasswordGenerated(newPassword);
  };
  
  // Add a new pattern element
  const addPatternElement = (element: PatternElement) => {
    setNewPatternElements([...newPatternElements, element]);
  };
  
  // Remove the last pattern element
  const removeLastPatternElement = () => {
    if (newPatternElements.length === 0) return;
    setNewPatternElements(newPatternElements.slice(0, -1));
  };
  
  // Save a new pattern
  const saveNewPattern = () => {
    if (!newPatternName || newPatternElements.length === 0) return;
    
    const newPattern = addCustomPattern({
      name: newPatternName,
      pattern: newPatternElements,
      description: `Custom pattern with ${newPatternElements.length} characters`,
      website: undefined
    });
    
    setPatterns(getAllPatterns());
    setSelectedPatternId(newPattern.id);
    
    // Reset form
    setNewPatternName('');
    setNewPatternElements([]);
    
    // Switch to Use Pattern tab
    setActiveTab('create');
  };
  
  // Delete a pattern
  const deletePattern = (id: string) => {
    deleteCustomPattern(id);
    setPatterns(getAllPatterns());
    
    if (selectedPatternId === id) {
      setSelectedPatternId(patterns[0]?.id || '');
    }
  };
  
  // Copy password to clipboard
  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  // Get password strength
  const strength = password ? evaluatePasswordStrength(password) : null;
  
  // Get element display name
  const getElementDisplayName = (element: PatternElement) => {
    switch (element) {
      case 'L': return 'a';
      case 'U': return 'A';
      case 'D': return '0';
      case 'S': return '#';
      case 'A': return 'Aa';
      case 'X': return '*';
    }
  };
  
  // Get element color
  const getElementColor = (element: PatternElement) => {
    switch (element) {
      case 'L': return 'bg-gray-100 text-gray-800';
      case 'U': return 'bg-gray-100 text-gray-800';
      case 'D': return 'bg-gray-100 text-gray-800';
      case 'S': return 'bg-gray-100 text-gray-800';
      case 'A': return 'bg-gray-100 text-gray-800';
      case 'X': return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-primary">Pattern Password Generator</CardTitle>
        <CardDescription>
          Create passwords using specific patterns for different websites and services
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-4">
        <Tabs value={activeTab} onValueChange={(value) => {
          setActiveTab(value);
          setPassword(''); // Clear password when changing tabs
        }}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manage">Create Pattern</TabsTrigger>
            <TabsTrigger value="create">Use Pattern</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manage" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="new-pattern-name" className="pattern-section-label">Pattern Name</Label>
              <Input
                id="new-pattern-name"
                value={newPatternName}
                onChange={(e) => setNewPatternName(e.target.value)}
                placeholder="e.g., My Bank Password"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="pattern-section-label">Pattern Elements</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newPatternElements.map((element, index) => (
                  <div 
                    key={index} 
                    className={`px-2 py-1 rounded text-xs font-mono ${getElementColor(element)}`}
                  >
                    {getElementDisplayName(element)}
                  </div>
                ))}
                
                {newPatternElements.length === 0 && (
                  <div className="text-sm text-gray-500 italic">
                    No elements added yet
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addPatternElement('L')}
                  className={getElementColor('L')}
                >
                  Lowercase (a)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addPatternElement('U')}
                  className={getElementColor('U')}
                >
                  Uppercase (A)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addPatternElement('D')}
                  className={getElementColor('D')}
                >
                  Digit (0)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addPatternElement('S')}
                  className={getElementColor('S')}
                >
                  Symbol (#)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addPatternElement('A')}
                  className={getElementColor('A')}
                >
                  Any Letter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addPatternElement('X')}
                  className={getElementColor('X')}
                >
                  Any Character
                </Button>
              </div>
              
              <div className="mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={removeLastPatternElement}
                  disabled={newPatternElements.length === 0}
                  className="w-full mb-2 text-gray-800 border-gray-300"
                >
                  Remove Last
                </Button>
                <Button
                  onClick={saveNewPattern}
                  disabled={!newPatternName || newPatternElements.length === 0}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Save Pattern
                </Button>
              </div>
            </div>
            
            <Button
              onClick={saveNewPattern}
              disabled={!newPatternName || newPatternElements.length === 0}
              className="w-full flex items-center justify-center bg-primary hover:bg-primary/90"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Save and Use Pattern
            </Button>
          </TabsContent>
          
          <TabsContent value="create" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pattern-select" className="pattern-section-label">Select Pattern</Label>
                <Select value={selectedPatternId} onValueChange={setSelectedPatternId}>
                  <SelectTrigger id="pattern-select">
                    <SelectValue placeholder="Choose a pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    {patterns.map(pattern => (
                      <SelectItem key={pattern.id} value={pattern.id}>
                        {pattern.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedPattern && (
                <div className="space-y-4">
                  <div>
                    <Label className="pattern-section-label">Pattern Preview</Label>
                    <div className="flex flex-wrap gap-2 mt-2 p-3 border rounded-md bg-gray-50 justify-start">
                      {selectedPattern.pattern.map((element, index) => (
                        <div 
                          key={index} 
                          className={`px-2 py-1 rounded text-sm font-medium ${getElementColor(element)}`}
                        >
                          {getElementDisplayName(element)}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={generatePassword} 
                    className="pattern-section-button"
                  >
                    Generate Password
                  </Button>
                </div>
              )}
            </div>
            
            {password && (
              <div className="space-y-4 mt-4 pt-4 border-t">
                <div>
                  <Label htmlFor="generated-pattern-password">Generated Password</Label>
                  <div className="flex space-x-2">
                    <div className="relative flex-grow">
                      <Input
                        id="generated-pattern-password"
                        value={password}
                        readOnly
                        className="font-mono"
                      />
                    </div>
                    <Button
                      onClick={copyPassword}
                      className="flex items-center text-black"
                      variant="outline"
                    >
                      {copied ? (
                        <>
                          <span className="text-green-500 flex items-center">
                            Copied!
                          </span>
                        </>
                      ) : (
                        <>
                          <CopyIcon className="h-4 w-4 mr-2 text-black" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="flex space-x-2 justify-start">
                  <Button 
                    onClick={generatePassword} 
                    className="flex-1"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="text-sm text-gray-500">
        <div className="space-y-2">
          <p>
            Pattern Legend: 
            <span className={`ml-1 px-1 rounded ${getElementColor('L')}`}>a</span> = lowercase, 
            <span className={`ml-1 px-1 rounded ${getElementColor('U')}`}>A</span> = uppercase, 
            <span className={`ml-1 px-1 rounded ${getElementColor('D')}`}>0</span> = digit, 
            <span className={`ml-1 px-1 rounded ${getElementColor('S')}`}>#</span> = symbol
          </p>
          <p>
            Create patterns that match specific website requirements or your personal preferences.
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
