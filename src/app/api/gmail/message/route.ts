import { NextResponse } from 'next/server';
import { getMessage, markAsRead, trashMessage } from '@/lib/gmail';

export const dynamic = 'force-static';

/**
 * GET /api/gmail/message?id=xxx — Get a message
 * POST /api/gmail/message { action: 'read'|'trash', id: 'xxx' } — Modify a message
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    const message = await getMessage(id);
    return NextResponse.json({ message });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Get failed';
    console.error('Gmail message error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.id) {
      return NextResponse.json({ error: 'Missing id field' }, { status: 400 });
    }

    if (data.action === 'read') {
      await markAsRead(data.id);
      return NextResponse.json({ success: true });
    }

    if (data.action === 'trash') {
      await trashMessage(data.id);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Action failed';
    console.error('Gmail action error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
