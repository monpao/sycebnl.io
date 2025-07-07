import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from "./shared/schema";
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

const sqlite = new Database('local.db');
const db = drizzle(sqlite, { schema });

async function main() {
  try {
    console.log('Migrating database...');
    migrate(db, { migrationsFolder: './migrations' });
    console.log('Database migrated successfully!');
  } catch (error) {
    console.error('Error migrating database:', error);
  }
}

main();


