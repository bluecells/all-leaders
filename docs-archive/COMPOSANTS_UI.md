# Composants UI disponibles dans Keystatic

Ce guide explique comment utiliser les composants UI Astro dans l'éditeur Keystatic via Markdoc.

## Slider

Carousel d'images avec texte et CTA.

```markdoc
{% slider
  height="calc(100vh - 7rem)"
  speed=3000
  images=[
    { src: "/images/pages/slide1.webp", alt: "Chambre confortable" },
    { src: "/images/pages/slide2.webp", alt: "Espace co-living" }
  ]
  title="Bienvenue à Limòlo"
  subtitle="Tourisme responsable et co-living"
  ctaText="Découvrir plus"
  ctaLink="/fr/chambres"
  framePosition="left"
/%}
```

### Props disponibles:

- `height` (string, défaut: `"calc(100vh - 7rem)"`) - Hauteur du slider
- `speed` (number, défaut: `3000`) - Vitesse de transition en millisecondes
- `images` (array, **requis**) - Tableau d'objets `{ src, alt }`
- `title` (string) - Titre affiché dans le cadre
- `subtitle` (string) - Sous-titre
- `ctaText` (string) - Texte du bouton
- `ctaLink` (string) - Lien du bouton
- `framePosition` (string, défaut: `"left"`) - Position du cadre: `"left"` ou `"right"`

---

## Banner

Bannière avec titre et sous-titre, fond coloré ou image.

```markdoc
{% banner
  title="Nous accueillons les voyageurs au cœur vert"
  subtitle="Pour séjourner autrement en Sardaigne…"
  background="var(--color-bg-body)"
  height="400px"
/%}
```

### Props disponibles:

- `title` (string, **requis**) - Titre principal
- `subtitle` (string) - Sous-titre
- `background` (string, défaut: `"white"`) - Couleur de fond CSS
- `backgroundImage` (string) - URL d'une image de fond
- `height` (string, défaut: `"400px"`) - Hauteur de la bannière

---

## Duo

Section avec texte d'un côté et image de l'autre.

```markdoc
{% duo
  title="Le Co-living aussi en vacances"
  subtitle="Limòlo est une éco-maison d'hôtes conçue pour ceux qui souhaitent vivre la Sardaigne avec plus de temps."
  image="/images/pages/ingresso_4_DSC_6725_27_Q-min.webp"
  imageAlt="Notre maison"
  imagePosition="left"
  ctaText="Découvrir le co-living à Limòlo"
  ctaLink="/fr/coliving"
  background="#f9f9f9"
/%}
```

### Props disponibles:

- `title` (string, **requis**) - Titre de la section
- `subtitle` (string) - Description/texte
- `ctaText` (string) - Texte du bouton
- `ctaLink` (string) - Lien du bouton
- `image` (string, **requis**) - URL de l'image
- `imageAlt` (string) - Texte alternatif pour l'image
- `imagePosition` (string, défaut: `"right"`) - Position image: `"left"` ou `"right"`
- `background` (string, défaut: `"transparent"`) - Couleur de fond

---

## Carousel

Carousel horizontal défilant automatiquement.

```markdoc
{% carousel
  images=[
    { src: "/images/pages/carousel1.webp", alt: "Cuisine extérieure" },
    { src: "/images/pages/carousel2.webp", alt: "Événements durables" },
    { src: "/images/pages/carousel3.webp", alt: "Jardins Limolo" }
  ]
  height="35vh"
  speed=5000
  background="var(--color-bg-body)"
  spacing="1.5rem"
/%}
```

### Props disponibles:

- `images` (array, **requis**) - Tableau d'objets `{ src, alt }`
- `height` (string, défaut: `"30vh"`) - Hauteur du carousel
- `speed` (number, défaut: `5000`) - Vitesse de défilement en ms
- `background` (string, défaut: `"transparent"`) - Couleur de fond
- `spacing` (string, défaut: `"1rem"`) - Espacement entre images

---

## Hero

Section hero avec fond image et CTA.

```markdoc
{% hero
  title="Bienvenue chez Limòlo"
  subtitle="Tourisme responsable"
  ctaText="Réserver maintenant"
  ctaLink="/prenota"
  secondaryLinkText="En savoir plus"
  secondaryLinkUrl="/chi-siamo"
  backgroundImage="/images/hero-bg.jpg"
  photoCredit="Photo par John Doe"
  backgroundPositionX="center"
  backgroundPositionY="center"
  body="<p>Texte HTML optionnel</p>"
  bgColor="bg-indigo-900"
/%}
```

### Props disponibles:

- `title` (string, défaut: `"Titolo Principale"`) - Titre principal
- `subtitle` (string, défaut: `"Titolo Secondario"`) - Sous-titre
- `ctaText` (string, défaut: `"CTA"`) - Texte bouton principal
- `ctaLink` (string, défaut: `"/faq/"`) - Lien bouton principal
- `secondaryLinkText` (string) - Texte lien secondaire
- `secondaryLinkUrl` (string) - URL lien secondaire
- `backgroundImage` (string) - URL image de fond
- `photoCredit` (string) - Crédit photo
- `backgroundPositionX` (string, défaut: `"bottom"`) - Position X image
- `backgroundPositionY` (string, défaut: `"top"`) - Position Y image
- `backgroundPositionXMobile` (string) - Position X mobile
- `backgroundPositionYMobile` (string) - Position Y mobile
- `body` (string) - Contenu HTML additionnel
- `bgColor` (string, défaut: `"bg-indigo-900 dark:bg-indigo-400/10"`) - Classes Tailwind

---

## Notes importantes

1. **Syntaxe des tableaux**: Pour les props de type array (images), utilisez la syntaxe JavaScript:

   ```markdoc
   images=[
     { src: "/path/to/image.jpg", alt: "Description" },
     { src: "/path/to/image2.jpg", alt: "Description 2" }
   ]
   ```

2. **Balises auto-fermantes**: Utilisez `/%}` pour fermer les tags sans contenu.

3. **Chemins d'images**: Les chemins commencent par `/images/` et correspondent au dossier `public/images/`.

4. **Couleurs CSS**: Vous pouvez utiliser:
   - Variables CSS: `var(--color-bg-body)`
   - Couleurs hexadécimales: `#f9f9f9`
   - Classes Tailwind pour Hero: `bg-indigo-900`

5. **Responsive**: Tous les composants sont responsive et s'adaptent automatiquement aux mobiles.
