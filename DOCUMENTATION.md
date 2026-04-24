# Documentation Limolo House - Site Web

## 1. Vue d'ensemble du projet

Limolo House est un B&B éco-responsable situé à Cabras, en Sardaigne. Le site web est une application multilingue (IT/FR/EN) construite avec des technologies modernes pour offrir une expérience performante et maintenable.

**Technologies utilisées:**

- **Astro 5** - Framework web moderne avec rendu SSR
- **Keystatic** - CMS headless pour la gestion de contenu
- **Tailwind CSS v4** - Framework CSS utilitaire
- **React** - Pour les composants interactifs
- **TypeScript** - Typage statique

**Architecture générale:**

- Mode SSR (Server-Side Rendering) avec Node adapter
- Site multilingue (IT par défaut, FR/EN avec préfixe)
- Gestion de contenu via Keystatic Cloud
- Déploiement sur O2Switch

## 2. Installation et configuration

### 2.1 Prérequis

- Node.js 18 ou supérieur
- Git
- Compte GitHub (pour Keystatic Cloud)

### 2.2 Installation locale

```bash
# Clone du repository
git clone https://github.com/bluecells/all-leaders.git
cd all-leaders

# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:4321`

### 2.3 Configuration Astro

**Fichier:** `astro.config.mjs`

**Mode SSR:**

- Adapter Node pour le rendu côté serveur
- Output: "server"

**Configuration i18n:**

- Locale par défaut: Italien (`it`)
- Locales supportées: `it`, `fr`, `en`
- Italien sans préfixe d'URL, FR et EN avec préfixe (`/fr/`, `/en/`)

**Intégrations:**

- `@astrojs/react` - Support React pour composants interactifs
- `@astrojs/markdoc` - Support Markdoc pour le contenu
- `@keystatic/astro` - Intégration Keystatic CMS
- `@astrojs/sitemap` - Génération automatique du sitemap

### 2.4 Configuration Keystatic

**Fichier:** `keystatic.config.tsx`

**Storage:**

- **Production:** Cloud (blue-cells-editors/all-leaders)
- **Développement:** Local (fichiers locaux)

**Accès:**

- Interface Keystatic disponible sur `/keystatic` en mode dev
- Interface disponible sur `/edit` en production

## 3. Architecture du site

### 3.1 Structure des dossiers

```
all-leaders/
├── src/
│   ├── pages/              # Pages statiques et routing dynamique
│   │   ├── [...route].astro   # Router principal
│   │   ├── all-leadersgiche.astro  # Landing blog IT
│   │   ├── fr/all-leadersgiche.astro  # Blog FR
│   │   ├── en/all-leadersgiche.astro  # Blog EN
│   │   ├── checkout.astro      # Page réservation
│   │   ├── 404.astro          # Pages 404 localisées
│   │   └── edit.astro         # Interface Keystatic
│   ├── content/           # Collections Keystatic
│   │   ├── pages/         # Pages de contenu (it/, fr/)
│   │   ├── articles/      # Articles de blog (it/, fr/)
│   │   ├── rooms/         # Chambres (it/, fr/)
│   │   ├── faq/          # Questions/réponses (it/, fr/)
│   │   ├── categories/   # Catégories YAML
│   │   ├── tags/         # Tags YAML
│   │   └── redirects/    # Redirections 301/302
│   ├── layouts/          # Layouts Astro
│   │   ├── Layout.astro       # Layout principal
│   │   ├── LayoutBlog.astro   # Layout articles
│   │   ├── LayoutRooms.astro  # Layout chambres
│   │   └── LayoutFaq.astro    # Layout FAQ
│   ├── components/       # Composants globaux
│   ├── content-components/  # Composants Markdoc (TSX)
│   ├── data/            # Traductions centralisées
│   ├── styles/          # global.css
│   └── utils/           # Utilitaires (hreflang, etc.)
├── public/              # Assets statiques
├── keystatic.config.tsx # Configuration Keystatic
├── astro.config.mjs    # Configuration Astro
├── tailwind.config.js  # Configuration Tailwind
└── deploy.sh           # Script de déploiement
```

### 3.2 Système de routing

#### Routing dynamique ([...route].astro)

Le fichier `[...route].astro` gère toutes les routes dynamiques du site.

**Ordre de priorité:**

1. **Redirects** - Vérification des redirections Keystatic
2. **Articles** - Articles de blog (`/all-leadersgiche/{categorySlug}/{articleSlug}`)
3. **Rooms** - Chambres (`/camere/`, `/chambres/`, `/rooms/`)
4. **Pages** - Pages de contenu
5. **FAQ** - Questions/réponses
6. **404** - Redirection vers page 404 localisée

