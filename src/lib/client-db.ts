/**
 * Client-side localStorage database mock for static GitHub Pages deployment.
 * Replaces server-side SQLite with localStorage for full client-side operation.
 */

import { IMPORT_LEADS, IMPORT_EMAILS, IMPORT_STATS } from './import-data';
import type { ImportLead, ImportEmail } from './import-data';

// Simple UUID generator
function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  city: string;
  state: string;
  industry: string;
  source: string;
  status: string;
  score: number;
  rating?: number;
  user_ratings_total?: number;
  address?: string;
  category?: string;
  website_status?: string;
  created_at: string;
  updated_at: string;
}

interface OutreachEmail {
  id: string;
  lead_id: string;
  lead_name: string;
  subject: string;
  body: string;
  status: string;
  sent_at: string | null;
  opened_at: string | null;
  created_at: string;
}

interface Deal {
  id: string;
  lead_id: string;
  title: string;
  value: number;
  progress: number;
  status: string;
  kickoff_date: string;
  target_date: string;
  created_at: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  owner_type: string;
  owner_id: string;
  lead_id: string;
  deadline: string;
  created_at: string;
}

interface Activity {
  id: string;
  entity_type: string;
  entity_id: string;
  action: string;
  details: string;
  user_id: string;
  created_at: string;
}

interface Setting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

interface LeadWithStats extends Lead {
  email_count: number;
  last_email_at: string | null;
}

const STORAGE_KEYS = {
  leads: 'lnm_leads',
  emails: 'lnm_emails',
  deals: 'lnm_deals',
  tasks: 'lnm_tasks',
  activities: 'lnm_activities',
  settings: 'lnm_settings',
  seeded: 'lnm_seeded',
  imported: 'lnm_imported',
};

function getStore<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(key);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

function setStore<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

function now(): string {
  return new Date().toISOString();
}

