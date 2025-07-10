var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  UserRole: () => UserRole,
  certificates: () => certificates,
  certificatesRelations: () => certificatesRelations,
  contactMessages: () => contactMessages,
  insertContactMessageSchema: () => insertContactMessageSchema,
  insertModuleSchema: () => insertModuleSchema,
  insertQuizAttemptSchema: () => insertQuizAttemptSchema,
  insertUserProgressSchema: () => insertUserProgressSchema,
  insertUserSchema: () => insertUserSchema,
  modules: () => modules,
  modulesRelations: () => modulesRelations,
  questions: () => questions,
  questionsRelations: () => questionsRelations,
  quizAttempts: () => quizAttempts,
  quizAttemptsRelations: () => quizAttemptsRelations,
  userProgress: () => userProgress,
  userProgressRelations: () => userProgressRelations,
  users: () => users,
  usersRelations: () => usersRelations
});
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
var UserRole = {
  Student: "student",
  Admin: "admin"
};
var users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  role: text("role").$type().notNull().default("student"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});
var modules = sqliteTable("modules", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  // Rich content including slides, text, etc.
  orderIndex: integer("order_index").notNull(),
  isActive: integer("is_active", { mode: "boolean" }, { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});
var userProgress = sqliteTable("user_progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  moduleId: integer("module_id").notNull().references(() => modules.id),
  status: text("status").notNull().default("not_started"),
  // not_started, in_progress, completed
  chapterScore: integer("chapter_score").default(0),
  moduleScore: integer("module_score").default(0),
  completedAt: text("completed_at"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});
var questions = sqliteTable("questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  moduleId: integer("module_id").notNull().references(() => modules.id),
  type: text("type").notNull(),
  // chapter, module
  question: text("question").notNull(),
  options: text("options").notNull(),
  // Array of options
  correctAnswer: integer("correct_answer").notNull(),
  // Index of correct option
  explanation: text("explanation"),
  orderIndex: integer("order_index").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});
var quizAttempts = sqliteTable("quiz_attempts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  moduleId: integer("module_id").notNull().references(() => modules.id),
  type: text("type").notNull(),
  // 'chapter' or 'module'
  chapterIndex: integer("chapter_index"),
  // null for module quizzes
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  answers: text("answers").notNull(),
  // Array of selected answers
  passed: integer("passed", { mode: "boolean" }).notNull().default(false),
  canRetakeAt: text("can_retake_at"),
  // For failed module attempts - 2h restriction
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});
var certificates = sqliteTable("certificates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  certificateNumber: text("certificate_number").notNull().unique(),
  issueDate: text("issue_date").notNull(),
  status: text("status").notNull().default("pending"),
  // pending, paid, issued
  paymentStatus: text("payment_status").notNull().default("unpaid"),
  // unpaid, paid
  downloadCount: integer("download_count").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});
var contactMessages = sqliteTable("contact_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("pending"),
  // pending, responded
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});
var usersRelations = relations(users, ({ many }) => ({
  progress: many(userProgress),
  quizAttempts: many(quizAttempts),
  certificates: many(certificates)
}));
var modulesRelations = relations(modules, ({ many }) => ({
  progress: many(userProgress),
  questions: many(questions),
  quizAttempts: many(quizAttempts)
}));
var userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(users, { fields: [userProgress.userId], references: [users.id] }),
  module: one(modules, { fields: [userProgress.moduleId], references: [modules.id] })
}));
var questionsRelations = relations(questions, ({ one, many }) => ({
  module: one(modules, { fields: [questions.moduleId], references: [modules.id] }),
  attempts: many(quizAttempts)
}));
var quizAttemptsRelations = relations(quizAttempts, ({ one }) => ({
  user: one(users, { fields: [quizAttempts.userId], references: [users.id] }),
  module: one(modules, { fields: [quizAttempts.moduleId], references: [modules.id] })
}));
var certificatesRelations = relations(certificates, ({ one }) => ({
  user: one(users, { fields: [certificates.userId], references: [users.id] })
}));
var insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  fullName: true,
  role: true
});
var insertModuleSchema = createInsertSchema(modules).pick({
  title: true,
  description: true,
  content: true,
  orderIndex: true,
  isActive: true
});
var insertUserProgressSchema = createInsertSchema(userProgress).pick({
  userId: true,
  moduleId: true,
  status: true,
  chapterScore: true,
  moduleScore: true
});
var insertQuizAttemptSchema = createInsertSchema(quizAttempts).pick({
  userId: true,
  moduleId: true,
  type: true,
  chapterIndex: true,
  score: true,
  totalQuestions: true,
  answers: true,
  passed: true,
  canRetakeAt: true
});
var insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true
});

