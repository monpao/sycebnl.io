# Guide de Déploiement - Application SYCEBNL sur Vercel avec Neon.tech

## Prérequis

1. **Compte Vercel** : Créez un compte sur [vercel.com](https://vercel.com)
2. **Compte GitHub** : Votre code doit être hébergé sur GitHub
3. **Base de données Neon.tech** : Votre base de données PostgreSQL est déjà configurée

## Étapes de Déploiement

### 1. Préparation du Code

Votre application a été configurée pour PostgreSQL avec les modifications suivantes :

- ✅ **Schema mis à jour** : Migration de SQLite vers PostgreSQL dans `shared/schema.ts`
- ✅ **Configuration Drizzle** : Mise à jour pour PostgreSQL dans `drizzle.config.ts`
- ✅ **Configuration Base de données** : Utilisation de `@neondatabase/serverless` dans `server/db.ts`
- ✅ **Configuration Vercel** : Fichier `vercel.json` créé
- ✅ **Variables d'environnement** : Fichiers `.env` et `.env.example` créés

### 2. Pousser le Code sur GitHub

```bash
# Initialiser le repository Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Commit initial
git commit -m "Configuration initiale pour déploiement Vercel avec Neon.tech"

# Ajouter l'origine remote (remplacez par votre repository)
git remote add origin https://github.com/votre-username/votre-repo.git

# Pousser vers GitHub
git push -u origin main
```

### 3. Configuration de la Base de Données

#### 3.1 Générer les Migrations

```bash
# Installer les dépendances
npm install

# Générer les migrations pour PostgreSQL
npm run db:generate

# Appliquer les migrations à votre base Neon.tech
npm run db:push
```

#### 3.2 Initialiser les Données (Optionnel)

Si vous avez des données initiales à insérer :

```bash
# Exécuter le script d'initialisation
npx tsx init-db.ts
```

### 4. Déploiement sur Vercel

#### 4.1 Via l'Interface Web Vercel

1. **Connectez-vous à Vercel** : [vercel.com](https://vercel.com)
2. **Nouveau Projet** : Cliquez sur "New Project"
3. **Importer Repository** : Sélectionnez votre repository GitHub
4. **Configuration du Projet** :
   - **Framework Preset** : Other
   - **Root Directory** : `./` (racine)
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`

#### 4.2 Configuration des Variables d'Environnement

Dans les paramètres du projet Vercel, ajoutez les variables d'environnement :

| Nom | Valeur |
|-----|--------|
| `DATABASE_URL` | `postgresql://neondb_owner:npg_Eenud6l9rNJK@ep-hidden-surf-aeize3ac-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require` |
| `NODE_ENV` | `production` |

#### 4.3 Via CLI Vercel (Alternative)

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer
vercel

# Configurer les variables d'environnement
vercel env add DATABASE_URL
# Entrez la chaîne de connexion Neon.tech

vercel env add NODE_ENV
# Entrez: production

# Redéployer avec les nouvelles variables
vercel --prod
```

### 5. Configuration Post-Déploiement

#### 5.1 Vérification de la Base de Données

Après le déploiement, vérifiez que les tables ont été créées :

1. Connectez-vous à votre dashboard Neon.tech
2. Vérifiez que les tables suivantes existent :
   - `users`
   - `modules`
   - `user_progress`
   - `questions`
   - `quiz_attempts`
   - `certificates`
   - `contact_messages`

#### 5.2 Test de l'Application

1. **Accédez à votre URL Vercel** (fournie après le déploiement)
2. **Testez les fonctionnalités principales** :
   - Inscription/Connexion
   - Navigation dans les modules
   - Quiz et évaluations
   - Génération de certificats

### 6. Maintenance et Mises à Jour

#### 6.1 Déploiements Automatiques

Vercel redéploiera automatiquement votre application à chaque push sur la branche `main`.

#### 6.2 Migrations de Base de Données

Pour les futures mises à jour du schéma :

```bash
# Générer une nouvelle migration
npm run db:generate

# Appliquer la migration
npm run db:push
```

#### 6.3 Monitoring

- **Logs Vercel** : Consultez les logs dans le dashboard Vercel
- **Monitoring Neon.tech** : Surveillez les performances de la base de données

## Structure des Fichiers Modifiés

```
sycebnl_application/
├── .env                     # Variables d'environnement locales
├── .env.example            # Exemple de variables d'environnement
├── .gitignore              # Fichiers à ignorer par Git
├── vercel.json             # Configuration Vercel
├── vite.config.ts          # Configuration Vite
├── drizzle.config.ts       # Configuration Drizzle (PostgreSQL)
├── shared/
│   └── schema.ts           # Schéma PostgreSQL
└── server/
    └── db.ts               # Configuration base de données Neon.tech
```

## Dépannage

### Erreurs Communes

1. **Erreur de connexion à la base de données**
   - Vérifiez que `DATABASE_URL` est correctement configurée
   - Assurez-vous que la base Neon.tech est accessible

2. **Erreur de build**
   - Vérifiez que toutes les dépendances sont installées
   - Consultez les logs de build dans Vercel

3. **Erreur 500 en production**
   - Consultez les logs de fonction dans Vercel
   - Vérifiez les variables d'environnement

### Support

- **Documentation Vercel** : [vercel.com/docs](https://vercel.com/docs)
- **Documentation Neon.tech** : [neon.tech/docs](https://neon.tech/docs)
- **Documentation Drizzle** : [orm.drizzle.team](https://orm.drizzle.team)

## Sécurité

⚠️ **Important** : 
- Ne jamais commiter le fichier `.env` dans Git
- Utilisez des variables d'environnement pour toutes les informations sensibles
- Changez régulièrement les mots de passe de base de données

---

Votre application est maintenant prête pour le déploiement sur Vercel avec une base de données PostgreSQL hébergée sur Neon.tech !

