export const dynamic = "force-static";
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { activityLog } from '@/lib/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const db = getDb();
    const activities = db.select().from(activityLog).orderBy(desc(activityLog.created_at)).all();
    return NextResponse.json(activities);
  } catch (error) {
    console.error('Failed to fetch activities:', error);
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
}
