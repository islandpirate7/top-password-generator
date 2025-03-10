// Mnemonic password generator
// Creates memorable sentences where the first letter of each word forms the password

import { getWordListsByLocale } from './word-lists/index';

// Templates for mnemonic sentences in English
const enTemplates = [
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

// Templates for mnemonic sentences in Spanish
const esTemplates = [
  'El [noun] [adj] [verb] el [noun] [adj].',
  'Mi [noun] [adj] [verb] con un [noun] [adj].',
  'Tu [noun] [verb] cuando el [noun] [adj] [verb].',
  'Cada [noun] [adj] [verb] antes de [verb].',
  'A veces el [noun] [adj] [verb] mientras [verb].',
  'Nunca dejes que tu [noun] [adj] [verb] el [noun].',
  'Siempre [verb] tu [noun] [adj] con [noun] [adj].',
  'Cuando el [noun] [verb], el [noun] [adj] [verb].',
  'Si [verb] el [noun] [adj], [verb].'
];

// Templates by locale
const templatesByLocale: Record<string, string[]> = {
  en: enTemplates,
  es: esTemplates
};

// Adverbs to use in templates - English
const enAdverbs = [
  'quickly', 'slowly', 'carefully', 'happily', 'sadly', 'loudly', 'quietly',
  'suddenly', 'eventually', 'finally', 'rarely', 'often', 'always', 'never',
  'eagerly', 'reluctantly', 'patiently', 'anxiously', 'calmly', 'frantically'
];

// Adverbs to use in templates - Spanish
const esAdverbs = [
  'rápidamente', 'lentamente', 'cuidadosamente', 'felizmente', 'tristemente', 'ruidosamente', 'silenciosamente',
  'repentinamente', 'eventualmente', 'finalmente', 'raramente', 'frecuentemente', 'siempre', 'nunca',
  'ansiosamente', 'reluctantemente', 'pacientemente', 'ansiosamente', 'tranquilamente', 'frenéticamente'
];

// Adverbs by locale
const adverbsByLocale: Record<string, string[]> = {
  en: enAdverbs,
  es: esAdverbs
};

// Common letters that have many words starting with them
const commonLettersByLocale: Record<string, string> = {
  en: 'abcdefghijklmnoprstw',
  es: 'abcdefghijlmnoprstv'
};

// Generate a mnemonic sentence for a given password
export function generateMnemonicForPassword(password: string, locale: string = 'en'): string {
  // Get the appropriate word lists and templates for the locale
  const { adjectives, nouns, verbs } = getWordListsByLocale(locale);
  const templates = templatesByLocale[locale] || templatesByLocale.en;
  const adverbs = adverbsByLocale[locale] || adverbsByLocale.en;
  const commonLetters = commonLettersByLocale[locale] || commonLettersByLocale.en;

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
    return word || (locale === 'es' ? 'simple' : 'simple'); // Fallback to common adjectives
  });
  
  sentence = sentence.replace(/\[Adj\]/g, () => {
    const char = chars[charIndex % chars.length];
    charIndex++;
    const word = findWordStartingWith(char, adjectives);
    if (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return locale === 'es' ? 'Simple' : 'Simple'; // Fallback to common adjectives
  });
  
  sentence = sentence.replace(/\[noun\]/g, () => {
    const char = chars[charIndex % chars.length];
    charIndex++;
    const word = findWordStartingWith(char, nouns);
    return word || (locale === 'es' ? 'cosa' : 'thing'); // Fallback to common nouns
  });
  
  sentence = sentence.replace(/\[verb\]/g, () => {
    const char = chars[charIndex % chars.length];
    charIndex++;
    const word = findWordStartingWith(char, verbs);
    return word || (locale === 'es' ? 'toma' : 'takes'); // Fallback to common verbs
  });
  
  sentence = sentence.replace(/\[adv\]/g, () => {
    const char = chars[charIndex % chars.length];
    charIndex++;
    const word = findWordStartingWith(char, adverbs);
    return word || (locale === 'es' ? 'simplemente' : 'simply'); // Fallback to common adverbs
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
  locale?: string;
} = {}): { password: string; mnemonic: string } {
  const {
    wordCount = 4,
    includeNumbers = false,
    includeSymbols = false,
    uppercase = false,
    locale = 'en'
  } = options;
  
  // Get the appropriate word lists and templates for the locale
  const { adjectives, nouns, verbs } = getWordListsByLocale(locale);
  const templates = templatesByLocale[locale] || templatesByLocale.en;
  
  // Generate a password with the first letter of each word
  let password = '';
  let mnemonic = '';
  
  // Select a random template or create a custom one based on word count
  let template = templates[Math.floor(Math.random() * templates.length)];
  
  // If word count is different from what the template would provide, create a custom template
  const templateWordCount = (template.match(/\[adj\]|\[noun\]|\[verb\]/g) || []).length;
  
  if (templateWordCount !== wordCount) {
    // Create a custom template with the right number of words
    template = locale === 'es' ? 'El' : 'The';
    
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
