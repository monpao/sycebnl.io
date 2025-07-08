# Application SYCEBNL

Ce dépôt contient le code source de l'application SYCEBNL, une plateforme de formation en comptabilité des projets.

## Instructions de Déploiement

Suivez ces étapes pour déployer l'application :

### Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre système :

- Node.js (version 18 ou supérieure)
- npm (Node Package Manager)
- Git

### Installation des Dépendances

1. Clonez le dépôt :
   ```bash
   git clone <URL_DU_DEPOT>
   cd sycebnl-app
   ```

2. Installez les dépendances du projet :
   ```bash
   npm install
   ```

### Configuration de la Base de Données

L'application utilise SQLite comme base de données par défaut. Un fichier `local.db` sera créé à la racine du projet lors de la première exécution.

1. Initialisez la base de données et appliquez les migrations :
   ```bash
   npx tsx init-db.ts
   npm run db:push
   ```

   *Note : Le script `init-db.ts` créera également un utilisateur administrateur par défaut si il n'existe pas :*
   *   **Email :** `admin@sycebnl.com`
   *   **Mot de passe :** `adminpassword`

### Exécution de l'Application

Pour démarrer l'application en mode production :

```bash
npm start
```

L'application sera accessible sur le port `5000` (par exemple, `http://localhost:5000`).

### Construction du Projet (pour le déploiement)

Pour construire les fichiers statiques du client et le serveur pour le déploiement :

```bash
npm run build
```

Les fichiers construits se trouveront dans le dossier `dist`.

