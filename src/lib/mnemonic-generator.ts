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

// Templates for mnemonic sentences in French
const frTemplates = [
  'Le [noun] [adj] [verb] le [noun] [adj].',
  'Mon [noun] [adj] [verb] avec un [noun] [adj].',
  'Ton [noun] [verb] quand le [noun] [adj] [verb].',
  'Chaque [noun] [adj] [verb] avant de [verb].',
  'Parfois le [noun] [adj] [verb] pendant que [verb].',
  'Ne laisse jamais ton [noun] [adj] [verb] le [noun].',
  'Toujours [verb] ton [noun] [adj] avec [noun] [adj].',
  'Quand le [noun] [verb], le [noun] [adj] [verb].',
  'Si tu [verb] le [noun] [adj], il va [verb].'
];

// Templates for mnemonic sentences in German
const deTemplates = [
  'Der [adj] [noun] [verb] den [adj] [noun].',
  'Mein [adj] [noun] [verb] mit einem [adj] [noun].',
  'Dein [noun] [verb] wenn der [adj] [noun] [verb].',
  'Jeder [adj] [noun] [verb] bevor [noun] [verb].',
  'Manchmal [verb] der [adj] [noun] während [noun] [verb].',
  'Lass niemals deinen [adj] [noun] den [noun] [verb].',
  'Immer [verb] deinen [adj] [noun] mit [adj] [noun].',
  'Wenn [noun] [verb], dann [verb] der [adj] [noun].',
  'Falls du den [adj] [noun] [verb], wird er [verb].'
];

