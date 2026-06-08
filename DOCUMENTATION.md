# Documentation All Leaders Initiative - Site Web

## 1. Vue d'ensemble du projet

All Leaders Initiative est une société de conseil en leadership et performance collective basée à Paris. Le site web est une application multilingue (FR/EN) construite avec des technologies modernes pour offrir une expérience performante et maintenable.

**Technologies utilisées:**

- **Astro 5** - Framework web moderne avec rendu SSR
- **Keystatic** - CMS headless pour la gestion de contenu
- **Tailwind CSS v4** - Framework CSS utilitaire
- **React** - Pour les composants interactifs
- **TypeScript** - Typage statique
- **GSAP** - Animations performantes

**Architecture générale:**

- Mode SSR (Server-Side Rendering) avec Node adapter
- Site bilingue (FR par défaut, EN avec préfixe `/en/`)
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

- Locale par défaut: Français (`fr`)
- Locales supportées: `fr`, `en`
- Français sans préfixe d'URL, EN avec préfixe (`/en/`)

**Intégrations:**

- `@astrojs/react` - Support React pour composants interactifs
- `@astrojs/markdoc` - Support Markdoc pour le contenu
- `@keystatic/astro` - Intégration Keystatic CMS
- `@astrojs/sitemap` - Génération automatique du sitemap

### 2.4 Configuration Keystatic

**Fichier:** `keystatic.config.tsx`

**Storage:**

- **Production:** Cloud (blue-cells-editors/limolo)
- **Développement:** Local (fichiers locaux)

**Accès:**

- Interface Keystatic disponible sur `/keystatic` en mode dev
- Interface disponible sur `/edit` en production

**Note:** Vérifier que le projet Keystatic Cloud correct est utilisé (référence potentiellement incorrecte).

## 3. Architecture du site

### 3.1 Structure des dossiers

```
all-leaders/
├── src/
│   ├── pages/              # Pages statiques et routing dynamique
│   │   ├── [...route].astro   # Router principal
│   │   ├── index.astro        # Homepage FR (avec animations GSAP)
│   │   ├── accompagnements.astro  # Landing services FR
│   │   ├── ressources.astro       # Landing blog FR
│   │   ├── faq.astro              # FAQ FR
│   │   ├── contact.astro          # Contact FR
│   │   ├── cookies.astro          # Politique cookies FR
│   │   ├── privacy.astro          # Politique confidentialité FR
│   │   ├── 404.astro              # Page 404 localisée
│   │   ├── edit.astro             # Interface Keystatic
│   │   └── en/                    # Pages EN
│   │       ├── index.astro        # Homepage EN
│   │       ├── services.astro     # Services EN
│   │       ├── resources.astro    # Resources EN
│   │       ├── faq.astro          # FAQ EN
│   │       ├── contact.astro      # Contact EN
│   │       ├── cookies.astro      # Cookies EN
│   │       ├── privacy.astro      # Privacy EN
│   │       └── 404.astro          # 404 EN
│   ├── content/           # Collections Keystatic
│   │   ├── landing-pages/ # Pages dynamiques (vide actuellement)
│   │   ├── articles/      # Articles de blog
│   │   │   ├── fr/        # Articles français
│   │   │   └── en/        # Articles anglais (Phase 2)
│   │   ├── accompagnements/  # Services/accompagnements
│   │   │   ├── fr/           # Services français (YAML)
│   │   │   └── en/           # Services anglais (Phase 2)
│   │   ├── faq/          # Questions/réponses
│   │   │   ├── fr/       # FAQ françaises
│   │   │   └── en/       # FAQ anglaises (Phase 2)
│   │   ├── categories/   # Catégories (YAML, bilingue)
│   │   ├── tags/         # Tags (YAML, bilingue)
│   │   ├── accompagnements-categories/  # Catégories de services
│   │   ├── modalites-intervention/      # Types d'intervention
│   │   ├── menu/         # Menus de navigation
│   │   │   ├── fr.json
│   │   │   └── en.json
│   │   └── redirects.yaml  # Redirections 301/302
│   ├── layouts/          # Layouts Astro
│   │   ├── Layout.astro           # Layout principal
│   │   ├── LayoutBlog.astro       # Layout articles
│   │   ├── LayoutAccompagnements.astro  # Layout services
│   │   └── LayoutFaq.astro        # Layout FAQ
│   ├── components/       # Composants globaux
│   │   ├── Header.astro          # Navigation + language switcher
│   │   ├── Footer.astro          # Footer bilingue
│   │   ├── Head.astro            # Meta tags, SEO, hreflang
│   │   ├── Blog.astro            # Listing articles (filtre lang)
│   │   ├── FAQ.astro             # Accordion FAQ (filtre lang)
│   │   ├── AccompagnementsGrid.astro  # Grille services (filtre lang)
│   │   ├── Accompagnements.astro # Composant services
│   │   ├── ActionBar.astro       # Barre d'action flottante
│   │   ├── HeroAnimated.astro    # Hero avec animations GSAP
│   │   ├── StatsAnimated.astro   # Stats animées
│   │   ├── CookieConsent.astro   # Gestion consentement cookies
│   │   ├── NewsletterPopup.astro # Popup newsletter
│   │   └── UI/           # Composants UI réutilisables
│   ├── content-components/  # Composants Markdoc (TSX)
│   │   ├── hero.tsx
│   │   ├── ctaButton.tsx
│   │   ├── notaBene.tsx
│   │   ├── googleMaps.tsx
│   │   ├── instaCarousel.tsx
│   │   └── ...
│   ├── data/            # Traductions centralisées
│   │   ├── translations.ts           # Registry
│   │   ├── commonTranslations.ts     # Textes communs
│   │   ├── footerTranslations.ts     # Footer
│   │   ├── blogTranslations.ts       # Blog
│   │   ├── actionBarTranslations.ts  # ActionBar
│   │   ├── contactFormTranslations.ts # Formulaire contact
│   │   └── ...
│   ├── styles/          # Styles globaux
│   │   └── global.css
│   ├── utils/           # Utilitaires
│   │   └── hreflang.ts  # Construction URLs alternatives
│   └── consts.ts        # Constantes (site, metadata)
├── public/              # Assets statiques
├── keystatic.config.tsx # Configuration Keystatic
├── astro.config.mjs    # Configuration Astro
├── tailwind.config.js  # Configuration Tailwind
├── deploy.sh           # Script de déploiement
└── DOCUMENTATION.md    # Ce fichier
```

