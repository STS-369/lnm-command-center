/**
 * Gmail API utility using existing OAuth token.
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
let cachedGmail: any = null;

export async function getGmailClient() {
  if (cachedGmail) return cachedGmail;

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

  cachedGmail = google.gmail({ version: 'v1', auth });
  return cachedGmail;
}

// ===== Types =====

export interface EmailMessage {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  html?: string;
  replyTo?: string;
  inReplyTo?: string;
  references?: string;
}

export interface SentEmail {
  id: string;
  threadId: string;
  labelIds: string[];
}

export interface GmailProfile {
  emailAddress: string;
  messagesTotal: number;
  threadsTotal: number;
  historyId: string;
}

export interface GmailMessage {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  subject?: string;
  from?: string;
  to?: string;
  date?: string;
  hasAttachment?: boolean;
}

// ===== Helpers =====

function buildMimeMessage(params: {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  html?: string;
  replyTo?: string;
  inReplyTo?: string;
  references?: string;
}): string {
  const boundary = `boundary_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const from = 'SOETech AI <noreply@soetechllc.com>';

  const headers: string[] = [
    `From: ${from}`,
    `To: ${params.to.join(', ')}`,
  ];

  if (params.cc && params.cc.length > 0) {
    headers.push(`Cc: ${params.cc.join(', ')}`);
  }
  if (params.bcc && params.bcc.length > 0) {
    headers.push(`Bcc: ${params.bcc.join(', ')}`);
  }
  if (params.replyTo) {
    headers.push(`Reply-To: ${params.replyTo}`);
  }
  if (params.inReplyTo) {
    headers.push(`In-Reply-To: ${params.inReplyTo}`);
    headers.push(`References: ${params.references || params.inReplyTo}`);
  }

  headers.push(
    `Subject: ${params.subject}`,
    `MIME-Version: 1.0`,
    `Date: ${new Date().toUTCString()}`,
  );

  if (params.html) {
    headers.push(
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      '',
      `--${boundary}`,
      `Content-Type: text/plain; charset=utf-8`,
      '',
      params.body,
      '',
      `--${boundary}`,
      `Content-Type: text/html; charset=utf-8`,
      '',
      params.html,
      '',
      `--${boundary}--`,
    );
  } else {
    headers.push(
      `Content-Type: text/plain; charset=utf-8`,
      '',
      params.body,
    );
  }

  return headers.join('\r\n');
}

// ===== Public API =====

/**
 * Get the authenticated user's Gmail profile.
 */
export async function getProfile(): Promise<GmailProfile> {
  const gmail = await getGmailClient();
  const res = await gmail.users.getProfile({ userId: 'me' });
  return res.data;
}

/**
 * Send an email.
 */
export async function sendEmail(params: EmailMessage): Promise<SentEmail> {
  const gmail = await getGmailClient();
  const mimeMessage = buildMimeMessage(params);
  const encodedMessage = Buffer.from(mimeMessage)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
      threadId: params.inReplyTo ? undefined : undefined,
    },
  });

  return {
    id: res.data.id,
    threadId: res.data.threadId,
    labelIds: res.data.labelIds || [],
  };
}

/**
 * List recent emails.
 */
export async function listMessages(params: {
  query?: string;
  maxResults?: number;
  pageToken?: string;
  labelIds?: string[];
}): Promise<{ messages: GmailMessage[]; nextPageToken?: string; totalEstimate?: number }> {
  const gmail = await getGmailClient();

  const listRes = await gmail.users.messages.list({
    userId: 'me',
    q: params.query,
    maxResults: params.maxResults || 20,
    pageToken: params.pageToken,
    labelIds: params.labelIds,
  });

  const messages = listRes.data.messages || [];
  const detailedMessages: GmailMessage[] = [];

  for (const msg of messages.slice(0, 20)) {
    try {
      const msgRes = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id,
        format: 'metadata',
        metadataHeaders: ['Subject', 'From', 'To', 'Date'],
      });

      const headers = msgRes.data.payload?.headers || [];
      const getHeader = (name: string) =>
        headers.find((h: { name: string }) => h.name === name)?.value || '';

      detailedMessages.push({
        id: msgRes.data.id,
        threadId: msgRes.data.threadId,
        labelIds: msgRes.data.labelIds || [],
        snippet: msgRes.data.snippet || '',
        subject: getHeader('Subject'),
        from: getHeader('From'),
        to: getHeader('To'),
        date: getHeader('Date'),
        hasAttachment: (msgRes.data.payload?.parts || []).length > 1,
      });
    } catch {
      // Skip messages we can't access
    }
  }

  return {
    messages: detailedMessages,
    nextPageToken: listRes.data.nextPageToken || undefined,
    totalEstimate: listRes.data.resultSizeEstimate || 0,
  };
}

/**
 * Get a specific email message.
 */
export async function getMessage(messageId: string): Promise<{
  id: string;
  threadId: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  body: string;
  htmlBody?: string;
  snippet: string;
  labelIds: string[];
}> {
  const gmail = await getGmailClient();

  const res = await gmail.users.messages.get({
    userId: 'me',
    id: messageId,
    format: 'full',
  });

  const headers = res.data.payload?.headers || [];
  const getHeader = (name: string) =>
    headers.find((h: { name: string }) => h.name === name)?.value || '';

  // Extract body
  let body = '';
  let htmlBody: string | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function extractParts(payload: any) {
    const parts = payload.parts;
    if (parts) {
      for (const part of parts) {
        if (part.mimeType === 'text/plain' && part.body) {
          body = Buffer.from(part.body.data, 'base64').toString('utf-8');
        } else if (part.mimeType === 'text/html' && part.body) {
          htmlBody = Buffer.from(part.body.data, 'base64').toString('utf-8');
        } else if (part.parts) {
          extractParts(part);
        }
      }
    } else if (payload.body?.data) {
      body = Buffer.from(payload.body.data, 'base64').toString('utf-8');
    }
  }

  extractParts(res.data.payload);

  return {
    id: res.data.id,
    threadId: res.data.threadId,
    subject: getHeader('Subject'),
    from: getHeader('From'),
    to: getHeader('To'),
    date: getHeader('Date'),
    body,
    htmlBody,
    snippet: res.data.snippet || '',
    labelIds: res.data.labelIds || [],
  };
}

/**
 * Mark a message as read.
 */
export async function markAsRead(messageId: string): Promise<void> {
  const gmail = await getGmailClient();
  await gmail.users.messages.modify({
    userId: 'me',
    id: messageId,
    requestBody: {
      removeLabelIds: ['UNREAD'],
    },
  });
}

/**
 * Trash a message.
 */
export async function trashMessage(messageId: string): Promise<void> {
  const gmail = await getGmailClient();
  await gmail.users.messages.trash({
    userId: 'me',
    id: messageId,
  });
}
