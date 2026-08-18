import { NextResponse } from 'next/server';
import { downloadFile } from '@/lib/google-drive';

export const dynamic = 'force-dynamic';

/**
 * GET /api/drive/download?fileId=xxx
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('fileId');

    if (!fileId) {
      return NextResponse.json({ error: 'fileId is required' }, { status: 400 });
    }

    const { content, name, mimeType } = await downloadFile(fileId);

    return new NextResponse(new Uint8Array(content), {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${encodeURIComponent(name)}"`,
        'Content-Length': content.length.toString(),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Download failed';
    console.error('Drive download error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
