# Guide des Animations GSAP

Ce projet utilise **GSAP (GreenSock Animation Platform)** pour des animations professionnelles et performantes.

## 📦 Installation

GSAP est déjà installé:
```bash
npm install gsap --legacy-peer-deps
```

## 🎬 Composants d'Animation

### 1. HeroAnimated
Composant héro avec animations au chargement et parallax au scroll.

```astro
---
import HeroAnimated from '@/components/HeroAnimated.astro';
---

<HeroAnimated
  title="Bienvenue"
  subtitle="Découvrez"
  description="Une description inspirante"
  cta={{ label: "Commencer", url: "/contact" }}
  backgroundImage="/hero-bg.jpg"
  lang="fr"
/>
```

**Animations incluses:**
- Fade-in cascade du titre, sous-titre et description
- CTA avec scale animation
- Indicateur de scroll animé
- Parallax léger au scroll

### 2. StatsAnimated
Composant statistiques avec compteurs animés.

```astro
---
import StatsAnimated from '@/components/StatsAnimated.astro';
---

<StatsAnimated
  title="Nos Résultats"
  description="Chiffres clés"
  stats={[
    { value: 500, label: "Clients satisfaits", suffix: "+" },
    { value: 95, label: "Taux de satisfaction", suffix: "%" },
    { value: 10, label: "Années d'expérience" },
    { value: 50, label: "Équipe", suffix: "+" },
  ]}
  variant="light"
/>
```

**Animations incluses:**
- Compteurs qui s'animent au scroll
- Apparition progressive des cartes
- Stagger pour un effet en cascade

### 3. ScrollReveal
Wrapper pour animer l'apparition d'éléments au scroll.

```astro
---
import ScrollReveal from '@/components/ScrollReveal.astro';
---

<ScrollReveal delay={0.2} direction="up" duration={0.8}>
  <div class="content">Mon contenu...</div>
</ScrollReveal>
```

**Props:**
- `delay`: délai avant l'animation (secondes)
- `direction`: direction de l'animation ('up', 'down', 'left', 'right')
- `duration`: durée de l'animation

## 🛠️ Animations Globales

### Animations au chargement (Layout.astro)

Les animations suivantes sont automatiquement appliquées:
- Fade-in des titres (h1, h2, h3)
- Apparition des articles (.article-card)
- Apparition des services (.service-card)
- Hover animations sur les cartes

### Utiliser les animations programmées

```typescript
import {
  initPageAnimations,
  animateOnScroll,
  animateCardHover,
  animateParallax,
  animateStagger,
  animateCounter,
  animateDrawSVG
} from '@/utils/animations';

// Au chargement
initPageAnimations();

// Animation au scroll
animateOnScroll('.my-element');

// Hover sur les cartes
animateCardHover('.my-card');

// Parallax
animateParallax('.parallax-element', 0.5);

// Stagger (apparition progressive)
animateStagger('.elements', 0.8);

// Compteurs animés
animateCounter('.counter-value', 2);

// Dessiner des SVG
animateDrawSVG('svg path', 1.5);
```

## 🎨 Styles d'Animation

Les styles initiaux sont définis dans `/src/styles/animations.css`:

```css
/* Les éléments commencent invisibles et décalés */
h1, h2, h3 {
  opacity: 0;
  transform: translateY(20px);
}

.article-card, .service-card {
  opacity: 0;
  transform: translateY(30px);
}
```

## ⚡ Performances

GSAP est optimisé pour:
- ✅ GPU acceleration (utilise `transform` et `opacity`)
- ✅ Animations fluides à 60fps
- ✅ Lazy loading des animations
- ✅ ScrollTrigger pour contrôle au scroll
- ✅ Respect de `prefers-reduced-motion`

## 🔧 Configuration ScrollTrigger

ScrollTrigger est automatiquement enregistré. Pour des triggers personnalisés:

```typescript
gsap.to(element, {
  scrollTrigger: {
    trigger: element,
    start: "top 80%",        // Quand déclencher
    end: "bottom top",       // Quand arrêter
    toggleActions: "play none none none",
    markers: false,          // Debug
    scrub: 1,               // 1 = lié au scroll
  },
  opacity: 1,
  y: 0,
  ease: "power2.out"
});
```

## 📱 Responsive Animations

Les animations s'adaptent automatiquement:
- Pas d'animation sur devices avec `prefers-reduced-motion`
- Ajustement des durées selon les média queries
- Performance optimisée sur mobile

## 🚀 Bonnes Pratiques

1. **Utilisez les éasings appropriés:**
   - `power2.out`: sortie douce (défaut)
   - `power3.out`: plus dramatique
   - `elastic.out`: ressort
   - `back.out`: recul

2. **Durées recommandées:**
   - Interactions rapides: 0.3s - 0.5s
   - Entrées/sorties: 0.8s - 1s
   - Animations complexes: 1.5s - 2s

3. **Évitez:**
   - Les animations sur `transform: auto`
   - Les animations sur des éléments mobiles fréquemment
   - Les durées trop longues (>3s)

4. **Testez:**
   - Sur différents devices
   - Avec `prefers-reduced-motion` activé
   - Les performances (DevTools Performance tab)

## 📚 Ressources

- [Documentation GSAP](https://greensock.com/docs)
- [ScrollTrigger Plugin](https://greensock.com/scrolltrigger)
- [Ease Visualizer](https://greensock.com/docs/v3/Eases)
