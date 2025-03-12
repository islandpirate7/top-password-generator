import * as enWordLists from './en';
import * as esWordLists from './es';
import * as frWordLists from './fr';
import * as deWordLists from './de';

export type WordLists = {
  adjectives: string[];
  nouns: string[];
  verbs: string[];
};

export const wordLists: Record<string, WordLists> = {
  en: enWordLists,
  es: esWordLists,
  fr: frWordLists,
  de: deWordLists,
};

export function getWordListsByLocale(locale: string): WordLists {
  return wordLists[locale] || wordLists.en; // Fallback to English if locale not found
}
