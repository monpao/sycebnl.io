import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const UserRole = {
  Student: "student",
  Admin: "admin",
} as const;

// Users table
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  role: text("role").$type<"student" | "admin">().notNull().default("student"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export type UserRoleType = z.infer<typeof insertUserSchema>['role'];

// Training modules
export const modules = sqliteTable("modules", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(), // Rich content including slides, text, etc.
  orderIndex: integer("order_index").notNull(),
  isActive: integer("is_active", { mode: 'boolean' }, { mode: 'boolean' }).notNull().default(true),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// User progress for each module
export const userProgress = sqliteTable("user_progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  moduleId: integer("module_id").notNull().references(() => modules.id),
  status: text("status").notNull().default("not_started"), // not_started, in_progress, completed
  chapterScore: integer("chapter_score").default(0),
  moduleScore: integer("module_score").default(0),
  completedAt: text("completed_at"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Quiz questions
export const questions = sqliteTable("questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  moduleId: integer("module_id").notNull().references(() => modules.id),
  type: text("type").notNull(), // chapter, module
  question: text("question").notNull(),
  options: text("options").notNull(), // Array of options
  correctAnswer: integer("correct_answer").notNull(), // Index of correct option
  explanation: text("explanation"),
  orderIndex: integer("order_index").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// User quiz attempts
export const quizAttempts = sqliteTable("quiz_attempts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  moduleId: integer("module_id").notNull().references(() => modules.id),
  type: text("type").notNull(), // 'chapter' or 'module'
  chapterIndex: integer("chapter_index"), // null for module quizzes
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  answers: text("answers").notNull(), // Array of selected answers
  passed: integer("passed", { mode: 'boolean' }).notNull().default(false),
  canRetakeAt: text("can_retake_at"), // For failed module attempts - 2h restriction
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Certificates
export const certificates = sqliteTable("certificates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  certificateNumber: text("certificate_number").notNull().unique(),
  issueDate: text("issue_date").notNull(),
  status: text("status").notNull().default("pending"), // pending, paid, issued
  paymentStatus: text("payment_status").notNull().default("unpaid"), // unpaid, paid
  downloadCount: integer("download_count").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Contact messages
export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("pending"), // pending, responded
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  progress: many(userProgress),
  quizAttempts: many(quizAttempts),
  certificates: many(certificates),
}));

export const modulesRelations = relations(modules, ({ many }) => ({
  progress: many(userProgress),
  questions: many(questions),
  quizAttempts: many(quizAttempts),
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(users, { fields: [userProgress.userId], references: [users.id] }),
  module: one(modules, { fields: [userProgress.moduleId], references: [modules.id] }),
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
  module: one(modules, { fields: [questions.moduleId], references: [modules.id] }),
  attempts: many(quizAttempts),
}));

export const quizAttemptsRelations = relations(quizAttempts, ({ one }) => ({
  user: one(users, { fields: [quizAttempts.userId], references: [users.id] }),
  module: one(modules, { fields: [quizAttempts.moduleId], references: [modules.id] }),
}));

export const certificatesRelations = relations(certificates, ({ one }) => ({
  user: one(users, { fields: [certificates.userId], references: [users.id] }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  fullName: true,
  role: true,
});

export const insertModuleSchema = createInsertSchema(modules).pick({
  title: true,
  description: true,
  content: true,
  orderIndex: true,
  isActive: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).pick({
  userId: true,
  moduleId: true,
  status: true,
  chapterScore: true,
  moduleScore: true,
});

export const insertQuizAttemptSchema = createInsertSchema(quizAttempts).pick({
  userId: true,
  moduleId: true,
  type: true,
  chapterIndex: true,
  score: true,
  totalQuestions: true,
  answers: true,
  passed: true,
  canRetakeAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Module = typeof modules.$inferSelect;
export type InsertModule = z.infer<typeof insertModuleSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type Question = typeof questions.$inferSelect;
export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type InsertQuizAttempt = z.infer<typeof insertQuizAttemptSchema>;
export type Certificate = typeof certificates.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