**Parsing de langue:**

- IT: Pas de préfixe (ex: `/le-camere`)
- FR: Préfixe `/fr/` (ex: `/fr/les-chambres`)
- EN: Préfixe `/en/` (ex: `/en/rooms`)

**Patterns d'URL par type:**

| Type     | Italien                                     | Français                                       | Anglais                                        |
| -------- | ------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| Pages    | `/{seoSlug}`                                | `/fr/{seoSlug}`                                | `/en/{seoSlug}`                                |
| Articles | `/all-leadersgiche/{categorySlug}/{articleSlug}` | `/fr/all-leadersgiche/{categorySlug}/{articleSlug}` | `/en/all-leadersgiche/{categorySlug}/{articleSlug}` |
| Rooms    | `/camere/{seoSlug}`                         | `/fr/chambres/{seoSlug}`                       | `/en/rooms/{seoSlug}`                          |
| FAQ      | `/faq/{seoSlug}`                            | `/fr/faq/{seoSlug}`                            | `/en/faq/{seoSlug}`                            |

#### Pages statiques

- `/pages/all-leadersgiche.astro` - Landing blog IT
- `/pages/fr/all-leadersgiche.astro` - Landing blog FR
- `/pages/en/all-leadersgiche.astro` - Landing blog EN
- `/pages/checkout.astro` - Page de réservation avec booking engine
- `/pages/404.astro` - Pages d'erreur localisées (IT/FR/EN)
- `/pages/edit.astro` - Interface Keystatic (production)

### 3.3 Collections Keystatic

#### Singletons

**menuIT, menuFR, menuEN** - Menus de navigation

- Structure: Items principaux + sous-menus optionnels
- Champs: label, url, subItems[]
- Usage: Header.astro

#### Collections

**pages** (`src/content/pages/**`)

Organisation hiérarchique par langue et thématique (cabras-e-il-sinis/, ospitalita-sostenibile/, etc.)

**Champs:**

- `title` - Titre de la page (H1)
- `metaTitle` - Titre SEO (meta title)
- `metaDescription` - Description SEO
- `seoSlug` - Slug de l'URL
- `lang` - Langue (it/fr/en)
- `jsonType` - Type JSON-LD (page par défaut)
- `ogImage` - Image Open Graph (optionnel)
- `featuredPhoto` - Photo principale (image, alt)
- `content` - Contenu Markdoc avec support des 23 composants UI

**rooms** (`src/content/rooms/**`)

Chambres d'hôtel par langue (it/, fr/)

**Champs:**

- `roomId` - ID pour le booking engine
- `nameDisplay` - Nom d'affichage
- `punchline` - Phrase d'accroche
- `amenity1`, `amenity2`, `amenity3` - 3 caractéristiques principales
- `photos` - Max 6 photos (image, alt)
- `content` - Description Markdoc
- JSON-LD type: `hotelRoom`

**articles** (`src/content/articles/**`)

Blog organisé par langue (it/, fr/)

**Champs:**

- `title` - Titre de l'article
- `seoSlug` - Slug de l'URL
- `publishDate` - Date de publication
- `featured` - Article mis en avant (boolean)
- `category` - Catégorie (relationship)
- `tags` - Tags (array)
- `excerpt` - Extrait court
- `featuredPhoto` - Photo principale
- `metaTitle`, `metaDescription` - SEO
- `content` - Contenu Markdoc
- JSON-LD type: `blog`

**faq** (`src/content/faq/**`)

Questions/réponses par langue

**Champs:**

- `question` - Question (titre)
- `answer` - Réponse (Markdoc)
- `category` - Catégorie
- `order` - Ordre d'affichage
- `tag_slug` - Slug du tag (auto-généré par Keystatic)
- `metaTitle`, `metaDescription` - SEO
- JSON-LD type: `faq`

**categories** (`src/content/categories/*`)

Format: YAML

**Champs localisés:**

- `name_it`, `name_fr`, `name_en` - Noms
- `slug_it`, `slug_fr`, `slug_en` - Slugs pour URLs
- `description_it`, `description_fr`, `description_en` - Descriptions

**5 catégories:**

1. eventi-green
2. soggiorno-eco
3. sostenibilita
4. territorio
5. turismo-responsabile

**tags** (`src/content/tags/*`)