### 3.2 Système de routing

#### Routing dynamique ([...route].astro)

Le fichier `[...route].astro` gère toutes les routes dynamiques du site.

**Ordre de priorité:**

1. **Redirects** - Vérification des redirections Keystatic
2. **Articles** - Articles de blog (`/ressources/{categorySlug}/{articleSlug}`)
3. **Accompagnements** - Services (`/services/{serviceSlug}` ou `/accompagnements/{serviceSlug}`)
4. **Landing Pages** - Pages dynamiques
5. **FAQ** - Questions/réponses
6. **404** - Redirection vers page 404 localisée

**Parsing de langue:**

- FR: Pas de préfixe (ex: `/ressources`)
- EN: Préfixe `/en/` (ex: `/en/resources`)

**Patterns d'URL par type:**

| Type     | Français                                                      | Anglais                                      |
| -------- | ------------------------------------------------------------- | -------------------------------------------- |
| Pages    | `/{seoSlug}`                                                  | `/en/{seoSlug}`                              |
| Articles | `/ressources/{categorySlug}/{articleSlug}`                    | `/en/resources/{categorySlug}/{articleSlug}` |
| Services | `/services/{serviceSlug}` ou `/accompagnements/{serviceSlug}` | `/en/services/{serviceSlug}`                 |
| FAQ      | `/faq/{categorySlug}/{faqSlug}`                               | `/en/faq/{categorySlug}/{faqSlug}`           |

**Note:** Il y a une incohérence dans le routing FR : certains URLs utilisent `/services/`, d'autres `/accompagnements/`. À standardiser.

#### Pages statiques

**Pages françaises:**

- `/` - Homepage (élaborée avec animations GSAP)
- `/accompagnements` - Landing services
- `/ressources` - Landing blog
- `/faq` - Landing FAQ
- `/contact` - Page contact avec formulaire
- `/cookies` - Politique cookies
- `/privacy` - Politique confidentialité
- `/404` - Page erreur

