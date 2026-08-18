export const dynamic = "force-static";
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { deals } from '@/lib/schema';
import { desc, eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const db = getDb();
    const allDeals = db.select().from(deals).orderBy(desc(deals.created_at)).all();
    return NextResponse.json(allDeals);
  } catch (error) {
    console.error('Failed to fetch deals:', error);
    return NextResponse.json({ error: 'Failed to fetch deals' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();
    const now = new Date().toISOString();

    const newDeal = {
      id: uuidv4(),
      lead_id: body.lead_id,
      title: body.title,
      value: body.value || 0,
      progress: body.progress || 0,
      status: body.status || 'active',
      kickoff_date: body.kickoff_date || '',
      target_date: body.target_date || '',
      created_at: now,
    };

    db.insert(deals).values(newDeal).run();

    return NextResponse.json(newDeal, { status: 201 });
  } catch (error) {
    console.error('Failed to create deal:', error);
    return NextResponse.json({ error: 'Failed to create deal' }, { status: 500 });
  }
}