Format: YAML - Structure identique aux catégories

**5 tags:**

1. bioarchittura
2. hiking
3. sardegna
4. territorio
5. zone-umide

**redirects** (`src/content/redirects/*`)

Gestion des redirections 301/302

**Champs:**

- `from` - URL source (sans slash initial)
- `to` - URL destination (sans slash initial)
- `status` - Code HTTP (301 ou 302)
- `note` - Note explicative (optionnel)

### 3.4 Layouts

**Layout.astro** - Layout principal

Utilisé pour: Pages, FAQ

**Inclut:**

- Head.astro (meta tags, SEO)
- Header.astro (navigation)
- Footer.astro (footer trilingue)
- ActionBar.astro (barre de réservation flottante)
- SeoAnalyzer (analyseur SEO)

**Props:**

```typescript
{
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  lang?: 'it' | 'fr' | 'en';
  ogImage?: string;
  jsonType?: string;
  alternateUrls?: AlternateUrls | null;
}
```

**LayoutBlog.astro** - Articles de blog

**Features:**

- Badge catégorie avec couleur
- Date localisée (FormattedDate)
- Featured photo en haut
- Articles similaires (même catégorie)
- Fonction `cleanText()` pour encodage HTML

**LayoutRooms.astro** - Chambres

**Features:**

- Carousel de 6 photos max
- Specs (amenity1-3) avec icônes
- CTA booking avec roomId
- Carousel "Autres chambres" en bas (filtre langue)
- Intégration booking engine

**LayoutFaq.astro** - FAQ

Structure simple:

- Header: catégorie (badge) + question (H1)
- Contenu: réponse (Markdoc)

## 4. Système i18n

### 4.1 Configuration

**Locale par défaut:** Italien (`it`)
**Locales supportées:** `it`, `fr`, `en`

**Routing:**

- Italien: Sans préfixe (ex: `/le-camere`)
- Français: Préfixe `/fr/` (ex: `/fr/les-chambres`)
- Anglais: Préfixe `/en/` (ex: `/en/rooms`)

### 4.2 Organisation du contenu

```
src/content/
├── pages/
│   ├── it/
│   │   ├── cabras-e-il-sinis/
│   │   ├── ospitalita-sostenibile/
│   │   └── ...
│   └── fr/
│       ├── cabras-e-il-sinis/
│       ├── ospitalita-sostenibile/
│       └── ...
├── articles/
│   ├── it/
│   │   └── article1.mdoc
│   └── fr/
│       └── article1.mdoc
├── rooms/
│   ├── it/
│   └── fr/
└── faq/
    ├── it/
    └── fr/
```

**Matching des traductions:** Les traductions sont identifiées par le même nom de fichier dans les dossiers `it/`, `fr/`, `en/`.

### 4.3 Traductions centralisées (/src/data/)

**Registry central:**

- `translations.ts` - Exporte toutes les traductions

**Fichiers de traductions:**

- `commonTranslations.ts` - Textes communs (boutons, labels)
- `footerTranslations.ts` - Textes du footer
- `blogTranslations.ts` - Textes du blog (filtres, catégories)
- `actionBarTranslations.ts` - Textes de la barre d'action
- `contactFormTranslations.ts` - Textes du formulaire de contact
- `reviewsTranslations.ts` - Textes des avis clients
- `breadcrumbTranslations.ts` - Textes du fil d'Ariane

**Usage:**

```typescript
import { translations } from '@/data/translations';
const t = translations[lang];
console.log(t.common.readMore); // "Leggi di più" (IT)
```

## 5. Système hreflang (SEO multilingue)

### 5.1 Architecture

**Fichier:** `/src/utils/hreflang.ts`

**Interface:**

```typescript
export interface AlternateUrls {
  it: string;
  fr: string | null;
  en: string | null;
}
```

### 5.2 Fonctionnalités

- **Génération automatique** des URLs alternatives pour IT/FR/EN
- **Matching par nom de fichier** entre langues (ex: `le-camere.mdoc` → `it/le-camere.mdoc`, `fr/le-camere.mdoc`)
- **Support des slugs localisés:**
  - Catégories: `sostenibilita` (IT) → `durabilite` (FR)
  - Préfixes rooms: `camere` (IT) → `chambres` (FR) → `rooms` (EN)
- **Intégration dans tous les layouts** via prop `alternateUrls`

**Fonctions principales:**

