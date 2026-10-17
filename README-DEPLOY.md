# Déploiement GitHub Pages

1. Créez un dépôt GitHub nommé `ShopConnect`.
2. Dans le terminal, placez-vous dans le dossier `frontend`.
3. Remplacez `VOTRE_NOM_GITHUB` dans `package.json` par votre identifiant GitHub.
4. Initialisez Git et reliez le dépôt (remplacez l'URL par celle de votre dépôt) :

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE_NOM_GITHUB/ShopConnect.git
git push -u origin main
```

5. Installez les dépendances et déployez :

```bash
npm install
npm run deploy
```

Le site sera publié à l'adresse `https://VOTRE_NOM_GITHUB.github.io/ShopConnect`.

Attention : GitHub Pages ne peut pas héberger l'API Laravel. Une API hébergée séparément est nécessaire pour que la page d'accueil affiche les produits en ligne.
