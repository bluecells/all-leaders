#!/bin/bash

# Couleurs pour la lisibilité
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== GitDeploy : Gestion des synchronisations ===${NC}"
echo "Choisissez une option :"
echo "1) Pull de remote et fusion avec local (Mise à jour douce)"
echo "2) Push de local et fusion avec remote (Envoi classique)"
echo "3) ÉCRASEMENT du remote par le local (Force Push)"
echo "4) ÉCRASEMENT du local par le remote (Hard Reset)"
echo "q) Quitter"

read -p "Votre choix [1-4] : " choice

case $choice in
    1)
        echo -e "${GREEN}Récupération des modifications distantes...${NC}"
        git pull origin $(git branch --show-current)
        ;;
    2)
        echo -e "${GREEN}Envoi des modifications vers le remote...${NC}"
        git push origin $(git branch --show-current)
        ;;
    3)
        echo -e "${RED}⚠️ ATTENTION : Vous allez écraser l'historique distant avec vos fichiers locaux.${NC}"
        read -p "Êtes-vous sûr ? (y/n) : " confirm
        if [ "$confirm" = "y" ]; then
            git push origin $(git branch --show-current) --force
            echo -e "${GREEN}Remote écrasé.${NC}"
        else
            echo "Action annulée."
        fi
        ;;
    4)
        echo -e "${RED}⚠️ ATTENTION : Vous allez perdre TOUTES vos modifications locales non commitées.${NC}"
        read -p "Êtes-vous sûr ? (y/n) : " confirm
        if [ "$confirm" = "y" ]; then
            git fetch origin
            git reset --hard origin/$(git branch --show-current)
            echo -e "${GREEN}Local écrasé par le remote.${NC}"
        else
            echo "Action annulée."
        fi
        ;;
    q)
        exit 0
        ;;
    *)
        echo -e "${RED}Choix invalide.${NC}"
        ;;
esac