- `buildPageUrl(page, lang)` - Construit l'URL d'une page
- `buildRoomUrl(room, lang)` - Construit l'URL d'une chambre
- `buildArticleUrl(article, lang, categories)` - Construit l'URL d'un article
- `buildFaqUrl(faq, lang)` - Construit l'URL d'une FAQ
- `findAlternateUrls(entry, type, collections)` - Trouve toutes les URLs alternatives

### 5.3 Génération dans Head.astro

```html
<!-- Si alternateUrls est fourni -->
<link rel="alternate" hreflang="it" href="https://all-leaders.fr/le-camere" />
<link rel="alternate" hreflang="fr" href="https://all-leaders.fr/fr/les-chambres" />
<link rel="alternate" hreflang="en" href="https://all-leaders.fr/en/rooms" />
<link rel="alternate" hreflang="x-default" href="https://all-leaders.fr/le-camere" />
```

Le tag `x-default` pointe toujours vers la version italienne (langue par défaut).

### 5.4 Calcul dans [...route].astro

```javascript
// Après avoir trouvé l'entry (page, article, room, faq)
let alternateUrls: AlternateUrls | null = null;
if (entry && type) {
  const allCategories = await getCollection('category');
  alternateUrls = await findAlternateUrls(entry, type, {
    pages,
    articles,
    rooms,
    faq,
    categories: allCategories,
  });
}
```

Les `alternateUrls` sont ensuite passés à tous les layouts.

## 6. Composants UI

### 6.1 Composants disponibles dans Markdoc (23 composants)

Tous les composants sont définis dans `/src/content-components/` (fichiers TSX) et disponibles dans l'éditeur Keystatic.

#### Layout

**Duo** - Section texte + image (2 colonnes)

```markdoc
{% Duo
   title="Titre"
   image="/images/photo.webp"
   imageAlt="Description"
   imagePosition="left"
   background="transparent"
   fullBleed=false
   heightMatch=false %}
Contenu texte ici
{% /Duo %}
```

**Grid** - Grille d'items avec icônes

```markdoc
{% Grid
   hideIcons=false
   fullBleed=true
   textColor="white"
   items=[{title: "Item 1", description: "<p>Description</p>", isIcon: false}] /%}
```

**Hero** - Bannière héro avec background

```markdoc
{% Hero
   title="Titre"
   subtitle="Sous-titre"
   backgroundImage="/images/bg.webp"
   height="600px"
   ctaText="Réserver"
   ctaLink="/checkout" /%}
```

**Banner** - Bannière simple avec titre/CTA

```markdoc
{% Banner
   title="Titre"
   subtitle="Sous-titre"
   background="var(--color-bg-body)"
   height="400px"
   ctaText="En savoir plus"
   ctaLink="/page"
   fullBleed=true /%}
```

**WideImage** - Image pleine largeur

```markdoc
{% WideImage
   src="image.webp"
   alt="Description" /%}
```

**Strip** - Bande d'images

```markdoc
{% Strip
   images=[{src: "image1.webp", alt: "Alt 1"}, {src: "image2.webp", alt: "Alt 2"}]
   fullBleed=true /%}
```

#### Interactifs

**Slider** - Slider d'images

```markdoc
{% Slider
   images=[{src: "image1.webp", alt: "Alt 1", caption: "Caption 1"}] /%}
```

**SliderSteps** - Slider avec étapes numérotées

```markdoc
{% SliderSteps
   items=[{image: "image1.webp", alt: "Alt 1", title: "Titre 1", content: "Contenu 1"}] /%}
```

**Carousel** - Carousel d'images

```markdoc
{% Carousel
   images=[{src: "image1.webp", alt: "Alt 1"}] /%}
```

**CarouselRooms** - Carousel de chambres (filtre langue)

```markdoc
{% CarouselRooms /%}
```

**InstaCarousel** - Intégration Instagram (Behold)

```markdoc
{% InstaCarousel feedId="abc123" /%}
```

**Accordion** - Accordéon générique

```markdoc
{% Accordion
   items=[{title: "Question 1", content: "Réponse 1"}] /%}
```

**FaqAccordion** - Accordéon FAQ avec filtrage

```markdoc
{% FaqAccordion
   category="booking"
   lang="it" /%}
```

#### Contenu

**Reviews** - Avis clients

```markdoc
{% Reviews
   reviews=[{author: "Marie", rating: 5, text: "Excellent!", date: "2024-01-15"}] /%}
```

**NotaBene** - Encadré info/warning/important

```markdoc
{% NotaBene type="info" %}
Texte de l'encadré
{% /NotaBene %}
```

