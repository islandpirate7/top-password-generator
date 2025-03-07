// Mnemonic password generator
// Creates memorable sentences where the first letter of each word forms the password

import { adjectives, nouns, verbs } from './word-lists';

// Templates for mnemonic sentences
const templates = [
  'The [adj] [noun] [verb] the [adj] [noun].',
  'My [adj] [noun] [verb] with a [adj] [noun].',
  'Your [noun] [verb] when the [adj] [noun] [verb].',
  'Every [adj] [noun] [verb] before [noun] [verb].',
  'Sometimes [adj] [noun] [verb] while [noun] [verb].',
  'Never let your [adj] [noun] [verb] the [noun].',
  'Always [verb] your [adj] [noun] with [adj] [noun].',
  'When [noun] [verb], the [adj] [noun] [verb].',
  'If you [verb] the [adj] [noun], it will [verb].'
];

// Adverbs to use in templates
const adverbs = [
  'quickly', 'slowly', 'carefully', 'happily', 'sadly', 'loudly', 'quietly',
  'suddenly', 'eventually', 'finally', 'rarely', 'often', 'always', 'never',
  'eagerly', 'reluctantly', 'patiently', 'anxiously', 'calmly', 'frantically'
];

// Common letters that have many words starting with them
const commonLetters = 'abcdefghijklmnoprstw';

// Generate a mnemonic sentence for a given password
export function generateMnemonicForPassword(password: string): string {
  // Extract the unique characters from the password, preferring common letters
  let chars = password.split('');
  
  // Filter out uncommon letters and replace them with common ones
  chars = chars.map(char => {
    if (!commonLetters.includes(char.toLowerCase())) {
      // Replace uncommon letters with common ones
      return commonLetters.charAt(Math.floor(Math.random() * commonLetters.length));
    }
    return char;
  });
  
  // Select a random template
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  // Build the sentence
  let sentence = template;
  let charIndex = 0;
  
  // Replace placeholders with words that start with the password characters
  sentence = sentence.replace(/\[adj\]/g, () => {
    const char = chars[charIndex % chars.length];
    charIndex++;
    const word = findWordStartingWith(char, adjectives);
    return word || 'simple'; // Fallback to common adjectives
  });
  
  sentence = sentence.replace(/\[Adj\]/g, () => {
    const char = chars[charIndex % chars.length];
    charIndex++;
    const word = findWordStartingWith(char, adjectives);
    if (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return 'Simple'; // Fallback to common adjectives
  });
  
  sentence = sentence.replace(/\[noun\]/g, () => {
    const char = chars[charIndex % chars.length];
    charIndex++;
    const word = findWordStartingWith(char, nouns);
    return word || 'thing'; // Fallback to common nouns
  });
  
  sentence = sentence.replace(/\[verb\]/g, () => {
    const char = chars[charIndex % chars.length];
    charIndex++;
    const word = findWordStartingWith(char, verbs);
    return word || 'takes'; // Fallback to common verbs
  });
  
  sentence = sentence.replace(/\[adv\]/g, () => {
    const char = chars[charIndex % chars.length];
    charIndex++;
    const word = findWordStartingWith(char, adverbs);
    return word || 'simply'; // Fallback to common adverbs
  });
  
  return sentence;
}

// Generate a password from a mnemonic phrase
export function generatePasswordFromMnemonic(phrase: string, options: {
  includeNumbers?: boolean;
  includeSymbols?: boolean;
  uppercase?: boolean;
} = {}): string {
  // Split the phrase into words and filter out empty strings and punctuation
  const words = phrase.split(/\s+/).filter(word => word.match(/[a-zA-Z]/));
  
  // Extract the first letter of each word
  let password = words.map(word => word.charAt(0)).join('');
  
  // Apply options
  if (options.uppercase) {
    password = password.toUpperCase();
  } else {
    // Default is lowercase
    password = password.toLowerCase();
  }
  
  // Add numbers if requested (but don't add too many)
  if (options.includeNumbers) {
    // Add up to 2 numbers based on word lengths
    const numbers = words.slice(0, 2).map(word => word.length % 10).join('');
    password += numbers;
  }
  
  // Add symbols if requested (but don't add too many)
  if (options.includeSymbols) {
    // Add 1 symbol
    const symbols = ['!', '@', '#', '$', '%', '&', '*'];
    const selectedSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    password += selectedSymbol;
  }
  
  return password;
}

// Generate a random mnemonic password
export function generateRandomMnemonicPassword(length: number = 8, options: {
  includeNumbers?: boolean;
  includeSymbols?: boolean;
  uppercase?: boolean;
} = {}): { password: string; mnemonic: string } {
  // Generate a random base string using only common letters
  let basePassword = '';
  
  for (let i = 0; i < length; i++) {
    basePassword += commonLetters.charAt(Math.floor(Math.random() * commonLetters.length));
  }
  
  // Generate a mnemonic for this password
  const mnemonic = generateMnemonicForPassword(basePassword);
  
  // Extract just the first letters to create the actual password
  const firstLetters = mnemonic.split(/\s+/)
    .filter(word => word.match(/[a-zA-Z]/))
    .map(word => word.charAt(0))
    .join('');
  
  // Apply options to the first letters password
  let finalPassword = firstLetters;
  
  // Apply uppercase if requested
  if (options.uppercase) {
    finalPassword = finalPassword.toUpperCase();
  } else {
    // Default is lowercase
    finalPassword = finalPassword.toLowerCase();
  }
  
  // Add numbers if requested (but don't add too many)
  if (options.includeNumbers) {
    // Add up to 2 numbers
    const numbers = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    finalPassword += numbers;
  }
  
  // Add symbols if requested (but don't add too many)
  if (options.includeSymbols) {
    // Add 1 symbol
    const symbols = ['!', '@', '#', '$', '%', '&', '*'];
    finalPassword += symbols[Math.floor(Math.random() * symbols.length)];
  }
  
  return {
    password: finalPassword,
    mnemonic
  };
}

// Helper function to find a word starting with a specific character
function findWordStartingWith(char: string, wordList: string[]): string | null {
  // Filter words that start with the given character
  const matchingWords = wordList.filter(word => 
    word.toLowerCase().startsWith(char.toLowerCase()) && 
    word.length >= 3 && word.length <= 8 // Avoid very short or very long words
  );
  
  if (matchingWords.length === 0) return null;
  
  // Sort by length (prefer shorter words) and pick one randomly from the first 10
  const sortedWords = matchingWords
    .sort((a, b) => a.length - b.length)
    .slice(0, 10);
  
  return sortedWords[Math.floor(Math.random() * sortedWords.length)];
}
