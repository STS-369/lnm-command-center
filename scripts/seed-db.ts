/**
 * Seed script: Populates SQLite database from import-data.ts
 * Run with: npx tsx scripts/seed-db.ts
 *
 * Uses raw better-sqlite3 for bulk inserts (performance).
 * The app uses Drizzle ORM for queries.
 */
import Database from 'better-sqlite3';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Import the data arrays directly (they are just JSON)
// eslint-disable-next-line @typescript-eslint/no-require-imports
const importData = require('../src/lib/import-data');
const IMPORT_LEADS = importData.IMPORT_LEADS;
const IMPORT_EMAILS = importData.IMPORT_EMAILS;
const IMPORT_STATS = importData.IMPORT_STATS;

const DB_PATH = path.join(process.cwd(), 'data', 'lnm.db');

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const sqlite = new Database(DB_PATH);
sqlite.pragma('journal_mode = WAL');
sqlite.pragma('foreign_keys = ON');

// Create tables (same as schema.ts but raw SQL)
sqlite.exec(`
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
    rating REAL,
    user_ratings_total INTEGER,
    address TEXT,
    category TEXT,
    website_status TEXT,
    score_breakdown TEXT,
    research_brief TEXT,
    validation_status TEXT DEFAULT 'pending',
    validation_score INTEGER DEFAULT 0,
    reachability_score INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS outreach_emails (
    id TEXT PRIMARY KEY,
    lead_id TEXT,
    lead_name TEXT,
    subject TEXT,
    body TEXT,
    tone TEXT DEFAULT 'professional',
    status TEXT DEFAULT 'draft',
    approved_by TEXT,
    sent_at TEXT,
    opened_at TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS deals (
    id TEXT PRIMARY KEY,
    lead_id TEXT,
    title TEXT,
    value REAL DEFAULT 0,
    progress INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    kickoff_date TEXT,
    target_date TEXT,
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
    lead_id TEXT,
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

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    avatar TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS research (
    id TEXT PRIMARY KEY,
    lead_id TEXT,
    section_name TEXT,
    content TEXT,
    confidence_score REAL DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS proposals (
    id TEXT PRIMARY KEY,
    lead_id TEXT,
    title TEXT,
    content TEXT,
    pricing_tier TEXT,
    status TEXT DEFAULT 'draft',
    approved_by TEXT,
    sent_at TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS invoices (
    id TEXT PRIMARY KEY,
    deal_id TEXT,
    invoice_number TEXT UNIQUE,
    amount REAL DEFAULT 0,
    status TEXT DEFAULT 'draft',
    due_date TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

function seedDatabase() {
  console.log('🌱 Seeding LNM SQLite database...');

  // Check if already seeded
  const { count } = sqlite.prepare('SELECT COUNT(*) as count FROM leads').get() as { count: number };
  if (count > 0) {
    console.log(`  ℹ️  Database already has ${count} leads. Skipping seed.`);
    sqlite.close();
    return;
  }

  const now = new Date().toISOString();

  // ===== SEED DEMO DATA =====
  console.log('  📋 Seeding demo leads...');
  const leadIds: string[] = [];

  const demoLeads = [
    { name: 'Marcus Chen', company: 'TechFlow Solutions', email: 'marcus@techflow.com', phone: '555-0101', website: 'https://techflow.com', city: 'Austin', state: 'TX', industry: 'SaaS', source: 'linkedin', status: 'outreach', score: 85 },
    { name: 'Sarah Williams', company: 'GreenLeaf Farms', email: 'sarah@greenleaf.com', phone: '555-0102', website: 'https://greenleaf.com', city: 'Portland', state: 'OR', industry: 'Agriculture', source: 'website', status: 'proposal', score: 72 },
    { name: 'James Rodriguez', company: 'Urban Fitness', email: 'james@urbanfitness.com', phone: '555-0103', website: 'https://urbanfitness.com', city: 'Miami', state: 'FL', industry: 'Fitness', source: 'referral', status: 'new', score: 45 },
    { name: 'Emily Zhang', company: 'CloudNine Data', email: 'emily@cloudnine.io', phone: '555-0104', website: 'https://cloudnine.io', city: 'San Francisco', state: 'CA', industry: 'Data Analytics', source: 'cold', status: 'researched', score: 91 },
    { name: 'David Park', company: 'NovaTech Labs', email: 'david@novatech.com', phone: '555-0105', website: 'https://novatech.com', city: 'Seattle', state: 'WA', industry: 'Healthcare', source: 'inbound', status: 'active_deal', score: 78 },
    { name: 'Lisa Thompson', company: 'BrightPath Education', email: 'lisa@brightpath.edu', phone: '555-0106', website: 'https://brightpath.edu', city: 'Chicago', state: 'IL', industry: 'Education', source: 'linkedin', status: 'closed_won', score: 88 },
    { name: 'Robert Kim', company: 'SwiftDelivery', email: 'robert@swiftdelivery.com', phone: '555-0107', website: 'https://swiftdelivery.com', city: 'Denver', state: 'CO', industry: 'Logistics', source: 'import', status: 'new', score: 32 },
    { name: 'Amanda Foster', company: 'CreativeMinds Agency', email: 'amanda@creativeminds.com', phone: '555-0108', website: 'https://creativeminds.com', city: 'Nashville', state: 'TN', industry: 'Marketing', source: 'website', status: 'outreach', score: 67 },
  ];

  const insertLead = sqlite.prepare(`
    INSERT INTO leads (id, name, company, email, phone, website, city, state, industry, source, status, score, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertLeadTx = sqlite.transaction((leads: typeof demoLeads) => {
    for (const lead of leads) {
      const id = uuidv4();
      leadIds.push(id);
      insertLead.run(id, lead.name, lead.company, lead.email, lead.phone, lead.website, lead.city, lead.state, lead.industry, lead.source, lead.status, lead.score, now, now);
    }
  });
  insertLeadTx(demoLeads);

  // Demo deals
  console.log('  💰 Seeding demo deals...');
  const insertDeal = sqlite.prepare(`INSERT INTO deals (id, lead_id, title, value, progress, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  insertDeal.run(uuidv4(), leadIds[4], 'NovaTech AI Integration', 24000, 75, 'active', now);
  insertDeal.run(uuidv4(), leadIds[5], 'BrightPath LMS Build', 45000, 100, 'completed', now);
  insertDeal.run(uuidv4(), leadIds[0], 'TechFlow Chatbot Package', 299, 30, 'active', now);

  // Demo tasks
  console.log('  📝 Seeding demo tasks...');
  const insertTask = sqlite.prepare(`INSERT INTO tasks (id, title, description, status, priority, lead_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  insertTask.run(uuidv4(), 'Send follow-up email to Marcus Chen', 'Follow up on the chatbot proposal', 'pending', 'high', leadIds[0], now);
  insertTask.run(uuidv4(), 'Prepare proposal for CloudNine Data', 'Custom AI research package', 'in_progress', 'high', leadIds[3], now);
  insertTask.run(uuidv4(), 'Schedule demo with Sarah Williams', 'Demo the website + AI bundle', 'pending', 'medium', leadIds[1], now);
  insertTask.run(uuidv4(), 'Update CRM settings', 'Configure new pricing tiers', 'completed', 'low', null, now);
  insertTask.run(uuidv4(), "Research Robert Kim's company", 'Deep dive into SwiftDelivery stack', 'pending', 'medium', leadIds[6], now);

  // Demo activities
  console.log('  📊 Seeding demo activities...');
  const insertActivity = sqlite.prepare(`INSERT INTO activity_log (id, entity_type, entity_id, action, details, created_at) VALUES (?, ?, ?, ?, ?, ?)`);
  insertActivity.run(uuidv4(), 'lead', leadIds[0], 'created', 'New lead added from LinkedIn', now);
  insertActivity.run(uuidv4(), 'lead', leadIds[1], 'status_changed', 'Status changed to proposal', now);
  insertActivity.run(uuidv4(), 'deal', leadIds[4], 'created', 'Deal created: NovaTech AI Integration ($24,000)', now);
  insertActivity.run(uuidv4(), 'task', '', 'completed', 'Task completed: Update CRM settings', now);
  insertActivity.run(uuidv4(), 'lead', leadIds[3], 'scored', 'Lead scored 91/100 — high priority', now);

  // Demo settings
  console.log('  ⚙️  Seeding demo settings...');
  const insertSetting = sqlite.prepare(`INSERT OR IGNORE INTO settings (id, key, value, updated_at) VALUES (?, ?, ?, ?)`);
  insertSetting.run('1', 'company_name', 'SOETech LLC', now);
  insertSetting.run('2', 'company_tagline', 'Web & AI Development Agency', now);
  insertSetting.run('3', 'default_pricing_tier', 'Standard', now);
  insertSetting.run('4', 'ai_api_key', '', now);
  insertSetting.run('5', 'ai_model', 'gpt-4', now);
  insertSetting.run('6', 'theme', 'cyberpunk', now);

  console.log(`  ✅ Demo data seeded: ${demoLeads.length} leads, 3 deals, 5 tasks, 5 activities`);

  // ===== IMPORT REAL DATA =====
  console.log(`\n📥 Importing ${IMPORT_STATS.totalLeads} real leads + ${IMPORT_STATS.totalEmails} emails...`);

  // Build dedup set
  const existingKeys = new Set(
    demoLeads.map(l => `${l.name.toLowerCase().trim()}|${l.city.toLowerCase().trim()}`)
  );

  let leadsImported = 0;
  let leadsSkipped = 0;
  const allLeadIds = new Map<string, string>(); // name -> id

  // Map existing demo leads
  for (let i = 0; i < demoLeads.length; i++) {
    allLeadIds.set(demoLeads[i].name.toLowerCase().trim(), leadIds[i]);
  }

  const insertRealLead = sqlite.prepare(`
    INSERT INTO leads (id, name, company, email, phone, website, city, state, industry, source, status, score, rating, user_ratings_total, address, category, website_status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // Bulk insert real leads in a transaction
  const insertRealLeadTx = sqlite.transaction((leads: typeof IMPORT_LEADS) => {
    for (const il of leads) {
      const dedupKey = `${il.name.toLowerCase().trim()}|${il.city.toLowerCase().trim()}`;
      if (existingKeys.has(dedupKey)) {
        leadsSkipped++;
        continue;
      }
      existingKeys.add(dedupKey);

      insertRealLead.run(
        il.id, il.name, il.company, il.email, il.phone, il.website,
        il.city, il.state, il.industry, il.source, il.status, il.score,
        il.rating, il.user_ratings_total, il.address, il.category, il.website_status,
        il.created_at, il.updated_at
      );

      allLeadIds.set(il.name.toLowerCase().trim(), il.id);
      leadsImported++;
    }
  });
  insertRealLeadTx(IMPORT_LEADS);

  console.log(`  ✅ Leads: ${leadsImported} imported, ${leadsSkipped} skipped`);

  // Import emails
  const insertEmail = sqlite.prepare(`
    INSERT INTO outreach_emails (id, lead_id, lead_name, subject, body, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  let emailsImported = 0;

  const insertEmailTx = sqlite.transaction((emails: typeof IMPORT_EMAILS) => {
    for (const ie of emails) {
      const matchedLeadId = allLeadIds.get(ie.lead_name.toLowerCase().trim()) || ie.lead_id;
      insertEmail.run(ie.id, matchedLeadId, ie.lead_name, ie.subject, ie.body, ie.status, ie.created_at);
      emailsImported++;
    }
  });
  insertEmailTx(IMPORT_EMAILS);

  console.log(`  ✅ Emails: ${emailsImported} imported`);

  // Log import activity
  insertActivity.run(uuidv4(), 'system', '', 'import', `Imported ${leadsImported} leads and ${emailsImported} email drafts from Alice workspace`, now);

  const finalCount = sqlite.prepare('SELECT COUNT(*) as count FROM leads').get() as { count: number };
  const emailCount = sqlite.prepare('SELECT COUNT(*) as count FROM outreach_emails').get() as { count: number };

  console.log('\n🎉 Database seeded successfully!');
  console.log(`   Total leads: ${finalCount.count}`);
  console.log(`   Total emails: ${emailCount.count}`);

  sqlite.close();
}

seedDatabase();
