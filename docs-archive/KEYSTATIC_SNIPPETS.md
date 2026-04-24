# Snippets Keystatic - Composants UI

Copiez et collez ces snippets dans l'éditeur Markdoc de Keystatic.

## Slider

```markdoc
{% slider
   height="calc(100vh - 7rem)"
   speed="3000"
   title="Titre du slider"
   subtitle="Sous-titre"
   ctaText="En savoir plus"
   ctaLink="/link"
   framePosition="left"
/%}
```

**Props disponibles:**
- `height`: Altezza (default: `calc(100vh - 7rem)`)
- `speed`: Velocità in ms (default: `3000`)
- `title`: Titolo
- `subtitle`: Sottotitolo
- `ctaText`: Testo del pulsante
- `ctaLink`: Link del pulsante
- `framePosition`: `left` o `right` (default: `left`)

---

## Banner

```markdoc
{% banner
   title="Titre du banner"
   subtitle="Sous-titre optionnel"
   background="white"
   height="400px"
/%}
```

**Props disponibles:**
- `title`: Titolo (richiesto)
- `subtitle`: Sottotitolo
- `background`: Colore sfondo (default: `white`)
- `backgroundImage`: URL immagine sfondo
- `height`: Altezza (default: `400px`)

---

## Duo (Image + Texte)

```markdoc
{% duo
   title="Titre"
   subtitle="Sous-titre"
   image="/images/photo.jpg"
   imageAlt="Description de l'image"
   imagePosition="right"
   ctaText="En savoir plus"
   ctaLink="/link"
   background="transparent"
/%}
```

**Props disponibili:**
- `title`: Titolo (richiesto)
- `subtitle`: Sottotitolo
- `image`: URL immagine (richiesto)
- `imageAlt`: Testo alternativo
- `imagePosition`: `left` o `right` (default: `right`)
- `ctaText`: Testo CTA
- `ctaLink`: Link CTA
- `background`: Colore sfondo (default: `transparent`)

---

## Carousel

```markdoc
{% carousel
   height="30vh"
   speed="5000"
   background="transparent"
   spacing="1rem"
/%}
```

**Props disponibili:**
- `height`: Altezza (default: `30vh`)
- `speed`: Velocità in ms (default: `5000`)
- `background`: Colore sfondo (default: `transparent`)
- `spacing`: Spaziatura tra elementi (default: `1rem`)

---

## Hero

```markdoc
{% hero
   title="Titre principal"
   subtitle="Titre secondaire"
   ctaText="Appel à l'action"
   ctaLink="/link"
   secondaryLinkText="Lien secondaire"
   secondaryLinkUrl="/autre-link"
   backgroundImage="/images/hero.jpg"
   photoCredit="Photo par..."
   backgroundPositionX="bottom"
   backgroundPositionY="top"
   body="Texte du corps"
   bgColor="bg-indigo-900"
/%}
```

**Props disponibili:**
- `title`: Titolo (default: `Titolo Principale`)
- `subtitle`: Sottotitolo (default: `Titolo Secondario`)
- `ctaText`: Testo CTA (default: `CTA`)
- `ctaLink`: Link CTA (default: `/faq/`)
- `secondaryLinkText`: Testo link secondario
- `secondaryLinkUrl`: URL link secondario
- `backgroundImage`: Immagine sfondo
- `photoCredit`: Crediti fotografici
- `backgroundPositionX`: Posizione orizzontale (default: `bottom`)
- `backgroundPositionY`: Posizione verticale (default: `top`)
- `backgroundPositionXMobile`: Posizione orizzontale mobile
- `backgroundPositionYMobile`: Posizione verticale mobile
- `body`: Corpo del testo
- `bgColor`: Classe colore background (default: `bg-indigo-900 dark:bg-indigo-400/10`)

---

## Astuce

Dans l'éditeur Markdoc de Keystatic:
1. Cliquez sur le bouton `</>` (Code) en haut à droite
2. Collez le snippet souhaité
3. Modifiez les valeurs selon vos besoins
4. Revenez en mode visuel

Ou gardez ce fichier ouvert dans un onglet pour copier-coller rapidement!
