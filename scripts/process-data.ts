#!/usr/bin/env npx tsx
/**
 * Process raw lead JSON and email markdown into TypeScript data for LNM Command Center.
 * Run: npx tsx scripts/process-data.ts
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const LEADS_JSON = '/root/ALICE_WORKSPACE/ALICE_LEADS_EXPANDED_REVALIDATED_2026-07-14.json';
const EMAILS_MD = '/root/ALICE_WORKSPACE/ALICE_100_SALES_EMAILS_2026-07-21.md';
const OUTPUT = path.join(__dirname, '..', 'src', 'lib', 'import-data.ts');

function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ===== Process Leads =====
interface RawLead {
  name: string;
  phone: string;
  website: string;
  rating: number;
  user_ratings_total: number;
  address: string;
  category: string;
  city: string;
  business_status: string;
  place_id: string;
  types: string[];
  website_reachable: boolean;
  website_status_code: number;
  website_error: string;
  website_last_checked: string;
  website_status: string;
}

interface ProcessedLead {
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
  rating: number;
  user_ratings_total: number;
  address: string;
  category: string;
  website_status: string;
  created_at: string;
  updated_at: string;
}

function extractState(address: string): string {
  const match = address.match(/,\s*([A-Z]{2})\s*\d{5}/);
  return match ? match[1] : '';
}

function computeScore(lead: RawLead): number {
  let score = 0;
  // Rating contributes up to 40 points
  if (lead.rating) score += Math.min(lead.rating / 5 * 40, 40);
  // Review count contributes up to 20 points
  if (lead.user_ratings_total) score += Math.min(lead.user_ratings_total / 50 * 20, 20);
  // Website reachable contributes 20 points
  if (lead.website_reachable) score += 20;
  // Business operational contributes 10 points
  if (lead.business_status === 'OPERATIONAL') score += 10;
  // Has website contributes 10 points
  if (lead.website) score += 10;
  return Math.round(Math.min(score, 100));
}

function processLeads(): ProcessedLead[] {
  const raw = JSON.parse(fs.readFileSync(LEADS_JSON, 'utf-8'));
  const rawLeads: RawLead[] = raw.leads;
  
  const seen = new Set<string>();
  const now = new Date().toISOString();
  
  const leads: ProcessedLead[] = [];
  
  for (const rl of rawLeads) {
    const dedupKey = `${rl.name.toLowerCase().trim()}|${rl.city.toLowerCase().trim()}`;
    if (seen.has(dedupKey)) continue;
    seen.add(dedupKey);
    
    const state = extractState(rl.address);
    
    leads.push({
      id: uuidv4(),
      name: rl.name,
      company: rl.name,
      email: '',
      phone: rl.phone || '',
      website: rl.website || '',
      city: rl.city,
      state,
      industry: rl.category || '',
      source: 'google_places',
      status: 'new',
      score: computeScore(rl),
      rating: rl.rating || 0,
      user_ratings_total: rl.user_ratings_total || 0,
      address: rl.address || '',
      category: rl.category || '',
      website_status: rl.website_status || 'UNKNOWN',
      created_at: now,
      updated_at: now,
    });
  }
  
  return leads;
}

// ===== Process Emails =====
interface ProcessedEmail {
  id: string;
  lead_id: string;
  lead_name: string;
  subject: string;
  body: string;
  status: string;
  created_at: string;
}

// Map of city section headers to state codes
const CITY_STATE_MAP: Record<string, { city: string; state: string }> = {
  'PALM DESERT, CA': { city: 'Palm Desert', state: 'CA' },
  'SPARKS, NV': { city: 'Sparks', state: 'NV' },
  'SAN ANTONIO, TX': { city: 'San Antonio', state: 'TX' },
};

function processEmails(leads: ProcessedLead[]): ProcessedEmail[] {
  const md = fs.readFileSync(EMAILS_MD, 'utf-8');

  // Build lead lookup by normalized name
  const leadByName = new Map<string, ProcessedLead>();
  for (const lead of leads) {
    leadByName.set(lead.name.toLowerCase().trim(), lead);
  }

  // Track which city section we're currently in
  let currentCity = '';
  let currentState = '';

  // Parse email sections
  const emailRegex = /^## Email (\d+): (.+)$/gm;
  const emails: ProcessedEmail[] = [];
  const now = new Date().toISOString();

  let match: RegExpExecArray | null;
  while ((match = emailRegex.exec(md)) !== null) {
    const emailNum = parseInt(match[1], 10);
    const businessName = match[2].trim();

    // Check if we've passed a city header before this email
    const precedingText = md.substring(0, match.index);
    const cityHeaders = Object.keys(CITY_STATE_MAP);
    for (const header of cityHeaders) {
      const headerRegex = new RegExp(`^# ${header.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'gm');
      let lastCityMatch: RegExpExecArray | null;
      while ((lastCityMatch = headerRegex.exec(precedingText)) !== null) {
        const cs = CITY_STATE_MAP[header];
        currentCity = cs.city;
        currentState = cs.state;
      }
    }

    // Find the section content (from this match to the next ## or --- or end)
    const sectionStart = match.index + match[0].length;
    const nextSection = md.indexOf('\n## Email ', sectionStart);
    const nextDivider = md.indexOf('\n---\n', sectionStart);
    const nextCityHeader = md.indexOf('\n# ', sectionStart);

    let sectionEnd = md.length;
    if (nextSection > 0) sectionEnd = Math.min(sectionEnd, nextSection);
    if (nextDivider > 0 && nextDivider < sectionEnd) sectionEnd = nextDivider;
    if (nextCityHeader > 0 && nextCityHeader < sectionEnd) sectionEnd = nextCityHeader;

    const section = md.substring(sectionStart, sectionEnd);

    // Extract subject
    const subjectMatch = section.match(/\*\*Subject:\*\*\s*(.+)/);
    const subject = subjectMatch ? subjectMatch[1].trim() : `Sales email for ${businessName}`;

    // Extract body (everything between Subject line and Research Citations)
    const bodyStart = section.indexOf('\n', section.indexOf('**Subject:**'));
    const citationsIdx = section.indexOf('### Research Citations');
    const bodyEnd = citationsIdx > 0 ? citationsIdx : section.length;
    const body = section.substring(bodyStart, bodyEnd).trim();

    // Match to lead
    const normalizedName = businessName.toLowerCase().trim();
    const lead = leadByName.get(normalizedName);

    let leadId = lead ? lead.id : '';

    // If no match, create a new lead from email context
    if (!lead) {
      const newLead: ProcessedLead = {
        id: uuidv4(),
        name: businessName,
        company: businessName,
        email: '',
        phone: '',
        website: '',
        city: currentCity,
        state: currentState,
        industry: '',
        source: 'email_outreach',
        status: 'new',
        score: 50,
        rating: 0,
        user_ratings_total: 0,
        address: '',
        category: '',
        website_status: 'UNKNOWN',
        created_at: now,
        updated_at: now,
      };
      leads.push(newLead);
      leadByName.set(normalizedName, newLead);
      leadId = newLead.id;
    }

    emails.push({
      id: uuidv4(),
      lead_id: leadId,
      lead_name: businessName,
      subject,
      body,
      status: 'draft',
      created_at: now,
    });
  }

  return emails;
}

// ===== Generate TypeScript =====
function generateTypeScript(leads: ProcessedLead[], emails: ProcessedEmail[]): string {
  const lines: string[] = [];
  
  lines.push('// AUTO-GENERATED by scripts/process-data.ts — DO NOT EDIT');
  lines.push(`// Generated: ${new Date().toISOString()}`);
  lines.push(`// Leads: ${leads.length} | Emails: ${emails.length}`);
  lines.push('');
  
  // Export leads
  lines.push('export interface ImportLead {');
  lines.push('  id: string;');
  lines.push('  name: string;');
  lines.push('  company: string;');
  lines.push('  email: string;');
  lines.push('  phone: string;');
  lines.push('  website: string;');
  lines.push('  city: string;');
  lines.push('  state: string;');
  lines.push('  industry: string;');
  lines.push('  source: string;');
  lines.push('  status: string;');
  lines.push('  score: number;');
  lines.push('  rating: number;');
  lines.push('  user_ratings_total: number;');
  lines.push('  address: string;');
  lines.push('  category: string;');
  lines.push('  website_status: string;');
  lines.push('  created_at: string;');
  lines.push('  updated_at: string;');
  lines.push('}');
  lines.push('');
  
  lines.push('export interface ImportEmail {');
  lines.push('  id: string;');
  lines.push('  lead_id: string;');
  lines.push('  lead_name: string;');
  lines.push('  subject: string;');
  lines.push('  body: string;');
  lines.push('  status: string;');
  lines.push('  created_at: string;');
  lines.push('}');
  lines.push('');
  
  // Leads data - compact but readable
  lines.push(`export const IMPORT_LEADS: ImportLead[] = ${JSON.stringify(leads, null, 0)};`);
  lines.push('');
  
  // Emails data - compact
  lines.push(`export const IMPORT_EMAILS: ImportEmail[] = ${JSON.stringify(emails, null, 0)};`);
  lines.push('');
  
  // Stats
  const matchedEmails = emails.filter(e => e.lead_id).length;
  lines.push(`export const IMPORT_STATS = {`);
  lines.push(`  totalLeads: ${leads.length},`);
  lines.push(`  totalEmails: ${emails.length},`);
  lines.push(`  matchedEmails: ${matchedEmails},`);
  lines.push(`  unmatchedEmails: ${emails.length - matchedEmails},`);
  lines.push(`  cities: ${JSON.stringify([...new Set(leads.map(l => l.city))])},`);
  lines.push(`  categories: ${JSON.stringify([...new Set(leads.map(l => l.category))])},`);
  lines.push(`};`);
  lines.push('');
  
  return lines.join('\n');
}

// ===== Main =====
console.log('📦 Processing lead data...');
const leads = processLeads();
console.log(`   ✅ ${leads.length} leads processed (deduplicated)`);

console.log('📧 Processing email drafts...');
const emails = processEmails(leads);
const matched = emails.filter(e => e.lead_id).length;
console.log(`   ✅ ${emails.length} emails parsed (${matched} matched to leads)`);

console.log('📝 Generating TypeScript data file...');
const ts = generateTypeScript(leads, emails);
fs.writeFileSync(OUTPUT, ts);
console.log(`   ✅ Written to ${OUTPUT}`);
console.log(`   📊 File size: ${(Buffer.byteLength(ts) / 1024).toFixed(1)} KB`);
