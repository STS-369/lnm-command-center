/**
 * Google Drive API utility using existing OAuth token.
 * Server-side only — reads from ~/.hermes/google_token.json.
 */

import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

const TOKEN_PATH = path.join(
  process.env.HOME || '/root',
  '.hermes',
  'google_token.json'
);

interface TokenData {
  token?: string;
  refresh_token?: string;
  token_uri?: string;
  client_id?: string;
  client_secret?: string;
  scopes?: string[];
  expiry?: string;
  type?: string;
}

function loadToken(): TokenData {
  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error(`Google token not found at ${TOKEN_PATH}`);
  }
  return JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedDrive: any = null;

export async function getDriveClient() {
  if (cachedDrive) return cachedDrive;

  const tokenData = loadToken();
  if (!tokenData.client_id || !tokenData.client_secret) {
    throw new Error('Token missing client_id or client_secret');
  }

  const auth = new google.auth.OAuth2(
    tokenData.client_id,
    tokenData.client_secret
  );

  auth.setCredentials({
    access_token: tokenData.token,
    refresh_token: tokenData.refresh_token,
    scope: tokenData.scopes?.join(' '),
    token_type: 'Bearer',
    expiry_date: tokenData.expiry ? new Date(tokenData.expiry).getTime() : undefined,
  });

  // Refresh if expired
  if (tokenData.expiry && new Date(tokenData.expiry) < new Date()) {
    try {
      const { credentials } = await auth.refreshAccessToken();
      auth.setCredentials(credentials);
      const updatedToken: TokenData = {
        ...tokenData,
        token: credentials.access_token || tokenData.token,
        expiry: credentials.expiry_date
          ? new Date(credentials.expiry_date).toISOString()
          : tokenData.expiry,
      };
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(updatedToken, null, 2));
    } catch (err) {
      console.error('Token refresh failed:', err);
    }
  }

  cachedDrive = google.drive({ version: 'v3', auth });
  return cachedDrive;
}

// ===== Types =====

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  createdTime?: string;
  modifiedTime?: string;
  webViewLink?: string;
  parents?: string[];
}

export interface FolderStructure {
  rootFolderId: string;
  folders: {
    proposals: string;
    contracts: string;
    invoices: string;
    research: string;
  };
}

// ===== Internal Helpers =====

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function findOrCreateFolder(drive: any, name: string, parentId: string): Promise<string> {
  const response = await drive.files.list({
    q: `name='${name}' and mimeType='application/vnd.google-apps.folder' and '${parentId}' in parents and trashed=false`,
    fields: 'files(id, name)',
    spaces: 'drive',
  });

  if (response.data.files && response.data.files.length > 0) {
    return response.data.files[0].id;
  }

  const folder = await drive.files.create({
    requestBody: {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentId],
    },
    fields: 'id',
  });

  return folder.data.id;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapFiles(data: any): DriveFile[] {
  return (data.files || []).map((f: Record<string, unknown>) => ({
    id: f.id as string,
    name: f.name as string,
    mimeType: f.mimeType as string,
    size: (f.size as string) || undefined,
    createdTime: (f.createdTime as string) || undefined,
    modifiedTime: (f.modifiedTime as string) || undefined,
    webViewLink: (f.webViewLink as string) || undefined,
    parents: (f.parents as string[]) || undefined,
  }));
}

// ===== Public API =====

export async function ensureCrmFolders(): Promise<FolderStructure> {
  const drive = await getDriveClient();
  const rootId = await findOrCreateFolder(drive, 'SOETech CRM', 'root');
  const proposals = await findOrCreateFolder(drive, '01-Proposals', rootId);
  const contracts = await findOrCreateFolder(drive, '02-Contracts', rootId);
  const invoices = await findOrCreateFolder(drive, '03-Invoices', rootId);
  const research = await findOrCreateFolder(drive, '04-Research', rootId);
  return { rootFolderId: rootId, folders: { proposals, contracts, invoices, research } };
}

export async function createClientFolders(clientName: string): Promise<FolderStructure> {
  const drive = await getDriveClient();
  const crmRoot = await ensureCrmFolders();
  const clientId = await findOrCreateFolder(drive, clientName, crmRoot.rootFolderId);
  const proposals = await findOrCreateFolder(drive, '01-Proposals', clientId);
  const contracts = await findOrCreateFolder(drive, '02-Contracts', clientId);
  const invoices = await findOrCreateFolder(drive, '03-Invoices', clientId);
  const research = await findOrCreateFolder(drive, '04-Research', clientId);
  return { rootFolderId: clientId, folders: { proposals, contracts, invoices, research } };
}

export async function uploadFile(params: {
  name: string;
  mimeType: string;
  buffer: Buffer | Uint8Array;
  parentId: string;
}): Promise<DriveFile> {
  const drive = await getDriveClient();
  const response = await drive.files.create({
    requestBody: { name: params.name, parents: [params.parentId] },
    media: { mimeType: params.mimeType, body: Buffer.from(params.buffer) },
    fields: 'id, name, mimeType, size, createdTime, modifiedTime, webViewLink',
  });
  return {
    id: response.data.id,
    name: response.data.name,
    mimeType: response.data.mimeType,
    size: response.data.size || undefined,
    createdTime: response.data.createdTime || undefined,
    modifiedTime: response.data.modifiedTime || undefined,
    webViewLink: response.data.webViewLink || undefined,
  };
}

export async function listFiles(params: {
  folderId?: string;
  query?: string;
  pageSize?: number;
  pageToken?: string;
}): Promise<{ files: DriveFile[]; nextPageToken?: string }> {
  const drive = await getDriveClient();
  let q = 'trashed = false';
  if (params.folderId) q += ` and '${params.folderId}' in parents`;
  if (params.query) q += ` and name contains '${params.query}'`;

  const response = await drive.files.list({
    q,
    pageSize: params.pageSize || 50,
    pageToken: params.pageToken,
    fields: 'nextPageToken, files(id, name, mimeType, size, createdTime, modifiedTime, webViewLink, parents)',
    orderBy: 'modifiedTime desc',
  });

  return {
    files: mapFiles(response.data),
    nextPageToken: response.data.nextPageToken || undefined,
  };
}

export async function downloadFile(fileId: string): Promise<{ content: Buffer; name: string; mimeType: string }> {
  const drive = await getDriveClient();
  const meta = await drive.files.get({ fileId, fields: 'name, mimeType' });
  const response = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'arraybuffer' });
  return {
    content: Buffer.from(response.data as ArrayBuffer),
    name: meta.data.name,
    mimeType: meta.data.mimeType,
  };
}

export async function deleteFile(fileId: string): Promise<void> {
  const drive = await getDriveClient();
  await drive.files.delete({ fileId });
}

export async function searchFiles(query: string, pageSize?: number): Promise<DriveFile[]> {
  const drive = await getDriveClient();
  const response = await drive.files.list({
    q: `name contains '${query}' and trashed = false`,
    pageSize: pageSize || 20,
    fields: 'files(id, name, mimeType, size, createdTime, modifiedTime, webViewLink)',
    orderBy: 'relevance desc',
  });
  return mapFiles(response.data);
}

export async function listFolders(parentId?: string): Promise<DriveFile[]> {
  const drive = await getDriveClient();
  const q = parentId
    ? `'${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`
    : "mimeType='application/vnd.google-apps.folder' and trashed=false";

  const response = await drive.files.list({
    q,
    fields: 'files(id, name, mimeType, createdTime, modifiedTime)',
    orderBy: 'name',
  });
  return mapFiles(response.data);
}