// Templates by locale
const templatesByLocale: Record<string, string[]> = {
  en: enTemplates,
  es: esTemplates,
  fr: frTemplates,
  de: deTemplates
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

// Adverbs to use in templates - French
const frAdverbs = [
  'rapidement', 'lentement', 'soigneusement', 'heureusement', 'tristement', 'bruyamment', 'silencieusement',
  'soudainement', 'éventuellement', 'finalement', 'rarement', 'souvent', 'toujours', 'jamais',
  'avec empressement', 'à contrecœur', 'patiemment', 'anxieusement', 'calmement', 'frénétiquement'
];

// Adverbs to use in templates - German
const deAdverbs = [
  'schnell', 'langsam', 'sorgfältig', 'glücklich', 'traurig', 'laut', 'leise',
  'plötzlich', 'schließlich', 'endlich', 'selten', 'oft', 'immer', 'niemals',
  'eifrig', 'widerwillig', 'geduldig', 'ängstlich', 'ruhig', 'hektisch'
];

// Adverbs by locale
const adverbsByLocale: Record<string, string[]> = {
  en: enAdverbs,
  es: esAdverbs,
  fr: frAdverbs,
  de: deAdverbs
};

// Common letters that have many words starting with them
const commonLettersByLocale: Record<string, string> = {
  en: 'abcdefghijklmnoprstw',
  es: 'abcdefghijlmnoprstv',
  fr: 'abcdefghijlmnopqrstvwxyz',
  de: 'abcdefghijklmnopqrstuvwxyz'
};

// Generate a mnemonic sentence for a given password
export function generateMnemonicForPassword(password: string, locale: string = 'en'): string {
  const { adjectives, nouns, verbs, adverbs } = getWordListsByLocale(locale);
  const templates = templatesByLocale[locale] || templatesByLocale.en;
  const adverbsList = adverbsByLocale[locale] || adverbsByLocale.en;
  const commonLetters = commonLettersByLocale[locale] || commonLettersByLocale.en;
  
  // Choose a random template
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  // Create a mnemonic phrase where the first letter of each word matches the password
  let mnemonic = template;
  let passwordIndex = 0;
  
  // Replace placeholders with words that start with the corresponding password character
  while (mnemonic.includes('[') && passwordIndex < password.length) {
    const placeholderStart = mnemonic.indexOf('[');
    const placeholderEnd = mnemonic.indexOf(']');
    const placeholder = mnemonic.substring(placeholderStart + 1, placeholderEnd);
    
    let wordList: string[];
    switch (placeholder) {
      case 'adj':
        wordList = adjectives;
        break;
      case 'noun':
        wordList = nouns;
        break;
      case 'verb':
        wordList = verbs;
        break;
      case 'adv':
        wordList = adverbsList;
        break;
      default:
        wordList = [];
    }
    
    // Find a word that starts with the current password character
    const char = password[passwordIndex].toLowerCase();
    const word = findWordStartingWith(char, wordList) || char;
    
    // Replace the placeholder with the word
    mnemonic = mnemonic.substring(0, placeholderStart) + word + mnemonic.substring(placeholderEnd + 1);
    passwordIndex++;
  }
  
  return mnemonic;
}

// Generate a password from a mnemonic phrase
export function generatePasswordFromMnemonic(phrase: string, options: {
  includeNumbers?: boolean;
  includeSymbols?: boolean;
  uppercase?: boolean;
} = {}): string {
  const { includeNumbers = false, includeSymbols = false, uppercase = false } = options;
  
  // Split the phrase into words
  const words = phrase.split(/\s+/);
  
  // Get the first letter of each word
  let password = words.map(word => word.charAt(0)).join('');
  
  // Apply options
  if (uppercase) {
    password = password.toUpperCase();
  }
  
  if (includeNumbers) {
    // Replace some letters with similar-looking numbers
    password = password.replace(/[iIlLoOeEaAsS]/g, (match) => {
      switch (match.toLowerCase()) {
        case 'i': case 'l': return '1';
        case 'o': return '0';
        case 'e': return '3';
        case 'a': return '4';
        case 's': return '5';
        default: return match;
      }
    });
  }
  
  if (includeSymbols) {
    // Replace some letters with similar-looking symbols
    password = password.replace(/[aAeEiIoOsSzZ]/g, (match) => {
      switch (match.toLowerCase()) {
        case 'a': return '@';
        case 'e': return '€';
        case 'i': return '!';
        case 'o': return '*';
        case 's': return '$';
        case 'z': return '%';
        default: return match;
      }
    });
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
    wordCount = 8,
    includeNumbers = false,
    includeSymbols = false,
    uppercase = false,
    locale = 'en'
  } = options;
  
  const { adjectives, nouns, verbs, adverbs } = getWordListsByLocale(locale);
  const templates = templatesByLocale[locale] || templatesByLocale.en;
  const adverbsList = adverbsByLocale[locale] || adverbsByLocale.en;
  
  // Choose random words for the mnemonic
  const words: string[] = [];
  const wordTypes = ['adj', 'noun', 'verb', 'adv'];
  
  for (let i = 0; i < wordCount; i++) {
    const wordType = wordTypes[i % wordTypes.length];
    let wordList: string[];
    
    switch (wordType) {
      case 'adj':
        wordList = adjectives;
        break;
      case 'noun':
        wordList = nouns;
        break;
      case 'verb':
        wordList = verbs;
        break;
      case 'adv':
        wordList = adverbsList;
        break;
      default:
        wordList = [];
    }
    
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    words.push(word);
  }
  
  // Create a mnemonic phrase
  const mnemonic = words.join(' ');
  
  // Generate password from the mnemonic
  const password = generatePasswordFromMnemonic(mnemonic, {
    includeNumbers,
    includeSymbols,
    uppercase
  });
  
  return { password, mnemonic };
}

// Helper function to find a word starting with a specific character
function findWordStartingWith(char: string, wordList: string[]): string | null {
  const matchingWords = wordList.filter(word => word.toLowerCase().startsWith(char.toLowerCase()));
  
  if (matchingWords.length === 0) {
    return null;
  }
  
  return matchingWords[Math.floor(Math.random() * matchingWords.length)];
}
