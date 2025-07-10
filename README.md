# SYCEBNL Application Moderne

Application web moderne pour SYCEBNL avec interface React et backend Express/TypeScript.

## Fonctionnalités

- Interface utilisateur moderne avec React et Tailwind CSS
- Backend robuste avec Express et TypeScript
- Authentification JWT
- Base de données SQLite avec Drizzle ORM
- Système de quiz interactif
- Gestion des utilisateurs et des rôles
- Interface d'administration

## Déploiement sur Render

Cette application est optimisée pour le déploiement sur Render.com.

### Configuration automatique

Le fichier `render.yaml` configure automatiquement :
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Port: 10000 (configuré via variable d'environnement)
- Health check: `/api/health`

### Variables d'environnement requises

- `NODE_ENV`: production
- `PORT`: 10000 (défini automatiquement par Render)
- `JWT_SECRET`: votre clé secrète JWT (optionnel, une valeur par défaut est fournie)

### Déploiement

1. Connectez votre repository GitHub à Render
2. Sélectionnez "Web Service"
3. Render détectera automatiquement la configuration via `render.yaml`
4. Déployez !

## Développement local

```bash
# Installation des dépendances
npm install

# Développement
npm run dev

# Build de production
npm run build

# Démarrage en production
npm start
```

## Structure du projet

```
├── client/          # Frontend React
├── server/          # Backend Express
├── shared/          # Types et schémas partagés
├── dist/           # Build de production
└── render.yaml     # Configuration Render
```

## Technologies utilisées

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Express, TypeScript, JWT
- **Base de données**: SQLite avec Drizzle ORM
- **UI Components**: Radix UI, Lucide React
- **Déploiement**: Render.com

## Notes importantes

- Le dossier des dépendances est nommé `nodemodules` au lieu de `node_modules`
- L'application utilise SQLite pour la simplicité du déploiement
- Un utilisateur admin par défaut est créé automatiquement
- L'application sert à la fois l'API et le frontend sur le même port