**ContactForm** - Formulaire de contact

```markdoc
{% ContactForm
   formId="xeeljwrl"
   formPosition="right"
   buttonText="Envoyer" /%}
```

**Blog** - Liste d'articles

```markdoc
{% Blog
   category="sostenibilita"
   limit=6
   showFilters=true /%}
```

#### Média

**YouTube** - Embed YouTube

```markdoc
{% YouTube videoId="abc123" /%}
```

**GoogleMaps** - Embed Google Maps

```markdoc
{% GoogleMaps
   latitude="40.0"
   longitude="8.5"
   zoom=15 /%}
```

#### Utilitaires

**CtaButton** - Bouton CTA

```markdoc
{% CtaButton
   text="Réserver"
   link="/checkout"
   variant="primary" /%}
```

**Align** - Alignement

```markdoc
{% Align value="center" %}
Contenu centré
{% /Align %}
```

**Container** - Container générique

```markdoc
{% Container maxWidth="800px" %}
Contenu
{% /Container %}
```

**Link** - Lien personnalisé

```markdoc
{% Link href="/page" text="Lien" external=false /%}
```

**Table** - Tableaux responsives

```markdoc
{% Table
   headers=["Colonne 1", "Colonne 2"]
   rows=[["Cellule 1", "Cellule 2"]] /%}
```

### 6.2 Utilisation dans Keystatic

Tous les composants sont disponibles dans l'éditeur Markdoc de Keystatic via le bouton **"+ Component"**.

**Syntaxe:**

```markdoc
{% ComponentName
   prop1="value1"
   prop2="value2" /%}

<!-- Ou avec contenu -->
{% ComponentName prop="value" %}
Contenu ici
{% /ComponentName %}
```

**Important:** Les composants avec attributs requis doivent tous les avoir définis, sinon le build échouera.

### 6.3 Composants globaux (/src/components/)

**Navigation:**

- `Header.astro` - Navigation responsive avec language switcher
- `Footer.astro` - Footer trilingue avec liens et informations
- `ActionBar.astro` - Barre d'action flottante pour réservation

**SEO et structure:**

- `Head.astro` - Meta tags, SEO, hreflang
- `Breadcrumb.astro` - Fil d'Ariane
- `JsonLd.astro` - Données structurées JSON-LD

**Contenu:**

- `Blog.astro` - Listing d'articles avec filtres catégorie/tag
- `FAQ.astro` / `FaqView.astro` - Vues FAQ avec accordéon
- `FormattedDate.astro` - Formatage dates localisées

**Utilitaires:**

- `GoogleAnalytics.astro` - Integration Google Analytics
- `SeoAnalyzer/` - Analyseur SEO (development)
- `BackToTop.astro` - Bouton retour en haut

## 7. Styles et design system

### 7.1 Tailwind CSS

**Fichier de configuration:** `tailwind.config.js`

**Palette de couleurs:**

```css
--color-bg-body: #eee7d9 /* Beige (background principal) */ --color-text-main: #445361
  /* Bleu-gris (texte principal) */ --color-brand-primary: #256377 /* Bleu canard (primaire) */
  --color-brand-secondary: #36524a /* Vert foncé (secondaire) */ --color-brand-tertiary: #3d3935
  /* Brun (tertiaire) */ --color-brand-darker: #023a4b /* Bleu très foncé */
  --color-brand-hover: #459875 /* Vert clair (hover) */ --color-brand-alert: #a45429
  /* Orange terracotta (alerte) */ --color-brand-accent: #2c7ec4 /* Bleu vif (accent) */;
```

**Typographie:**

- **Display:** Inter (sans-serif) - Corps de texte
- **Titres:** Playfair Display (serif) - Titres et headers

**Usage dans Tailwind:**

```html
<div class="bg-[var(--color-bg-body)] text-[var(--color-text-main)]">
  <h1 class="text-[var(--color-brand-primary)]">Titre</h1>
</div>
```

### 7.2 Global CSS

**Fichier:** `src/styles/global.css`

**Structure:**

```css
@layer base {
  /* Styles de base (reset, variables) */
}

@layer components {
  /* Classes utilitaires réutilisables */
  .section-container {
    /* Container de section */
  }
  .btn-all-leaders {
    /* Bouton principal */
  }
}

@layer utilities {
  /* Classes custom */
  .prose {
    /* Styles de contenu riche */
  }
  .full-bleed {
    /* Pleine largeur */
  }
}
```

**Breakpoints:**

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: 1024px - 1600px
- Large: > 1600px