**Pages anglaises:**

- `/en/` - Homepage EN
- `/en/services` - Services EN
- `/en/resources` - Resources EN
- `/en/faq` - FAQ EN
- `/en/contact` - Contact EN
- `/en/cookies` - Cookies policy EN
- `/en/privacy` - Privacy policy EN
- `/en/404` - Error page EN

### 3.3 Collections Keystatic

#### Singletons

**menuFR, menuEN** - Menus de navigation

- Structure: Items principaux + sous-menus optionnels
- Champs: label, url, subItems[]
- Usage: Header.astro

#### Collections

**landing-pages** (`src/content/landing-pages/`)

Pages dynamiques avec contenu Markdoc.

**Champs:**

- `title` - Titre de la page (H1)
- `seoSlug` - Slug de l'URL
- `lang` - Langue (fr/en)
- `metaTitle` - Titre SEO (meta title)
- `metaDescription` - Description SEO
- `featuredPhoto` - Photo principale (image, alt)
- `content` - Contenu Markdoc avec support des composants UI

**Status:** Collection vide actuellement.

---

**articles** (`src/content/articles/`)

Articles de blog organisés par langue.

**Champs:**

- `title` - Titre de l'article
- `h1Title` - Titre H1 (si différent du title)
- `seoSlug` - Slug de l'URL
- `category` - Catégorie (relationship)
- `tags` - Tags (array)
- `publishDate` - Date de publication
- `excerpt` - Extrait court
- `featuredPhoto` - Photo principale (image, alt)
- `metaTitle`, `metaDescription` - SEO
- `content` - Contenu Markdoc
- JSON-LD type: `blog`

**organization:**

- Articles français : `articles/fr/*.mdoc` (~20+ articles)
- Articles anglais : `articles/en/*.mdoc` (Phase 2)

---

**accompagnements** (`src/content/accompagnements/`)

Services et accompagnements en format YAML.

**Champs:**

- `title` - Titre du service
- `slug_fr` - Slug français
- `slug_en` - Slug anglais (pour Phase 2)
- `categorie` - Catégorie (diagnostic, coaching, etc.)
- `type` - Type (equipe, individuel, organization)
- `modalite` - Modalité d'intervention
- `description` - Description courte
- `long_description` - Description longue (Markdown)
- `USP1`, `USP2`, `USP3`, `USP4`, `USP5` - Points clés (Unique Selling Points)
- `image` - Image du service
- `order` - Ordre d'affichage

**organization:**

- Services français : `accompagnements/fr/*.yaml` (~17 services)
- Services anglais : `accompagnements/en/*.yaml` (Phase 2)

---

**faq** (`src/content/faq/`)

Questions/réponses organisées par langue.

**Champs:**

- `question` - Question (titre)
- `answer` - Réponse (Markdoc)
- `category` - Catégorie
- `lang` - Langue (fr/en)
- `order` - Ordre d'affichage
- `metaTitle`, `metaDescription` - SEO
- JSON-LD type: `faq`

**organization:**

- FAQ françaises : `faq/fr/*.mdoc`
- FAQ anglaises : `faq/en/*.mdoc` (Phase 2)

---

**categories** (`src/content/categories/*.yaml`)

Catégories d'articles en YAML avec champs localisés.

**Champs:**

- `name_fr`, `name_en` - Noms localisés
- `slug_fr`, `slug_en` - Slugs pour URLs localisés
- `description_fr`, `description_en` - Descriptions localisées
- `color` - Couleur associée (hex)

---

**tags** (`src/content/tags/*.yaml`)

Tags d'articles - structure identique aux catégories.

---

**accompagnements-categories** (`src/content/accompagnements-categories/*.yaml`)

Catégories de services avec champs localisés.

**Champs:**

- `name_fr`, `name_en`
- `slug_fr`, `slug_en`
- `description_fr`, `description_en`
- `icon` - Icône associée (optionnel)
- `order` - Ordre d'affichage

---

**modalites-intervention** (`src/content/modalites-intervention/*.yaml`)

Types de modalités d'intervention (conférence, formation, coaching, etc.).

**Champs:**

