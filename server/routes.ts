import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertContactMessageSchema, insertQuizAttemptSchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendContactNotification, sendCertificationRequest } from "./email";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Middleware to verify JWT token
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Admin middleware
const requireAdmin = (req: any, res: any, next: any) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize training data
  await initializeTrainingData();

  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = await storage.createUser(userData);
      
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role
        }
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ message: "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({ message: "Login failed" });
    }
  });

  // Protected routes
  app.get("/api/auth/me", authenticateToken, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Module routes
  app.get("/api/modules", authenticateToken, async (req: any, res) => {
    try {
      const modules = await storage.getModules();
      res.json(modules);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch modules" });
    }
  });

  app.get("/api/modules/:id", authenticateToken, async (req: any, res) => {
    try {
      const module = await storage.getModule(parseInt(req.params.id));
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      res.json(module);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch module" });
    }
  });

  // User progress routes
  app.get("/api/progress", authenticateToken, async (req: any, res) => {
    try {
      const progress = await storage.getUserProgress(req.user.id);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  app.post("/api/progress", authenticateToken, async (req: any, res) => {
    try {
      const progressData = { ...req.body, userId: req.user.id };
      const progress = await storage.createUserProgress(progressData);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to create progress" });
    }
  });

  app.put("/api/progress/:id", authenticateToken, async (req: any, res) => {
    try {
      const progress = await storage.updateUserProgress(parseInt(req.params.id), req.body);
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  // Quiz routes
  app.get("/api/modules/:moduleId/quiz/:type", authenticateToken, async (req: any, res) => {
    try {
      const questions = await storage.getModuleQuestions(
        parseInt(req.params.moduleId),
        req.params.type
      );
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });

  // Get quiz attempts for a specific module and type
  app.get("/api/quiz/attempts/:moduleId/:type", authenticateToken, async (req: any, res) => {
    try {
      const attempts = await storage.getUserQuizAttempts(
        req.user.id,
        parseInt(req.params.moduleId),
        req.params.type
      );
      res.json(attempts);
    } catch (error) {
      console.error("Failed to fetch quiz attempts:", error);
      res.status(500).json({ message: "Failed to fetch quiz attempts" });
    }
  });

  app.post("/api/quiz/attempt", authenticateToken, async (req: any, res) => {
    try {
      const { moduleId, type, chapterIndex, answers } = req.body;
      
      // For module quizzes, check if user can retake (2h restriction)
      if (type === "module") {
        const lastAttempts = await storage.getUserQuizAttempts(req.user.id, moduleId, "module");
        const lastFailedAttempt = lastAttempts
          .filter(attempt => !attempt.passed)
          .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())[0];
          
        if (lastFailedAttempt && lastFailedAttempt.canRetakeAt && new Date() < new Date(lastFailedAttempt.canRetakeAt!)) {
          const waitTime = Math.ceil((new Date(lastFailedAttempt.canRetakeAt!).getTime() - new Date().getTime()) / (1000 * 60));
          return res.status(429).json({ 
            message: `Vous devez attendre encore ${waitTime} minutes avant de repasser le devoir`,
            canRetakeAt: lastFailedAttempt.canRetakeAt
          });
        }
      }
      
      // Calculate score based on quiz type
      const totalQuestions = type === "chapter" ? 5 : 10; // 5 for chapter, 10 for module
      const pointsPerQuestion = type === "chapter" ? 4 : 2; // 20 points total for both
      const correctAnswers = answers.filter((answer: any) => answer.isCorrect).length;
      const score = correctAnswers * pointsPerQuestion;
      const passed = score >= 16; // Minimum 16/20 to pass
      
      const attemptData = {
        userId: req.user.id,
        moduleId,
        type,
        chapterIndex,
        score,
        totalQuestions,
        answers: JSON.stringify(answers),
        passed,
        canRetakeAt: !passed && type === "module" ? new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() : null // 2h restriction for failed module attempts
      };
      
      const attempt = await storage.createQuizAttempt(attemptData);
      res.json(attempt);
    } catch (error) {
      console.error("Quiz attempt error:", error);
      res.status(500).json({ message: "Failed to save quiz attempt" });
    }
  });

  app.get("/api/quiz/attempts/:moduleId/:type", authenticateToken, async (req: any, res) => {
    try {
      const attempts = await storage.getUserQuizAttempts(
        req.user.id,
        parseInt(req.params.moduleId),
        req.params.type
      );
      res.json(attempts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quiz attempts" });
    }
  });

  // Certificate routes
  app.get("/api/certificate", authenticateToken, async (req: any, res) => {
    try {
      const certificate = await storage.getUserCertificate(req.user.id);
      res.json(certificate);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch certificate" });
    }
  });

  app.post("/api/certificate", authenticateToken, async (req: any, res) => {
    try {
      const certificate = await storage.createCertificate(req.user.id);
      res.json(certificate);
    } catch (error) {
      res.status(500).json({ message: "Failed to create certificate" });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req, res) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      
      // Sauvegarder le message dans la base de données
      const message = await storage.createContactMessage(messageData);
      
      // Envoyer les emails de notification
      const emailSent = await sendContactNotification({
        name: messageData.name,
        email: messageData.email,
        subject: messageData.subject,
        message: messageData.message
      });
      
      if (emailSent) {
        console.log(`Email de contact envoyé pour: ${messageData.name} (${messageData.email})`);
      } else {
        console.warn(`Échec de l'envoi d'email pour: ${messageData.name} (${messageData.email})`);
      }
      
      // Si c'est une demande de certification, envoyer un email spécial
      if (messageData.subject.toLowerCase().includes('certification') || 
          messageData.subject.toLowerCase().includes('paiement')) {
        await sendCertificationRequest({
          name: messageData.name,
          email: messageData.email
        });
      }
      
      res.json({ 
        ...message, 
        emailSent: emailSent,
        message: "Message envoyé avec succès" 
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Admin routes
  app.get("/api/admin/stats", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const stats = await storage.getUserStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  app.get("/api/admin/users", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const users = await storage.getAllUsersWithProgress();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get("/api/admin/messages", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Download chapter summary
  app.get("/api/modules/:moduleId/chapters/:chapterIndex/summary", authenticateToken, async (req: any, res) => {
    try {
      const module = await storage.getModule(parseInt(req.params.moduleId));
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      
      const chapterIndex = parseInt(req.params.chapterIndex);
      const chapter = (module.content as any).chapters[chapterIndex];
      if (!chapter) {
        return res.status(404).json({ message: "Chapter not found" });
      }
      
      const summary = chapter.summary || "Résumé non disponible pour ce chapitre.";
      const filename = `${module.title.replace(/[^a-zA-Z0-9]/g, "_")}_Chapitre_${chapterIndex + 1}_Resume.txt`;
      
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.send(`SYCEBNL - Résumé de Formation\n      \nModule: ${module.title}\nChapitre: ${chapter.title}\nDate de téléchargement: ${new Date().toLocaleDateString("fr-FR")}\n\n----------------------------------------\n\n${summary}\n\n----------------------------------------\nFormation SYCEBNL - Comptabilité des Projets\nPlateforme de Formation Certifiante`);
    } catch (error) {
      res.status(500).json({ message: "Failed to download summary" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Initialize training data
async function initializeTrainingData() {
  try {
    // Clear existing modules and recreate with new structure
    const existingModules = await storage.getModules();
    console.log(`Found ${existingModules.length} existing modules, reinitializing...`);

    // Create training modules based on the provided documents
    const modules = [
      {
        title: "Fondamentaux de la Comptabilité des Projets SYCEBNL",
        description: "Comprendre les bases essentielles de la comptabilité des projets selon le référentiel SYCEBNL",
        content: JSON.stringify({
          chapters: [
            {
              title: "Introduction au SYCEBNL",
              content: `<div class="slideshow">
                <div class="slide">
                  <h2>Le Système Comptable des Entreprises du Bénin et à but Non Lucratif</h2>
                  <p>Le SYCEBNL est un référentiel comptable spécialement conçu pour les entreprises et associations sans but lucratif au Bénin. Il s\\\"inspire des normes internationales tout en tenant compte du contexte local.</p>
                  <ul>
                    <li>Harmonisation avec les normes OHADA</li>
                    <li>Adaptation aux spécificités des ASBL</li>
                    <li>Transparence financière renforcée</li>
                  </ul>
                </div>
                <div class="slide">
                  <h2>Objectifs du SYCEBNL</h2>
                  <p>Le système vise à :</p>
                  <ul>
                    <li>Standardiser la comptabilité des projets</li>
                    <li>Améliorer la transparence financière</li>
                    <li>Faciliter le contrôle et l\\\"audit</li>
                    <li>Renforcer la gouvernance financière</li>
                  </ul>
                </div>
                <div class="slide">
                  <h2>Principes Fondamentaux</h2>
                  <p>Les principes de base incluent :</p>
                  <ul>
                    <li><strong>Spécialisation des exercices :</strong> Rattachement des charges et produits à leur période</li>
                    <li><strong>Permanence des méthodes :</strong> Cohérence dans l\\\"application des règles</li>
                    <li><strong>Prudence :</strong> Évaluation raisonnable des actifs et passifs</li>
                    <li><strong>Transparence :</strong> Information claire et complète</li>
                  </ul>
                </div>
              </div>`,
              summary: "Le SYCEBNL est un référentiel comptable pour les entreprises et ASBL au Bénin, basé sur les normes OHADA avec des adaptations locales. Il vise la transparence financière et la standardisation comptable."
            },
            {
              title: "Architecture du Plan Comptable",
              content: `<div class="slideshow">
                <div class="slide">
                  <h2>Structure du Plan Comptable SYCEBNL</h2>
                  <p>Le plan comptable SYCEBNL est organisé en 8 classes principales :</p>
                  <table class="comptable-table">
                    <tr><td>Classe 1</td><td>Comptes de ressources durables</td></tr>
                    <tr><td>Classe 2</td><td>Comptes d\\\"actif immobilisé</td></tr>
                    <tr><td>Classe 3</td><td>Comptes de stocks</td></tr>
                    <tr><td>Classe 4</td><td>Comptes de tiers</td></tr>
                    <tr><td>Classe 5</td><td>Comptes de trésorerie</td></tr>
                    <tr><td>Classe 6</td><td>Comptes de charges</td></tr>
                    <tr><td>Classe 7</td><td>Comptes de produits</td></tr>
                    <tr><td>Classe 8</td><td>Comptes spéciaux</td></tr>
                  </table>
                </div>
                <div class="slide">
                  <h2>Spécificités des Comptes de Projets</h2>
                  <p>Pour les projets, une attention particulière est portée aux :</p>
                  <ul>
                    <li><strong>Comptes 40 :</strong> Fournisseurs et comptes rattachés</li>
                    <li><strong>Comptes 41 :</strong> Clients et comptes rattachés</li>
                    <li><strong>Comptes 42 :</strong> Personnel et organismes sociaux</li>
                    <li><strong>Comptes 43 :</strong> Organismes sociaux</li>
                    <li><strong>Comptes 44 :</strong> État et collectivités</li>
                    <li><strong>Comptes 45 :</strong> Organismes internationaux</li>
                  </ul>
                </div>
              </div>`,
              summary: "Le plan comptable SYCEBNL comprend 8 classes de comptes, avec des spécificités pour les projets dans la gestion des tiers (classe 4) et la traçabilité des financements."
            }
          ]
        }),
        orderIndex: 1,
        isActive: 1
      },
      {
        title: "Tableau de Flux de Trésorerie",
        description: "Comprendre et élaborer les tableaux de flux de trésorerie selon les normes SYCEBNL",
        content: JSON.stringify({
          chapters: [
            {
              title: "Introduction aux flux de trésorerie",
              content: `<div class="slideshow">
                <div class="slide">
                  <h2>Qu\'est-ce qu\'un flux de trésorerie ?</h2>
                  <p>Les flux de trésorerie représentent les mouvements d\'entrée et de sortie de liquidités d\'une organisation sur une période donnée.</p>
                  <div class="definition-box">
                    <strong>Définition :</strong> Un flux de trésorerie est un mouvement de liquidités (espèces, comptes bancaires) entrant ou sortant de l\'organisation.
                  </div>
                </div>
                <div class="slide">
                  <h2>Importance du tableau de flux</h2>
                  <p>Le tableau de flux de trésorerie permet de :</p>
                  <ul>
                    <li>Évaluer la capacité de l\'organisation à générer des liquidités</li>
                    <li>Analyser l\'utilisation des ressources financières</li>
                    <li>Prévoir les besoins futurs de financement</li>
                    <li>Mesurer la solvabilité à court terme</li>
                  </ul>
                </div>
              </div>`,
              summary: "Les flux de trésorerie sont les mouvements de liquidités. Le tableau de flux permet d\'évaluer la capacité de génération de liquidités et la solvabilité."
            }
          ]
        }),
        orderIndex: 2,
        isActive: 1
      },
      {
        title: "Tableau Emplois-Ressources",
        description: "Maîtriser l\'analyse des emplois et ressources des projets",
        content: JSON.stringify({
          chapters: [
            {
              title: "Identification des ressources",
              content: `<div class="slideshow">
                <div class="slide">
                  <h2>Les Ressources de Projets</h2>
                  <p>Les ressources représentent l\'ensemble des moyens financiers mobilisés pour la réalisation d\'un projet.</p>
                  <div class="categories-box">
                    <h3>Types de ressources :</h3>
                    <ul>
                      <li><strong>Ressources propres :</strong> Fonds propres de l\'organisation</li>
                      <li><strong>Subventions :</strong> Financements publics ou privés</li>
                      <li><strong>Emprunts :</strong> Financements remboursables</li>
                      <li><strong>Contributions en nature :</strong> Biens et services</li>
                    </ul>
                  </div>
                </div>
                <div class="slide">
                  <h2>Comptabilisation des Ressources</h2>
                  <p>Chaque type de ressource suit des règles comptables spécifiques :</p>
                  <table class="comptable-table">
                    <tr><th>Type</th><th>Compte</th><th>Principe</th></tr>
                    <tr><td>Subventions reçues</td><td>74xx</td><td>Produit de l\'exercice</td></tr>
                    <tr><td>Emprunts</td><td>16xx</td><td>Dette à long terme</td></tr>
                    <tr><td>Dons</td><td>75xx</td><td>Produit exceptionnel</td></tr>
                  </table>
                </div>
              </div>`,
              summary: "Les ressources de projets comprennent les fonds propres, subventions, emprunts et contributions en nature. Chaque type suit des règles comptables spécifiques selon le plan SYCEBNL."
            }
          ]
        }),
        orderIndex: 3,
        isActive: 1
      },
      {
        title: "Analyse Financière et Ratios",
        description: "Techniques d\'analyse et d\'interprétation des données financières des projets",
        content: JSON.stringify({
          chapters: [
            {
              title: "Ratios de gestion de projet",
              content: `<div class="slideshow">
                <div class="slide">
                  <h2>Les Ratios Essentiels</h2>
                  <p>L\'analyse financière des projets utilise des ratios spécifiques :</p>
                  <div class="formula-box">
                    <h3>Ratio d\'exécution budgétaire</h3>
                    <p><strong>Dépenses réalisées / Budget alloué × 100</strong></p>
                    <p>Mesure le niveau d\'exécution du budget</p>
                  </div>
                </div>
                <div class="slide">
                  <h2>Indicateurs de Performance</h2>
                  <ul>
                    <li><strong>Taux de réalisation :</strong> Activités réalisées / Activités prévues</li>
                    <li><strong>Efficience :</strong> Résultats obtenus / Ressources utilisées</li>
                    <li><strong>Efficacité :</strong> Objectifs atteints / Objectifs fixés</li>
                  </ul>
                </div>
              </div>`,
              summary: "L\'analyse financière des projets utilise des ratios spécifiques comme le ratio d\'exécution budgétaire et des indicateurs de performance (efficience, efficacité)."
            }
          ]
        }),
        orderIndex: 4,
        isActive: 1
      },
      {
        title: "Cas Pratiques et Applications",
        description: "Application pratique sur des cas concrets de gestion de projets SYCEBNL",
        content: JSON.stringify({
          chapters: [
            {
              title: "Étude de cas complète",
              content: `<div class="slideshow">
                <div class="slide">
                  <h2>Cas Pratique : Association VERDAS</h2>
                  <p>Analyse complète d\'un projet selon le référentiel SYCEBNL</p>
                  <div class="case-study-box">
                    <h3>Contexte :</h3>
                    <p>L\'association VERDAS gère un projet de développement rural financé par plusieurs bailleurs.</p>
                    <ul>
                      <li>Budget total : 500 000 000 FCFA</li>
                      <li>Durée : 3 ans</li>
                      <li>Multiples sources de financement</li>
                    </ul>
                  </div>
                </div>
                <div class="slide">
                  <h2>Analyse des Écritures</h2>
                  <p>Exemples d\'écritures comptables selon SYCEBNL :</p>
                  <table class="journal-table">
                    <tr><th>Date</th><th>Libellé</th><th>Débit</th><th>Crédit</th></tr>
                    <tr><td>01/01</td><td>Réception subvention</td><td>521 Banque</td><td>740 Subventions</td></tr>
                    <tr><td>15/01</td><td>Achat matériel</td><td>605 Achats</td><td>521 Banque</td></tr>
                  </table>
                </div>
              </div>`,
              summary: "Cas pratique de l\'association VERDAS : analyse complète d\'un projet de développement rural avec exemples d\'écritures comptables selon le référentiel SYCEBNL."
            }
          ]
        }),
        orderIndex: 5,
        isActive: 1
      }
    ];

    for (const moduleData of modules) {
      await storage.createModule(moduleData);
    }

    console.log("Training data initialized successfully");
  } catch (error) {
    console.error("Failed to initialize training data:", error);
  }
}


