# Translation System Guide

## Overview

The translation system is now fully centralized in the `src/data/` directory. All hardcoded strings have been extracted from components and organized by feature/component.

## File Structure

```
src/data/
├── translations.ts                    # Central registry & helpers
├── footerTranslations.ts              # Footer (all sections)
├── blogTranslations.ts                # Blog component (search, filters, categories)
├── actionBarTranslations.ts           # Action bar (book, call, etc.)
├── contactFormTranslations.ts         # Contact form (labels, placeholders, messages)
├── reviewsTranslations.ts             # Reviews component (section title)
├── breadcrumbTranslations.ts          # Breadcrumb navigation
└── commonTranslations.ts              # Shared translations (locale codes, defaults)
```

## Languages Supported

- **Italian (it):** `it_IT` locale code
- **French (fr):** `fr_FR` locale code
- **English (en):** `en_GB` locale code

## How to Use

### 1. Import Translations

```typescript
// Import specific translation
import { footerTranslations } from '@/data/footerTranslations';

// Or import from central registry
import { footerTranslations, blogTranslations } from '@/data/translations';
```

### 2. Use in Components

```astro
---
import { footerTranslations } from '@/data/footerTranslations';

interface Props {
  lang?: 'it' | 'fr' | 'en';
}

const { lang = 'it' } = Astro.props;
const t = footerTranslations[lang];
---

<footer>
  <h3>{t.company}</h3>
  <p>{t.keepInTouch}</p>
</footer>
```

### 3. With Language Detection

```astro
---
import { getTranslation } from '@/data/translations';
import { blogTranslations } from '@/data/translations';

const lang = Astro.props.lang || 'it';
const t = getTranslation(blogTranslations, lang);
---

<section>
  <h2>{t.categories}</h2>
  <p>{t.noResults}</p>
</section>
```

## Translation Files Reference

### footerTranslations.ts
Footer component - company info, navigation, newsletter, social media

**Keys:**
- `company`, `address`, `city`, `vat`, `iun`
- `explore`, `coliving`, `sustainability`, `blog`, `faq`
- `keepInTouch`, `newsletterText`, `subscribe`, `newsletter56Green`
- `instagram`, `facebook`, `linkedin`, `copyright`, `blueCells`

### blogTranslations.ts
Blog component - search, categories, CTA buttons

**Keys:**
- `cta` - "Read" / "Lire" / "Leggere"
- `search`, `searchPlaceholder`
- `categories`, `allCategories`, `noResults`
- `categoryLabels` - Object with category translations:
  - `green-events`
  - `eco-stay`
  - `sustainability`
  - `territory`

### actionBarTranslations.ts
Action bar - CTA buttons (book, call, WhatsApp, email, map)

**Keys:**
- `book`, `call`, `whatsapp`, `email`, `map`

### contactFormTranslations.ts
Contact form - all labels, placeholders, and messages

**Keys:**
- Form fields: `name`, `email`, `phone`, `subject`, `message`
- Placeholders: `*Placeholder` versions
- Messages: `sendButton`, `successMessage`, `errorMessage`, `loadingText`

### reviewsTranslations.ts
Reviews component - section title

**Keys:**
- `title` - "Cosa dicono di noi" / "Ce qu'on dit de nous" / "What they say about us"

### breadcrumbTranslations.ts
Breadcrumb navigation - page labels

**Keys:**
- `home`, `faq`

### commonTranslations.ts
Shared translations across components

**Keys:**
- `localeCode` - Locale for Intl API (e.g., 'it_IT', 'fr_FR', 'en_GB')
- `defaultDescription` - Default meta description
- `home` - Home link label

## Adding New Translations

### 1. Create a New Translation File

```typescript
// src/data/myComponentTranslations.ts
export const myComponentTranslations = {
  it: {
    label1: 'Etichetta 1',
    label2: 'Etichetta 2',
  },
  fr: {
    label1: 'Étiquette 1',
    label2: 'Étiquette 2',
  },
  en: {
    label1: 'Label 1',
    label2: 'Label 2',
  },
} as const;

export type Language = keyof typeof myComponentTranslations;
export type MyComponentTranslation = typeof myComponentTranslations.it;
```

