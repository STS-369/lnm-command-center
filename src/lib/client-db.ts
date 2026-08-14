/**
 * Client-side localStorage database mock for static GitHub Pages deployment.
 * Replaces server-side SQLite with localStorage for full client-side operation.
 */

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
  created_at: string;
  updated_at: string;
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

const STORAGE_KEYS = {
  leads: 'lnm_leads',
  deals: 'lnm_deals',
  tasks: 'lnm_tasks',
  activities: 'lnm_activities',
  settings: 'lnm_settings',
  seeded: 'lnm_seeded',
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

// ===== DB ACCESSORS =====
export function getLeads(): Lead[] {
  return getStore<Lead>(STORAGE_KEYS.leads);
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
export type { Lead, Deal, Task, Activity, Setting };