// server/db.ts
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
var sqlite = new Database(process.env.DATABASE_URL || "sycebnl.db");
var db = drizzle(sqlite, { schema: schema_exports });

// server/storage.ts
import { eq, desc, and, sql as sql2 } from "drizzle-orm";
import bcrypt from "bcryptjs";
var DatabaseStorage = class {
  // User operations
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }
  async createUser(insertUser) {
    try {
      const hashedPassword = await bcrypt.hash(insertUser.password, 12);
      const [user] = await db.insert(users).values({ ...insertUser, password: hashedPassword, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() }).returning();
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  // Module operations
  async getModules() {
    return await db.select().from(modules).where(eq(modules.isActive, 1)).orderBy(modules.orderIndex);
  }
  async getModule(id) {
    const [module] = await db.select().from(modules).where(eq(modules.id, id));
    return module;
  }
  async createModule(insertModule) {
    const [module] = await db.insert(modules).values({ ...insertModule, createdAt: (/* @__PURE__ */ new Date()).toISOString() }).returning();
    return module;
  }
  // User progress operations
  async getUserProgress(userId) {
    return await db.select().from(userProgress).where(eq(userProgress.userId, userId));
  }
  async getUserModuleProgress(userId, moduleId) {
    const [progress] = await db.select().from(userProgress).where(and(eq(userProgress.userId, userId), eq(userProgress.moduleId, moduleId)));
    return progress;
  }
  async createUserProgress(insertProgress) {
    const [progress] = await db.insert(userProgress).values({ ...insertProgress, createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() }).returning();
    return progress;
  }
  async updateUserProgress(id, updates) {
    const [progress] = await db.update(userProgress).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(userProgress.id, id)).returning();
    return progress;
  }
  // Question operations
  async getModuleQuestions(moduleId, type) {
    return await db.select().from(questions).where(and(eq(questions.moduleId, moduleId), eq(questions.type, type))).orderBy(questions.orderIndex);
  }
  async getQuestion(id) {
    const [question] = await db.select().from(questions).where(eq(questions.id, id));
    return question;
  }
  // Quiz attempt operations
  async createQuizAttempt(insertAttempt) {
    const [attempt] = await db.insert(quizAttempts).values({ ...insertAttempt, passed: insertAttempt.passed ? 1 : 0, createdAt: (/* @__PURE__ */ new Date()).toISOString() }).returning();
    return attempt;
  }
  async getUserQuizAttempts(userId, moduleId, type) {
    return await db.select().from(quizAttempts).where(
      and(
        eq(quizAttempts.userId, userId),
        eq(quizAttempts.moduleId, moduleId),
        eq(quizAttempts.type, type)
      )
    ).orderBy(desc(quizAttempts.createdAt));
  }
  // Certificate operations
  async getUserCertificate(userId) {
    const [certificate] = await db.select().from(certificates).where(eq(certificates.userId, userId));
    return certificate;
  }
  async createCertificate(userId) {
    const certificateNumber = `SYCEBNL-${Date.now()}-${userId}`;
    const [certificate] = await db.insert(certificates).values({ userId, certificateNumber, issueDate: (/* @__PURE__ */ new Date()).toISOString(), createdAt: (/* @__PURE__ */ new Date()).toISOString() }).returning();
    return certificate;
  }
  async updateCertificate(id, updates) {
    const [certificate] = await db.update(certificates).set(updates).where(eq(certificates.id, id)).returning();
    return certificate;
  }
  // Contact operations
  async createContactMessage(insertMessage) {
    const [message] = await db.insert(contactMessages).values(insertMessage).returning();
    return message;
  }
  async getContactMessages() {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }
  // Admin operations
  async getUserStats() {
    const [userCount] = await db.select({ count: sql2`count(*)` }).from(users).where(eq(users.role, "student"));
    const [certCount] = await db.select({ count: sql2`count(*)` }).from(certificates);
    const [paidCertCount] = await db.select({ count: sql2`count(*)` }).from(certificates).where(eq(certificates.paymentStatus, "paid"));
    const totalUsers = userCount.count;
    const totalCertificates = certCount.count;
    const totalRevenue = paidCertCount.count * 3e4;
    const successRate = totalUsers > 0 ? Math.round(totalCertificates / totalUsers * 100) : 0;
    return { totalUsers, totalCertificates, totalRevenue, successRate };
  }
  async getAllUsersWithProgress() {
    return await db.select({
      id: users.id,
      email: users.email,
      fullName: users.fullName,
      createdAt: users.createdAt,
      progress: userProgress,
      certificate: certificates
    }).from(users).leftJoin(userProgress, eq(users.id, userProgress.userId)).leftJoin(certificates, eq(users.id, certificates.userId)).where(eq(users.role, "student"));
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import bcrypt2 from "bcryptjs";
import jwt from "jsonwebtoken";
var JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
var authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};
var requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};
async function registerRoutes(app2) {
  app2.get("/api/health", (req, res) => {
    res.status(200).json({ status: "OK", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  await initializeTrainingData();
  app2.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const user = await storage.createUser(userData);
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
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const isValidPassword = await bcrypt2.compare(password, user.password);
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
  app2.get("/api/auth/me", authenticateToken, async (req, res) => {
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
  app2.get("/api/modules", authenticateToken, async (req, res) => {
    try {
      const modules2 = await storage.getModules();
      res.json(modules2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch modules" });
    }
  });
  app2.get("/api/modules/:id", authenticateToken, async (req, res) => {
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
  app2.get("/api/progress", authenticateToken, async (req, res) => {
    try {
      const progress = await storage.getUserProgress(req.user.id);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });
  app2.post("/api/progress", authenticateToken, async (req, res) => {
    try {
      const progressData = { ...req.body, userId: req.user.id };
      const progress = await storage.createUserProgress(progressData);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to create progress" });
    }
  });
  app2.put("/api/progress/:id", authenticateToken, async (req, res) => {
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
  app2.get("/api/modules/:moduleId/quiz/:type", authenticateToken, async (req, res) => {
    try {
      const questions2 = await storage.getModuleQuestions(
        parseInt(req.params.moduleId),
        req.params.type
      );
      res.json(questions2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });
  app2.get("/api/quiz/attempts/:moduleId/:type", authenticateToken, async (req, res) => {
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
  app2.post("/api/quiz/attempt", authenticateToken, async (req, res) => {
    try {
      const { moduleId, type, chapterIndex, answers } = req.body;
      if (type === "module") {
        const lastAttempts = await storage.getUserQuizAttempts(req.user.id, moduleId, "module");
        const lastFailedAttempt = lastAttempts.filter((attempt2) => !attempt2.passed).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
        if (lastFailedAttempt && lastFailedAttempt.canRetakeAt && /* @__PURE__ */ new Date() < new Date(lastFailedAttempt.canRetakeAt)) {
          const waitTime = Math.ceil((new Date(lastFailedAttempt.canRetakeAt).getTime() - (/* @__PURE__ */ new Date()).getTime()) / (1e3 * 60));
          return res.status(429).json({
            message: `Vous devez attendre encore ${waitTime} minutes avant de repasser le devoir`,
            canRetakeAt: lastFailedAttempt.canRetakeAt
          });
        }
      }
      const totalQuestions = type === "chapter" ? 5 : 10;
      const pointsPerQuestion = type === "chapter" ? 4 : 2;
      const correctAnswers = answers.filter((answer) => answer.isCorrect).length;
      const score = correctAnswers * pointsPerQuestion;
      const passed = score >= 16;
      const attemptData = {
        userId: req.user.id,
        moduleId,
        type,
        chapterIndex,
        score,
        totalQuestions,
        answers: JSON.stringify(answers),
        passed,
        canRetakeAt: !passed && type === "module" ? new Date(Date.now() + 2 * 60 * 60 * 1e3).toISOString() : null
        // 2h restriction for failed module attempts
      };
      const attempt = await storage.createQuizAttempt(attemptData);
      res.json(attempt);
    } catch (error) {
      console.error("Quiz attempt error:", error);
      res.status(500).json({ message: "Failed to save quiz attempt" });
    }
  });
  app2.get("/api/quiz/attempts/:moduleId/:type", authenticateToken, async (req, res) => {
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
  app2.get("/api/certificate", authenticateToken, async (req, res) => {
    try {
      const certificate = await storage.getUserCertificate(req.user.id);
      res.json(certificate);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch certificate" });
    }
  });
  app2.post("/api/certificate", authenticateToken, async (req, res) => {
    try {
      const certificate = await storage.createCertificate(req.user.id);
      res.json(certificate);
    } catch (error) {
      res.status(500).json({ message: "Failed to create certificate" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(messageData);
      res.json(message);
    } catch (error) {
      res.status(500).json({ message: "Failed to send message" });
    }
  });
  app2.get("/api/admin/stats", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const stats = await storage.getUserStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });
  app2.get("/api/admin/users", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const users2 = await storage.getAllUsersWithProgress();
      res.json(users2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });
  app2.get("/api/admin/messages", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });
  app2.get("/api/modules/:moduleId/chapters/:chapterIndex/summary", authenticateToken, async (req, res) => {
    try {
      const module = await storage.getModule(parseInt(req.params.moduleId));
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      const chapterIndex = parseInt(req.params.chapterIndex);
      const chapter = module.content.chapters[chapterIndex];
      if (!chapter) {
        return res.status(404).json({ message: "Chapter not found" });
      }
      const summary = chapter.summary || "R\xE9sum\xE9 non disponible pour ce chapitre.";
      const filename = `${module.title.replace(/[^a-zA-Z0-9]/g, "_")}_Chapitre_${chapterIndex + 1}_Resume.txt`;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.send(`SYCEBNL - R\xE9sum\xE9 de Formation
      
Module: ${module.title}
Chapitre: ${chapter.title}
Date de t\xE9l\xE9chargement: ${(/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR")}

----------------------------------------

${summary}

----------------------------------------
Formation SYCEBNL - Comptabilit\xE9 des Projets
Plateforme de Formation Certifiante`);
    } catch (error) {
      res.status(500).json({ message: "Failed to download summary" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}
async function initializeTrainingData() {
  try {
    const existingModules = await storage.getModules();
    console.log(`Found ${existingModules.length} existing modules, reinitializing...`);
    const modules2 = [
      {
        title: "Fondamentaux de la Comptabilit\xE9 des Projets SYCEBNL",
        description: "Comprendre les bases essentielles de la comptabilit\xE9 des projets selon le r\xE9f\xE9rentiel SYCEBNL",
        content: JSON.stringify({
          chapters: [
            {
              title: "Introduction au SYCEBNL",
              content: `<div class="slideshow">
                <div class="slide">
                  <h2>Le Syst\xE8me Comptable des Entreprises du B\xE9nin et \xE0 but Non Lucratif</h2>
                  <p>Le SYCEBNL est un r\xE9f\xE9rentiel comptable sp\xE9cialement con\xE7u pour les entreprises et associations sans but lucratif au B\xE9nin. Il s\\"inspire des normes internationales tout en tenant compte du contexte local.</p>
                  <ul>
                    <li>Harmonisation avec les normes OHADA</li>
                    <li>Adaptation aux sp\xE9cificit\xE9s des ASBL</li>
                    <li>Transparence financi\xE8re renforc\xE9e</li>
                  </ul>
                </div>
                <div class="slide">
                  <h2>Objectifs du SYCEBNL</h2>
                  <p>Le syst\xE8me vise \xE0 :</p>
                  <ul>
                    <li>Standardiser la comptabilit\xE9 des projets</li>
                    <li>Am\xE9liorer la transparence financi\xE8re</li>
                    <li>Faciliter le contr\xF4le et l\\"audit</li>
                    <li>Renforcer la gouvernance financi\xE8re</li>
                  </ul>
                </div>
                <div class="slide">
                  <h2>Principes Fondamentaux</h2>
                  <p>Les principes de base incluent :</p>
                  <ul>
                    <li><strong>Sp\xE9cialisation des exercices :</strong> Rattachement des charges et produits \xE0 leur p\xE9riode</li>
                    <li><strong>Permanence des m\xE9thodes :</strong> Coh\xE9rence dans l\\"application des r\xE8gles</li>
                    <li><strong>Prudence :</strong> \xC9valuation raisonnable des actifs et passifs</li>
                    <li><strong>Transparence :</strong> Information claire et compl\xE8te</li>
                  </ul>
                </div>
              </div>`,
              summary: "Le SYCEBNL est un r\xE9f\xE9rentiel comptable pour les entreprises et ASBL au B\xE9nin, bas\xE9 sur les normes OHADA avec des adaptations locales. Il vise la transparence financi\xE8re et la standardisation comptable."
            },
            {
              title: "Architecture du Plan Comptable",
              content: `<div class="slideshow">
                <div class="slide">
                  <h2>Structure du Plan Comptable SYCEBNL</h2>
                  <p>Le plan comptable SYCEBNL est organis\xE9 en 8 classes principales :</p>
                  <table class="comptable-table">
                    <tr><td>Classe 1</td><td>Comptes de ressources durables</td></tr>
                    <tr><td>Classe 2</td><td>Comptes d\\"actif immobilis\xE9</td></tr>
                    <tr><td>Classe 3</td><td>Comptes de stocks</td></tr>
                    <tr><td>Classe 4</td><td>Comptes de tiers</td></tr>
                    <tr><td>Classe 5</td><td>Comptes de tr\xE9sorerie</td></tr>
                    <tr><td>Classe 6</td><td>Comptes de charges</td></tr>
                    <tr><td>Classe 7</td><td>Comptes de produits</td></tr>
                    <tr><td>Classe 8</td><td>Comptes sp\xE9ciaux</td></tr>
                  </table>
                </div>
                <div class="slide">
                  <h2>Sp\xE9cificit\xE9s des Comptes de Projets</h2>
                  <p>Pour les projets, une attention particuli\xE8re est port\xE9e aux :</p>
                  <ul>
                    <li><strong>Comptes 40 :</strong> Fournisseurs et comptes rattach\xE9s</li>
                    <li><strong>Comptes 41 :</strong> Clients et comptes rattach\xE9s</li>
                    <li><strong>Comptes 42 :</strong> Personnel et organismes sociaux</li>
                    <li><strong>Comptes 43 :</strong> Organismes sociaux</li>
                    <li><strong>Comptes 44 :</strong> \xC9tat et collectivit\xE9s</li>
                    <li><strong>Comptes 45 :</strong> Organismes internationaux</li>
                  </ul>
                </div>
              </div>`,
              summary: "Le plan comptable SYCEBNL comprend 8 classes de comptes, avec des sp\xE9cificit\xE9s pour les projets dans la gestion des tiers (classe 4) et la tra\xE7abilit\xE9 des financements."
            }
          ]
        }),
        orderIndex: 1,
        isActive: 1
      },
      {
        title: "Tableau de Flux de Tr\xE9sorerie",
        description: "Comprendre et \xE9laborer les tableaux de flux de tr\xE9sorerie selon les normes SYCEBNL",
        content: JSON.stringify({
          chapters: [
            {
              title: "Introduction aux flux de tr\xE9sorerie",
              content: `<div class="slideshow">
                <div class="slide">
                  <h2>Qu'est-ce qu'un flux de tr\xE9sorerie ?</h2>
                  <p>Les flux de tr\xE9sorerie repr\xE9sentent les mouvements d'entr\xE9e et de sortie de liquidit\xE9s d'une organisation sur une p\xE9riode donn\xE9e.</p>
                  <div class="definition-box">
                    <strong>D\xE9finition :</strong> Un flux de tr\xE9sorerie est un mouvement de liquidit\xE9s (esp\xE8ces, comptes bancaires) entrant ou sortant de l'organisation.
                  </div>
                </div>
                <div class="slide">
                  <h2>Importance du tableau de flux</h2>
                  <p>Le tableau de flux de tr\xE9sorerie permet de :</p>
                  <ul>
                    <li>\xC9valuer la capacit\xE9 de l'organisation \xE0 g\xE9n\xE9rer des liquidit\xE9s</li>
                    <li>Analyser l'utilisation des ressources financi\xE8res</li>
                    <li>Pr\xE9voir les besoins futurs de financement</li>
                    <li>Mesurer la solvabilit\xE9 \xE0 court terme</li>
                  </ul>
                </div>
              </div>`,
              summary: "Les flux de tr\xE9sorerie sont les mouvements de liquidit\xE9s. Le tableau de flux permet d'\xE9valuer la capacit\xE9 de g\xE9n\xE9ration de liquidit\xE9s et la solvabilit\xE9."
            }
          ]
        }),
        orderIndex: 2,
        isActive: 1
      },
      {
        title: "Tableau Emplois-Ressources",
        description: "Ma\xEEtriser l'analyse des emplois et ressources des projets",
        content: JSON.stringify({
          chapters: [
            {
              title: "Identification des ressources",
              content: `<div class="slideshow">
                <div class="slide">
                  <h2>Les Ressources de Projets</h2>
                  <p>Les ressources repr\xE9sentent l'ensemble des moyens financiers mobilis\xE9s pour la r\xE9alisation d'un projet.</p>
                  <div class="categories-box">
                    <h3>Types de ressources :</h3>
                    <ul>
                      <li><strong>Ressources propres :</strong> Fonds propres de l'organisation</li>
                      <li><strong>Subventions :</strong> Financements publics ou priv\xE9s</li>
                      <li><strong>Emprunts :</strong> Financements remboursables</li>
                      <li><strong>Contributions en nature :</strong> Biens et services</li>
                    </ul>
                  </div>
                </div>
                <div class="slide">
                  <h2>Comptabilisation des Ressources</h2>
                  <p>Chaque type de ressource suit des r\xE8gles comptables sp\xE9cifiques :</p>
                  <table class="comptable-table">
                    <tr><th>Type</th><th>Compte</th><th>Principe</th></tr>
                    <tr><td>Subventions re\xE7ues</td><td>74xx</td><td>Produit de l'exercice</td></tr>
                    <tr><td>Emprunts</td><td>16xx</td><td>Dette \xE0 long terme</td></tr>
                    <tr><td>Dons</td><td>75xx</td><td>Produit exceptionnel</td></tr>
                  </table>
                </div>
              </div>`,
              summary: "Les ressources de projets comprennent les fonds propres, subventions, emprunts et contributions en nature. Chaque type suit des r\xE8gles comptables sp\xE9cifiques selon le plan SYCEBNL."
            }
          ]
        }),
        orderIndex: 3,
        isActive: 1
      },
      {
        title: "Analyse Financi\xE8re et Ratios",
        description: "Techniques d'analyse et d'interpr\xE9tation des donn\xE9es financi\xE8res des projets",
        content: JSON.stringify({
          chapters: [
            {
              title: "Ratios de gestion de projet",
              content: `<div class="slideshow">
                <div class="slide">
                  <h2>Les Ratios Essentiels</h2>
                  <p>L'analyse financi\xE8re des projets utilise des ratios sp\xE9cifiques :</p>
                  <div class="formula-box">
                    <h3>Ratio d'ex\xE9cution budg\xE9taire</h3>
                    <p><strong>D\xE9penses r\xE9alis\xE9es / Budget allou\xE9 \xD7 100</strong></p>
                    <p>Mesure le niveau d'ex\xE9cution du budget</p>
                  </div>
                </div>
                <div class="slide">
                  <h2>Indicateurs de Performance</h2>
                  <ul>
                    <li><strong>Taux de r\xE9alisation :</strong> Activit\xE9s r\xE9alis\xE9es / Activit\xE9s pr\xE9vues</li>
                    <li><strong>Efficience :</strong> R\xE9sultats obtenus / Ressources utilis\xE9es</li>
                    <li><strong>Efficacit\xE9 :</strong> Objectifs atteints / Objectifs fix\xE9s</li>
                  </ul>
                </div>
              </div>`,
              summary: "L'analyse financi\xE8re des projets utilise des ratios sp\xE9cifiques comme le ratio d'ex\xE9cution budg\xE9taire et des indicateurs de performance (efficience, efficacit\xE9)."
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
              title: "\xC9tude de cas compl\xE8te",
              content: `<div class="slideshow">
                <div class="slide">
                  <h2>Cas Pratique : Association VERDAS</h2>
                  <p>Analyse compl\xE8te d'un projet selon le r\xE9f\xE9rentiel SYCEBNL</p>
                  <div class="case-study-box">
                    <h3>Contexte :</h3>
                    <p>L'association VERDAS g\xE8re un projet de d\xE9veloppement rural financ\xE9 par plusieurs bailleurs.</p>
                    <ul>
                      <li>Budget total : 500 000 000 FCFA</li>
                      <li>Dur\xE9e : 3 ans</li>
                      <li>Multiples sources de financement</li>
                    </ul>
                  </div>
                </div>
                <div class="slide">
                  <h2>Analyse des \xC9critures</h2>
                  <p>Exemples d'\xE9critures comptables selon SYCEBNL :</p>
                  <table class="journal-table">
                    <tr><th>Date</th><th>Libell\xE9</th><th>D\xE9bit</th><th>Cr\xE9dit</th></tr>
                    <tr><td>01/01</td><td>R\xE9ception subvention</td><td>521 Banque</td><td>740 Subventions</td></tr>
                    <tr><td>15/01</td><td>Achat mat\xE9riel</td><td>605 Achats</td><td>521 Banque</td></tr>
                  </table>
                </div>
              </div>`,
              summary: "Cas pratique de l'association VERDAS : analyse compl\xE8te d'un projet de d\xE9veloppement rural avec exemples d'\xE9critures comptables selon le r\xE9f\xE9rentiel SYCEBNL."
            }
          ]
        }),
        orderIndex: 5,
        isActive: 1
      }
    ];
    for (const moduleData of modules2) {
      await storage.createModule(moduleData);
    }
    console.log("Training data initialized successfully");
  } catch (error) {
    console.error("Failed to initialize training data:", error);
  }
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var vite_config_default = defineConfig({
  plugins: [react()],
  root: "client",
  build: {
    outDir: "../dist",
    emptyOutDir: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared")
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true
      }
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "..", "dist");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  try {
    const adminUser = await storage.getUserByEmail("admin@sycebnl.com");
    if (!adminUser) {
      await storage.createUser({
        fullName: "Admin User",
        email: "admin@sycebnl.com",
        password: "adminpassword",
        role: UserRole.Admin
      });
      log("Admin user created successfully.");
    }
  } catch (error) {
    log(`Error creating admin user: ${error}`);
  }
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = process.env.PORT || 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
