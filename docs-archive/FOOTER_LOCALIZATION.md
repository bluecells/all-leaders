# Footer Localization (IT-FR-EN)

## Overview

The Footer component (`src/components/Footer.astro`) is now fully localized to support Italian, French, and English languages. The translations are managed through a centralized translation file.

## Files Structure

### 1. Translation File
**Location:** `src/data/footerTranslations.ts`

This file contains all footer text translations for three languages:
- **Italian (it):** Default language
- **French (fr):** French language
- **English (en):** English language

Each translation object includes:
- Company information
- Navigation labels
- Newsletter text
- Social media labels
- Copyright text

### 2. Footer Component
**Location:** `src/components/Footer.astro`

The Footer component now accepts a `lang` prop:
```astro
interface Props {
  lang?: 'it' | 'fr' | 'en';
}
```

Key features:
- Accepts language via props
- Automatically selects correct translations
- Generates language-specific navigation links
- Handles language prefix for URLs (e.g., `/fr/`, `/en/`)

### 3. Layout Integration
**Location:** `src/layouts/Layout.astro`

The Layout component passes the language to Footer:
```astro
<Footer lang={pageLang} />
```

All child layouts inherit this behavior:
- `LayoutBlog.astro`
- `LayoutRooms.astro`
- `LayoutFaq.astro`

## How It Works

### URL Language Detection

The Footer automatically generates correct URLs based on the language:

```typescript
// Language prefix handling
const langPrefix = lang === 'it' ? '' : `/${lang}`;

// Navigation links
const navigationLinks = {
  coliving: `${langPrefix}/coliving-in-sardegna`,
  sustainability: `${langPrefix}/ospitalita-sostenibile`,
  blog: `${langPrefix}/blog`,
  faq: `${langPrefix}/faq`,
};
```

**Examples:**
- Italian: `/coliving-in-sardegna`
- French: `/fr/coliving-en-sardegna`
- English: `/en/coliving-in-sardegna`

### Translation Usage

```astro
// Access translations
const t = footerTranslations[lang as Language];

// Use in template
{t.company}        // "Limòlo 56 Eco House" (all languages)
{t.explore}        // "Esplora" (IT) | "Explorer" (FR) | "Explore" (EN)
{t.coliving}       // "Coliving" (IT) | "Co-living" (FR) | "Co-living" (EN)
{t.sustainability} // "Ospitalità Sostenibile" (IT) | "Hospitalité Durable" (FR) | "Sustainable Hospitality" (EN)
```

## Translations Included

### Contact Section
- Company name
- Address (same in all languages)
- City and ZIP code
- VAT/SIRET information
- WhatsApp label

### Navigation Section
- "Explore" heading
- Coliving link
- Sustainability link
- Blog link
- FAQ link

### Newsletter Section
- "Keep in Touch" heading
- Newsletter description text
- "Subscribe" button text
- "56 Green" label

### Footer Bottom
- Social media labels (Instagram, Facebook, LinkedIn)
- Copyright text with Blue Cells attribution

## Adding New Languages

To add a new language (e.g., Spanish/es):

1. Add a new entry in `src/data/footerTranslations.ts`:
```typescript
es: {
  company: 'Limòlo 56 Eco House',
  address: 'Via Cesare Battisti 56',
  // ... other translations
},
```

2. Update the Language type:
```typescript
export type Language = keyof typeof footerTranslations;
```

3. Update Footer component Props (if needed):
```typescript
interface Props {
  lang?: 'it' | 'fr' | 'en' | 'es';
}
```

4. Update Layout component Props (if needed):
```typescript
lang?: 'it' | 'fr' | 'en' | 'es';
```

## Testing

To test the localized footer:

1. **Italian version:** Visit any Italian page (default)
   - Example: `/home`, `/coliving-in-sardegna`

2. **French version:** Visit any French page
   - Example: `/fr/accueil`, `/fr/coliving-en-sardegna`

3. **English version:** Visit any English page
   - Example: `/en/home`, `/en/coliving`

Each version should display:
- Correctly translated text
- Language-specific navigation links
- Proper URL routing

## Notes

- All contact information (phone, email, etc.) remains the same across languages
- Social media links are universal
- The year in copyright is automatically calculated
- All styles remain unchanged; only text is localized
