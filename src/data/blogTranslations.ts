export const blogTranslations = {
  it: {
    cta: 'Leggere',
    search: 'Cerca',
    searchPlaceholder: 'Cerca un articolo...',
    categories: 'Categorie',
    allCategories: 'Tutte',
    noResults: 'Nessun articolo trovato.',
    categoryLabels: {
      'green-events': 'Eventi Green',
      'eco-stay': 'Soggiorno eco',
      sustainability: 'Sostenibilità',
      territory: 'Territorio',
    },
  },
  fr: {
    cta: 'Lire',
    search: 'Rechercher',
    searchPlaceholder: 'Rechercher un article...',
    categories: 'Catégories',
    allCategories: 'Toutes',
    noResults: 'Aucun article trouvé.',
    categoryLabels: {
      'green-events': 'Événements Verts',
      'eco-stay': 'Séjour éco',
      sustainability: 'Durabilité',
      territory: 'Territoire',
    },
  },
  en: {
    cta: 'Read',
    search: 'Search',
    searchPlaceholder: 'Search an article...',
    categories: 'Categories',
    allCategories: 'All',
    noResults: 'No article found.',
    categoryLabels: {
      'green-events': 'Green Events',
      'eco-stay': 'Eco Stay',
      sustainability: 'Sustainability',
      territory: 'Territory',
    },
  },
} as const;

export type Language = keyof typeof blogTranslations;
export type BlogTranslation = typeof blogTranslations.it;