- `name_fr`, `name_en`
- `slug_fr`, `slug_en`
- `description_fr`, `description_en`
- `icon` - Icône associée

---

**redirects** (`src/content/redirects.yaml`)

Gestion des redirections 301/302.

**Champs:**

- `from` - URL source (sans slash initial)
- `to` - URL destination (sans slash initial)
- `status` - Code HTTP (301 ou 302)
- `note` - Note explicative (optionnel)

**⚠️ Note:** Ce fichier contient actuellement de nombreuses redirections pour "Limolo House" qui doivent être nettoyées (voir LIMOLO_REFERENCES_AUDIT.md).

### 3.4 Layouts

**Layout.astro** - Layout principal

Utilisé pour: Pages statiques, FAQ

**Inclut:**

- Head.astro (meta tags, SEO, hreflang)
- Header.astro (navigation)
- Footer.astro (footer bilingue)
- ActionBar.astro (barre d'action flottante - à vérifier/adapter)

**Props:**

```typescript
{
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  lang?: 'fr' | 'en';
  ogImage?: string;
  jsonType?: string;
  alternateUrls?: AlternateUrls | null;
}
```

---

**LayoutBlog.astro** - Articles de blog

**Features:**

- Badge catégorie avec couleur
- Date localisée (FormattedDate)
- Featured photo en haut
- Articles similaires (même catégorie)
- Fonction `cleanText()` pour encodage HTML

---

**LayoutAccompagnements.astro** - Services

**Features:**

- Affichage du service avec tous ses détails
- USPs (points clés)
- Image du service
- Description longue (Markdown)
- Lien retour vers liste services

---

**LayoutFaq.astro** - FAQ

Structure simple:

- Header: catégorie (badge) + question (H1)
- Contenu: réponse (Markdoc)

## 4. Système i18n

### 4.1 Configuration

**Locale par défaut:** Français (`fr`)
**Locales supportées:** `fr`, `en`

**Routing:**

- Français: Sans préfixe (ex: `/ressources`)
- Anglais: Préfixe `/en/` (ex: `/en/resources`)

### 4.2 organization du contenu

```
src/content/
├── articles/
│   ├── fr/  (20+ articles)
│   └── en/  (Phase 2)
├── accompagnements/
│   ├── fr/  (17 services)
│   └── en/  (Phase 2)
├── faq/
│   ├── fr/
│   └── en/  (Phase 2)
```

**Matching des traductions:** Les traductions sont identifiées par le même nom de fichier dans les dossiers `fr/` et `en/`.

### 4.3 Traductions centralisées (/src/data/)

**Registry central:**

- `translations.ts` - Exporte toutes les traductions

**Fichiers de traductions:**

- `commonTranslations.ts` - Textes communs (boutons, labels)
- `footerTranslations.ts` - Textes du footer
- `blogTranslations.ts` - Textes du blog (filtres, catégories)
- `actionBarTranslations.ts` - Textes de la barre d'action
- `contactFormTranslations.ts` - Textes du formulaire de contact
- `cookieConsentTranslations.ts` - Textes consentement cookies
- `breadcrumbTranslations.ts` - Textes fil d'Ariane
- `reviewsTranslations.ts` - Textes avis clients
- `newsletterPopupTranslations.ts` - Textes popup newsletter

**Usage:**

```typescript
import { translations } from '@/data/translations';
const t = translations[lang];
console.log(t.common.readMore); // Texte localisé
```

**Couverture:** Tous les fichiers ont des entrées FR et EN complètes.

## 5. Système hreflang (SEO multilingue)

### 5.1 Architecture

**Fichier:** `/src/utils/hreflang.ts`

**Interface:**

```typescript
export interface AlternateUrls {
  fr: string;
  en: string | null;
}
```

### 5.2 Fonctionnalités

- **Génération automatique** des URLs alternatives pour FR/EN
- **Matching par nom de fichier** entre langues (ex: `article.mdoc` → `fr/article.mdoc`, `en/article.mdoc`)
- **Support des slugs localisés:**
  - Catégories: `slug_fr` / `slug_en`
  - Services: `slug_fr` / `slug_en`
- **Intégration dans tous les layouts** via prop `alternateUrls`

**Fonctions principales:**

- `buildArticleUrl(article, lang, categories)` - Construit l'URL d'un article
- `buildAccompagnementUrl(accompagnement, lang)` - Construit l'URL d'un service
- `buildFaqUrl(faq, lang)` - Construit l'URL d'une FAQ
- `findAlternateUrls(entry, type, collections)` - Trouve toutes les URLs alternatives

### 5.3 Génération dans Head.astro

```html
<!-- Si alternateUrls est fourni -->
<link rel="alternate" hreflang="fr" href="https://all-leaders.fr/" />
<link rel="alternate" hreflang="en" href="https://all-leaders.fr/en/" />
<link rel="alternate" hreflang="x-default" href="https://all-leaders.fr/" />
```

Le tag `x-default` pointe toujours vers la version française (langue par défaut).

### 5.4 Calcul dans [...route].astro

```javascript
// Après avoir trouvé l'entry (article, accompagnement, faq)
let alternateUrls: AlternateUrls | null = null;
if (entry && type) {
  const allCategories = await getCollection('category');
  alternateUrls = await findAlternateUrls(entry, type, {
    articles,
    accompagnements,
    faq,
    categories: allCategories,
  });
}
```

Les `alternateUrls` sont ensuite passés à tous les layouts.

## 6. Composants UI

### 6.1 Composants disponibles dans Markdoc

Tous les composants sont définis dans `/src/content-components/` (fichiers TSX) et disponibles dans l'éditeur Keystatic.

**Note:** Les valeurs par défaut et exemples contiennent des références à "Limolo" qui doivent être mises à jour.

#### Layout & Structure

- **Hero** - Bannière héro avec background et CTA
- **Banner** - Bannière simple
- **Duo** - Section texte + image (2 colonnes)
- **Grid** - Grille d'items avec icônes
- **WideImage** - Image pleine largeur
- **Strip** - Bande d'images
- **Container** - Container générique
- **Align** - Alignement du contenu

#### Interactifs

- **Slider** - Slider d'images
- **SliderSteps** - Slider avec étapes numérotées
- **Carousel** - Carousel d'images
- **InstaCarousel** - Intégration Instagram
- **Accordion** - Accordéon générique
- **FaqAccordion** - Accordéon FAQ avec filtrage

#### Contenu

- **Blog** - Liste d'articles avec filtres
- **Reviews** - Avis clients
- **NotaBene** - Encadré info/warning/important
- **ContactForm** - Formulaire de contact

#### Média

- **YouTube** - Embed YouTube
- **GoogleMaps** - Embed Google Maps

#### Utilitaires

- **CtaButton** - Bouton CTA
- **Link** - Lien personnalisé
- **Table** - Tableaux responsives

**⚠️ Composants à vérifier/supprimer:**

- **BookingEngine** - Moteur de réservation (non pertinent pour All Leaders)
- **SliderBooking** - Slider de booking (non pertinent)

### 6.2 Composants globaux (/src/components/)

**Navigation:**

- `Header.astro` - Navigation responsive avec language switcher
- `Footer.astro` - Footer bilingue avec liens et informations
- `ActionBar.astro` - Barre d'action flottante (⚠️ contient liens booking Limolo)

**SEO et structure:**

- `Head.astro` - Meta tags, SEO, hreflang
- `Breadcrumb.astro` - Fil d'Ariane
- `JsonLd.astro` - Données structurées JSON-LD

**Contenu:**

- `Blog.astro` - Listing d'articles avec filtres catégorie/tag
- `FAQ.astro` / `FaqView.astro` - Vues FAQ avec accordéon
- `Accompagnements.astro` - Listing services
- `AccompagnementsGrid.astro` - Grille services avec filtrage langue
- `FormattedDate.astro` - Formatage dates localisées

**Animation:**

- `HeroAnimated.astro` - Hero avec animations GSAP
- `StatsAnimated.astro` - Statistiques animées

**Utilitaires:**

- `GoogleAnalytics.astro` - Integration Google Analytics
- `CookieConsent.astro` - Gestion consentement cookies
- `NewsletterPopup.astro` - Popup newsletter (⚠️ pointe vers Limolo Substack)
- `BackToTop.astro` - Bouton retour en haut

**⚠️ Composants à supprimer/adapter:**

- `BookingEngine.astro` - Moteur de réservation Limolo
- `SliderBooking.astro` - Slider booking Limolo
- `NewsletterPopup.astro` - Newsletter Limolo (adapter pour All Leaders)

## 7. Styles et design system

### 7.1 Tailwind CSS

**Fichier de configuration:** `tailwind.config.js`

**Palette de couleurs All Leaders:**

```css
--color-bg-body: #ffffff /* Blanc */ --color-bg-body-darker: #d3d0c2 /* Beige clair */
  --color-text-main: #031a34 /* Bleu marine foncé (texte principal) */ --color-text-muted: #c4f4d2
  /* Vert pâle */ --color-brand-primary: #031a34 /* Bleu marine (primaire) */
  --color-brand-secondary: #ab0800 /* Rouge bordeaux (secondaire) */ --color-brand-tertiary: #beab54
  /* Or/jaune (tertiaire) */ --color-brand-darker: #4b595e /* Gris bleuté foncé */
  --color-brand-hover: #1093ad /* Bleu turquoise (hover) */ --color-brand-alert: #a45429
  /* Orange terracotta (alerte) */ --color-brand-accent: #1093ad /* Bleu turquoise (accent) */
  --color-brand-muted: #1093ad7c /* Bleu turquoise transparent */ /* Couleurs simplifiées */
  --clair: #ffffff /* Blanc */ --fonce: #031a34 /* Bleu marine */ --accent: #1093ad
  /* Bleu turquoise */;
```

**⚠️ Couleur legacy "limolo-green":**

```css
--limolo-green: #4a6741 /* Vert olive - À RENOMMER */;
```

Cette couleur est utilisée **partout** dans le projet avec la classe `.limolo-green`. Elle doit être renommée (ex: `.brand-green` ou `.all-leaders-green`) et tous les usages mis à jour.

**Typographie:**

- **Display:** Inter (sans-serif) - Corps de texte
- **Titres:** Playfair Display ou Inter Bold - Titres et headers

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
  /* Styles de base (reset, variables CSS custom) */
}