// ===== SEED DEMO DATA =====
export function seedDemoData(): void {
  if (typeof window === 'undefined') return;
  if (localStorage.getItem(STORAGE_KEYS.seeded)) return;

  const leadIds = Array.from({ length: 8 }, () => uuidv4());

  const leads: Lead[] = [
    { id: leadIds[0], name: 'Marcus Chen', company: 'TechFlow Solutions', email: 'marcus@techflow.com', phone: '555-0101', website: 'https://techflow.com', city: 'Austin', state: 'TX', industry: 'SaaS', source: 'linkedin', status: 'outreach', score: 85, created_at: now(), updated_at: now() },
    { id: leadIds[1], name: 'Sarah Williams', company: 'GreenLeaf Farms', email: 'sarah@greenleaf.com', phone: '555-0102', website: 'https://greenleaf.com', city: 'Portland', state: 'OR', industry: 'Agriculture', source: 'website', status: 'proposal', score: 72, created_at: now(), updated_at: now() },
    { id: leadIds[2], name: 'James Rodriguez', company: 'Urban Fitness', email: 'james@urbanfitness.com', phone: '555-0103', website: 'https://urbanfitness.com', city: 'Miami', state: 'FL', industry: 'Fitness', source: 'referral', status: 'new', score: 45, created_at: now(), updated_at: now() },
    { id: leadIds[3], name: 'Emily Zhang', company: 'CloudNine Data', email: 'emily@cloudnine.io', phone: '555-0104', website: 'https://cloudnine.io', city: 'San Francisco', state: 'CA', industry: 'Data Analytics', source: 'cold', status: 'researched', score: 91, created_at: now(), updated_at: now() },
    { id: leadIds[4], name: 'David Park', company: 'NovaTech Labs', email: 'david@novatech.com', phone: '555-0105', website: 'https://novatech.com', city: 'Seattle', state: 'WA', industry: 'Healthcare', source: 'inbound', status: 'active_deal', score: 78, created_at: now(), updated_at: now() },
    { id: leadIds[5], name: 'Lisa Thompson', company: 'BrightPath Education', email: 'lisa@brightpath.edu', phone: '555-0106', website: 'https://brightpath.edu', city: 'Chicago', state: 'IL', industry: 'Education', source: 'linkedin', status: 'closed_won', score: 88, created_at: now(), updated_at: now() },
    { id: leadIds[6], name: 'Robert Kim', company: 'SwiftDelivery', email: 'robert@swiftdelivery.com', phone: '555-0107', website: 'https://swiftdelivery.com', city: 'Denver', state: 'CO', industry: 'Logistics', source: 'import', status: 'new', score: 32, created_at: now(), updated_at: now() },
    { id: leadIds[7], name: 'Amanda Foster', company: 'CreativeMinds Agency', email: 'amanda@creativeminds.com', phone: '555-0108', website: 'https://creativeminds.com', city: 'Nashville', state: 'TN', industry: 'Marketing', source: 'website', status: 'outreach', score: 67, created_at: now(), updated_at: now() },
  ];

  const deals: Deal[] = [
    { id: uuidv4(), lead_id: leadIds[4], title: 'NovaTech AI Integration', value: 24000, progress: 75, status: 'active', kickoff_date: '', target_date: '', created_at: now() },
    { id: uuidv4(), lead_id: leadIds[5], title: 'BrightPath LMS Build', value: 45000, progress: 100, status: 'completed', kickoff_date: '', target_date: '', created_at: now() },
    { id: uuidv4(), lead_id: leadIds[0], title: 'TechFlow Chatbot Package', value: 299, progress: 30, status: 'active', kickoff_date: '', target_date: '', created_at: now() },
  ];

  const tasks: Task[] = [
    { id: uuidv4(), title: 'Send follow-up email to Marcus Chen', description: 'Follow up on the chatbot proposal', status: 'pending', priority: 'high', owner_type: '', owner_id: '', lead_id: leadIds[0], deadline: '', created_at: now() },
    { id: uuidv4(), title: 'Prepare proposal for CloudNine Data', description: 'Custom AI research package', status: 'in_progress', priority: 'high', owner_type: '', owner_id: '', lead_id: leadIds[3], deadline: '', created_at: now() },
    { id: uuidv4(), title: 'Schedule demo with Sarah Williams', description: 'Demo the website + AI bundle', status: 'pending', priority: 'medium', owner_type: '', owner_id: '', lead_id: leadIds[1], deadline: '', created_at: now() },
    { id: uuidv4(), title: 'Update CRM settings', description: 'Configure new pricing tiers', status: 'completed', priority: 'low', owner_type: '', owner_id: '', lead_id: '', deadline: '', created_at: now() },
    { id: uuidv4(), title: "Research Robert Kim's company", description: 'Deep dive into SwiftDelivery stack', status: 'pending', priority: 'medium', owner_type: '', owner_id: '', lead_id: leadIds[6], deadline: '', created_at: now() },
  ];

  const activities: Activity[] = [
    { id: uuidv4(), entity_type: 'lead', entity_id: leadIds[0], action: 'created', details: 'New lead added from LinkedIn', user_id: '', created_at: now() },
    { id: uuidv4(), entity_type: 'lead', entity_id: leadIds[1], action: 'status_changed', details: 'Status changed to proposal', user_id: '', created_at: now() },
    { id: uuidv4(), entity_type: 'deal', entity_id: leadIds[4], action: 'created', details: 'Deal created: NovaTech AI Integration ($24,000)', user_id: '', created_at: now() },
    { id: uuidv4(), entity_type: 'task', entity_id: '', action: 'completed', details: 'Task completed: Update CRM settings', user_id: '', created_at: now() },
    { id: uuidv4(), entity_type: 'lead', entity_id: leadIds[3], action: 'scored', details: 'Lead scored 91/100 — high priority', user_id: '', created_at: now() },
  ];

  const settings: Setting[] = [
    { id: '1', key: 'company_name', value: 'SOETech LLC', updated_at: now() },
    { id: '2', key: 'company_tagline', value: 'Web & AI Development Agency', updated_at: now() },
    { id: '3', key: 'default_pricing_tier', value: 'Standard', updated_at: now() },
    { id: '4', key: 'ai_api_key', value: '', updated_at: now() },
    { id: '5', key: 'ai_model', value: 'gpt-4', updated_at: now() },
    { id: '6', key: 'theme', value: 'cyberpunk', updated_at: now() },
  ];

  setStore(STORAGE_KEYS.leads, leads);
  setStore(STORAGE_KEYS.deals, deals);
  setStore(STORAGE_KEYS.tasks, tasks);
  setStore(STORAGE_KEYS.activities, activities);
  setStore(STORAGE_KEYS.settings, settings);
  localStorage.setItem(STORAGE_KEYS.seeded, 'true');
}

// ===== DATA IMPORT =====
export interface ImportResult {
  leadsImported: number;
  leadsSkipped: number;
  emailsImported: number;
  emailsSkipped: number;
  totalLeads: number;
  totalEmails: number;
}

