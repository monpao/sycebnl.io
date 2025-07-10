import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from "@shared/schema";

// Use SQLite for local development and production
const sqlite = new Database(process.env.DATABASE_URL || 'sycebnl.db');
export const db = drizzle(sqlite, { schema });

