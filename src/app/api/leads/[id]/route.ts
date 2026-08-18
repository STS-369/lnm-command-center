import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { leads, outreachEmails, activityLog } from '@/lib/schema';
import { eq, sql } from 'drizzle-orm';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();
    const lead = db.select().from(leads).where(eq(leads.id, id)).get();

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Get email stats
    const emailCount = db
      .select({ count: sql<number>`count(*)` })
      .from(outreachEmails)
      .where(eq(outreachEmails.lead_id, id))
      .get();

    const lastEmail = db
      .select()
      .from(outreachEmails)
      .where(eq(outreachEmails.lead_id, id))
      .orderBy(sql`${outreachEmails.created_at} DESC`)
      .limit(1)
      .get();

    return NextResponse.json({
      ...lead,
      email_count: emailCount?.count || 0,
      last_email_at: lastEmail?.created_at || null,
    });
  } catch (error) {
    console.error('Failed to fetch lead:', error);
    return NextResponse.json({ error: 'Failed to fetch lead' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const db = getDb();
    const now = new Date().toISOString();

    const existing = db.select().from(leads).where(eq(leads.id, id)).get();
    if (!existing) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    db.update(leads)
      .set({ ...body, updated_at: now })
      .where(eq(leads.id, id))
      .run();

    const updated = db.select().from(leads).where(eq(leads.id, id)).get();

    // Log status change activity
    if (body.status && body.status !== existing.status) {
      db.insert(activityLog).values({
        id: crypto.randomUUID(),
        entity_type: 'lead',
        entity_id: id,
        action: 'status_changed',
        details: `Status changed from ${existing.status} to ${body.status}`,
        user_id: '',
        created_at: now,
      }).run();
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update lead:', error);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();

    const existing = db.select().from(leads).where(eq(leads.id, id)).get();
    if (!existing) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    db.delete(leads).where(eq(leads.id, id)).run();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete lead:', error);
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