/**
 * Import real lead and email data from pre-processed import-data.ts
 * into localStorage. Deduplicates by name+city. Safe to call multiple times.
 */
export function importRealData(): ImportResult {
  if (typeof window === 'undefined') {
    return { leadsImported: 0, leadsSkipped: 0, emailsImported: 0, emailsSkipped: 0, totalLeads: 0, totalEmails: 0 };
  }

  // Check if already imported
  if (localStorage.getItem(STORAGE_KEYS.imported)) {
    const existingLeads = getLeads();
    const existingEmails = getStore<OutreachEmail>(STORAGE_KEYS.emails);
    return {
      leadsImported: 0,
      leadsSkipped: existingLeads.length,
      emailsImported: 0,
      emailsSkipped: existingEmails.length,
      totalLeads: existingLeads.length,
      totalEmails: existingEmails.length,
    };
  }

  const existingLeads = getLeads();
  const existingEmails = getStore<OutreachEmail>(STORAGE_KEYS.emails);
  const timestamp = now();

  // Build dedup set from existing leads
  const existingKeys = new Set(
    existingLeads.map(l => `${l.name.toLowerCase().trim()}|${l.city.toLowerCase().trim()}`)
  );

  // Import leads
  let leadsImported = 0;
  let leadsSkipped = 0;
  const newLeads: Lead[] = [];

  for (const il of IMPORT_LEADS) {
    const dedupKey = `${il.name.toLowerCase().trim()}|${il.city.toLowerCase().trim()}`;
    if (existingKeys.has(dedupKey)) {
      leadsSkipped++;
      continue;
    }
    existingKeys.add(dedupKey);

    newLeads.push({
      id: il.id,
      name: il.name,
      company: il.company,
      email: il.email,
      phone: il.phone,
      website: il.website,
      city: il.city,
      state: il.state,
      industry: il.industry,
      source: il.source,
      status: il.status,
      score: il.score,
      rating: il.rating,
      user_ratings_total: il.user_ratings_total,
      address: il.address,
      category: il.category,
      website_status: il.website_status,
      created_at: il.created_at,
      updated_at: il.updated_at,
    });
    leadsImported++;
  }

  // Merge new leads with existing
  const allLeads = [...newLeads, ...existingLeads];
  setStore(STORAGE_KEYS.leads, allLeads);

  // Import emails (match to leads by name)
  const leadByName = new Map<string, Lead>();
  for (const lead of allLeads) {
    leadByName.set(lead.name.toLowerCase().trim(), lead);
  }

  let emailsImported = 0;
  let emailsSkipped = 0;
  const existingEmailKeys = new Set(
    existingEmails.map(e => `${e.lead_name.toLowerCase().trim()}|${e.subject}`)
  );

  const newEmails: OutreachEmail[] = [];

  for (const ie of IMPORT_EMAILS) {
    const emailKey = `${ie.lead_name.toLowerCase().trim()}|${ie.subject}`;
    if (existingEmailKeys.has(emailKey)) {
      emailsSkipped++;
      continue;
    }
    existingEmailKeys.add(emailKey);

    // Try to match to a lead
    const matchedLead = leadByName.get(ie.lead_name.toLowerCase().trim());

    newEmails.push({
      id: ie.id,
      lead_id: matchedLead ? matchedLead.id : ie.lead_id,
      lead_name: ie.lead_name,
      subject: ie.subject,
      body: ie.body,
      status: ie.status,
      sent_at: null,
      opened_at: null,
      created_at: ie.created_at,
    });
    emailsImported++;
  }

  const allEmails = [...newEmails, ...existingEmails];
  setStore(STORAGE_KEYS.emails, allEmails);

  // Log import activity
  addActivity(
    'system',
    '',
    'import',
    `Imported ${leadsImported} leads and ${emailsImported} email drafts from Alice workspace`
  );

  // Mark as imported
  localStorage.setItem(STORAGE_KEYS.imported, 'true');

  return {
    leadsImported,
    leadsSkipped,
    emailsImported,
    emailsSkipped,
    totalLeads: allLeads.length,
    totalEmails: allEmails.length,
  };
}

/**
 * Check if real data has been imported
 */
export function isDataImported(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEYS.imported) === 'true';
}

/**
 * Get import statistics (what's available to import)
 */
export function getImportStats() {
  return IMPORT_STATS;
}

// ===== DB ACCESSORS =====
export function getLeads(): Lead[] {
  return getStore<Lead>(STORAGE_KEYS.leads);
}

export function getEmails(): OutreachEmail[] {
  return getStore<OutreachEmail>(STORAGE_KEYS.emails);
}

