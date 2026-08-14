import { getDb, uuidv4 } from './db';

export function seedDemoData() {
  const db = getDb();
  
  // Check if data already exists
  const leadCount = db.prepare('SELECT COUNT(*) as count FROM leads').get() as { count: number };
  if (leadCount.count > 0) return;

  // Create a default user
  const userId = uuidv4();
  db.prepare(`
    INSERT OR IGNORE INTO users (id, email, name, role) VALUES (?, ?, ?, ?)
  `).run(userId, 'admin@soetech.com', 'Admin', 'admin');

  // Sample leads
  const leads = [
    { name: 'Marcus Chen', company: 'TechFlow Solutions', email: 'marcus@techflow.com', phone: '555-0101', website: 'https://techflow.com', city: 'Austin', state: 'TX', industry: 'SaaS', source: 'linkedin', status: 'outreach', score: 85 },
    { name: 'Sarah Williams', company: 'GreenLeaf Farms', email: 'sarah@greenleaf.com', phone: '555-0102', website: 'https://greenleaf.com', city: 'Portland', state: 'OR', industry: 'Agriculture', source: 'website', status: 'proposal', score: 72 },
    { name: 'James Rodriguez', company: 'Urban Fitness', email: 'james@urbanfitness.com', phone: '555-0103', website: 'https://urbanfitness.com', city: 'Miami', state: 'FL', industry: 'Fitness', source: 'referral', status: 'new', score: 45 },
    { name: 'Emily Zhang', company: 'CloudNine Data', email: 'emily@cloudnine.io', phone: '555-0104', website: 'https://cloudnine.io', city: 'San Francisco', state: 'CA', industry: 'Data Analytics', source: 'cold', status: 'researched', score: 91 },
    { name: 'David Park', company: 'NovaTech Labs', email: 'david@novatech.com', phone: '555-0105', website: 'https://novatech.com', city: 'Seattle', state: 'WA', industry: 'Healthcare', source: 'inbound', status: 'active_deal', score: 78 },
    { name: 'Lisa Thompson', company: 'BrightPath Education', email: 'lisa@brightpath.edu', phone: '555-0106', website: 'https://brightpath.edu', city: 'Chicago', state: 'IL', industry: 'Education', source: 'linkedin', status: 'closed_won', score: 88 },
    { name: 'Robert Kim', company: 'SwiftDelivery', email: 'robert@swiftdelivery.com', phone: '555-0107', website: 'https://swiftdelivery.com', city: 'Denver', state: 'CO', industry: 'Logistics', source: 'import', status: 'new', score: 32 },
    { name: 'Amanda Foster', company: 'CreativeMinds Agency', email: 'amanda@creativeminds.com', phone: '555-0108', website: 'https://creativeminds.com', city: 'Nashville', state: 'TN', industry: 'Marketing', source: 'website', status: 'outreach', score: 67 },
  ];

  const leadIds: string[] = [];
  for (const lead of leads) {
    const id = uuidv4();
    leadIds.push(id);
    db.prepare(`
      INSERT INTO leads (id, name, company, email, phone, website, city, state, industry, source, status, score)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, lead.name, lead.company, lead.email, lead.phone, lead.website, lead.city, lead.state, lead.industry, lead.source, lead.status, lead.score);
  }

  // Sample deals
  const deals = [
    { leadId: leadIds[4], title: 'NovaTech AI Integration', value: 24000, progress: 75, status: 'active' },
    { leadId: leadIds[5], title: 'BrightPath LMS Build', value: 45000, progress: 100, status: 'completed' },
    { leadId: leadIds[0], title: 'TechFlow Chatbot Package', value: 299, progress: 30, status: 'active' },
  ];

  for (const deal of deals) {
    db.prepare(`
      INSERT INTO deals (id, lead_id, title, value, progress, status) VALUES (?, ?, ?, ?, ?, ?)
    `).run(uuidv4(), deal.leadId, deal.title, deal.value, deal.progress, deal.status);
  }

  // Sample tasks
  const tasks = [
    { title: 'Send follow-up email to Marcus Chen', description: 'Follow up on the chatbot proposal sent last week', status: 'pending', priority: 'high', leadId: leadIds[0] },
    { title: 'Prepare proposal for CloudNine Data', description: 'Custom AI research package proposal', status: 'in_progress', priority: 'high', leadId: leadIds[3] },
    { title: 'Schedule demo with Sarah Williams', description: 'Demo the website + AI bundle', status: 'pending', priority: 'medium', leadId: leadIds[1] },
    { title: 'Update CRM settings', description: 'Configure new pricing tiers', status: 'completed', priority: 'low', leadId: null },
    { title: 'Research Robert Kim\'s company', description: 'Deep dive into SwiftDelivery tech stack', status: 'pending', priority: 'medium', leadId: leadIds[6] },
  ];

  for (const task of tasks) {
    db.prepare(`
      INSERT INTO tasks (id, title, description, status, priority, lead_id) VALUES (?, ?, ?, ?, ?, ?)
    `).run(uuidv4(), task.title, task.description, task.status, task.priority, task.leadId);
  }

  // Sample activity log
  const activities = [
    { entityType: 'lead', entityId: leadIds[0], action: 'created', details: 'New lead added from LinkedIn' },
    { entityType: 'lead', entityId: leadIds[1], action: 'status_changed', details: 'Status changed to proposal' },
    { entityType: 'deal', entityId: leadIds[4], action: 'created', details: 'Deal created: NovaTech AI Integration ($24,000)' },
    { entityType: 'task', entityId: null, action: 'completed', details: 'Task completed: Update CRM settings' },
    { entityType: 'lead', entityId: leadIds[3], action: 'scored', details: 'Lead scored 91/100 — high priority' },
  ];

  for (const activity of activities) {
    db.prepare(`
      INSERT INTO activity_log (id, entity_type, entity_id, action, details, user_id) VALUES (?, ?, ?, ?, ?, ?)
    `).run(uuidv4(), activity.entityType, activity.entityId, activity.action, activity.details, userId);
  }
}
