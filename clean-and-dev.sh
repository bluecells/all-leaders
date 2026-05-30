#!/bin/bash
# Script to clean Vite cache and start dev server
# Use: ./clean-and-dev.sh

echo "🧹 Cleaning Vite cache..."
rm -rf node_modules/.vite
rm -rf .astro

echo "🚀 Starting dev server..."
npm run dev
