import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generatePassword(length: number, options: {
  uppercase?: boolean
  lowercase?: boolean
  numbers?: boolean
  symbols?: boolean
}) {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
  const numberChars = '0123456789'
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  let chars = ''
  if (options.uppercase) chars += uppercaseChars
  if (options.lowercase) chars += lowercaseChars
  if (options.numbers) chars += numberChars
  if (options.symbols) chars += symbolChars

  if (chars === '') chars = lowercaseChars + numberChars // default fallback

  let password = ''
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return password
}

import { getWordListsByLocale } from './word-lists/index'

export function generateMemorablePassword(
  wordCount: number,
  options: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  },
  locale: string = 'en'
): string {
  // Get word lists for the specified locale
  const { adjectives, nouns, verbs } = getWordListsByLocale(locale);
  
  // Create a pattern of word types for more natural combinations
  const pattern = [];
  for (let i = 0; i < wordCount; i++) {
    switch (i % 3) {
      case 0:
        pattern.push(adjectives); // Start with an adjective
        break;
      case 1:
        pattern.push(nouns); // Follow with a noun
        break;
      case 2:
        pattern.push(verbs); // End with a verb
        break;
    }
  }

  // Select random words following the pattern
  const selectedWords = pattern.map(wordList => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
  });

  let password = selectedWords.join('');

  // Apply filters
  if (options.uppercase) {
    // Randomly capitalize letters throughout the password instead of just first letters
    password = password.split('').map(char => {
      // About 30% chance to capitalize any letter
      return char.match(/[a-z]/i) && Math.random() < 0.3 ? char.toUpperCase() : char;
    }).join('');
  } else {
    password = password.toLowerCase();
  }

  if (options.numbers) {
    // Add random numbers between words
    password = password.replace(/([a-zA-Z])([a-zA-Z])/g, (match, p1, p2) => {
      const shouldAddNumber = Math.random() > 0.5;
      return shouldAddNumber ? `${p1}${Math.floor(Math.random() * 10)}${p2}` : match;
    });
  }

  if (options.symbols) {
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    // Add random symbols between words
    password = password.replace(/([a-zA-Z0-9])([a-zA-Z])/g, (match, p1, p2) => {
      const shouldAddSymbol = Math.random() > 0.5;
      return shouldAddSymbol ? `${p1}${symbols[Math.floor(Math.random() * symbols.length)]}${p2}` : match;
    });
  }

  return password;
}

export function generatePin(length: number = 4) {
  let pin = '';
  for (let i = 0; i < length; i++) {
    pin += Math.floor(Math.random() * 10).toString();
  }
  return pin;
}

export type PasswordStrength = 'weak' | 'medium' | 'strong' | 'very-strong';

export function evaluatePasswordStrength(password: string): { 
  score: number; 
  strength: PasswordStrength;
  feedback: string;
} {
  if (!password) {
    return { 
      score: 0, 
      strength: 'weak',
      feedback: 'Password is empty'
    };
  }

  let score = 0;
  const feedback: string[] = [];

  // Length check
  if (password.length < 8) {
    feedback.push('Password is too short');
  } else if (password.length >= 12) {
    score += 2;
  } else {
    score += 1;
  }

  // Character variety checks
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[^A-Za-z0-9]/.test(password);

  if (hasLowercase) score += 1;
  if (hasUppercase) score += 1;
  if (hasNumbers) score += 1;
  if (hasSpecialChars) score += 1;

  // Complexity check
  const charVariety = [hasLowercase, hasUppercase, hasNumbers, hasSpecialChars].filter(Boolean).length;
  if (charVariety < 3) {
    feedback.push('Add more variety (uppercase, lowercase, numbers, symbols)');
  }

  // Repetition check
  const repeatedChars = /(.)\1{2,}/.test(password);
  if (repeatedChars) {
    score -= 1;
    feedback.push('Avoid repeated characters');
  }

  // Common patterns check
  const commonPatterns = [
    /^123/, /abc/, /qwerty/, /password/i, /admin/i, /welcome/i
  ];
  
  if (commonPatterns.some(pattern => pattern.test(password))) {
    score -= 1;
    feedback.push('Avoid common patterns and words');
  }

  // Determine strength based on score
  let strength: PasswordStrength = 'weak';
  if (score >= 6) {
    strength = 'very-strong';
  } else if (score >= 4) {
    strength = 'strong';
  } else if (score >= 3) {
    strength = 'medium';
  }

  // Default feedback if none provided
  if (feedback.length === 0) {
    if (strength === 'weak') {
      feedback.push('Password is too weak');
    } else if (strength === 'medium') {
      feedback.push('Password could be stronger');
    } else if (strength === 'strong') {
      feedback.push('Good password');
    } else {
      feedback.push('Excellent password');
    }
  }

  return {
    score,
    strength,
    feedback: feedback.join('. ')
  };
}
