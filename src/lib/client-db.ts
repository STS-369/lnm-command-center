/**
 * Client-side database layer backed by API routes + SQLite.
 * Replaces localStorage with server-side data via fetch().
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
  return apiGet<Lead[]>('/api/leads');
}

export async function getEmails(): Promise<OutreachEmail[]> {
  return apiGet<OutreachEmail[]>('/api/emails');
}

export async function getEmailsByLead(leadId: string): Promise<OutreachEmail[]> {
  return apiGet<OutreachEmail[]>(`/api/emails?lead_id=${leadId}`);
}

export async function getDeals(): Promise<Deal[]> {
  return apiGet<Deal[]>('/api/deals');
}

export async function getTasks(): Promise<Task[]> {
  return apiGet<Task[]>('/api/tasks');
}

export async function getActivities(): Promise<Activity[]> {
  return apiGet<Activity[]>('/api/activities');
}

export async function getSettings(): Promise<Setting[]> {
  return apiGet<Setting[]>('/api/settings');
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
  return apiPost<Lead>('/api/leads', lead);
}

export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
  return apiPut<Lead | null>(`/api/leads/${id}`, updates);
}

export async function addEmail(email: Omit<OutreachEmail, 'id' | 'created_at'>): Promise<OutreachEmail> {
  return apiPost<OutreachEmail>('/api/emails', email);
}

export async function saveSettings(settings: Record<string, string>): Promise<void> {
  await apiPut('/api/settings', settings);
}

export async function addActivity(entityType: string, entityId: string, action: string, details: string): Promise<void> {
  await apiPost('/api/activities', { entity_type: entityType, entity_id: entityId, action, details });
}

// ===== TASK CRUD =====
export async function addTask(task: Omit<Task, 'id' | 'created_at'>): Promise<Task> {
  return apiPost<Task>('/api/tasks', task);
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<Task | null> {
  const res = await fetch(`${API_BASE}/api/tasks`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...updates }),
  });
  if (!res.ok) return null;
  return res.json();
}

export async function deleteTask(id: string): Promise<boolean> {
  try {
    await apiDelete(`/api/tasks?id=${id}`);
    return true;
  } catch {
    return false;
  }
}

// ===== IMPORT (no-op now, data pre-seeded in SQLite) =====
export interface ImportResult {
  leadsImported: number;
  leadsSkipped: number;
  emailsImported: number;
  emailsSkipped: number;
  totalLeads: number;
  totalEmails: number;
}

export async function importRealData(): Promise<ImportResult> {
  // Data is pre-seeded in SQLite via scripts/seed-db.ts
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

export async function isDataImported(): Promise<boolean> {
  const leads = await getLeads();
  return leads.length > 0;
}

export function getImportStats() {
  return IMPORT_STATS;
}

// ===== SEED (no-op now, data pre-seeded in SQLite) =====
export function seedDemoData(): void {
  // No-op: data is pre-seeded in SQLite via scripts/seed-db.ts
}

// Re-export types
export { IMPORT_STATS };
export type { ImportLead, ImportEmail };
