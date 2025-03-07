import { adjectives, nouns, verbs } from './word-lists';

// Define theme types
export type WordTheme = 'default' | 'scifi' | 'fantasy' | 'sports' | 'nature' | 'tech' | 'custom';

// Define themed word lists
export const themedWordLists: Record<WordTheme, {
  adjectives: string[];
  nouns: string[];
  verbs: string[];
}> = {
  default: {
    adjectives,
    nouns,
    verbs
  },
  scifi: {
    adjectives: [
      'galactic', 'cosmic', 'stellar', 'quantum', 'alien', 'futuristic', 'robotic', 
      'cybernetic', 'interstellar', 'orbital', 'lunar', 'martian', 'android', 'digital',
      'holographic', 'hyperspace', 'nanotech', 'bionic', 'cryogenic', 'dystopian'
    ],
    nouns: [
      'spaceship', 'robot', 'alien', 'planet', 'galaxy', 'starship', 'astronaut', 
      'cyborg', 'android', 'satellite', 'laser', 'nebula', 'wormhole', 'asteroid',
      'cosmos', 'dimension', 'hologram', 'matrix', 'nanobot', 'teleporter'
    ],
    verbs: [
      'launch', 'orbit', 'beam', 'teleport', 'clone', 'terraform', 'scan', 'hack', 
      'program', 'analyze', 'navigate', 'transmit', 'compute', 'augment', 'simulate',
      'generate', 'replicate', 'decode', 'encrypt', 'interface'
    ]
  },
  fantasy: {
    adjectives: [
      'magical', 'enchanted', 'mystical', 'ancient', 'legendary', 'mythical', 'arcane', 
      'ethereal', 'celestial', 'divine', 'elven', 'dwarven', 'fairy', 'wizardly',
      'draconic', 'spectral', 'cursed', 'blessed', 'haunted', 'immortal'
    ],
    nouns: [
      'wizard', 'dragon', 'knight', 'elf', 'dwarf', 'castle', 'sword', 'shield', 
      'spell', 'potion', 'scroll', 'wand', 'amulet', 'grimoire', 'quest',
      'dungeon', 'treasure', 'kingdom', 'sorcerer', 'unicorn'
    ],
    verbs: [
      'enchant', 'conjure', 'summon', 'cast', 'transform', 'bewitch', 'charm', 
      'invoke', 'banish', 'forge', 'quest', 'slay', 'protect', 'heal',
      'resurrect', 'curse', 'bless', 'wield', 'vanquish', 'conquer'
    ]
  },
  sports: {
    adjectives: [
      'athletic', 'competitive', 'champion', 'winning', 'olympic', 'professional', 'skilled', 
      'tactical', 'strategic', 'powerful', 'agile', 'swift', 'strong', 'enduring',
      'victorious', 'undefeated', 'elite', 'dynamic', 'record-breaking', 'legendary'
    ],
    nouns: [
      'athlete', 'player', 'team', 'coach', 'stadium', 'field', 'court', 
      'medal', 'trophy', 'championship', 'victory', 'record', 'league', 'tournament',
      'match', 'game', 'score', 'goal', 'ball', 'racket'
    ],
    verbs: [
      'compete', 'win', 'score', 'train', 'play', 'coach', 'defeat', 
      'tackle', 'shoot', 'throw', 'catch', 'run', 'jump', 'swim',
      'race', 'defend', 'attack', 'block', 'pass', 'kick'
    ]
  },
  nature: {
    adjectives: [
      'green', 'wild', 'natural', 'organic', 'lush', 'verdant', 'blooming', 
      'tropical', 'alpine', 'coastal', 'desert', 'forest', 'mountain', 'oceanic',
      'pristine', 'serene', 'vibrant', 'seasonal', 'majestic', 'tranquil'
    ],
    nouns: [
      'forest', 'mountain', 'river', 'ocean', 'tree', 'flower', 'animal', 
      'bird', 'fish', 'insect', 'valley', 'meadow', 'desert', 'jungle',
      'reef', 'canyon', 'waterfall', 'lake', 'island', 'beach'
    ],
    verbs: [
      'grow', 'bloom', 'flow', 'soar', 'swim', 'climb', 'burrow', 
      'nest', 'migrate', 'hibernate', 'pollinate', 'seed', 'sprout', 'flourish',
      'thrive', 'evolve', 'adapt', 'graze', 'hunt', 'forage'
    ]
  },
  tech: {
    adjectives: [
      'digital', 'smart', 'automated', 'connected', 'innovative', 'high-tech', 'wireless', 
      'electronic', 'virtual', 'cloud-based', 'mobile', 'intelligent', 'encrypted', 'optimized',
      'responsive', 'scalable', 'agile', 'streamlined', 'cutting-edge', 'disruptive'
    ],
    nouns: [
      'computer', 'software', 'hardware', 'network', 'server', 'database', 'algorithm', 
      'interface', 'platform', 'application', 'device', 'cloud', 'system', 'framework',
      'protocol', 'browser', 'website', 'startup', 'blockchain', 'api'
    ],
    verbs: [
      'code', 'program', 'develop', 'debug', 'deploy', 'optimize', 'encrypt', 
      'connect', 'integrate', 'automate', 'update', 'download', 'upload', 'sync',
      'backup', 'install', 'configure', 'compile', 'process', 'analyze'
    ]
  },
  custom: {
    adjectives: [],
    nouns: [],
    verbs: []
  }
};

// Function to add custom words
export function addCustomWord(
  word: string, 
  type: 'adjectives' | 'nouns' | 'verbs'
): void {
  // Filter out offensive words (basic implementation)
  if (isOffensive(word)) {
    throw new Error('This word cannot be added as it may be inappropriate.');
  }
  
  // Add to custom list if not already present
  if (!themedWordLists.custom[type].includes(word)) {
    themedWordLists.custom[type].push(word);
  }
}

// Function to remove custom words
export function removeCustomWord(
  word: string, 
  type: 'adjectives' | 'nouns' | 'verbs'
): void {
  const index = themedWordLists.custom[type].indexOf(word);
  if (index !== -1) {
    themedWordLists.custom[type].splice(index, 1);
  }
}

// Function to check if a word is potentially offensive (basic implementation)
// In a real app, you would use a more comprehensive library or API
function isOffensive(word: string): boolean {
  const basicOffensiveWords = [
    'offensive', 'inappropriate', 'vulgar', 'profane', 'obscene'
    // This is a placeholder - in a real app you would use a more comprehensive list
    // or a third-party service to check for offensive content
  ];
  
  return basicOffensiveWords.some(offensive => 
    word.toLowerCase().includes(offensive.toLowerCase())
  );
}

// Function to get words based on theme
export function getThemedWords(theme: WordTheme = 'default'): {
  adjectives: string[];
  nouns: string[];
  verbs: string[];
} {
  return themedWordLists[theme];
}

// Save custom words to local storage
export function saveCustomWordsToStorage(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('customWordList', JSON.stringify(themedWordLists.custom));
  }
}

// Load custom words from local storage
export function loadCustomWordsFromStorage(): void {
  if (typeof window !== 'undefined') {
    const savedWords = localStorage.getItem('customWordList');
    if (savedWords) {
      try {
        themedWordLists.custom = JSON.parse(savedWords);
      } catch (error) {
        console.error('Error loading custom words:', error);
      }
    }
  }
}

// Initialize by loading from storage
if (typeof window !== 'undefined') {
  loadCustomWordsFromStorage();
}
