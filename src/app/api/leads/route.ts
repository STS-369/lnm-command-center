import { NextResponse } from 'next/server';
import { getDb, uuidv4 } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = getDb();
  const leads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
  return NextResponse.json(leads);
}

export async function POST(request: Request) {
  const body = await request.json();
  const db = getDb();
  const id = uuidv4();
  
  db.prepare(`
    INSERT INTO leads (id, name, company, email, phone, website, city, state, industry, source, status, score)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    body.name,
    body.company || null,
    body.email || null,
    body.phone || null,
    body.website || null,
    body.city || null,
    body.state || null,
    body.industry || null,
    body.source || 'manual',
    body.status || 'new',
    body.score || 0
  );

  // Log activity
  db.prepare(`
    INSERT INTO activity_log (id, entity_type, entity_id, action, details) VALUES (?, ?, ?, ?, ?)
  `).run(uuidv4(), 'lead', id, 'created', `New lead added: ${body.name} (${body.company || 'Unknown'})`);

  return NextResponse.json({ id, ...body }, { status: 201 });
}
