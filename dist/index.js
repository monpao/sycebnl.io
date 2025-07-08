// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import {
  users,
  modules,
  userProgress,
  questions,
  quizAttempts,
  certificates,
  contactMessages
} from "@shared/schema";

// server/db.ts
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@shared/schema";
var sqlite = new Database("local.db");
var db = drizzle(sqlite, { schema });

// server/storage.ts
import { eq, desc, and, sql } from "drizzle-orm";
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
    const [userCount] = await db.select({ count: sql`count(*)` }).from(users).where(eq(users.role, "student"));
    const [certCount] = await db.select({ count: sql`count(*)` }).from(certificates);
    const [paidCertCount] = await db.select({ count: sql`count(*)` }).from(certificates).where(eq(certificates.paymentStatus, "paid"));
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
import { insertUserSchema, insertContactMessageSchema } from "@shared/schema";
import bcrypt2 from "bcryptjs";
import jwt from "jsonwebtoken";

// server/email.ts
import nodemailer from "nodemailer";
var createTransporter = () => {
  return nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER || "sycebnlprojet@gmail.com",
      pass: process.env.EMAIL_PASS || ""
      // Mot de passe d'application Gmail
    }
  });
};
async function sendContactNotification(contactData) {
  try {
    const transporter = createTransporter();
    const adminMailOptions = {
      from: process.env.EMAIL_USER || "sycebnlprojet@gmail.com",
      to: "sycebnlprojet@gmail.com",
      subject: `[SYCEBNL Contact] ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">\u{1F4E7} Nouveau Message de Contact</h1>
            <p style="color: #e0e7ff; margin: 10px 0 0 0;">Plateforme SYCEBNL Formation</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1f2937; margin-bottom: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
              D\xE9tails du Contact
            </h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">\u{1F464} Nom :</strong>
              <span style="color: #6b7280; margin-left: 10px;">${contactData.name}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">\u{1F4E7} Email :</strong>
              <span style="color: #6b7280; margin-left: 10px;">${contactData.email}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">\u{1F4CB} Sujet :</strong>
              <span style="color: #6b7280; margin-left: 10px;">${contactData.subject}</span>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #374151;">\u{1F4AC} Message :</strong>
              <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 10px; border-left: 4px solid #3b82f6;">
                ${contactData.message.replace(/\n/g, "<br>")}
              </div>
            </div>
            
            <div style="background: linear-gradient(135deg, #f3f4f6, #e5e7eb); padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 0; color: #6b7280; font-size: 14px; text-align: center;">
                \u{1F4C5} Re\xE7u le ${(/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })}
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
            <p>SYCEBNL Formation - Syst\xE8me de Contact Automatis\xE9</p>
          </div>
        </div>
      `
    };
    const userMailOptions = {
      from: process.env.EMAIL_USER || "sycebnlprojet@gmail.com",
      to: contactData.email,
      subject: "Confirmation de r\xE9ception - SYCEBNL Formation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #10b981, #3b82f6); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">\u2705 Message Re\xE7u</h1>
            <p style="color: #d1fae5; margin: 10px 0 0 0;">SYCEBNL Formation</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Bonjour ${contactData.name},</h2>
            
            <p style="color: #6b7280; line-height: 1.6; margin-bottom: 20px;">
              Nous avons bien re\xE7u votre message concernant "<strong>${contactData.subject}</strong>" et nous vous remercions de nous avoir contact\xE9s.
            </p>
            
            <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
              <h3 style="color: #065f46; margin: 0 0 10px 0; font-size: 16px;">\u{1F3AF} Prochaines \xE9tapes :</h3>
              <ul style="color: #047857; margin: 0; padding-left: 20px;">
                <li>Notre \xE9quipe examine votre demande</li>
                <li>Vous recevrez une r\xE9ponse sous 24-48h</li>
                <li>Pour les paiements de certification, nous vous enverrons les d\xE9tails</li>
              </ul>
            </div>
            
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #374151; margin: 0 0 10px 0;">\u{1F4DE} Besoin d'aide imm\xE9diate ?</h4>
              <p style="color: #6b7280; margin: 0; font-size: 14px;">
                T\xE9l\xE9phone : +229 01 60 58 00 11<br>
                Email : sycebnlprojet@gmail.com
              </p>
            </div>
            
            <p style="color: #6b7280; line-height: 1.6; margin-top: 20px;">
              Merci de votre confiance en SYCEBNL Formation pour votre d\xE9veloppement professionnel.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #374151; font-weight: bold; margin: 0;">L'\xE9quipe SYCEBNL Formation</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
            <p>SYCEBNL Formation - Excellence en Comptabilit\xE9 des Projets</p>
          </div>
        </div>
      `
    };
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);
    console.log("Emails de contact envoy\xE9s avec succ\xE8s");
    return true;
  } catch (error) {
    console.error("Erreur lors de l'envoi des emails:", error);
    return false;
  }
}
async function sendCertificationRequest(userData) {
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: process.env.EMAIL_USER || "sycebnlprojet@gmail.com",
      to: "sycebnlprojet@gmail.com",
      subject: "[SYCEBNL] Demande de Certification",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">\u{1F3C6} Demande de Certification</h1>
            <p style="color: #fef3c7; margin: 10px 0 0 0;">SYCEBNL Formation</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Nouvelle Demande de Certification</h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">\u{1F464} Nom :</strong>
              <span style="color: #6b7280; margin-left: 10px;">${userData.name}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">\u{1F4E7} Email :</strong>
              <span style="color: #6b7280; margin-left: 10px;">${userData.email}</span>
            </div>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <p style="color: #92400e; margin: 0; font-weight: bold;">
                \u{1F4B0} Montant \xE0 percevoir : 30 000 FCFA
              </p>
            </div>
            
            <p style="color: #6b7280; margin-top: 20px;">
              \u{1F4C5} Demande re\xE7ue le ${(/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })}
            </p>
          </div>
        </div>
      `
    };
    await transporter.sendMail(mailOptions);
    console.log("Email de demande de certification envoy\xE9");
    return true;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de certification:", error);
    return false;
  }
}

