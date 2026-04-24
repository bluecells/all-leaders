import type { FleschScore } from '../types';

/**
 * Calculate Flesch Reading Ease Score
 * Adapted for French/Italian/English
 *
 * Formula: 206.835 - 1.015 * (words/sentences) - 84.6 * (syllables/words)
 *
 * Score interpretation:
 * 90-100: Very Easy
 * 80-89: Easy
 * 70-79: Fairly Easy
 * 60-69: Standard
 * 50-59: Fairly Difficult
 * 30-49: Difficult
 * 0-29: Very Difficult
 */

/**
 * Count syllables in a word (approximation)
 * Works reasonably well for Romance languages
 */
function countSyllables(word: string): number {
  word = word.toLowerCase().trim();
  if (word.length <= 3) return 1;

  // Remove common endings that don't add syllables
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');

  // Count vowel groups
  const vowelGroups = word.match(/[aeiouy]{1,2}/g);
  return vowelGroups ? vowelGroups.length : 1;
}

/**
 * Split text into sentences
 * Handles common punctuation: . ! ? and also handles abbreviations
 */
function splitSentences(text: string): string[] {
  // Remove common abbreviations to avoid false splits
  const cleaned = text
    .replace(/\b(dr|mr|mrs|ms|prof|sr|jr)\./gi, '$1')
    .replace(/\b([A-Z])\./g, '$1'); // Single letter abbreviations

  // Split on sentence endings
  const sentences = cleaned
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  return sentences.length > 0 ? sentences : [text];
}

/**
 * Split text into words
 * Removes punctuation and splits on whitespace
 */
function splitWords(text: string): string[] {
  return text
    .replace(/[^\w\s'-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 0);
}

/**
 * Calculate Flesch Reading Ease Score
 */
export function calculateFleschScore(text: string): FleschScore {
  if (!text || text.trim().length === 0) {
    return {
      score: 0,
      interpretation: 'No content to analyze',
      avgSentenceLength: 0,
      avgWordLength: 0
    };
  }

  const sentences = splitSentences(text);
  const words = splitWords(text);

  if (words.length === 0 || sentences.length === 0) {
    return {
      score: 0,
      interpretation: 'Insufficient content',
      avgSentenceLength: 0,
      avgWordLength: 0
    };
  }

  // Count total syllables
  const totalSyllables = words.reduce((sum, word) => sum + countSyllables(word), 0);

  // Calculate averages
  const avgSentenceLength = words.length / sentences.length;
  const avgSyllablesPerWord = totalSyllables / words.length;
  const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length;

  // Flesch Reading Ease formula
  const score = Math.max(
    0,
    Math.min(
      100,
      206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord
    )
  );

  // Interpretation
  let interpretation: string;
  if (score >= 90) interpretation = 'Very Easy - Understood by 11-year-old';
  else if (score >= 80) interpretation = 'Easy - Conversational English';
  else if (score >= 70) interpretation = 'Fairly Easy - Acceptable for most readers';
  else if (score >= 60) interpretation = 'Standard - Easily understood by 13-15 year olds';
  else if (score >= 50) interpretation = 'Fairly Difficult - High school level';
  else if (score >= 30) interpretation = 'Difficult - College level';
  else interpretation = 'Very Difficult - University graduate level';

  return {
    score: Math.round(score * 10) / 10,
    interpretation,
    avgSentenceLength: Math.round(avgSentenceLength * 10) / 10,
    avgWordLength: Math.round(avgWordLength * 10) / 10
  };
}
