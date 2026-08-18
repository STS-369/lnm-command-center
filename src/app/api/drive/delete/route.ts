import { NextResponse } from 'next/server';
import { deleteFile } from '@/lib/google-drive';

export const dynamic = 'force-dynamic';

/**
 * DELETE /api/drive/delete?fileId=xxx
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('fileId');

    if (!fileId) {
      return NextResponse.json({ error: 'fileId is required' }, { status: 400 });
    }

    await deleteFile(fileId);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Delete failed';
    console.error('Drive delete error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
