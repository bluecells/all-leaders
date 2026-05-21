export const breadcrumbTranslations = {
  it: {
    home: 'Home',
    faq: 'FAQ',
    accompagnements: 'Services',
    ariaLabel: 'Breadcrumb',
    smallWords: new Set(['and', 'or', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']),
  },
  fr: {
    home: 'Accueil',
    faq: 'FAQ',
    accompagnements: 'Accompagnements',
    ariaLabel: 'Fil d\'Ariane',
    smallWords: new Set(['de', 'la', 'le', 'et', 'ou', 'à', 'un', 'une', 'en', 'au', 'aux', 'sur', 'sous', 'pour', 'par', 'du', 'les']),
  },
  en: {
    home: 'Home',
    faq: 'FAQ',
    accompagnements: 'Services',
    ariaLabel: 'Breadcrumb',
    smallWords: new Set(['and', 'or', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']),
  },
} as const;

export type Language = keyof typeof breadcrumbTranslations;
export type BreadcrumbTranslation = typeof breadcrumbTranslations.it;