// server/routes.ts
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
      const modules3 = await storage.getModules();
      res.json(modules3);
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
      const questions3 = await storage.getModuleQuestions(
        parseInt(req.params.moduleId),
        req.params.type
      );
      res.json(questions3);
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
      const emailSent = await sendContactNotification({
        name: messageData.name,
        email: messageData.email,
        subject: messageData.subject,
        message: messageData.message
      });
      if (emailSent) {
        console.log(`Email de contact envoy\xE9 pour: ${messageData.name} (${messageData.email})`);
      } else {
        console.warn(`\xC9chec de l'envoi d'email pour: ${messageData.name} (${messageData.email})`);
      }
      if (messageData.subject.toLowerCase().includes("certification") || messageData.subject.toLowerCase().includes("paiement")) {
        await sendCertificationRequest({
          name: messageData.name,
          email: messageData.email
        });
      }
      res.json({
        ...message,
        emailSent,
        message: "Message envoy\xE9 avec succ\xE8s"
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
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
      const users3 = await storage.getAllUsersWithProgress();
      res.json(users3);
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
    const modules3 = [
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
    for (const moduleData of modules3) {
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
var vite_config_default = defineConfig({
  plugins: [react()],
  root: "./client",
  build: {
    outDir: "../dist",
    emptyOutDir: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src")
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
  const distPath = path2.resolve(import.meta.dirname, "public");
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

// shared/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
var UserRole = {
  Student: "student",
  Admin: "admin"
};
var users2 = sqliteTable("users", {
  id: integer("id", { mode: "increments" }).primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  role: text("role", { enum: [UserRole.Student, UserRole.Admin] }).notNull().default(UserRole.Student),
  // student, admin
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull()
});
var modules2 = sqliteTable("modules", {
  id: integer("id", { mode: "increments" }).primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  // Rich content including slides, text, etc.
  orderIndex: integer("order_index").notNull(),
  isActive: integer("is_active").notNull().default(1),
  createdAt: text("created_at").notNull()
});
var userProgress2 = sqliteTable("user_progress", {
  id: integer("id", { mode: "increments" }).primaryKey(),
  userId: integer("user_id").notNull().references(() => users2.id),
  moduleId: integer("module_id").notNull().references(() => modules2.id),
  status: text("status").notNull().default("not_started"),
  // not_started, in_progress, completed
  chapterScore: integer("chapter_score").default(0),
  moduleScore: integer("module_score").default(0),
  completedAt: text("completed_at"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull()
});
var questions2 = sqliteTable("questions", {
  id: integer("id", { mode: "increments" }).primaryKey(),
  moduleId: integer("module_id").notNull().references(() => modules2.id),
  type: text("type").notNull(),
  // chapter, module
  question: text("question").notNull(),
  options: text("options").notNull(),
  // Array of options
  correctAnswer: integer("correct_answer").notNull(),
  // Index of correct option
  explanation: text("explanation"),
  orderIndex: integer("order_index").notNull(),
  createdAt: text("created_at").notNull()
});
var quizAttempts2 = sqliteTable("quiz_attempts", {
  id: integer("id", { mode: "increments" }).primaryKey(),
  userId: integer("user_id").notNull().references(() => users2.id),
  moduleId: integer("module_id").notNull().references(() => modules2.id),
  type: text("type").notNull(),
  // 'chapter' or 'module'
  chapterIndex: integer("chapter_index"),
  // null for module quizzes
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  answers: text("answers").notNull(),
  // Array of selected answers
  passed: integer("passed").notNull().default(0),
  canRetakeAt: text("can_retake_at"),
  // For failed module attempts - 2h restriction
  createdAt: text("created_at").notNull()
});
var certificates2 = sqliteTable("certificates", {
  id: integer("id", { mode: "increments" }).primaryKey(),
  userId: integer("user_id").notNull().references(() => users2.id),
  certificateNumber: text("certificate_number").notNull().unique(),
  issueDate: text("issue_date").notNull(),
  status: text("status").notNull().default("pending"),
  // pending, paid, issued
  paymentStatus: text("payment_status").notNull().default("unpaid"),
  // unpaid, paid
  downloadCount: integer("download_count").notNull().default(0),
  createdAt: text("created_at").notNull()
});
var contactMessages2 = sqliteTable("contact_messages", {
  id: integer("id", { mode: "increments" }).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("pending"),
  // pending, responded
  createdAt: text("created_at").notNull()
});
var usersRelations = relations(users2, ({ many }) => ({
  progress: many(userProgress2),
  quizAttempts: many(quizAttempts2),
  certificates: many(certificates2)
}));
var modulesRelations = relations(modules2, ({ many }) => ({
  progress: many(userProgress2),
  questions: many(questions2),
  quizAttempts: many(quizAttempts2)
}));
var userProgressRelations = relations(userProgress2, ({ one }) => ({
  user: one(users2, { fields: [userProgress2.userId], references: [users2.id] }),
  module: one(modules2, { fields: [userProgress2.moduleId], references: [modules2.id] })
}));
var questionsRelations = relations(questions2, ({ one, many }) => ({
  module: one(modules2, { fields: [questions2.moduleId], references: [modules2.id] }),
  attempts: many(quizAttempts2)
}));
var quizAttemptsRelations = relations(quizAttempts2, ({ one }) => ({
  user: one(users2, { fields: [quizAttempts2.userId], references: [users2.id] }),
  module: one(modules2, { fields: [quizAttempts2.moduleId], references: [modules2.id] })
}));
var certificatesRelations = relations(certificates2, ({ one }) => ({
  user: one(users2, { fields: [certificates2.userId], references: [users2.id] })
}));
var insertUserSchema2 = createInsertSchema(users2).pick({
  email: true,
  password: true,
  fullName: true,
  role: true
});
var insertModuleSchema = createInsertSchema(modules2).pick({
  title: true,
  description: true,
  content: true,
  orderIndex: true,
  isActive: true
});
var insertUserProgressSchema = createInsertSchema(userProgress2).pick({
  userId: true,
  moduleId: true,
  status: true,
  chapterScore: true,
  moduleScore: true
});
var insertQuizAttemptSchema2 = createInsertSchema(quizAttempts2).pick({
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
var insertContactMessageSchema2 = createInsertSchema(contactMessages2).pick({
  name: true,
  email: true,
  subject: true,
  message: true
});

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
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