### 2. Export from Central Registry

Update `src/data/translations.ts`:

```typescript
export { myComponentTranslations } from './myComponentTranslations';
```

### 3. Use in Component

```astro
---
import { myComponentTranslations } from '@/data/translations';

const lang = Astro.props.lang || 'it';
const t = myComponentTranslations[lang];
---

<div>
  <p>{t.label1}</p>
  <p>{t.label2}</p>
</div>
```

## Best Practices

### 1. Always Use Type-Safe Keys
```typescript
// ✅ Good - TypeScript checks keys exist
const t = blogTranslations[lang];
const title = t.categories;

// ❌ Bad - No type checking
const title = t['unknown_key'];
```

### 2. Group Related Translations
```typescript
// ✅ Good - Nested by category
categoryLabels: {
  'green-events': 'Événements Verts',
  'eco-stay': 'Séjour éco',
}

// ❌ Bad - Flat and mixed
greenEventsLabel: 'Événements Verts',
ecoStayLabel: 'Séjour éco',
```

### 3. Use Consistent Naming
```typescript
// ✅ Good - Clear verb + noun pattern
sendButton: 'Send',
successMessage: 'Success!',
errorMessage: 'Error occurred',

// ❌ Bad - Inconsistent naming
btn_send: 'Send',
msg_success: 'Success!',
err: 'Error occurred',
```

### 4. Keep Translations Complete
Every language should have every key:
```typescript
// ✅ Good - All keys in all languages
it: { key1: 'Value1', key2: 'Value2' },
fr: { key1: 'Valeur1', key2: 'Valeur2' },
en: { key1: 'Value1', key2: 'Value2' },

// ❌ Bad - Missing French translation
it: { key1: 'Value1', key2: 'Value2' },
fr: { key1: 'Valeur1' },  // Missing key2!
en: { key1: 'Value1', key2: 'Value2' },
```

## Migration Checklist

- [x] Footer translations extracted (`footerTranslations.ts`)
- [x] Blog translations extracted (`blogTranslations.ts`)
- [x] ActionBar translations extracted (`actionBarTranslations.ts`)
- [x] ContactForm translations extracted (`contactFormTranslations.ts`)
- [x] Reviews translations extracted (`reviewsTranslations.ts`)
- [x] Breadcrumb translations extracted (`breadcrumbTranslations.ts`)
- [x] Common translations created (`commonTranslations.ts`)
- [x] Central registry created (`translations.ts`)
- [ ] Update Footer.astro to use footerTranslations
- [ ] Update Blog.astro to use blogTranslations
- [ ] Update ActionBar.astro to use actionBarTranslations
- [ ] Update ContactForm.astro to use contactFormTranslations
- [ ] Update Reviews.astro to use reviewsTranslations
- [ ] Update Breadcrumb.astro to use breadcrumbTranslations
- [ ] Update Head.astro to use commonTranslations

## Components Still Using Hardcoded Strings

**Not yet migrated:**
1. `SearchIA.astro` - Many French strings (requires more complex refactoring)
2. `HeroSearch.astro` - Default props

These can be migrated in a future iteration.

## Testing

To verify translations are working:

1. Test each language version:
   ```
   Italian: /page
   French: /fr/page
   English: /en/page
   ```

2. Check that all UI text appears in correct language

3. Verify URLs are correctly localized (e.g., `/fr/coliving-en-sardaigne`)

## Troubleshooting

### Missing Translation Key

If you see `undefined` in the UI:

1. Check the key exists in your translation object
2. Verify spelling matches exactly
3. Ensure all three languages have the key
4. Check the language code is correct ('it', 'fr', 'en')

### Wrong Language Displayed

If the wrong language shows:

1. Verify the `lang` prop is being passed correctly
2. Check the language code in the URL
3. Ensure the route component is detecting language correctly
4. Check browser console for errors

## Contributing

When adding new translations:

1. Create translations file in `src/data/`
2. Follow naming conventions (camelCase for keys)
3. Add all three languages
4. Export from `translations.ts`
5. Update this guide with new keys
6. Test in all three languages
