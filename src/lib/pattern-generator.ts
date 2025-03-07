// Password pattern generator
// Allows users to define custom patterns for password generation

// Define the pattern elements
export type PatternElement = 
  | 'L' // Lowercase letter
  | 'U' // Uppercase letter
  | 'D' // Digit
  | 'S' // Symbol
  | 'A' // Any letter (upper or lower)
  | 'X' // Any character

// Define a pattern template
export interface PatternTemplate {
  id: string;
  name: string;
  pattern: PatternElement[];
  description: string;
  website?: string; // Optional website this pattern is for
}

// Common pattern templates
export const commonPatterns: PatternTemplate[] = [
  {
    id: 'standard',
    name: 'Standard Strong Password',
    pattern: ['U', 'L', 'L', 'L', 'L', 'D', 'D', 'S', 'L', 'U', 'L', 'D'],
    description: 'A strong password with uppercase, lowercase, numbers, and symbols'
  },
  {
    id: 'pin',
    name: 'PIN Code',
    pattern: ['D', 'D', 'D', 'D'],
    description: 'A 4-digit PIN code'
  },
  {
    id: 'easy-to-type',
    name: 'Easy to Type',
    pattern: ['U', 'L', 'L', 'L', 'L', 'D', 'D', 'D'],
    description: 'Easy to type with one hand (no symbols)'
  },
  {
    id: 'very-strong',
    name: 'Very Strong',
    pattern: ['U', 'L', 'S', 'D', 'U', 'L', 'S', 'D', 'U', 'L', 'S', 'D', 'U', 'L', 'S', 'D'],
    description: 'Maximum security with alternating character types'
  },
  {
    id: 'windows',
    name: 'Windows Compatible',
    pattern: ['U', 'L', 'L', 'L', 'D', 'D', 'S', 'U', 'L', 'L', 'D', 'S'],
    description: 'Meets Microsoft Windows password requirements',
    website: 'microsoft.com'
  },
  {
    id: 'google',
    name: 'Google Compatible',
    pattern: ['U', 'L', 'L', 'L', 'L', 'L', 'D', 'S', 'L'],
    description: 'Meets Google account password requirements',
    website: 'google.com'
  },
  {
    id: 'apple',
    name: 'Apple ID Compatible',
    pattern: ['U', 'L', 'L', 'L', 'L', 'D', 'D', 'S'],
    description: 'Meets Apple ID password requirements',
    website: 'apple.com'
  }
];

// Generate a password based on a pattern
export function generatePasswordFromPattern(pattern: PatternElement[]): string {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digitChars = '0123456789';
  const symbolChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';
  const allLetterChars = lowercaseChars + uppercaseChars;
  const allChars = lowercaseChars + uppercaseChars + digitChars + symbolChars;
  
  let password = '';
  
  for (const element of pattern) {
    let char = '';
    
    switch (element) {
      case 'L':
        char = getRandomChar(lowercaseChars);
        break;
      case 'U':
        char = getRandomChar(uppercaseChars);
        break;
      case 'D':
        char = getRandomChar(digitChars);
        break;
      case 'S':
        char = getRandomChar(symbolChars);
        break;
      case 'A':
        char = getRandomChar(allLetterChars);
        break;
      case 'X':
        char = getRandomChar(allChars);
        break;
    }
    
    password += char;
  }
  
  return password;
}

// Helper function to get a random character from a string
function getRandomChar(chars: string): string {
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

// Save custom patterns to local storage
export function saveCustomPatterns(patterns: PatternTemplate[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('customPatterns', JSON.stringify(patterns));
  }
}

// Load custom patterns from local storage
export function loadCustomPatterns(): PatternTemplate[] {
  if (typeof window !== 'undefined') {
    const savedPatterns = localStorage.getItem('customPatterns');
    if (savedPatterns) {
      try {
        return JSON.parse(savedPatterns);
      } catch (error) {
        console.error('Error loading custom patterns:', error);
      }
    }
  }
  return [];
}

// Add a new custom pattern
export function addCustomPattern(pattern: Omit<PatternTemplate, 'id'>): PatternTemplate {
  const customPatterns = loadCustomPatterns();
  const id = `custom-${Date.now()}`;
  
  const newPattern: PatternTemplate = {
    ...pattern,
    id
  };
  
  customPatterns.push(newPattern);
  saveCustomPatterns(customPatterns);
  
  return newPattern;
}

// Delete a custom pattern
export function deleteCustomPattern(id: string): void {
  const customPatterns = loadCustomPatterns();
  const filteredPatterns = customPatterns.filter(pattern => pattern.id !== id);
  saveCustomPatterns(filteredPatterns);
}

// Get all available patterns (built-in + custom)
export function getAllPatterns(): PatternTemplate[] {
  return [...commonPatterns, ...loadCustomPatterns()];
}

// Find a pattern by ID
export function findPatternById(id: string): PatternTemplate | undefined {
  return getAllPatterns().find(pattern => pattern.id === id);
}
