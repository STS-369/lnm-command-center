export const dynamic = "force-static";
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { leads } from '@/lib/schema';
import { desc, eq, sql } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const db = getDb();
    const allLeads = db.select().from(leads).orderBy(desc(leads.created_at)).all();
    return NextResponse.json(allLeads);
  } catch (error) {
    console.error('Failed to fetch leads:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();
    const now = new Date().toISOString();

    const newLead = {
      id: uuidv4(),
      name: body.name,
      company: body.company || '',
      email: body.email || '',
      phone: body.phone || '',
      website: body.website || '',
      city: body.city || '',
      state: body.state || '',
      industry: body.industry || '',
      source: body.source || 'manual',
      status: body.status || 'new',
      score: body.score || 0,
      rating: body.rating || null,
      user_ratings_total: body.user_ratings_total || null,
      address: body.address || null,
      category: body.category || null,
      website_status: body.website_status || null,
      created_at: now,
      updated_at: now,
    };

    db.insert(leads).values(newLead).run();

    // Log activity
    const { activityLog } = await import('@/lib/schema');
    db.insert(activityLog).values({
      id: uuidv4(),
      entity_type: 'lead',
      entity_id: newLead.id,
      action: 'created',
      details: `New lead added: ${newLead.name} (${newLead.company || 'Unknown'})`,
      user_id: '',
      created_at: now,
    }).run();

    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    console.error('Failed to create lead:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
