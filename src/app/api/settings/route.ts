import { NextResponse } from 'next/server';
import { getDb, uuidv4 } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = getDb();
  const settings = db.prepare('SELECT * FROM settings ORDER BY key').all();
  return NextResponse.json(settings);
}

export async function POST(request: Request) {
  const body = await request.json();
  const db = getDb();
  
  // Upsert settings
  const stmt = db.prepare(`
    INSERT INTO settings (id, key, value, updated_at) VALUES (?, ?, ?, datetime('now'))
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')
  `);

  for (const [key, value] of Object.entries(body)) {
    stmt.run(uuidv4(), key, value as string);
  }

  return NextResponse.json({ success: true });
}
