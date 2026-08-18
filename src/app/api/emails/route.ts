export const dynamic = "force-static";
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { outreachEmails } from '@/lib/schema';
import { desc, eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: Request) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get('lead_id');

    let emails;
    if (leadId) {
      emails = db.select().from(outreachEmails)
        .where(eq(outreachEmails.lead_id, leadId))
        .orderBy(desc(outreachEmails.created_at))
        .all();
    } else {
      emails = db.select().from(outreachEmails)
        .orderBy(desc(outreachEmails.created_at))
        .all();
    }

    return NextResponse.json(emails);
  } catch (error) {
    console.error('Failed to fetch emails:', error);
    return NextResponse.json({ error: 'Failed to fetch emails' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();
    const now = new Date().toISOString();

    const newEmail = {
      id: uuidv4(),
      lead_id: body.lead_id,
      lead_name: body.lead_name || '',
      subject: body.subject,
      body: body.body,
      tone: body.tone || 'professional',
      status: body.status || 'draft',
      created_at: now,
    };

    db.insert(outreachEmails).values(newEmail).run();

    return NextResponse.json(newEmail, { status: 201 });
  } catch (error) {
    console.error('Failed to create email:', error);
    return NextResponse.json({ error: 'Failed to create email' }, { status: 500 });
  }
}
