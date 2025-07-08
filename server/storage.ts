import {
  users,
  modules,
  userProgress,
  questions,
  quizAttempts,
  certificates,
  contactMessages,
  type User,
  type InsertUser,
  type Module,
  type InsertModule,
  type UserProgress,
  type InsertUserProgress,
  type Question,
  type QuizAttempt,
  type InsertQuizAttempt,
  type Certificate,
  type ContactMessage,
  type InsertContactMessage,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Module operations
  getModules(): Promise<Module[]>;
  getModule(id: number): Promise<Module | undefined>;
  createModule(module: InsertModule): Promise<Module>;
  
  // User progress operations
  getUserProgress(userId: number): Promise<UserProgress[]>;
  getUserModuleProgress(userId: number, moduleId: number): Promise<UserProgress | undefined>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  updateUserProgress(id: number, updates: Partial<UserProgress>): Promise<UserProgress | undefined>;
  
  // Question operations
  getModuleQuestions(moduleId: number, type: string): Promise<Question[]>;
  getQuestion(id: number): Promise<Question | undefined>;
  
  // Quiz attempt operations
  createQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt>;
  getUserQuizAttempts(userId: number, moduleId: number, type: string): Promise<QuizAttempt[]>;
  
  // Certificate operations
  getUserCertificate(userId: number): Promise<Certificate | undefined>;
  createCertificate(userId: number): Promise<Certificate>;
  updateCertificate(id: number, updates: Partial<Certificate>): Promise<Certificate | undefined>;
  
  // Contact operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  // Admin operations
  getUserStats(): Promise<{ totalUsers: number; totalCertificates: number; totalRevenue: number; successRate: number }>;
  getAllUsersWithProgress(): Promise<any[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(insertUser.password, 12);
      const [user] = await db
        .insert(users)
        .values({ ...insertUser, password: hashedPassword, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
        .returning();
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Module operations
  async getModules(): Promise<Module[]> {
    return await db.select().from(modules).where(eq(modules.isActive, 1)).orderBy(modules.orderIndex);
  }

  async getModule(id: number): Promise<Module | undefined> {
    const [module] = await db.select().from(modules).where(eq(modules.id, id));
    return module;
  }

  async createModule(insertModule: InsertModule): Promise<Module> {
    const [module] = await db.insert(modules).values({ ...insertModule, createdAt: new Date().toISOString() }).returning();
    return module;
  }

  // User progress operations
  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return await db.select().from(userProgress).where(eq(userProgress.userId, userId));
  }

  async getUserModuleProgress(userId: number, moduleId: number): Promise<UserProgress | undefined> {
    const [progress] = await db
      .select()
      .from(userProgress)
      .where(and(eq(userProgress.userId, userId), eq(userProgress.moduleId, moduleId)));
    return progress;
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const [progress] = await db.insert(userProgress).values({ ...insertProgress, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }).returning();
    return progress;
  }

  async updateUserProgress(id: number, updates: Partial<UserProgress>): Promise<UserProgress | undefined> {
    const [progress] = await db
      .update(userProgress)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(userProgress.id, id))
      .returning();
    return progress;
  }

  // Question operations
  async getModuleQuestions(moduleId: number, type: string): Promise<Question[]> {
    return await db
      .select()
      .from(questions)
      .where(and(eq(questions.moduleId, moduleId), eq(questions.type, type)))
      .orderBy(questions.orderIndex);
  }

  async getQuestion(id: number): Promise<Question | undefined> {
    const [question] = await db.select().from(questions).where(eq(questions.id, id));
    return question;
  }

  // Quiz attempt operations
  async createQuizAttempt(insertAttempt: InsertQuizAttempt): Promise<QuizAttempt> {
    const [attempt] = await db.insert(quizAttempts).values({ ...insertAttempt, passed: insertAttempt.passed ? 1 : 0, createdAt: new Date().toISOString() }).returning();
    return attempt;
  }

  async getUserQuizAttempts(userId: number, moduleId: number, type: string): Promise<QuizAttempt[]> {
    return await db
      .select()
      .from(quizAttempts)
      .where(
        and(
          eq(quizAttempts.userId, userId),
          eq(quizAttempts.moduleId, moduleId),
          eq(quizAttempts.type, type)
        )
      )
      .orderBy(desc(quizAttempts.createdAt));
  }

  // Certificate operations
  async getUserCertificate(userId: number): Promise<Certificate | undefined> {
    const [certificate] = await db.select().from(certificates).where(eq(certificates.userId, userId));
    return certificate;
  }

  async createCertificate(userId: number): Promise<Certificate> {
    const certificateNumber = `SYCEBNL-${Date.now()}-${userId}`;
    const [certificate] = await db
      .insert(certificates)
      .values({ userId, certificateNumber, issueDate: new Date().toISOString(), createdAt: new Date().toISOString() })
      .returning();
    return certificate;
  }

  async updateCertificate(id: number, updates: Partial<Certificate>): Promise<Certificate | undefined> {
    const [certificate] = await db
      .update(certificates)
      .set(updates)
      .where(eq(certificates.id, id))
      .returning();
    return certificate;
  }

  // Contact operations
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const messageWithTimestamp = {
      ...insertMessage,
      createdAt: new Date().toISOString()
    };
    const [message] = await db.insert(contactMessages).values(messageWithTimestamp).returning();
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  // Admin operations
  async getUserStats(): Promise<{ totalUsers: number; totalCertificates: number; totalRevenue: number; successRate: number }> {
    const [userCount] = await db.select({ count: sql<number>`count(*)` }).from(users).where(eq(users.role, 'student'));
    const [certCount] = await db.select({ count: sql<number>`count(*)` }).from(certificates);
    const [paidCertCount] = await db.select({ count: sql<number>`count(*)` }).from(certificates).where(eq(certificates.paymentStatus, 'paid'));
    
    const totalUsers = userCount.count;
    const totalCertificates = certCount.count;
    const totalRevenue = paidCertCount.count * 30000; // 30,000 FCFA per certificate
    const successRate = totalUsers > 0 ? Math.round((totalCertificates / totalUsers) * 100) : 0;

    return { totalUsers, totalCertificates, totalRevenue, successRate };
  }

  async getAllUsersWithProgress(): Promise<any[]> {
    return await db
      .select({
        id: users.id,
        email: users.email,
        fullName: users.fullName,
        createdAt: users.createdAt,
        progress: userProgress,
        certificate: certificates,
      })
      .from(users)
      .leftJoin(userProgress, eq(users.id, userProgress.userId))
      .leftJoin(certificates, eq(users.id, certificates.userId))
      .where(eq(users.role, 'student'));
  }
}

export const storage = new DatabaseStorage();
