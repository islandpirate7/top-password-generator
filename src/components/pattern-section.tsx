import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { NativeSlider } from './ui/slider';
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
import { CopyIcon, PlusIcon, Trash2Icon, RefreshCw, Check } from 'lucide-react';

interface PatternSectionProps {
  onPasswordGenerated: (password: string) => void;
}

export function PatternSection({ onPasswordGenerated }: PatternSectionProps) {
  const [patterns, setPatterns] = useState<PatternTemplate[]>([]);
  const [selectedPatternId, setSelectedPatternId] = useState<string>('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('use');
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
    setActiveTab('use');
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
  };
  
  // Get password strength
  const strength = password ? evaluatePasswordStrength(password) : null;
  
  // Get color for pattern element
  const getElementColor = (element: string) => {
    switch (element) {
      case 'L': return 'bg-blue-100 hover:bg-blue-200 text-blue-800';
      case 'U': return 'bg-green-100 hover:bg-green-200 text-green-800';
      case 'D': return 'bg-red-100 hover:bg-red-200 text-red-800';
      case 'S': return 'bg-purple-100 hover:bg-purple-200 text-purple-800';
      case 'A': return 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800';
      case 'X': return 'bg-gray-100 hover:bg-gray-200 text-gray-800';
      default: return '';
    }
  };
  
  // Get display name for pattern element
  const getElementDisplayName = (element: string) => {
    switch (element) {
      case 'L': return 'Lowercase (a)';
      case 'U': return 'Uppercase (A)';
      case 'D': return 'Digit (0)';
      case 'S': return 'Symbol (#)';
      case 'A': return 'Any Letter';
      case 'X': return 'Any Character';
      default: return element;
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-primary">Pattern-Based Password</CardTitle>
        <CardDescription className="text-left">Create passwords based on patterns for specific websites or services</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="use" className="data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm">Use Pattern</TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm">Create Pattern</TabsTrigger>
          </TabsList>
          
          <TabsContent value="use" className="w-full">
            <div className="space-y-4 w-full">
              <div className="space-y-2 w-full">
                <Label htmlFor="pattern-select">Select a Pattern</Label>
                <Select
                  value={selectedPatternId}
                  onValueChange={setSelectedPatternId}
                >
                  <SelectTrigger id="pattern-select" className="w-full">
                    <SelectValue placeholder="Select a pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    {patterns.map((pattern) => (
                      <SelectItem key={pattern.id} value={pattern.id}>
                        {pattern.name} {pattern.website ? `(${pattern.website})` : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedPattern && (
                <div className="space-y-2 w-full">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-medium">{selectedPattern.name}</h3>
                      <p className="text-xs text-gray-500">{selectedPattern.description}</p>
                    </div>
                    
                    {/* Only show delete button for custom patterns */}
                    {!commonPatterns.some(p => p.id === selectedPattern.id) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deletePattern(selectedPattern.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button onClick={generatePassword} className="w-full bg-primary hover:bg-primary/90">
                      Generate Password
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="create" className="w-full">
            <div className="space-y-4 w-full">
              <div className="space-y-2 w-full">
                <Label htmlFor="new-pattern-name">Pattern Name</Label>
                <Input
                  id="new-pattern-name"
                  placeholder="e.g., My Bank Pattern"
                  value={newPatternName}
                  onChange={(e) => setNewPatternName(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2 w-full">
                <Label>Pattern Elements</Label>
                <div className="flex flex-wrap gap-2 border p-2 rounded min-h-[100px] w-full">
                  {newPatternElements.map((element, index) => (
                    <div key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {element.type === 'static' ? element.value : `[${element.type}]`}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 w-full">
                <Button
                  variant="outline"
                  onClick={() => addPatternElement({ type: 'lowercase', length: 3 })}
                  className="w-full"
                >
                  Add Lowercase
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => addPatternElement({ type: 'uppercase', length: 3 })}
                  className="w-full"
                >
                  Add Uppercase
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => addPatternElement({ type: 'number', length: 2 })}
                  className="w-full"
                >
                  Add Numbers
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => addPatternElement({ type: 'symbol', length: 1 })}
                  className="w-full"
                >
                  Add Symbols
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => addPatternElement({ type: 'static', value: '-' })}
                  className="w-full"
                >
                  Add Hyphen
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => addPatternElement({ type: 'static', value: '_' })}
                  className="w-full"
                >
                  Add Underscore
                </Button>
              </div>
              
              <div className="flex items-center space-x-2 w-full">
                <Button
                  variant="outline"
                  onClick={removeLastPatternElement}
                  className="w-1/2"
                  disabled={newPatternElements.length === 0}
                >
                  Remove Last
                </Button>
                
                <Button
                  onClick={saveNewPattern}
                  className="w-1/2 bg-primary hover:bg-primary/90"
                  disabled={!newPatternName || newPatternElements.length === 0}
                >
                  Save Pattern
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {password && (
        <CardFooter className="flex flex-col space-y-4 border-t border-gray-100 pt-4">
          <div className="space-y-2 w-full">
            <Label htmlFor="pattern-password">Generated Password</Label>
            <div className="flex items-center space-x-2 w-full">
              <Input
                id="pattern-password"
                value={password}
                readOnly
                className="font-mono w-full"
              />
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  copyPassword(password);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
