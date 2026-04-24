export const actionBarTranslations = {
  it: {
    book: 'Prenota',
    call: 'Chiama',
    whatsapp: 'Whatsapp',
    email: 'Email',
    map: 'Mappa',
  },
  fr: {
    book: 'Réserver',
    call: 'Appeler',
    whatsapp: 'Whatsapp',
    email: 'Email',
    map: 'Carte',
  },
  en: {
    book: 'Book',
    call: 'Call',
    whatsapp: 'Whatsapp',
    email: 'Email',
    map: 'Map',
  },
} as const;

export type Language = keyof typeof actionBarTranslations;
export type ActionBarTranslation = typeof actionBarTranslations.it;
