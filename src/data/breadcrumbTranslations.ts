export const breadcrumbTranslations = {
  it: {
    home: 'Home',
    faq: 'FAQ',
  },
  fr: {
    home: 'Accueil',
    faq: 'FAQ',
  },
  en: {
    home: 'Home',
    faq: 'FAQ',
  },
} as const;

export type Language = keyof typeof breadcrumbTranslations;
export type BreadcrumbTranslation = typeof breadcrumbTranslations.it;