## 8. SEO et performance

### 8.1 Meta tags (Head.astro)

**Tags de base:**

- `<title>` - Titre de la page (metaTitle ou title)
- `<meta name="description">` - Description SEO
- `<meta name="robots">` - Indexation (index, follow)

**Open Graph:**

- `og:title`, `og:description`, `og:image`
- `og:type` - Type de contenu (website, article)
- `og:locale` - Langue (it_IT, fr_FR, en_GB)
- `og:url` - URL canonique

**Twitter Cards:**

- `twitter:card` - Type de carte (summary_large_image)
- `twitter:title`, `twitter:description`, `twitter:image`

**Hreflang:**

- Balises `<link rel="alternate" hreflang="...">` pour IT/FR/EN
- Tag `x-default` pointant vers IT

**Favicon:**

- Support multi-formats (ICO, PNG, SVG)
- Apple touch icons

### 8.2 JSON-LD (JsonLd.astro)

Support de 4 types de données structurées:

**page** - Page standard

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Titre de la page",
  "description": "Description",
  "url": "https://all-leaders.fr/page"
}
```

**blog** - Article de blog

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Titre de l'article",
  "datePublished": "2024-01-15",
  "author": {
    "@type": "Person",
    "name": "Daniela Meloni"
  }
}
```

**faq** - Questions/réponses (max 25)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Réponse"
      }
    }
  ]
}
```

**hotelRoom** - Chambre d'hôtel

```json
{
  "@context": "https://schema.org",
  "@type": "HotelRoom",
  "name": "Nom de la chambre",
  "occupancy": {
    "@type": "QuantitativeValue",
    "maxValue": 2
  },
  "amenityFeature": ["WiFi", "Climatisation"]
}
```

### 8.3 Sitemap

**Configuration dans astro.config.mjs:**

```javascript
sitemap({
  filter: (page) => !page.includes('/redirect') && !page.includes('/keystatic'),
  changefreq: 'weekly',
  priority: 0.7,
});
```

**Génération:**

- Automatique lors du build
- Exclusion: `/redirect` et `/keystatic`
- Fréquence: hebdomadaire
- Priorité: 0.7

**URL:** `https://all-leaders.fr/sitemap-index.xml`

## 9. Déploiement

### 9.1 Hébergement

**Hébergeur:** O2Switch

- **Host:** chaise.o2switch.net
- **User:** boje2508
- **Path:** `/home2/boje2508/public_html/all-leaders.bluecells.eu`

**Mode:** Application Node.js avec Passenger

### 9.2 Script de déploiement (deploy.sh)

**Fichier:** `/deploy.sh` à la racine

**Processus en 5 étapes:**

**1. Build local**

```bash
rm -rf dist/
npm run build
```

**2. Préparation package.json**

```bash
# Création d'une version allégée sans devDependencies
# Garde uniquement les dependencies de production
```

**3. Transfert rsync**

```bash
rsync -avz --delete \
  dist/ \
  src/content/ \
  public/ \
  app.js \
  package.json \
  keystatic.config.tsx \
  user@host:path/
```

**Fichiers transférés:**

- `dist/` - Build Astro
- `src/content/` - Collections Keystatic
- `public/` - Assets statiques
- `app.js` - Point d'entrée Node
- `package.json` - Dépendances
- `keystatic.config.tsx` - Config Keystatic

**4. Installation modules**

```bash
ssh user@host 'cd path && npm install --production'
```

**5. Redémarrage**

```bash
ssh user@host 'touch path/tmp/restart.txt'
```

Le fichier `tmp/restart.txt` déclenche le redémarrage de l'application Passenger.

**Usage:**

```bash
./deploy.sh
```

### 9.3 API Routes

**`/api/sync`** - Webhook synchronisation Git

**Méthodes:**

- **POST:** Exécute `git pull` et redémarre l'application
- **GET:** Retourne le statut du serveur

**Usage:** Webhook GitHub pour déploiement automatique

**`/api/github-webhook`** - Integration GitHub

**Méthode:** POST
**Usage:** Reçoit les événements GitHub (push, PR, etc.)

## 10. Workflow Git

### 10.1 Branches principales

- **`master`** - Branche principale de production
- **`elise`** - Branche de travail pour modifications FR

### 10.2 Keystatic Cloud

**Organisation:** blue-cells-editors/all-leaders

**Storage:**

- En production: Keystatic Cloud
- En développement: Local (fichiers locaux)

**Synchronisation:**

