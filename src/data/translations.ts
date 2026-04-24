/**
 * Central translations registry
 * Import all translation files here and export them for easy access
 */

export { footerTranslations, type Language as FooterLanguage, type FooterTranslation } from './footerTranslations';
export { blogTranslations, type Language as BlogLanguage, type BlogTranslation } from './blogTranslations';
export { actionBarTranslations, type Language as ActionBarLanguage, type ActionBarTranslation } from './actionBarTranslations';
export { contactFormTranslations, type Language as ContactFormLanguage, type ContactFormTranslation } from './contactFormTranslations';
export { reviewsTranslations, type Language as ReviewsLanguage, type ReviewsTranslation } from './reviewsTranslations';
export { breadcrumbTranslations, type Language as BreadcrumbLanguage, type BreadcrumbTranslation } from './breadcrumbTranslations';
export { commonTranslations, type Language as CommonLanguage, type CommonTranslation } from './commonTranslations';

/**
 * Type-safe language literal
 */
export type SupportedLanguage = 'it' | 'fr' | 'en';

/**
 * Helper function to get translation with fallback
 */
export function getTranslation<T extends Record<string, any>>(
  translationObject: T,
  lang: string,
  defaultLang: 'it' = 'it'
): T[keyof T] {
  const normalizedLang = lang as keyof T;
  return translationObject[normalizedLang] || translationObject[defaultLang];
}