export function getEmailsByLead(leadId: string): OutreachEmail[] {
  return getEmails().filter(e => e.lead_id === leadId);
}

export function getDeals(): Deal[] {
  return getStore<Deal>(STORAGE_KEYS.deals);
}

export function getTasks(): Task[] {
  return getStore<Task>(STORAGE_KEYS.tasks);
}

export function getActivities(): Activity[] {
  return getStore<Activity>(STORAGE_KEYS.activities);
}

export function getSettings(): Setting[] {
  return getStore<Setting>(STORAGE_KEYS.settings);
}

/**
 * Get leads enriched with email counts
 */
export function getLeadsWithStats(): LeadWithStats[] {
  const leads = getLeads();
  const emails = getEmails();

  // Build email count map
  const emailCountMap = new Map<string, { count: number; lastAt: string | null }>();
  for (const email of emails) {
    const existing = emailCountMap.get(email.lead_id) || { count: 0, lastAt: null };
    existing.count++;
    if (!existing.lastAt || email.created_at > existing.lastAt) {
      existing.lastAt = email.created_at;
    }
    emailCountMap.set(email.lead_id, existing);
  }

  return leads.map(lead => {
    const emailStats = emailCountMap.get(lead.id);
    return {
      ...lead,
      email_count: emailStats?.count || 0,
      last_email_at: emailStats?.lastAt || null,
    };
  });
}

/**
 * Get pipeline stats by status
 */
export function getPipelineStats(): Record<string, number> {
  const leads = getLeads();
  const stats: Record<string, number> = {};
  for (const lead of leads) {
    stats[lead.status] = (stats[lead.status] || 0) + 1;
  }
  return stats;
}

/**
 * Get category breakdown
 */
export function getCategoryStats(): Record<string, number> {
  const leads = getLeads();
  const stats: Record<string, number> = {};
  for (const lead of leads) {
    const cat = lead.category || lead.industry || 'Other';
    stats[cat] = (stats[cat] || 0) + 1;
  }
  return stats;
}

/**
 * Get city breakdown
 */
export function getCityStats(): Record<string, number> {
  const leads = getLeads();
  const stats: Record<string, number> = {};
  for (const lead of leads) {
    stats[lead.city] = (stats[lead.city] || 0) + 1;
  }
  return stats;
}

export function addLead(lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): Lead {
  const leads = getLeads();
  const newLead: Lead = {
    ...lead,
    id: uuidv4(),
    created_at: now(),
    updated_at: now(),
  };
  leads.unshift(newLead);
  setStore(STORAGE_KEYS.leads, leads);

  // Log activity
  addActivity('lead', newLead.id, 'created', `New lead added: ${newLead.name} (${newLead.company || 'Unknown'})`);

  return newLead;
}

export function updateLead(id: string, updates: Partial<Lead>): Lead | null {
  const leads = getLeads();
  const idx = leads.findIndex(l => l.id === id);
  if (idx === -1) return null;

  leads[idx] = { ...leads[idx], ...updates, updated_at: now() };
  setStore(STORAGE_KEYS.leads, leads);
  return leads[idx];
}

export function addEmail(email: Omit<OutreachEmail, 'id' | 'created_at'>): OutreachEmail {
  const emails = getEmails();
  const newEmail: OutreachEmail = {
    ...email,
    id: uuidv4(),
    created_at: now(),
  };
  emails.unshift(newEmail);
  setStore(STORAGE_KEYS.emails, emails);
  return newEmail;
}

export function saveSettings(settings: Record<string, string>): void {
  const existing = getSettings();
  const settingsMap = new Map(existing.map((s) => [s.key, s]));

  for (const [key, value] of Object.entries(settings)) {
    if (settingsMap.has(key)) {
      settingsMap.get(key)!.value = value;
      settingsMap.get(key)!.updated_at = now();
    } else {
      existing.push({ id: uuidv4(), key, value, updated_at: now() });
    }
  }
  setStore(STORAGE_KEYS.settings, existing);
}

export function addActivity(entityType: string, entityId: string, action: string, details: string): void {
  const activities = getActivities();
  activities.unshift({
    id: uuidv4(),
    entity_type: entityType,
    entity_id: entityId,
    action,
    details,
    user_id: '',
    created_at: now(),
  });
  setStore(STORAGE_KEYS.activities, activities);
}

export { uuidv4 };
export type { Lead, OutreachEmail, Deal, Task, Activity, Setting, LeadWithStats };
