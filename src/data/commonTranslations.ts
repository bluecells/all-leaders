/**
 * Common translations used across multiple components
 */
export const commonTranslations = {
  it: {
    // Locale codes
    localeCode: 'it_IT',
    defaultDescription: 'Limolò - Turismo responsabile e co-living in Sardegna',
    home: 'Home',
  },
  fr: {
    // Locale codes
    localeCode: 'fr_FR',
    defaultDescription: 'Limolò - Tourisme responsable et co-living en Sardaigne',
    home: 'Accueil',
  },
  en: {
    // Locale codes
    localeCode: 'en_GB',
    defaultDescription: 'Limolò - Responsible tourism and co-living in Sardinia',
    home: 'Home',
  },
} as const;

export type Language = keyof typeof commonTranslations;
export type CommonTranslation = typeof commonTranslations.it;
