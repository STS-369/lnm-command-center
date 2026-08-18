import { NextResponse } from 'next/server';
import { uploadFile, ensureCrmFolders, createClientFolders } from '@/lib/google-drive';

export const dynamic = 'force-dynamic';

/**
 * POST /api/drive/upload
 * Upload a file to Google Drive.
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folderId = formData.get('folderId') as string | null;
    const clientName = formData.get('clientName') as string | null;
    const category = (formData.get('category') as string) || 'proposals';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    let targetFolderId = folderId;

    if (!targetFolderId && clientName) {
      const structure = await createClientFolders(clientName);
      const categoryMap: Record<string, string> = {
        proposals: structure.folders.proposals,
        contracts: structure.folders.contracts,
        invoices: structure.folders.invoices,
        research: structure.folders.research,
      };
      targetFolderId = categoryMap[category] || structure.folders.proposals;
    }

    if (!targetFolderId) {
      const structure = await ensureCrmFolders();
      targetFolderId = structure.rootFolderId;
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const uploadedFile = await uploadFile({
      name: file.name,
      mimeType: file.type || 'application/octet-stream',
      buffer: uint8Array,
      parentId: targetFolderId,
    });

    return NextResponse.json({ success: true, file: uploadedFile });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    console.error('Drive upload error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
