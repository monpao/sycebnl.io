# Configuration Email pour SYCEBNL Formation

## 📧 Configuration Gmail pour l'envoi d'emails automatiques

### Étapes de configuration :

1. **Activer l'authentification à 2 facteurs**
   - Connectez-vous à votre compte Gmail (sycebnlprojet@gmail.com)
   - Allez dans "Gérer votre compte Google"
   - Sécurité → Authentification à 2 facteurs
   - Activez l'authentification à 2 facteurs

2. **Générer un mot de passe d'application**
   - Dans les paramètres de sécurité Google
   - Recherchez "Mots de passe d'application"
   - Sélectionnez "Autre (nom personnalisé)"
   - Nommez-le "SYCEBNL Formation"
   - Copiez le mot de passe généré (16 caractères)

3. **Configurer les variables d'environnement**
   - Créez un fichier `.env` à la racine du projet
   - Ajoutez les variables suivantes :
   ```
   EMAIL_USER=sycebnlprojet@gmail.com
   EMAIL_PASS=votre-mot-de-passe-application-16-caracteres
   ```

### ⚠️ Sécurité importante :
- **JAMAIS** utiliser le mot de passe principal Gmail
- Utiliser uniquement le mot de passe d'application généré
- Ne pas partager ces informations
- Ajouter `.env` au fichier `.gitignore`

### 🧪 Test de la configuration :
Une fois configuré, le système enverra automatiquement :
- Email de notification à sycebnlprojet@gmail.com pour chaque message de contact
- Email de confirmation à l'utilisateur qui a envoyé le message
- Email spécial pour les demandes de certification

### 📋 Fonctionnalités email :
- ✅ Notification admin pour tous les messages
- ✅ Confirmation automatique à l'utilisateur
- ✅ Emails HTML avec design professionnel
- ✅ Détection automatique des demandes de certification
- ✅ Gestion des erreurs d'envoi

### 🔧 Dépannage :
Si les emails ne s'envoient pas :
1. Vérifiez que l'authentification à 2 facteurs est activée
2. Vérifiez que le mot de passe d'application est correct
3. Consultez les logs du serveur pour les erreurs
4. Vérifiez que Gmail n'a pas bloqué l'accès

### 📞 Support :
En cas de problème, contactez l'équipe technique avec les logs d'erreur.

