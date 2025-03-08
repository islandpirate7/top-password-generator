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
export function generateRandomMnemonicPassword(options: {
  wordCount?: number;
  includeNumbers?: boolean;
  includeSymbols?: boolean;
  uppercase?: boolean;
} = {}): { password: string; mnemonic: string } {
  const {
    wordCount = 4,
    includeNumbers = false,
    includeSymbols = false,
    uppercase = false
  } = options;
  
  // Generate a password with the first letter of each word
  let password = '';
  let mnemonic = '';
  
  // Select a random template or create a custom one based on word count
  let template = templates[Math.floor(Math.random() * templates.length)];
  
  // If word count is different from what the template would provide, create a custom template
  const templateWordCount = (template.match(/\[adj\]|\[noun\]|\[verb\]/g) || []).length;
  
  if (templateWordCount !== wordCount) {
    // Create a custom template with the right number of words
    template = 'The';
    
    for (let i = 0; i < wordCount; i++) {
      const wordType = ['[adj]', '[noun]', '[verb]'][i % 3];
      template += ` ${wordType}`;
    }
    
    template += '.';
  }
  
  // Build the sentence
  let sentence = template;
  
  // Replace placeholders with random words
  sentence = sentence.replace(/\[adj\]/g, () => {
    const word = adjectives[Math.floor(Math.random() * adjectives.length)];
    password += word.charAt(0);
    return word;
  });
  
  sentence = sentence.replace(/\[noun\]/g, () => {
    const word = nouns[Math.floor(Math.random() * nouns.length)];
    password += word.charAt(0);
    return word;
  });
  
  sentence = sentence.replace(/\[verb\]/g, () => {
    const word = verbs[Math.floor(Math.random() * verbs.length)];
    password += word.charAt(0);
    return word;
  });
  
  mnemonic = sentence;
  
  // Apply options to the password
  if (uppercase) {
    password = password.toUpperCase();
  }
  
  if (includeNumbers) {
    // Replace some letters with similar-looking numbers
    password = password.replace(/[iol]/gi, (match) => {
      const replacements: Record<string, string> = { i: '1', o: '0', l: '7', I: '1', O: '0', L: '7' };
      return replacements[match] || match;
    });
  }
  
  if (includeSymbols) {
    // Replace some letters with similar-looking symbols
    password = password.replace(/[aes]/gi, (match) => {
      const replacements: Record<string, string> = { a: '@', e: '3', s: '$', A: '@', E: '3', S: '$' };
      return replacements[match] || match;
    });
  }
  
  return { password, mnemonic };
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