@layer components {
  /* Classes utilitaires réutilisables */
  .section-container {
    /* Container de section */
  }
  .btn-brand {
    /* Bouton principal (renommer depuis .btn-limolo) */
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

**⚠️ Note:** Ce fichier contient probablement des classes `.limolo-*` à renommer.

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
- `og:locale` - Langue (fr_FR, en_GB)
- `og:url` - URL canonique

**Twitter Cards:**

- `twitter:card` - Type de carte (summary_large_image)
- `twitter:title`, `twitter:description`, `twitter:image`

**Hreflang:**

- Balises `<link rel="alternate" hreflang="...">` pour FR/EN
- Tag `x-default` pointant vers FR

**Favicon:**

- Support multi-formats (ICO, PNG, SVG)
- Apple touch icons

### 8.2 JSON-LD (JsonLd.astro)

Support de 3 types de données structurées:

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
    "@type": "organization",
    "name": "All Leaders Initiative"
  }
}
```

**faq** - Questions/réponses

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

Sur Koyeb

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

- **`main`** - Branche principale de production
- **`elise`** - Branche de travail pour modifications FR

### 10.2 Keystatic Cloud

**organization:** blue-cells-editors/limolo ⚠️

**⚠️ Note:** Le projet Keystatic Cloud référencé est "limolo" - vérifier si c'est correct ou si un autre projet doit être utilisé pour All Leaders.

**Storage:**

- En production: Keystatic Cloud
- En développement: Local (fichiers locaux)

**Synchronisation:**

- Keystatic Cloud synchronise automatiquement avec GitHub
- Les commits Keystatic sont créés automatiquement lors de la sauvegarde dans l'interface

### 10.3 Workflow recommandé

**Développement local:**

```bash
git checkout main
git pull origin main
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
git push origin main

