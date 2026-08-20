/**
 * Hybrid client-side database layer.
 * Tries API routes first (server mode), falls back to localStorage (GitHub Pages).
 */

import { IMPORT_STATS } from './import-data';
import type { ImportLead, ImportEmail } from './import-data';

// ===== TYPES =====
export interface Lead {
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
  rating?: number | null;
  user_ratings_total?: number | null;
  address?: string | null;
  category?: string | null;
  website_status?: string | null;
  created_at: string;
  updated_at: string;
}

export interface OutreachEmail {
  id: string;
  lead_id: string;
  lead_name: string;
  subject: string;
  body: string;
  html_body?: string;
  status: string;
  sent_at: string | null;
  opened_at: string | null;
  created_at: string;
}

export interface Deal {
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

export interface Task {
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

export interface Activity {
  id: string;
  entity_type: string;
  entity_id: string;
  action: string;
  details: string;
  user_id: string;
  created_at: string;
}

export interface Setting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface LeadWithStats extends Lead {
  email_count: number;
  last_email_at: string | null;
}

// ===== DOSSIER (OSINT) =====
export interface Dossier {
  id: string;
  lead_id: string;
  // Business info
  business_name: string;
  industry: string;
  location: string;
  website: string;
  phone: string;
  // Contacts
  owner_name: string;
  owner_title: string;
  contact_email: string;
  // Tech & ops
  technology_stack: string[];
  pain_points: string[];
  opportunities: string[];
  // Score & research
  confidence_score: number;
  research_sources: { label: string; url: string }[];
  notes: string;
  // Meta
  created_at: string;
  updated_at: string;
}

// ===== MODE DETECTION =====
let _mode: 'api' | 'local' | null = null;

async function detectMode(): Promise<'api' | 'local'> {
  if (_mode) return _mode;
  
  try {
    // Try to reach the API
    const res = await fetch('/api/leads', { 
      method: 'GET',
      signal: AbortSignal.timeout(3000) // 3 second timeout
    });
    if (res.ok) {
      _mode = 'api';
      console.log('[DB] Using API mode');
      return _mode;
    }
  } catch {
    // API not available
  }
  
  _mode = 'local';
  console.log('[DB] Using localStorage fallback mode');
  return _mode;
}

// ===== LOCAL STORAGE HELPERS =====
function getStorageKey(table: string): string {
  return `lnm_${table}`;
}

function loadFromStorage<T>(table: string): T[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(getStorageKey(table));
  return data ? JSON.parse(data) : [];
}

function saveToStorage<T>(table: string, data: T[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(getStorageKey(table), JSON.stringify(data));
}

function generateId(): string {
  return crypto.randomUUID ? crypto.randomUUID() : 
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

// ===== SEED DATA FOR LOCAL MODE =====
const DEMO_LEADS: Lead[] = [];


const DEMO_EMAILS: OutreachEmail[] = [
];







const DEMO_DEALS: Deal[] = [
  {
    id: 'deal-001', lead_id: 'lead-002', title: 'Growth Labs - Website Redesign',
    value: 25000, progress: 60, status: 'active',
    kickoff_date: '2025-01-25', target_date: '2025-03-01', created_at: '2025-01-19T15:00:00Z'
  },
  {
    id: 'deal-002', lead_id: 'lead-007', title: 'FinServ - Security Audit',
    value: 15000, progress: 100, status: 'completed',
    kickoff_date: '2025-01-10', target_date: '2025-01-31', created_at: '2025-01-10T10:00:00Z'
  },
  {
    id: 'deal-003', lead_id: 'lead-012', title: 'SmartHome - IoT Dashboard',
    value: 40000, progress: 25, status: 'active',
    kickoff_date: '2025-02-01', target_date: '2025-04-15', created_at: '2025-01-25T14:30:00Z'
  }
];

const DEMO_TASKS: Task[] = [
  {
    id: 'task-001', title: 'Follow up with John Smith', description: 'Send proposal for TechStart project',
    status: 'pending', priority: 'high', owner_type: 'user', owner_id: 'user-1',
    lead_id: 'lead-001', deadline: '2025-01-28', created_at: '2025-01-25T10:00:00Z'
  },
  {
    id: 'task-002', title: 'Prepare Q1 report', description: 'Compile sales metrics for Q1',
    status: 'in-progress', priority: 'medium', owner_type: 'user', owner_id: 'user-1',
    lead_id: '', deadline: '2025-01-30', created_at: '2025-01-20T09:00:00Z'
  },
  {
    id: 'task-003', title: 'Schedule demo for CloudFirst', description: 'Set up product demo meeting',
    status: 'pending', priority: 'low', owner_type: 'user', owner_id: 'user-1',
    lead_id: 'lead-004', deadline: '2025-02-05', created_at: '2025-01-26T08:00:00Z'
  }
];

const DEMO_ACTIVITIES: Activity[] = [
  {
    id: 'act-001', entity_type: 'lead', entity_id: 'lead-001', action: 'status_changed',
    details: 'Status changed from new to qualified', user_id: 'user-1', created_at: '2025-01-20T14:30:00Z'
  },
  {
    id: 'act-002', entity_type: 'email', entity_id: 'email-001', action: 'sent',
    details: 'Email sent to John Smith', user_id: 'user-1', created_at: '2025-01-16T10:00:00Z'
  },
  {
    id: 'act-003', entity_type: 'deal', entity_id: 'deal-001', action: 'created',
    details: 'Deal created for Growth Labs', user_id: 'user-1', created_at: '2025-01-19T15:00:00Z'
  }
];

function seedLocalStorage(): void {
  if (loadFromStorage('leads').length > 0) return; // Already seeded
  saveToStorage('leads', DEMO_LEADS);
  saveToStorage('emails', DEMO_EMAILS);
  saveToStorage('deals', DEMO_DEALS);
  saveToStorage('tasks', DEMO_TASKS);
  saveToStorage('activities', DEMO_ACTIVITIES);
  saveToStorage('settings', [
    { id: 'set-1', key: 'company_name', value: 'SOETech', updated_at: new Date().toISOString() },
    { id: 'set-2', key: 'primary_color', value: '#6366f1', updated_at: new Date().toISOString() }
  ]);
}

// ===== API HELPERS =====
const API_BASE = '';

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function apiPut<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function apiDelete(path: string): Promise<void> {
  const res = await fetch(`${API_BASE}${path}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
}

// ===== DATA ACCESSORS =====
export async function getLeads(): Promise<Lead[]> {
  const mode = await detectMode();
  if (mode === 'api') {
    return apiGet<Lead[]>('/api/leads');
  }
  seedLocalStorage();
  return loadFromStorage<Lead>('leads');
}

export async function getEmails(): Promise<OutreachEmail[]> {
  const mode = await detectMode();
  if (mode === 'api') {
    return apiGet<OutreachEmail[]>('/api/emails');
  }
  seedLocalStorage();
  return loadFromStorage<OutreachEmail>('emails');
}

export async function getEmailsByLead(leadId: string): Promise<OutreachEmail[]> {
  const mode = await detectMode();
  if (mode === 'api') {
    return apiGet<OutreachEmail[]>(`/api/emails?lead_id=${leadId}`);
  }
  const emails = await getEmails();
  return emails.filter(e => e.lead_id === leadId);
}

export async function getDeals(): Promise<Deal[]> {
  const mode = await detectMode();
  if (mode === 'api') {
    return apiGet<Deal[]>('/api/deals');
  }
  seedLocalStorage();
  return loadFromStorage<Deal>('deals');
}

export async function getTasks(): Promise<Task[]> {
  const mode = await detectMode();
  if (mode === 'api') {
    return apiGet<Task[]>('/api/tasks');
  }
  seedLocalStorage();
  return loadFromStorage<Task>('tasks');
}

export async function getActivities(): Promise<Activity[]> {
  const mode = await detectMode();
  if (mode === 'api') {
    return apiGet<Activity[]>('/api/activities');
  }
  seedLocalStorage();
  return loadFromStorage<Activity>('activities');
}

export async function getSettings(): Promise<Setting[]> {
  const mode = await detectMode();
  if (mode === 'api') {
    return apiGet<Setting[]>('/api/settings');
  }
  seedLocalStorage();
  return loadFromStorage<Setting>('settings');
}

// ===== ENRICHED QUERIES =====
export async function getLeadsWithStats(): Promise<LeadWithStats[]> {
  const [leads, emails] = await Promise.all([getLeads(), getEmails()]);

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

// ===== STATS =====
export async function getPipelineStats(): Promise<Record<string, number>> {
  const leads = await getLeads();
  const stats: Record<string, number> = {};
  for (const lead of leads) {
    stats[lead.status] = (stats[lead.status] || 0) + 1;
  }
  return stats;
}

export async function getCategoryStats(): Promise<Record<string, number>> {
  const leads = await getLeads();
  const stats: Record<string, number> = {};
  for (const lead of leads) {
    const cat = lead.category || lead.industry || 'Other';
    stats[cat] = (stats[cat] || 0) + 1;
  }
  return stats;
}

export async function getCityStats(): Promise<Record<string, number>> {
  const leads = await getLeads();
  const stats: Record<string, number> = {};
  for (const lead of leads) {
    stats[lead.city] = (stats[lead.city] || 0) + 1;
  }
  return stats;
}

// ===== CRUD =====
export async function addLead(lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): Promise<Lead> {
  const mode = await detectMode();
  if (mode === 'api') {
    return apiPost<Lead>('/api/leads', lead);
  }
  
  const newLead: Lead = {
    ...lead,
    id: generateId(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  const leads = loadFromStorage<Lead>('leads');
  leads.push(newLead);
  saveToStorage('leads', leads);
  return newLead;
}

export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
  const mode = await detectMode();
  if (mode === 'api') {
    return apiPut<Lead | null>(`/api/leads/${id}`, updates);
  }
  
  const leads = loadFromStorage<Lead>('leads');
  const idx = leads.findIndex(l => l.id === id);
  if (idx === -1) return null;
  leads[idx] = { ...leads[idx], ...updates, updated_at: new Date().toISOString() };
  saveToStorage('leads', leads);
  return leads[idx];
}

export async function addEmail(email: Omit<OutreachEmail, 'id' | 'created_at'>): Promise<OutreachEmail> {
  const mode = await detectMode();
  if (mode === 'api') {
    return apiPost<OutreachEmail>('/api/emails', email);
  }
  
  const newEmail: OutreachEmail = {
    ...email,
    id: generateId(),
    created_at: new Date().toISOString(),
  };
  const emails = loadFromStorage<OutreachEmail>('emails');
  emails.push(newEmail);
  saveToStorage('emails', emails);
  return newEmail;
}

export async function saveSettings(settings: Record<string, string>): Promise<void> {
  const mode = await detectMode();
  if (mode === 'api') {
    await apiPut('/api/settings', settings);
    return;
  }
  
  const existing = loadFromStorage<Setting>('settings');
  for (const [key, value] of Object.entries(settings)) {
    const idx = existing.findIndex(s => s.key === key);
    if (idx >= 0) {
      existing[idx].value = value;
      existing[idx].updated_at = new Date().toISOString();
    } else {
      existing.push({
        id: generateId(),
        key,
        value,
        updated_at: new Date().toISOString(),
      });
    }
  }
  saveToStorage('settings', existing);
}

export async function addActivity(entityType: string, entityId: string, action: string, details: string): Promise<void> {
  const mode = await detectMode();
  if (mode === 'api') {
    await apiPost('/api/activities', { entity_type: entityType, entity_id: entityId, action, details });
    return;
  }
  
  const activities = loadFromStorage<Activity>('activities');
  activities.push({
    id: generateId(),
    entity_type: entityType,
    entity_id: entityId,
    action,
    details,
    user_id: 'local-user',
    created_at: new Date().toISOString(),
  });
  saveToStorage('activities', activities);
}

// ===== TASK CRUD =====
export async function addTask(task: Omit<Task, 'id' | 'created_at'>): Promise<Task> {
  const mode = await detectMode();
  if (mode === 'api') {
    return apiPost<Task>('/api/tasks', task);
  }
  
  const newTask: Task = {
    ...task,
    id: generateId(),
    created_at: new Date().toISOString(),
  };
  const tasks = loadFromStorage<Task>('tasks');
  tasks.push(newTask);
  saveToStorage('tasks', tasks);
  return newTask;
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<Task | null> {
  const mode = await detectMode();
  if (mode === 'api') {
    const res = await fetch(`${API_BASE}/api/tasks`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updates }),
    });
    if (!res.ok) return null;
    return res.json();
  }
  
  const tasks = loadFromStorage<Task>('tasks');
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return null;
  tasks[idx] = { ...tasks[idx], ...updates };
  saveToStorage('tasks', tasks);
  return tasks[idx];
}

export async function deleteTask(id: string): Promise<boolean> {
  const mode = await detectMode();
  if (mode === 'api') {
    try {
      await apiDelete(`/api/tasks?id=${id}`);
      return true;
    } catch {
      return false;
    }
  }
  
  const tasks = loadFromStorage<Task>('tasks');
  const filtered = tasks.filter(t => t.id !== id);
  if (filtered.length === tasks.length) return false;
  saveToStorage('tasks', filtered);
  return true;
}

// ===== DOSSIER CRUD =====
export async function getDossier(leadId: string): Promise<Dossier | null> {
  const mode = await detectMode();
  if (mode === 'api') {
    try {
      const res = await fetch(`/api/dossiers?lead_id=${leadId}`);
      if (!res.ok) return null;
      return res.json();
    } catch { return null; }
  }
  const dossiers = loadFromStorage<Dossier>('dossiers');
  return dossiers.find(d => d.lead_id === leadId) || null;
}

export async function saveDossier(dossier: Omit<Dossier, 'id' | 'created_at' | 'updated_at'>): Promise<Dossier> {
  const mode = await detectMode();
  if (mode === 'api') {
    const res = await fetch('/api/dossiers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dossier),
    });
    if (!res.ok) throw new Error('Failed to save dossier');
    return res.json();
  }
  const dossiers = loadFromStorage<Dossier>('dossiers');
  const existing = dossiers.findIndex(d => d.lead_id === dossier.lead_id);
  const now = new Date().toISOString();
  const saved: Dossier = existing >= 0
    ? { ...dossiers[existing], ...dossier, updated_at: now }
    : { ...dossier, id: generateId(), created_at: now, updated_at: now };
  if (existing >= 0) {
    dossiers[existing] = saved;
  } else {
    dossiers.push(saved);
  }
  saveToStorage('dossiers', dossiers);
  return saved;
}

// ===== IMPORT =====
export interface ImportResult {
  leadsImported: number;
  leadsSkipped: number;
  emailsImported: number;
  emailsSkipped: number;
  totalLeads: number;
  totalEmails: number;
}

export async function importRealData(): Promise<ImportResult> {
  const mode = await detectMode();
  if (mode === 'api') {
    const leads = await getLeads();
    const emails = await getEmails();
    return {
      leadsImported: 0,
      leadsSkipped: leads.length,
      emailsImported: 0,
      emailsSkipped: emails.length,
      totalLeads: leads.length,
      totalEmails: emails.length,
    };
  }
  
  // Local mode - check if data exists
  const leads = loadFromStorage<Lead>('leads');
  const emails = loadFromStorage<OutreachEmail>('emails');
  return {
    leadsImported: 0,
    leadsSkipped: leads.length,
    emailsImported: 0,
    emailsSkipped: emails.length,
    totalLeads: leads.length,
    totalEmails: emails.length,
  };
}

export async function isDataImported(): Promise<boolean> {
  const leads = await getLeads();
  return leads.length > 0;
}

export function getImportStats() {
  return IMPORT_STATS;
}

// ===== SEED =====
export function seedDemoData(): void {
  seedLocalStorage();
}

// ===== REAL DATA LOADER =====
export async function loadRealDataFromJSON(): Promise<boolean> {
  try {
    const [leadsRes, emailsRes, dossiersRes] = await Promise.all([
      fetch('/data/leads.json'),
      fetch('/data/emails.json'),
      fetch('/data/dossiers.json'),
    ]);

    if (leadsRes.ok) {
      const leads = await leadsRes.json();
      if (leads.length > 0) {
        saveToStorage('leads', leads);
        console.log(`[LNM] Loaded ${leads.length} real leads`);
      }
    }

    if (emailsRes.ok) {
      const emails = await emailsRes.json();
      if (emails.length > 0) {
        saveToStorage('emails', emails);
        console.log(`[LNM] Loaded ${emails.length} real emails`);
      }
    }

    if (dossiersRes.ok) {
      const dossiers = await dossiersRes.json();
      if (dossiers.length > 0) {
        saveToStorage('dossiers', dossiers);
        console.log(`[LNM] Loaded ${dossiers.length} real dossiers`);
      }
    }

    return true;
  } catch (e) {
    console.warn('[LNM] Failed to load real data:', e);
    return false;
  }
}

// ===== GOOGLE DRIVE =====
export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  createdTime?: string;
  modifiedTime?: string;
  webViewLink?: string;
}

export async function getDriveFiles(folderId?: string): Promise<DriveFile[]> {
  const params = new URLSearchParams();
  if (folderId) params.set('folderId', folderId);
  const res = await fetch(`/api/drive/list?${params.toString()}`);
  if (!res.ok) throw new Error(`Drive API error: ${res.status}`);
  const data = await res.json();
  return data.files;
}

export async function searchDriveFiles(query: string): Promise<DriveFile[]> {
  const res = await fetch(`/api/drive/list?type=search&query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error(`Drive API error: ${res.status}`);
  const data = await res.json();
  return data.files;
}

export async function uploadToDrive(file: File, folderId?: string, clientName?: string, category?: string): Promise<DriveFile> {
  const formData = new FormData();
  formData.append('file', file);
  if (folderId) formData.append('folderId', folderId);
  if (clientName) formData.append('clientName', clientName);
  if (category) formData.append('category', category);
  const res = await fetch('/api/drive/upload', { method: 'POST', body: formData });
  if (!res.ok) throw new Error(`Drive upload error: ${res.status}`);
  const data = await res.json();
  return data.file;
}

export async function setupDriveFolders(clientName?: string): Promise<{ rootFolderId: string; folders: Record<string, string> }> {
  const res = await fetch('/api/drive/setup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientName }),
  });
  if (!res.ok) throw new Error(`Drive setup error: ${res.status}`);
  const data = await res.json();
  return data.structure;
}

// Re-export types
export { IMPORT_STATS };
export type { ImportLead, ImportEmail };

// ===== SYNC =====
export interface SyncResult {
  totalLeads: number;
  totalEmails: number;
  totalDossiers: number;
  newLeads: number;
  newEmails: number;
  newDossiers: number;
  updatedLeads: number;
  updatedEmails: number;
  conflictsResolved: number;
  syncDurationMs: number;
  timestamp: string;
}

export interface SyncMetadata {
  last_sync: string | null;
  sync_count: number;
  source: 'gdrive' | 'local';
}

const SYNC_METADATA_KEY = 'lnm_sync_metadata';

function getSyncMetadata(): SyncMetadata {
  if (typeof window === 'undefined') return { last_sync: null, sync_count: 0, source: 'local' };
  const raw = localStorage.getItem(SYNC_METADATA_KEY);
  if (!raw) return { last_sync: null, sync_count: 0, source: 'local' };
  try {
    return JSON.parse(raw) as SyncMetadata;
  } catch {
    return { last_sync: null, sync_count: 0, source: 'local' };
  }
}

function setSyncMetadata(meta: SyncMetadata): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SYNC_METADATA_KEY, JSON.stringify(meta));
}

/**
 * Merge a batch of remote items with existing localStorage items.
 * Deduplicates by `id`. If an item with the same id exists and the
 * remote version has a newer `updated_at`, the remote wins (last-write-wins).
 * Returns { merged, added, updated, conflicts } counts.
 */
function mergeById<T extends { id: string; updated_at?: string }>(
  existing: T[],
  remote: T[]
): { merged: T[]; added: number; updated: number; conflicts: number } {
  const existingMap = new Map<string, T>();
  for (const item of existing) {
    existingMap.set(item.id, item);
  }

  let added = 0;
  let updated = 0;
  let conflicts = 0;

  for (const remoteItem of remote) {
    const existingItem = existingMap.get(remoteItem.id);
    if (!existingItem) {
      existingMap.set(remoteItem.id, remoteItem);
      added++;
    } else {
      // Compare updated_at timestamps — remote wins if newer
      const remoteTime = remoteItem.updated_at ? new Date(remoteItem.updated_at).getTime() : 0;
      const existingTime = existingItem.updated_at ? new Date(existingItem.updated_at).getTime() : 0;
      if (remoteTime > existingTime) {
        existingMap.set(remoteItem.id, remoteItem);
        updated++;
        if (existingTime > 0) conflicts++;
      }
    }
  }

  return {
    merged: Array.from(existingMap.values()),
    added,
    updated,
    conflicts,
  };
}

/**
 * Fetch fresh data from /data/*.json (served alongside the static export)
 * and merge with existing localStorage data, deduplicating by id.
 * Designed for GitHub Pages (static export) where there is no server API.
 */
export async function syncData(): Promise<SyncResult> {
  const startTime = Date.now();

  // Fetch remote data files
  const [leadsRes, emailsRes, dossiersRes] = await Promise.all([
    fetch('/data/leads.json', { cache: 'no-cache' }),
    fetch('/data/emails.json', { cache: 'no-cache' }),
    fetch('/data/dossiers.json', { cache: 'no-cache' }),
  ]);

  if (!leadsRes.ok) throw new Error(`Failed to fetch leads: ${leadsRes.status}`);
  if (!emailsRes.ok) throw new Error(`Failed to fetch emails: ${emailsRes.status}`);
  if (!dossiersRes.ok) throw new Error(`Failed to fetch dossiers: ${dossiersRes.status}`);

  const remoteLeads = await leadsRes.json() as Lead[];
  const remoteEmails = await emailsRes.json() as OutreachEmail[];
  const remoteDossiers = await dossiersRes.json() as Dossier[];

  // Load existing data from localStorage
  const existingLeads = loadFromStorage<Lead>('leads');
  const existingEmails = loadFromStorage<OutreachEmail>('emails');
  const existingDossiers = loadFromStorage<Dossier>('dossiers');

  // Merge with deduplication
  const leadMerge = mergeById(existingLeads, remoteLeads);
  const emailMerge = mergeById(existingEmails, remoteEmails);
  const dossierMerge = mergeById(existingDossiers, remoteDossiers);

  // Save merged data back to localStorage
  saveToStorage('leads', leadMerge.merged);
  saveToStorage('emails', emailMerge.merged);
  saveToStorage('dossiers', dossierMerge.merged);

  // Update sync metadata
  const prevMeta = getSyncMetadata();
  const newMeta: SyncMetadata = {
    last_sync: new Date().toISOString(),
    sync_count: prevMeta.sync_count + 1,
    source: 'gdrive',
  };
  setSyncMetadata(newMeta);

  // Log to activity stream
  const activity: Activity = {
    id: generateId(),
    entity_type: 'system',
    entity_id: 'sync',
    action: 'sync',
    details: `Data synced from GDrive. ${leadMerge.added} new leads, ${emailMerge.added} new emails, ${dossierMerge.added} new dossiers. ${leadMerge.conflicts + emailMerge.conflicts + dossierMerge.conflicts} conflicts resolved.`,
    user_id: 'system',
    created_at: new Date().toISOString(),
  };
  const existingActivities = loadFromStorage<Activity>('activities');
  existingActivities.unshift(activity);
  saveToStorage('activities', existingActivities);

  const syncDurationMs = Date.now() - startTime;

  return {
    totalLeads: leadMerge.merged.length,
    totalEmails: emailMerge.merged.length,
    totalDossiers: dossierMerge.merged.length,
    newLeads: leadMerge.added,
    newEmails: emailMerge.added,
    newDossiers: dossierMerge.added,
    updatedLeads: leadMerge.updated,
    updatedEmails: emailMerge.updated,
    conflictsResolved: leadMerge.conflicts + emailMerge.conflicts + dossierMerge.conflicts,
    syncDurationMs,
    timestamp: new Date().toISOString(),
  };
}

/** Get the current sync metadata from localStorage. */
export function getSyncState(): SyncMetadata {
  return getSyncMetadata();
}

/** Reset sync metadata (for debugging). */
export function resetSyncMetadata(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SYNC_METADATA_KEY);
  }
}
