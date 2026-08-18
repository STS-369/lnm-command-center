import { NextResponse } from 'next/server';
import { listFiles, listFolders, searchFiles } from '@/lib/google-drive';

export const dynamic = 'force-static';

/**
 * GET /api/drive/list
 * Query params: folderId, query, pageSize, pageToken, type (files|folders|search)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folderId = searchParams.get('folderId') || undefined;
    const query = searchParams.get('query') || undefined;
    const pageSize = parseInt(searchParams.get('pageSize') || '50', 10);
    const pageToken = searchParams.get('pageToken') || undefined;
    const type = searchParams.get('type') || 'files';

    if (type === 'folders') {
      const folders = await listFolders(folderId);
      return NextResponse.json({ files: folders, nextPageToken: undefined });
    }

    if (type === 'search' || query) {
      const files = await searchFiles(query || '', pageSize);
      return NextResponse.json({ files, nextPageToken: undefined });
    }

    const result = await listFiles({ folderId, pageSize, pageToken });
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'List failed';
    console.error('Drive list error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
