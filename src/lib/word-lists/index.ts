import * as enWordLists from './en';
import * as esWordLists from './es';

export type WordLists = {
  adjectives: string[];
  nouns: string[];
  verbs: string[];
};

export const wordLists: Record<string, WordLists> = {
  en: enWordLists,
  es: esWordLists,
};

export function getWordListsByLocale(locale: string): WordLists {
  return wordLists[locale] || wordLists.en; // Fallback to English if locale not found
}
