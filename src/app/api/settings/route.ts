export const dynamic = "force-static";
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { settings } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const db = getDb();
    const allSettings = db.select().from(settings).all();
    return NextResponse.json(allSettings);
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();
    const now = new Date().toISOString();

    const entries = Object.entries(body) as [string, string][];
    for (const [key, value] of entries) {
      const existing = db.select().from(settings).where(eq(settings.key, key)).get();
      if (existing) {
        db.update(settings).set({ value, updated_at: now }).where(eq(settings.key, key)).run();
      } else {
        db.insert(settings).values({ id: uuidv4(), key, value, updated_at: now }).run();
      }
    }

    const allSettings = db.select().from(settings).all();
    return NextResponse.json(allSettings);
  } catch (error) {
    console.error('Failed to save settings:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
