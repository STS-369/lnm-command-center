import { NextResponse } from 'next/server';
import { listMessages, getProfile } from '@/lib/gmail';

export const dynamic = 'force-static';

/**
 * GET /api/gmail/list
 * Query params: query, maxResults, pageToken, type (list|profile)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'list';

    if (type === 'profile') {
      const profile = await getProfile();
      return NextResponse.json({ profile });
    }

    const query = searchParams.get('query') || undefined;
    const maxResults = parseInt(searchParams.get('maxResults') || '20', 10);
    const pageToken = searchParams.get('pageToken') || undefined;

    const result = await listMessages({ query, maxResults, pageToken });
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'List failed';
    console.error('Gmail list error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
