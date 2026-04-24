#!/bin/bash
set -e

# CONFIGURATION
PROD_HOST="chaise.o2switch.net"
PROD_USER="boje2508"
PROD_PATH="/home2/boje2508/public_html/limolo.bluecells.eu"

echo "🚀 Step 1: Nettoyage et Build local..."
rm -rf dist
npm run build

echo "📦 Step 2: Préparation du package.json de production..."
# On crée une version allégée pour ne pas installer les outils de build (Vite, Tailwind...) sur O2Switch
node -e "const pkg = JSON.parse(require('fs').readFileSync('package.json')); delete pkg.devDependencies; require('fs').writeFileSync('package.json.prod', JSON.stringify(pkg, null, 2))"

echo "📡 Step 3: Transfert vers o2switch..."
rsync -avz --delete \
    --include='dist/***' \
    --include='src/content/***' \
    --include='public/***' \
    --include='app.js' \
    --include='package.json' \
    --include='keystatic.config.tsx' \
    --exclude='*' \
    ./ $PROD_USER@$PROD_HOST:$PROD_PATH/

echo "🛠 Step 4: Installation des modules (Production uniquement)..."
# On utilise --no-save pour ne pas modifier le package.json sur le serveur
ssh $PROD_USER@$PROD_HOST "source /home2/boje2508/nodevenv/public_html/limolo.bluecells.eu/22/bin/activate && cd $PROD_PATH && npm install --production --no-save"
echo "🔄 Step 5: Redémarrage de l'application..."
# Sur o2switch, toucher restart.txt relance le processus Node
mkdir -p tmp
ssh $PROD_USER@$PROD_HOST "mkdir -p $PROD_PATH/tmp && touch $PROD_PATH/tmp/restart.txt"

echo "✅ DÉPLOIEMENT TERMINÉ !"