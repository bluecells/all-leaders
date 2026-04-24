export const reviewsTranslations = {
  it: {
    title: 'Cosa dicono di noi',
  },
  fr: {
    title: "Ce qu'on dit de nous",
  },
  en: {
    title: 'What they say about us',
  },
} as const;

export type Language = keyof typeof reviewsTranslations;
export type ReviewsTranslation = typeof reviewsTranslations.it;
