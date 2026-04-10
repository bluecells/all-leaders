# All Leaders

Site web dédié au leadership et au développement personnel.

## 📚 Documentation

Pour la documentation complète du projet, consulter **[DOCUMENTATION.md](./DOCUMENTATION.md)**

La documentation couvre:

- Installation et configuration (Astro, Keystatic)
- Architecture du site (routing, collections, layouts)
- Système multilingue (IT/FR/EN)
- Système hreflang pour le SEO multilingue
- Composants UI Markdoc (23 composants)
- Design system et styles
- Déploiement O2Switch
- Workflow Git et Keystatic Cloud
- Bonnes pratiques et dépannage

## 🚀 Démarrage rapide

```bash
# Installation
npm install

# Développement (http://localhost:4321)
npm run dev

# Build production
npm run build

# Édition de contenu
npm run dev
# Accéder à http://localhost:4321/keystatic
```

## 🛠️ Stack Technique

- **Astro 5** - Framework web avec SSR
- **Keystatic CMS** - Gestion de contenu avec Cloud storage
- **Tailwind CSS v4** - Framework CSS
- **React** - Composants interactifs
- **TypeScript** - Typage statique
- **Markdoc** - Édition de contenu enrichi

## 📁 Structure du Projet

```
src/
├── pages/              # Pages Astro et routing dynamique
├── content/            # Collections Keystatic
│   ├── pages/         # Pages de contenu (it/, fr/)
│   ├── articles/      # Blog (it/, fr/)
│   ├── rooms/         # Chambres (it/, fr/)
│   ├── faq/          # FAQ (it/, fr/)
│   ├── categories/   # Catégories YAML
│   ├── tags/         # Tags YAML
│   └── redirects/    # Redirections 301/302
├── layouts/           # Layouts Astro
├── components/        # Composants globaux
├── content-components/ # Composants Markdoc
├── data/             # Traductions centralisées
├── styles/           # Styles globaux
└── utils/            # Utilitaires (hreflang, etc.)
```

## 🌍 Multilingue (IT/FR/EN)

- **Italien:** `/` (langue par défaut)
- **Français:** `/fr/`
- **Anglais:** `/en/`

## 🔗 Liens Importants

- **Site web:** https://all-leaders.fr
- **Repository:** https://github.com/bluecells/all-leaders
- **Contact:** contact@all-leaders.fr
- **Hébergeur:** O2Switch (chaise.o2switch.net)

## 📄 Anciennes Documentation

Les fichiers de documentation précédents ont été archivés dans `/docs-archive/` pour référence historique.