- Keystatic Cloud synchronise automatiquement avec GitHub
- Les commits Keystatic sont créés automatiquement lors de la sauvegarde dans l'interface

### 10.3 Workflow recommandé

**Développement local:**

```bash
git checkout master
git pull origin master
npm run dev
# Accéder à http://localhost:4321/keystatic pour éditer
```

**Édition de contenu:**

```bash
npm run dev
# Aller sur http://localhost:4321/keystatic
# Éditer le contenu
# Sauvegarder (crée un commit automatique si Cloud)
```

**Déploiement:**

```bash
# Si modifications locales:
git add .
git commit -m "Description des changements"
git push origin master

# Déploiement sur O2Switch:
./deploy.sh
```

**Intégration de la branche elise:**

```bash
git fetch origin elise
git merge origin/elise
# Résoudre les conflits si nécessaire
git push origin master
./deploy.sh
```

## 11. Commandes utiles

### Développement

```bash
npm run dev          # Serveur dev sur http://localhost:4321
```

### Build

```bash
npm run build        # Build production
npm run preview      # Preview du build
```

### Déploiement

```bash
./deploy.sh          # Déploiement O2Switch complet
```

### Type checking

```bash
npm run astro check  # Vérification TypeScript et Astro
```

### Keystatic

```bash
# En développement:
npm run dev
# Accéder à http://localhost:4321/keystatic

# En production:
# Accéder à https://all-leaders.fr/edit
```

## 12. Configuration technique

### 12.1 TypeScript

**Fichier:** `tsconfig.json`

**Configuration:**

- Extends: `astro/tsconfigs/strict`
- Path aliases: `@/*` → `src/*`
- JSX: React JSX runtime

**Exemple d'import:**

```typescript
import { translations } from '@/data/translations';
import Layout from '@/layouts/Layout.astro';
```

### 12.2 Constantes (src/consts.ts)

```typescript
export const SITE = {
  NAME: 'Limolo House',
  URL: 'https://all-leaders.fr',
  EMAIL: 'daniela@all-leaders.fr',
  AUTHOR: 'Daniela Meloni',
  PROPERTY_ID: '155172', // ID booking engine
};
```

**Usage:**

```typescript
import { SITE } from '@/consts';
console.log(SITE.URL); // "https://all-leaders.fr"
```

## 13. Dépannage

### 13.1 Erreurs courantes

**Build échoue avec erreur de composant Markdoc:**

Symptôme:

```
Missing required attribute: 'title'
Missing required attribute: 'image'
```

**Solution:**

- Ouvrir le fichier .mdoc indiqué dans l'erreur
- Vérifier que tous les composants ont leurs attributs requis
- Exemples:
  - Duo: `title`, `image` requis
  - Banner: `title` requis
  - WideImage: `src` requis

**404 sur page existante:**

**Causes possibles:**

1. `seoSlug` incorrect dans Keystatic
2. Langue du fichier (`lang: it/fr/en`) incorrecte
3. Structure des dossiers incorrecte (doit être dans `it/` ou `fr/`)
4. Fichier pas dans la bonne collection

**Solution:**

- Vérifier le `seoSlug` dans le fichier .mdoc
- Vérifier que `lang` correspond au dossier (it/ → lang: it)
- Vérifier que le fichier est dans le bon dossier de collection

**Keystatic ne se charge pas:**

**Causes possibles:**

1. Credentials Keystatic Cloud manquants
2. Mode storage incorrect
3. Erreur de configuration dans keystatic.config.tsx

**Solution:**

- Vérifier les variables d'environnement
- Vérifier le mode storage (local en dev, cloud en prod)
- Vérifier la console pour les erreurs

**Erreur "tag_slug: Required":**

**Cause:** Le champ `tag_slug` est auto-généré par Keystatic mais pas dans le schéma Zod

**Solution:** Déjà corrigé - le schéma accepte `tag_slug` en optionnel

### 13.2 Logs et debugging

**Logs serveur O2Switch:**

```bash
ssh boje2508@chaise.o2switch.net
tail -f /home2/boje2508/public_html/all-leaders.bluecells.eu/logs/error.log
```

**Rebuild après changement:**

```bash
npm run build
./deploy.sh
```

**Mode verbose Astro:**

```bash
npm run build -- --verbose
```

## 14. Bonnes pratiques

### 14.1 Contenu

**SEO:**

- Toujours remplir `metaTitle` et `metaDescription`
- Meta description: 120-160 caractères
- Titre: 50-60 caractères max

