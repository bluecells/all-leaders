/**
 * Helper functions for managing split bilingual collections (articlesFR/EN, accompagnementsFR/EN)
 *
 * This module provides utilities to:
 * - Merge split collections back together
 * - Deduce language from collection name
 * - Filter entries by language
 */

import { getCollection, type CollectionEntry } from 'astro:content';

// Type to track language metadata with entries
type EntryWithLang<T extends CollectionEntry<any>> = T & { _lang?: 'fr' | 'en' };

/**
 * Gets all articles from both FR and EN collections
 * @returns Combined array of articles from both languages with language metadata
 */
export async function getAllArticles(): Promise<CollectionEntry<'articlesFR' | 'articlesEN'>[]> {
  const [articlesFR, articlesEN] = await Promise.all([
    getCollection('articlesFR'),
    getCollection('articlesEN')
  ]);

  // Add language metadata based on which collection they came from
  const frWithMeta = articlesFR.map((a) => {
    (a as EntryWithLang<any>)._lang = 'fr';
    return a;
  });

  const enWithMeta = articlesEN.map((a) => {
    (a as EntryWithLang<any>)._lang = 'en';
    return a;
  });

  return [...frWithMeta, ...enWithMeta];
}

/**
 * Gets all accompagnements from both FR and EN collections
 * @returns Combined array of accompagnements from both languages with language metadata
 */
export async function getAllAccompagnements(): Promise<CollectionEntry<'accompagnementsFR' | 'accompagnementsEN'>[]> {
  const [accompagnementsFR, accompagnementsEN] = await Promise.all([
    getCollection('accompagnementsFR'),
    getCollection('accompagnementsEN')
  ]);

  const frWithMeta = accompagnementsFR.map((a) => {
    (a as EntryWithLang<any>)._lang = 'fr';
    return a;
  });

  const enWithMeta = accompagnementsEN.map((a) => {
    (a as EntryWithLang<any>)._lang = 'en';
    return a;
  });

  return [...frWithMeta, ...enWithMeta];
}

/**
 * Gets all FAQs from both FR and EN collections
 * @returns Combined array of FAQs from both languages with language metadata
 */
export async function getAllFaqs(): Promise<CollectionEntry<'faqFR' | 'faqEN'>[]> {
  const [faqFR, faqEN] = await Promise.all([
    getCollection('faqFR'),
    getCollection('faqEN')
  ]);

  const frWithMeta = faqFR.map((f) => {
    (f as EntryWithLang<any>)._lang = 'fr';
    return f;
  });

  const enWithMeta = faqEN.map((f) => {
    (f as EntryWithLang<any>)._lang = 'en';
    return f;
  });

  return [...frWithMeta, ...enWithMeta];
}

/**
 * Deduces language from entry metadata set during collection merging
 * Astro 6 with glob() loaders doesn't include language in the id,
 * so we attach it as metadata during the merge process.
 *
 * @param entry - Collection entry (article, accompagnement, FAQ, etc.)
 * @returns Language code ('fr' or 'en')
 */
export function getLang(entry: CollectionEntry<any>): 'fr' | 'en' {
  const entryWithMeta = entry as EntryWithLang<any>;
  if (entryWithMeta._lang) {
    return entryWithMeta._lang;
  }

  // Fallback: try to deduce from id (for legacy support)
  if (entry.id.startsWith('fr/')) return 'fr';
  return 'en';
}

/**
 * Filters collection entries by language
 *
 * @param entries - Array of collection entries
 * @param lang - Target language ('fr' or 'en')
 * @returns Filtered array containing only entries of the specified language
 */
export function filterByLang<T extends CollectionEntry<any>>(
  entries: T[],
  lang: 'fr' | 'en'
): T[] {
  return entries.filter(e => getLang(e) === lang);
}
