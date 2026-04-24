# Installation et Configuration - Limolo

## ✅ Ce qui a été fait

### 1. Installation des Technologies

- ✅ **Astro** (v5.16.7) - Framework web
- ✅ **Tailwind CSS** (v4.1.18) - Styling
- ✅ **Keystatic CMS** (v0.5.48) - Gestion de contenu
- ✅ **React** (v19.2.3) - Pour l'interface Keystatic
- ✅ **Support i18n** - Configuration trilingue (IT, FR, EN)

### 2. Configuration du Projet

#### Astro Config ([astro.config.mjs](astro.config.mjs))
- ✅ Intégration React pour Keystatic
- ✅ Intégration Keystatic
- ✅ Configuration i18n (Italien par défaut, FR et EN)
- ✅ Mode de sortie hybride pour Keystatic
- ✅ Tailwind CSS via Vite plugin

#### Keystatic Config ([keystatic.config.ts](keystatic.config.ts))
- ✅ Configuration Git-based avec préfixe de branche `content/`
- ✅ Collection **Pages** (trilingue)
- ✅ Collection **Articles** (trilingue, avec date, featured, image)
- ✅ Collection **FAQ** (trilingue, avec catégories et ordre)

### 3. Structure des Fichiers

```
limolo/
├── src/
│   ├── content/          # Contenu Keystatic
│   │   ├── pages/        # Pages (exemple: rooms)
│   │   ├── articles/     # Articles (exemple: turismo-responsabile)
│   │   └── faq/          # FAQ (exemple: quanto-costa)
│   ├── layouts/
│   │   └── Layout.astro  # Layout principal avec support i18n
│   ├── pages/
│   │   ├── index.astro   # Page d'accueil IT
│   │   ├── fr/
│   │   │   └── index.astro  # Page d'accueil FR
│   │   ├── en/
│   │   │   └── index.astro  # Page d'accueil EN
│   │   └── keystatic/
│   │       ├── index.astro     # Interface Keystatic
│   │       └── [...params].ts   # API Keystatic
│   └── styles/
│       └── global.css    # Styles Tailwind
├── public/
│   └── images/
│       ├── pages/        # Images pour les pages
│       └── articles/     # Images pour les articles
├── keystatic.config.ts   # Config CMS
├── astro.config.mjs      # Config Astro
├── .env.example          # Variables d'environnement (à copier)
├── README.md             # Documentation du projet
├── KEYSTATIC_GUIDE.md    # Guide pour Daniela et Mem
└── INSTALLATION.md       # Ce fichier
```

### 4. Branches Git

- ✅ `master` - Branche principale
- ✅ `content/DANIELA` - Branche d'édition pour Daniela
- ✅ `content/MEM` - Branche d'édition pour Mem

### 5. Contenu d'Exemple

Pour chaque collection, un exemple en italien a été créé:

- ✅ **Page**: "Rooms" - Description des chambres
- ✅ **Article**: "Turismo Responsabile" - Article sur le tourisme responsable
- ✅ **FAQ**: "Quanto costa" - Question sur les tarifs

## 🚀 Prochaines Étapes

### 1. Configuration GitHub

1. Créer un repository GitHub nommé `limolo`
2. Copier `.env.example` vers `.env`:
   ```bash
   cp .env.example .env
   ```
3. Éditer `.env` et mettre à jour:
   ```
   GITHUB_OWNER=votre-username-github
   GITHUB_REPO=limolo
   ```

### 2. Premier Commit

```bash
git add .
git commit -m "Configuration initiale du site Limolo"
git push origin master
git push origin content/DANIELA
git push origin content/MEM
```

### 3. Configuration GitHub OAuth (pour production)

1. Aller sur: https://github.com/settings/developers
2. Créer une nouvelle OAuth App:
   - **Application name**: Keystatic - Limolo
   - **Homepage URL**: `https://votre-site.com`
   - **Authorization callback URL**: `https://votre-site.com/api/keystatic/github/oauth/callback`
3. Copier le Client ID et Client Secret
4. Ajouter dans `.env`:
   ```
   PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID=votre_client_id
   PUBLIC_KEYSTATIC_GITHUB_CLIENT_SECRET=votre_client_secret
   ```

### 4. Lancer le Projet

```bash
# Installer les dépendances (déjà fait)
npm install

# Lancer le serveur de développement
npm run dev

# Le site sera accessible à: http://localhost:4321
# Keystatic admin: http://localhost:4321/keystatic
```

### 5. Tester Keystatic

1. Ouvrir `http://localhost:4321/keystatic`
2. Explorer les collections (Pages, Articles, FAQ)
3. Voir les exemples de contenu créés
4. Tester la création d'un nouveau contenu

### 6. Formation de Daniela et Mem

1. Partager le fichier [KEYSTATIC_GUIDE.md](KEYSTATIC_GUIDE.md)
2. Faire une démo de l'interface Keystatic
3. Montrer comment:
   - Créer une nouvelle page/article/FAQ
   - Changer la langue
   - Uploader des images
   - Prévisualiser les changements
4. Expliquer le workflow Git avec leurs branches respectives

### 7. Déploiement

Le site peut être déployé sur plusieurs plateformes:

#### Vercel (Recommandé)
```bash
npm install -g vercel
vercel
```

#### Netlify
- Connecter le repository GitHub
- Build command: `npm run build`
- Publish directory: `dist`

#### Cloudflare Pages
- Même configuration que Netlify

**Important**: Configurer les variables d'environnement sur la plateforme de déploiement!

## 📋 Checklist de Déploiement

- [ ] Repository GitHub créé et poussé
- [ ] Variables d'environnement configurées
- [ ] GitHub OAuth App créée (pour production)
- [ ] Site déployé sur la plateforme choisie
- [ ] Variables d'environnement ajoutées sur la plateforme
- [ ] Test de l'interface Keystatic en production
- [ ] Daniela et Mem ont accès à Keystatic
- [ ] Documentation partagée avec l'équipe

## 🎯 Fonctionnalités Prêtes à l'Emploi

### Support Multilingue
- ✅ Italien (langue par défaut, pas de préfixe d'URL)
- ✅ Français (`/fr/...`)
- ✅ Anglais (`/en/...`)

### Collections Keystatic
- ✅ Pages avec SEO
- ✅ Articles avec images, dates, featured
- ✅ FAQ avec catégories et ordre personnalisé

### Workflow Git
- ✅ Branches séparées pour chaque éditrice
- ✅ Pas de conflits entre les éditions
- ✅ Review avant publication sur master

### Design
- ✅ Tailwind CSS configuré
- ✅ Layout responsive
- ✅ Pages d'exemple trilingues

## 📚 Ressources

- [Documentation Astro](https://docs.astro.build)
- [Documentation Keystatic](https://keystatic.com/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)

## 🆘 Support

Pour toute question ou problème:
1. Consulter la documentation dans ce repository
2. Vérifier les issues GitHub du projet
3. Contacter l'administrateur technique

---

**Le projet est prêt à être utilisé! 🎉**