# Déploiement sur O2Switch:
./deploy.sh
```

**Intégration de la branche elise:**

```bash
git fetch origin elise
git merge origin/elise
# Résoudre les conflits si nécessaire
git push origin main
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
  NAME: 'All Leaders Initiative',
  URL: 'https://all-leaders.fr',
  EMAIL: 'contact@all-leaders.fr',
  AUTHOR: 'All Leaders',
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
2. Langue du fichier (`lang: fr/en`) incorrecte
3. Structure des dossiers incorrecte (doit être dans `fr/` ou `en/`)
4. Fichier pas dans la bonne collection

**Solution:**

- Vérifier le `seoSlug` dans le fichier
- Vérifier que `lang` correspond au dossier (fr/ → lang: fr)
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

### 13.2 Logs et debugging

**Logs serveur O2Switch:**

```bash
ssh boje2508@chaise.o2switch.net
tail -f /home2/boje2508/public_html/limolo.bluecells.eu/logs/error.log
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

- Vérifier que les traductions FR/EN sont cohérentes
- Tester les URLs après création de contenu
- Vérifier les tags hreflang après ajout de traductions

### 14.2 Images

**Optimisation:**

- Format WebP recommandé
- Compression avant upload
- Taille max featured photo: 1200x630px (format Open Graph)

**Alt text:**

- Toujours remplir le champ `alt`
- Décrire l'image de manière concise
- Bon pour l'accessibilité et le SEO

**organization:**

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
- Tester avec Google Search Console

**JSON-LD:**

- Choisir le bon `jsonType` (page, blog, faq)
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

- Fichiers: kebab-case (ex: `article-exemple.mdoc`)
- Composants: PascalCase (ex: `Duo.tsx`)
- Variables: camelCase (ex: `alternateUrls`)

**Tests:**

- Toujours tester le build avant déploiement: `npm run build`
- Tester les nouvelles pages dans le navigateur
- Vérifier la console pour les erreurs

## 15. Nettoyage nécessaire

### 15.1 Références à Limolo House

Le projet contient de **nombreuses références résiduelles** à "Limolo House", un B&B éco-responsable en Sardaigne qui n'a aucun rapport avec All Leaders Initiative.

**Voir le rapport détaillé:** `LIMOLO_REFERENCES_AUDIT.md`

**Principales actions nécessaires:**

1. ✅ **Documentation mise à jour** (ce fichier)
2. ⚠️ **Renommer classe CSS** : `.limolo-green` → `.brand-green`
3. ⚠️ **Mettre à jour claude.md** : repository Git correct
4. ⚠️ **Vérifier keystatic.config.tsx** : projet Keystatic correct
5. ⚠️ **Mettre à jour deploy.sh** : chemin de déploiement correct
6. ⚠️ **Supprimer composants booking** : BookingEngine, SliderBooking, checkout.astro
7. ⚠️ **Adapter/supprimer** : NewsletterPopup, ActionBar (liens Limolo)
8. ⚠️ **Nettoyer redirects.yaml** : supprimer redirections Limolo
9. ⚠️ **Mettre à jour CookieConsent** : renommer clés localStorage
10. ⚠️ **Mettre à jour content-components** : exemples et valeurs par défaut

**Estimation du travail de nettoyage:** 4-7 heures

### 15.2 Incohérences de routing

**Services / Accompagnements:**

Le site utilise deux patterns d'URL différents pour les services :

- `/services/` (en anglais et certaines pages françaises)
- `/accompagnements/` (certaines pages françaises)

**Action recommandée:** Standardiser sur un seul pattern (ex: `/services/` pour FR et EN).

## 16. Ressources

### 16.1 Documentation externe

- **Astro:** https://docs.astro.build
- **Keystatic:** https://keystatic.com/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Markdoc:** https://markdoc.dev
- **TypeScript:** https://www.typescriptlang.org/docs
- **GSAP:** https://greensock.com/docs

### 16.2 Outils SEO

- **Google Search Console:** Indexation et performance
- **Google Rich Results Test:** Validation JSON-LD
- **PageSpeed Insights:** Performance et Core Web Vitals
- **Wave:** Accessibilité

### 16.3 Contacts

- **Développeur:** Claude Code
- **Contenu:** All Leaders Initiative
- **Repository:** https://github.com/bluecells/all-leaders.git
- **Site web:** https://all-leaders.fr

## 17. Roadmap

### Phase 1 : Pages statiques EN (EN COURS)

**Statut:** En planification
**Durée estimée:** 24-32 heures

**Livrables:**

- Homepage EN traduite (avec animations GSAP)
- Pages principales traduites (services, resources, FAQ, contact)
- Pages légales traduites (privacy, cookies)
- Tests et validation complets

**Voir:** `/Users/bluecells/.claude/plans/snuggly-petting-brooks.md`

### Phase 2 : Collections dynamiques EN

**Statut:** À venir après Phase 1
**Durée estimée:** 20-30 heures

**Livrables:**

- ~17 services (accompagnements) traduits
- ~20+ articles traduits
- ~30 FAQs traduites
- Catégories et tags vérifiés/complétés

### Phase 3 : Nettoyage Limolo

**Statut:** À planifier
**Durée estimée:** 4-7 heures

**Livrables:**

- Classes CSS renommées (`.limolo-*` → `.brand-*`)
- Composants non pertinents supprimés/adaptés
- Configuration mise à jour (deploy, keystatic, etc.)
- Redirections nettoyées

### Phase 4 : Optimisations

**Statut:** À planifier
**Durée estimée:** Variable

**Améliorations potentielles:**

- Tests automatisés (unit tests, e2e tests)
- Optimisation automatique des images
- PWA support (service worker, manifest)
- Lazy loading des images
- Compression brotli/gzip
- CDN pour les assets statiques
- Monitoring et analytics avancés

---

## 18. Gestion des images avec Keystatic

### 18.1 Structure des images

Après migration (2026-06-08), la structure des images est organisée par collection :

```
public/images/
├── content/           # Images des composants Markdoc génériques
├── articles/          # Images des articles (65 images)
├── accompagnements/   # Images des services/accompagnements (23 images)
├── faq/              # Images des FAQ
├── landing-pages/    # Images des landing pages (futur)
└── pages/            # Images des pages statiques Astro
```

### 18.2 Modes de fonctionnement

**Mode local (développement):**
- Storage: `kind: 'local'`
- Images stockées dans `public/images/` localement
- Les images NE SONT PAS synchronisées avec GitHub
- À utiliser pour: développement code, tests de composants

**Mode GitHub (production):**
- Storage: `kind: 'github'`
- Images uploadées via https://all-leaders.fr/keystatic
- Keystatic commit automatiquement dans le repo GitHub
- À utiliser pour: ajout de contenu avec images

### 18.3 Workflow recommandé

#### Pour ajouter du contenu avec images (éditeurs):

1. Aller sur https://all-leaders.fr/keystatic
2. Se connecter avec GitHub OAuth
3. Créer/éditer un article ou accompagnement
4. Uploader l'image via l'interface Keystatic
5. Sauvegarder → Keystatic commit automatiquement

#### Pour développer localement (développeurs):

1. Lancer `npm run dev` (mode local)
2. Travailler sur le code, les composants
3. Ne PAS ajouter d'images dans Keystatic local
4. Pour tester avec de vraies images, utiliser celles déjà présentes

#### Éviter les conflits:

❌ **Ne JAMAIS faire:**
- Ajouter des images en local puis les commiter manuellement
- Éditer le même contenu en local ET en prod simultanément
- Modifier manuellement les chemins d'images dans les .mdoc

✅ **Toujours faire:**
- Ajouter les images via l'interface prod (mode GitHub)
- Faire `git pull` avant de travailler localement
- Utiliser la branche `main` pour le contenu, des branches de feature pour le code

### 18.4 Configuration

Les chemins d'images sont configurés dans `keystatic.config.tsx`:

```typescript
// Landing pages
'landing-pages' → directory: 'public/images/landing-pages/', publicPath: '/images/landing-pages/'

// Articles
articles → directory: 'public/images/articles/', publicPath: '/images/articles/'

// Accompagnements
accompagnements → directory: 'public/images/accompagnements/', publicPath: '/images/accompagnements/'

// FAQ
faq → directory: 'public/images/faq', publicPath: '/images/faq/'

// Composants génériques
all components → directory: 'public/images/content', publicPath: '/images/content/'
```

**Dernière mise à jour:** 2026-06-08 (Migration images)
**Version de la documentation:** 2.1 (All Leaders Initiative + Images)
**Remplace:** Version 2.0
