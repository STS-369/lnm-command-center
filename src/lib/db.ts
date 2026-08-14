import Database from 'better-sqlite3';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const DB_PATH = path.join(process.cwd(), 'data', 'lnm.db');

// Ensure data directory exists
import fs from 'fs';
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initializeDatabase();
  }
  return db;
}

function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      avatar TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      company TEXT,
      email TEXT,
      phone TEXT,
      website TEXT,
      city TEXT,
      state TEXT,
      industry TEXT,
      source TEXT DEFAULT 'manual',
      status TEXT DEFAULT 'new',
      score REAL DEFAULT 0,
      score_breakdown TEXT,
      research_brief TEXT,
      validation_status TEXT DEFAULT 'pending',
      validation_score INTEGER DEFAULT 0,
      reachability_score INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS research (
      id TEXT PRIMARY KEY,
      lead_id TEXT REFERENCES leads(id),
      section_name TEXT,
      content TEXT,
      confidence_score REAL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS outreach_emails (
      id TEXT PRIMARY KEY,
      lead_id TEXT REFERENCES leads(id),
      subject TEXT,
      body TEXT,
      tone TEXT DEFAULT 'professional',
      status TEXT DEFAULT 'draft',
      approved_by TEXT,
      sent_at TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS proposals (
      id TEXT PRIMARY KEY,
      lead_id TEXT REFERENCES leads(id),
      title TEXT,
      content TEXT,
      pricing_tier TEXT,
      status TEXT DEFAULT 'draft',
      approved_by TEXT,
      sent_at TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS deals (
      id TEXT PRIMARY KEY,
      lead_id TEXT REFERENCES leads(id),
      title TEXT,
      value REAL DEFAULT 0,
      progress INTEGER DEFAULT 0,
      status TEXT DEFAULT 'active',
      kickoff_date TEXT,
      target_date TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS invoices (
      id TEXT PRIMARY KEY,
      deal_id TEXT REFERENCES deals(id),
      invoice_number TEXT UNIQUE,
      amount REAL DEFAULT 0,
      status TEXT DEFAULT 'draft',
      due_date TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'pending',
      priority TEXT DEFAULT 'medium',
      owner_type TEXT,
      owner_id TEXT,
      lead_id TEXT REFERENCES leads(id),
      deadline TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS activity_log (
      id TEXT PRIMARY KEY,
      entity_type TEXT,
      entity_id TEXT,
      action TEXT,
      details TEXT,
      user_id TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS settings (
      id TEXT PRIMARY KEY,
      key TEXT UNIQUE NOT NULL,
      value TEXT,
      updated_at TEXT DEFAULT (datetime('now'))
    );

    -- Seed default settings
    INSERT OR IGNORE INTO settings (id, key, value) VALUES
      ('1', 'company_name', 'SOETech LLC'),
      ('2', 'company_tagline', 'Web & AI Development Agency'),
      ('3', 'default_pricing_tier', 'Standard'),
      ('4', 'ai_api_key', ''),
      ('5', 'ai_model', 'gpt-4'),
      ('6', 'theme', 'cyberpunk');
  `);
}

export { getDb, uuidv4 };
