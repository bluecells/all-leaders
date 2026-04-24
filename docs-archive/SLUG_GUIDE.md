# Guide des Slugs SEO

## Traductions i18n des URLs

Les segments d'URL sont traduits automatiquement selon la langue. **L'italien étant la langue par défaut, il n'a pas de préfixe de langue.**

| Type | IT (défaut) | FR | EN |
|------|-------------|-------|--------|
| Rooms | `/camere/` | `/fr/chambres/` | `/en/rooms/` |
| Blog | `/blog/` | `/fr/blog/` | `/en/blog/` |
| FAQ | `/faq/` | `/fr/faq/` | `/en/faq/` |

**Exemples** :
- Italien : `/camere/coast` (sans préfixe `/it/`)
- Français : `/fr/chambres/coast`
- Anglais : `/en/rooms/coast`

## Structure des fichiers de pages

Pour que l'italien soit accessible sans préfixe `/it/`, les pages sont organisées ainsi :

```
src/pages/
├── camere/[...slug].astro       # Italien (langue par défaut)
├── fr/
│   └── chambres/[...slug].astro # Français
└── en/
    └── rooms/[...slug].astro    # Anglais
```

## Utilisation dans Keystatic

### Pour toutes les collections

Le champ `seoSlug` est disponible dans l'admin Keystatic pour personnaliser l'URL de chaque entrée.

- **Si vide** : Le slug sera généré automatiquement depuis le titre/nom
- **Si rempli** : Le slug personnalisé sera utilisé

### Pour les Articles

Le champ `seoSlug` affiche automatiquement la catégorie en préfixe.

**Exemple** :
- Catégorie : `guides`
- seoSlug : `visiter-cabras`
- URL finale : `/blog/guides/visiter-cabras`

Si vous changez la catégorie, le préfixe change automatiquement dans l'URL finale.

## Utilisation dans le code Astro

```typescript
import { generateSeoSlug, generateUrl } from '@/utils/slugify';
import { getCollection } from 'astro:content';

// Récupérer une room
const rooms = await getCollection('rooms');
const room = rooms[0];

// Générer le slug SEO
const slug = generateSeoSlug({
  seoSlug: room.data.seoSlug,
  nameDisplay: room.data.nameDisplay,
  name: room.data.name,
});

// Générer l'URL complète avec traduction i18n
const url = generateUrl(room.data.lang, slug, 'room');
// Résultat : /camere/coast (pour IT) ou /fr/chambres/coast (pour FR)
```

### Exemple pour les articles

```typescript
const articles = await getCollection('articles');
const article = articles[0];

// Le slug inclut automatiquement la catégorie
const slug = generateSeoSlug({
  seoSlug: article.data.seoSlug,
  title: article.data.title,
  category: article.data.category, // 'guides', 'news', etc.
});

const url = generateUrl(article.data.lang, slug, 'article');
// Résultat : /blog/guides/slug-article
```

## Règles de slugification

Les slugs sont automatiquement :
- Convertis en minuscules
- Débarrassés des accents
- Les espaces remplacés par des tirets
- Les caractères spéciaux supprimés

**Exemple** : "Camera Coast: La più bella" → "camera-coast-la-piu-bella"
