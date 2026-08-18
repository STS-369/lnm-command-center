import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// ===== LEADS =====
export const leads = sqliteTable('leads', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  company: text('company'),
  email: text('email'),
  phone: text('phone'),
  website: text('website'),
  city: text('city'),
  state: text('state'),
  industry: text('industry'),
  source: text('source').default('manual'),
  status: text('status').default('new'),
  score: real('score').default(0),
  rating: real('rating'),
  user_ratings_total: integer('user_ratings_total'),
  address: text('address'),
  category: text('category'),
  website_status: text('website_status'),
  score_breakdown: text('score_breakdown'),
  research_brief: text('research_brief'),
  validation_status: text('validation_status').default('pending'),
  validation_score: integer('validation_score').default(0),
  reachability_score: integer('reachability_score').default(0),
  created_at: text('created_at').default(new Date().toISOString()),
  updated_at: text('updated_at').default(new Date().toISOString()),
});

// ===== OUTREACH EMAILS =====
export const outreachEmails = sqliteTable('outreach_emails', {
  id: text('id').primaryKey(),
  lead_id: text('lead_id').references(() => leads.id),
  lead_name: text('lead_name'),
  subject: text('subject'),
  body: text('body'),
  tone: text('tone').default('professional'),
  status: text('status').default('draft'),
  approved_by: text('approved_by'),
  sent_at: text('sent_at'),
  opened_at: text('opened_at'),
  created_at: text('created_at').default(new Date().toISOString()),
});

// ===== DEALS =====
export const deals = sqliteTable('deals', {
  id: text('id').primaryKey(),
  lead_id: text('lead_id').references(() => leads.id),
  title: text('title'),
  value: real('value').default(0),
  progress: integer('progress').default(0),
  status: text('status').default('active'),
  kickoff_date: text('kickoff_date'),
  target_date: text('target_date'),
  created_at: text('created_at').default(new Date().toISOString()),
});

// ===== TASKS =====
export const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status').default('pending'),
  priority: text('priority').default('medium'),
  owner_type: text('owner_type'),
  owner_id: text('owner_id'),
  lead_id: text('lead_id').references(() => leads.id),
  deadline: text('deadline'),
  created_at: text('created_at').default(new Date().toISOString()),
});

// ===== ACTIVITY LOG =====
export const activityLog = sqliteTable('activity_log', {
  id: text('id').primaryKey(),
  entity_type: text('entity_type'),
  entity_id: text('entity_id'),
  action: text('action'),
  details: text('details'),
  user_id: text('user_id'),
  created_at: text('created_at').default(new Date().toISOString()),
});

// ===== SETTINGS =====
export const settings = sqliteTable('settings', {
  id: text('id').primaryKey(),
  key: text('key').unique().notNull(),
  value: text('value'),
  updated_at: text('updated_at').default(new Date().toISOString()),
});

// ===== USERS =====
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name').notNull(),
  role: text('role').default('admin'),
  avatar: text('avatar'),
  created_at: text('created_at').default(new Date().toISOString()),
});

// ===== RESEARCH =====
export const research = sqliteTable('research', {
  id: text('id').primaryKey(),
  lead_id: text('lead_id').references(() => leads.id),
  section_name: text('section_name'),
  content: text('content'),
  confidence_score: real('confidence_score').default(0),
  created_at: text('created_at').default(new Date().toISOString()),
});

// ===== PROPOSALS =====
export const proposals = sqliteTable('proposals', {
  id: text('id').primaryKey(),
  lead_id: text('lead_id').references(() => leads.id),
  title: text('title'),
  content: text('content'),
  pricing_tier: text('pricing_tier'),
  status: text('status').default('draft'),
  approved_by: text('approved_by'),
  sent_at: text('sent_at'),
  created_at: text('created_at').default(new Date().toISOString()),
});

// ===== INVOICES =====
export const invoices = sqliteTable('invoices', {
  id: text('id').primaryKey(),
  deal_id: text('deal_id').references(() => deals.id),
  invoice_number: text('invoice_number').unique(),
  amount: real('amount').default(0),
  status: text('status').default('draft'),
  due_date: text('due_date'),
  created_at: text('created_at').default(new Date().toISOString()),
});

// ===== TYPE EXPORTS =====
export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type OutreachEmail = typeof outreachEmails.$inferSelect;
export type NewOutreachEmail = typeof outreachEmails.$inferInsert;
export type Deal = typeof deals.$inferSelect;
export type NewDeal = typeof deals.$inferInsert;
export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
export type Activity = typeof activityLog.$inferSelect;
export type NewActivity = typeof activityLog.$inferInsert;
export type Setting = typeof settings.$inferSelect;
export type NewSetting = typeof settings.$inferInsert;
export type User = typeof users.$inferSelect;
export type Research = typeof research.$inferSelect;
export type Proposal = typeof proposals.$inferSelect;
export type Invoice = typeof invoices.$inferSelect;
