# Comment voir les articles dans Keystatic Admin

## Problème résolu

Les articles n'apparaissaient pas dans Keystatic parce qu'ils n'étaient pas dans la bonne structure de dossiers.

## Structure correcte des fichiers

Keystatic s'attend à ce que les articles soient organisés par langue:

```
src/content/articles/
├── it/
│   ├── giornata-ramsar-2026-in-sardegna-stagnintour.mdoc ✅
│   ├── regali-green-e-natale-sostenibile-limolo-consigli.mdoc ✅
│   └── turismo-responsabile.mdoc ✅
├── fr/
│   └── article-en-francais.mdoc ✅
└── en/
    └── (vide pour l'instant)
```

## Modifications effectuées

1. ✅ Déplacement des articles italiens de `src/content/articles/` vers `src/content/articles/it/`
2. ✅ Création du dossier `src/content/articles/en/` pour les futurs articles anglais
3. ✅ Ajout du champ `featuredPhotoAlt` au schéma dans `content.config.ts`
4. ✅ Nettoyage du cache

## Pour voir les articles dans Keystatic

### Étape 1: Arrêter le serveur de développement
Si le serveur est en cours d'exécution, arrêtez-le avec `Ctrl+C` ou:
```bash
pkill -f "npm run dev"
```

### Étape 2: Nettoyer le cache (optionnel mais recommandé)
```bash
rm -rf .astro node_modules/.vite
```

### Étape 3: Redémarrer le serveur
```bash
npm run dev
```

### Étape 4: Accéder à Keystatic
Ouvrez votre navigateur et allez sur:
```
http://localhost:4321/keystatic
```

Vous devriez maintenant voir **4 articles** dans la section "Articoli":
- 3 articles en italien (IT)
- 1 article en français (FR)

## Comment créer un nouvel article

1. Aller sur `/keystatic`
2. Cliquer sur "Articoli"
3. Cliquer sur "Create entry"
4. Sélectionner la langue (IT/FR/EN)
5. Remplir le formulaire
6. L'article sera automatiquement créé dans `src/content/articles/{lang}/`

## Configuration Keystatic

Le path dans `keystatic.config.ts`:
```typescript
path: 'src/content/articles/{{lang}}/*'
```

Cette configuration utilise une variable dynamique `{{lang}}` qui crée automatiquement les fichiers dans le bon sous-dossier selon la langue sélectionnée.

## Vérification

Pour vérifier que la structure est correcte:
```bash
ls -R src/content/articles/
```

Vous devriez voir:
```
en  fr  it

src/content/articles/en:

src/content/articles/fr:
article-en-francais.mdoc

src/content/articles/it:
giornata-ramsar-2026-in-sardegna-stagnintour.mdoc
regali-green-e-natale-sostenibile-limolo-consigli.mdoc
turismo-responsabile.mdoc
```

## Notes importantes

- **Toujours redémarrer le serveur** après avoir modifié la structure des fichiers
- **Ne pas déplacer manuellement les fichiers** pendant que le serveur est en cours d'exécution
- **Utiliser Keystatic** pour créer de nouveaux articles afin d'éviter les problèmes de structure
