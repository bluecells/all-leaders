# Composants Markdoc disponibles

## YouTube

Affiche une preview d'une vidéo YouTube qui s'ouvre dans un nouvel onglet au clic.

**Utilisation dans Keystatic :**

```markdoc
{% YouTube videoId="dQw4w9WgXcQ" title="Titre de la vidéo" /%}
```

**Attributs :**
- `videoId` (requis) : L'ID de la vidéo YouTube (la partie après `watch?v=` dans l'URL)
- `title` (optionnel) : Titre alternatif pour l'accessibilité
- `height` (optionnel) : Hauteur de la preview (ex: `400px`, `50vh`)
- `padding` (optionnel, défaut: `0`) : Espacement autour du composant (format CSS: `1rem`, `2rem 1rem`)
- `text` (optionnel) : Zone de texte descriptive
- `textPosition` (optionnel, défaut: `bottom`) : Position du texte (`top`, `bottom`, `left`, `right`)

**Options de taille :**

1. **Full size (défaut)** : Sans spécifier `height`, la vidéo prend toute la largeur disponible
```markdoc
{% YouTube videoId="abc123def" title="Ma vidéo" /%}
```

2. **Hauteur fixe en 16:9** : Spécifier une hauteur, la largeur sera calculée automatiquement en ratio 16:9
```markdoc
{% YouTube videoId="abc123def" title="Ma vidéo" height="400px" /%}
{% YouTube videoId="abc123def" title="Ma vidéo" height="50vh" /%}
```

**Avec texte et padding :**
```markdoc
{% YouTube
   videoId="abc123def"
   title="Ma vidéo"
   height="400px"
   padding="2rem 1rem"
   text="Découvrez notre vidéo explicative"
   textPosition="right"
/%}
```

**Exemple complet :**
```markdoc
{% YouTube
   videoId="abc123def"
   height="500px"
   padding="3rem 0"
   text="Une introduction complète à notre projet"
   textPosition="left"
/%}
```

---

## Quadrifoglio

Mosaïque de 4 images au format carré (2x2) avec effet d'allumage progressif (1-2-3-4).

**Utilisation dans Keystatic :**

```markdoc
{% Quadrifoglio
   images=[
     { src: "/images/photo1.jpg", alt: "Description photo 1" },
     { src: "/images/photo2.jpg", alt: "Description photo 2" },
     { src: "/images/photo3.jpg", alt: "Description photo 3" },
     { src: "/images/photo4.jpg", alt: "Description photo 4" }
   ]
   height="500px"
/%}
```

**Attributs :**
- `images` (requis) : Tableau de 4 objets avec `image` et `alt`
- `height` (optionnel, défaut: `400px`) : Hauteur de la grille
- `padding` (optionnel, défaut: `0`) : Espacement autour du composant (format CSS: `1rem`, `2rem 1rem`)
- `text` (optionnel) : Zone de texte descriptive
- `textPosition` (optionnel, défaut: `bottom`) : Position du texte (`top`, `bottom`, `left`, `right`)

**Caractéristiques :**
- Animation d'apparition séquentielle (1→2→3→4)
- Effet de zoom au survol
- Responsive (grille 2x2 sur mobile aussi)
- Format carré automatique

**Exemple avec texte et padding :**
```markdoc
{% Quadrifoglio
   images=[
     { image: "/images/photo1.jpg", alt: "Description photo 1" },
     { image: "/images/photo2.jpg", alt: "Description photo 2" },
     { image: "/images/photo3.jpg", alt: "Description photo 3" },
     { image: "/images/photo4.jpg", alt: "Description photo 4" }
   ]
   height="500px"
   padding="2rem 0"
   text="Nos quatre espaces principaux"
   textPosition="bottom"
/%}
```

---

## Blog

Affiche la liste des articles du blog avec filtres par catégorie, tags et recherche.

**Utilisation dans Keystatic :**

```markdoc
{% Blog lang="it" /%}
```

**Attributs :**
- `lang` (optionnel, défaut: `it`) : Langue des articles à afficher (`it`, `fr`, `en`)

**Caractéristiques :**
- Affichage automatique des articles de la langue sélectionnée
- Recherche en temps réel
- Filtres par catégorie
- Filtres par tags
- Design responsive avec sidebar

**Exemples :**
```markdoc
{% Blog lang="it" /%}
{% Blog lang="fr" /%}
{% Blog lang="en" /%}
```

---

## Autres composants disponibles

### Slider
Carousel plein écran avec texte et CTA.

### Banner
Bannière avec titre et fond personnalisable.

### Duo
Section avec image et texte côte à côte.

### Carousel
Carousel d'images horizontal.

### Hero
Section héro avec image de fond et CTA.
