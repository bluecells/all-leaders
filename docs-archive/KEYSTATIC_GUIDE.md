# Guide d'Utilisation de Keystatic pour Daniela et Mem

Bienvenue! Ce guide vous aidera à créer et modifier le contenu du site Limolo.

## 🚀 Accès à Keystatic

### En développement local

1. Assurez-vous que le serveur de développement est lancé: `npm run dev`
2. Ouvrez votre navigateur à l'adresse: `http://localhost:4321/keystatic`
3. Vous verrez l'interface d'administration Keystatic

### En production

Une fois le site déployé, accédez à: `https://votre-site.com/keystatic`

## 📝 Collections Disponibles

### 1. Pages

Les pages principales du site (À propos, Chambres, Contact, etc.)

**Champs à remplir:**
- **Title**: Titre de la page (sera utilisé dans l'URL)
- **Language**: Choisir IT, FR ou EN
- **SEO**:
  - Meta Title: Titre pour les moteurs de recherche
  - Meta Description: Description pour Google
- **Content**: Le contenu principal de la page (format Markdown)

**Conseil**: Créez 3 versions de chaque page (une par langue)

### 2. Articles

Articles de blog sur le tourisme responsable, le co-living, etc.

**Champs à remplir:**
- **Title**: Titre de l'article
- **Language**: IT, FR ou EN
- **Publish Date**: Date de publication
- **Featured**: Cocher si l'article doit être mis en avant
- **Featured Image**: Image principale de l'article
- **Excerpt**: Court résumé (apparaît dans les listes)
- **SEO**: Meta Title et Description
- **Content**: Contenu complet de l'article

### 3. FAQ

Questions et réponses fréquentes

**Champs à remplir:**
- **Question**: La question posée
- **Language**: IT, FR ou EN
- **Category**: Catégorie (Réservation, Chambres, Tourisme Responsable, Co-living, Général)
- **Display Order**: Ordre d'affichage (0 = premier)
- **Answer**: La réponse (format Markdown)

## 🌍 Gestion Multilingue

Pour chaque contenu, vous devez créer **3 versions** (une par langue):

1. Créez la version italienne (langue par défaut)
2. Dupliquez le contenu et changez la langue en FR
3. Traduisez le contenu en français
4. Répétez pour l'anglais (EN)

**Important**: Utilisez le même slug/titre de base pour les 3 versions afin de les lier logiquement.

## 🔄 Workflow Git

### Votre Branche Personnelle

Chaque éditrice a sa propre branche:
- **Daniela**: `content/DANIELA`
- **Mem**: `content/MEM`

### Comment ça marche

1. Lorsque vous créez ou modifiez du contenu via Keystatic
2. Les changements sont automatiquement sauvegardés sur votre branche
3. Keystatic crée un commit avec vos modifications
4. Un administrateur reverra et fusionnera vos changements dans la branche principale

**Avantage**: Vous ne risquez pas d'écraser le travail de l'autre!

## ✍️ Écrire en Markdown

Le contenu utilise le format Markdown. Voici les bases:

### Titres
```markdown
# Titre Principal
## Sous-titre
### Titre de section
```

### Texte
```markdown
Texte normal

**Texte en gras**

*Texte en italique*
```

### Listes
```markdown
- Point 1
- Point 2
- Point 3

1. Premier
2. Deuxième
3. Troisième
```

### Liens
```markdown
[Texte du lien](https://url.com)
```

### Images
Utilisez le bouton "Add Image" dans l'éditeur Keystatic pour uploader des images.

## 💡 Conseils Pratiques

### Pour les Pages

- Soyez cohérentes dans la structure entre les 3 langues
- Utilisez des titres clairs et descriptifs
- Pensez SEO: utilisez des mots-clés pertinents

### Pour les Articles

- Rédigez des excerpts accrocheurs (150-200 caractères)
- Utilisez des images de qualité
- Structurez avec des sous-titres
- Incluez des appels à l'action

### Pour les FAQ

- Questions courtes et claires
- Réponses concises mais complètes
- Utilisez les catégories pour organiser
- Ajustez l'ordre d'affichage selon l'importance

## 🎯 Exemples de Contenu

Des exemples sont déjà créés dans chaque collection:
- Page "rooms" en italien
- Article "Turismo Responsabile" en italien
- FAQ "Quanto costa" en italien

Utilisez-les comme référence pour créer vos contenus!

## ❓ Questions Fréquentes

**Q: Puis-je modifier le contenu créé par l'autre éditrice?**
R: Oui! Toutes les deux avez accès à tout le contenu. Vos changements seront sur votre branche respective.

**Q: Que se passe-t-il si on modifie le même contenu en même temps?**
R: Le système Git gérera les conflits. L'administrateur les résoudra lors du merge.

**Q: Comment prévisualiser mes changements?**
R: Après avoir sauvegardé dans Keystatic, vos changements sont visibles immédiatement sur le site de développement.

**Q: Je ne vois pas mes images dans l'éditeur?**
R: Assurez-vous d'utiliser le bouton "Add Image" et que les images sont dans le bon dossier.

## 🆘 Besoin d'Aide?

Si vous rencontrez un problème:
1. Vérifiez ce guide
2. Regardez les exemples de contenu existants
3. Contactez l'administrateur du site

---

**Bon travail! 🎉**