**Slugs:**

- Utiliser des `seoSlug` SEO-friendly
- Minuscules uniquement
- Tirets pour séparer les mots
- Pas de caractères spéciaux

**Traductions:**

- Vérifier que les traductions IT/FR sont cohérentes
- Tester les URLs après création de contenu
- Vérifier les tags hreflang après ajout de traductions

**Tester les URLs:**

- Après création d'une page, tester l'URL dans le navigateur
- Vérifier que les hreflang sont corrects (inspecter le code source)

### 14.2 Images

**Optimisation:**

- Format WebP recommandé
- Compression avant upload
- Taille max featured photo: 1200x630px (format Open Graph)

**Alt text:**

- Toujours remplir le champ `alt`
- Décrire l'image de manière concise
- Bon pour l'accessibilité et le SEO

**Organisation:**

- Images dans `/public/images/`
- Sous-dossiers par type de contenu recommandé

### 14.3 SEO

**Structure:**

- 1 H1 par page (automatique via `title`)
- Hiérarchie de titres logique (H1 → H2 → H3)
- Meta description unique par page

**Hreflang:**

- Vérifier les tags après ajout de traductions
- S'assurer que le matching par nom de fichier fonctionne
- Tester avec Ahrefs ou Search Console

**JSON-LD:**

- Choisir le bon `jsonType` (page, blog, faq, hotelRoom)
- Vérifier avec le Rich Results Test de Google

### 14.4 Code

**Collections Keystatic:**

- Respecter la structure des collections
- Ne pas modifier les schémas sans tester le build
- Ajouter les champs optionnels au schéma si Keystatic les génère

**Composants UI:**

- Utiliser les composants existants
- Ne pas créer de nouveaux composants sans raison
- Documenter les nouveaux composants

**Conventions de nommage:**

- Fichiers: kebab-case (ex: `le-camere.mdoc`)
- Composants: PascalCase (ex: `Duo.tsx`)
- Variables: camelCase (ex: `alternateUrls`)

**Tests:**

- Toujours tester le build avant déploiement: `npm run build`
- Tester les nouvelles pages dans le navigateur
- Vérifier la console pour les erreurs

## 15. Ressources

### 15.1 Documentation externe

- **Astro:** https://docs.astro.build
- **Keystatic:** https://keystatic.com/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Markdoc:** https://markdoc.dev
- **TypeScript:** https://www.typescriptlang.org/docs

### 15.2 Outils SEO

- **Ahrefs:** Audit SEO et hreflang
- **Google Search Console:** Indexation et performance
- **Google Rich Results Test:** Validation JSON-LD
- **PageSpeed Insights:** Performance et Core Web Vitals

### 15.3 Contacts

- **Développeur:** Claude Code
- **Contenu:** Daniela Meloni (daniela@all-leaders.fr)
- **Repository:** https://github.com/bluecells/all-leaders.git
- **Site web:** https://all-leaders.fr

## 16. Changelog

### Version actuelle (Février 2026)

**Nouvelles fonctionnalités:**

- ✅ Système hreflang complet (IT/FR/EN) avec URLs alternatives
- ✅ Collections multilingues (categories, tags avec slugs localisés)
- ✅ 23 composants UI Markdoc pour l'édition de contenu
- ✅ Intégration booking engine (roomId dans rooms)
- ✅ Déploiement O2Switch automatisé avec deploy.sh
- ✅ Keystatic Cloud en production avec sync GitHub
- ✅ Collection redirects pour gestion 301/302
- ✅ Singletons Menu (IT/FR/EN)
- ✅ API routes (/api/sync, /api/github-webhook)
- ✅ Système de traductions centralisé (/src/data/)

**Corrections:**

- ✅ Fix Blog.astro filtres avec tag_slug optionnel
- ✅ Fix hreflang reciprocal links (92 erreurs Ahrefs)
- ✅ Fix structure articles (it/ et fr/ subdirectories)
- ✅ Fix ContactForm syntax dans pages FR

### Prochaines améliorations

- [ ] Contenu EN complet (actuellement IT/FR uniquement)
- [ ] Tests automatisés (unit tests, e2e tests)
- [ ] Optimisation automatique des images (plugin Astro)
- [ ] PWA support (service worker, manifest)
- [ ] Lazy loading des images
- [ ] Compression brotli/gzip
- [ ] CDN pour les assets statiques
- [ ] Monitoring et analytics avancés

---

**Dernière mise à jour:** Février 2026
**Version de la documentation:** 1.0
