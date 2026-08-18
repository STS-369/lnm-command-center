import { NextResponse } from 'next/server';
import { ensureCrmFolders, createClientFolders } from '@/lib/google-drive';

export const dynamic = 'force-dynamic';

/**
 * POST /api/drive/setup
 * Body: { clientName?: string }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    if (body.clientName) {
      const structure = await createClientFolders(body.clientName);
      return NextResponse.json({ success: true, structure });
    }

    const structure = await ensureCrmFolders();
    return NextResponse.json({ success: true, structure });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Setup failed';
    console.error('Drive setup error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
