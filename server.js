/**
 * LNM Command Center — Backend API Server
 * Lightweight Express server for Google Drive + Gmail API routes.
 * Run alongside the GitHub Pages frontend.
 *
 * Usage: node server.js
 * Port: 3001 (configurable via PORT env)
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 3001;

// ===== Middleware =====
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// ===== Google Auth =====
const TOKEN_PATH = path.join(process.env.HOME || '/root', '.hermes', 'google_token.json');

function loadToken() {
  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error(`Google token not found at ${TOKEN_PATH}`);
  }
  return JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
}

let cachedAuth = null;
let cachedDrive = null;
let cachedGmail = null;

async function getAuth() {
  if (cachedAuth) return cachedAuth;
  const tokenData = loadToken();
  if (!tokenData.client_id || !tokenData.client_secret) {
    throw new Error('Token missing client_id or client_secret');
  }
  const auth = new google.auth.OAuth2(tokenData.client_id, tokenData.client_secret);
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
      const updated = {
        ...tokenData,
        token: credentials.access_token || tokenData.token,
        expiry: credentials.expiry_date ? new Date(credentials.expiry_date).toISOString() : tokenData.expiry,
      };
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(updated, null, 2));
    } catch (err) {
      console.error('Token refresh failed:', err.message);
    }
  }
  cachedAuth = auth;
  return auth;
}

async function getDrive() {
  if (cachedDrive) return cachedDrive;
  const auth = await getAuth();
  cachedDrive = google.drive({ version: 'v3', auth });
  return cachedDrive;
}

async function getGmail() {
  if (cachedGmail) return cachedGmail;
  const auth = await getAuth();
  cachedGmail = google.gmail({ version: 'v1', auth });
  return cachedGmail;
}

// ===== Helper: find or create folder =====
async function findOrCreateFolder(drive, name, parentId) {
  const res = await drive.files.list({
    q: `name='${name}' and mimeType='application/vnd.google-apps.folder' and '${parentId}' in parents and trashed=false`,
    fields: 'files(id, name)',
    spaces: 'drive',
  });
  if (res.data.files && res.data.files.length > 0) return res.data.files[0].id;
  const folder = await drive.files.create({
    requestBody: { name, mimeType: 'application/vnd.google-apps.folder', parents: [parentId] },
    fields: 'id',
  });
  return folder.data.id;
}

// ===== Drive Routes =====

// POST /api/drive/setup
app.post('/api/drive/setup', async (req, res) => {
  try {
    const drive = await getDrive();
    const rootId = await findOrCreateFolder(drive, 'SOETech CRM', 'root');
    const proposals = await findOrCreateFolder(drive, '01-Proposals', rootId);
    const contracts = await findOrCreateFolder(drive, '02-Contracts', rootId);
    const invoices = await findOrCreateFolder(drive, '03-Invoices', rootId);
    const research = await findOrCreateFolder(drive, '04-Research', rootId);
    const structure = { rootFolderId: rootId, folders: { proposals, contracts, invoices, research } };

    if (req.body.clientName) {
      const clientId = await findOrCreateFolder(drive, req.body.clientName, rootId);
      const cProposals = await findOrCreateFolder(drive, '01-Proposals', clientId);
      const cContracts = await findOrCreateFolder(drive, '02-Contracts', clientId);
      const cInvoices = await findOrCreateFolder(drive, '03-Invoices', clientId);
      const cResearch = await findOrCreateFolder(drive, '04-Research', clientId);
      structure.rootFolderId = clientId;
      structure.folders = { proposals: cProposals, contracts: cContracts, invoices: cInvoices, research: cResearch };
    }

    res.json({ success: true, structure });
  } catch (err) {
    console.error('Drive setup error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/drive/upload
app.post('/api/drive/upload', express.raw({ type: '*/*', limit: '50mb' }), async (req, res) => {
  // Note: For file uploads, the frontend should send multipart/form-data
  // This is a simplified version; the full version is in the Next.js routes
  try {
    const drive = await getDrive();
    const { fileName, mimeType, folderId } = req.query;

    const response = await drive.files.create({
      requestBody: { name: fileName, parents: folderId ? [folderId] : undefined },
      media: { mimeType: mimeType || 'application/octet-stream', body: req },
      fields: 'id, name, mimeType, size, createdTime, webViewLink',
    });

    res.json({ success: true, file: response.data });
  } catch (err) {
    console.error('Drive upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/drive/list
app.get('/api/drive/list', async (req, res) => {
  try {
    const drive = await getDrive();
    const { folderId, query, pageSize, pageToken, type } = req.query;

    if (type === 'folders') {
      const q = folderId
        ? `'${folderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`
        : "mimeType='application/vnd.google-apps.folder' and trashed=false";
      const response = await drive.files.list({
        q, fields: 'files(id, name, mimeType, createdTime, modifiedTime)', orderBy: 'name',
      });
      return res.json({ files: response.data.files || [], nextPageToken: undefined });
    }

    let q = 'trashed = false';
    if (folderId) q += ` and '${folderId}' in parents`;
    if (query) q += ` and name contains '${query}'`;

    const response = await drive.files.list({
      q, pageSize: parseInt(pageSize) || 50, pageToken,
      fields: 'nextPageToken, files(id, name, mimeType, size, createdTime, modifiedTime, webViewLink, parents)',
      orderBy: 'modifiedTime desc',
    });

    res.json({
      files: (response.data.files || []).map(f => ({
        id: f.id, name: f.name, mimeType: f.mimeType, size: f.size,
        createdTime: f.createdTime, modifiedTime: f.modifiedTime, webViewLink: f.webViewLink, parents: f.parents,
      })),
      nextPageToken: response.data.nextPageToken || undefined,
    });
  } catch (err) {
    console.error('Drive list error:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/drive/delete?id=xxx
app.delete('/api/drive/delete', async (req, res) => {
  try {
    const drive = await getDrive();
    await drive.files.delete({ fileId: req.query.id });
    res.json({ success: true });
  } catch (err) {
    console.error('Drive delete error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ===== Gmail Routes =====

// GET /api/gmail/list
app.get('/api/gmail/list', async (req, res) => {
  try {
    const gmail = await getGmail();
    const { query, maxResults, pageToken, type } = req.query;

    if (type === 'profile') {
      const profile = await gmail.users.getProfile({ userId: 'me' });
      return res.json({ profile: profile.data });
    }

    const listRes = await gmail.users.messages.list({
      userId: 'me', q: query, maxResults: parseInt(maxResults) || 20, pageToken,
    });

    const messages = (listRes.data.messages || []).slice(0, 20);
    const detailed = [];

    for (const msg of messages) {
      try {
        const msgRes = await gmail.users.messages.get({
          userId: 'me', id: msg.id, format: 'metadata',
          metadataHeaders: ['Subject', 'From', 'To', 'Date'],
        });
        const headers = msgRes.data.payload?.headers || [];
        const getH = (name) => headers.find(h => h.name === name)?.value || '';
        detailed.push({
          id: msgRes.data.id, threadId: msgRes.data.threadId,
          labelIds: msgRes.data.labelIds || [], snippet: msgRes.data.snippet || '',
          subject: getH('Subject'), from: getH('From'), to: getH('To'), date: getH('Date'),
          hasAttachment: (msgRes.data.payload?.parts || []).length > 1,
        });
      } catch { /* skip */ }
    }

    res.json({
      messages: detailed,
      nextPageToken: listRes.data.nextPageToken || undefined,
      totalEstimate: listRes.data.resultSizeEstimate || 0,
    });
  } catch (err) {
    console.error('Gmail list error:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/gmail/message?id=xxx
app.get('/api/gmail/message', async (req, res) => {
  try {
    const gmail = await getGmail();
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'Missing id' });

    const msgRes = await gmail.users.messages.get({ userId: 'me', id, format: 'full' });
    const headers = msgRes.data.payload?.headers || [];
    const getH = (name) => headers.find(h => h.name === name)?.value || '';

    let body = '';
    let htmlBody;
    function extractParts(payload) {
      if (payload.parts) {
        for (const part of payload.parts) {
          if (part.mimeType === 'text/plain' && part.body?.data) {
            body = Buffer.from(part.body.data, 'base64').toString('utf-8');
          } else if (part.mimeType === 'text/html' && part.body?.data) {
            htmlBody = Buffer.from(part.body.data, 'base64').toString('utf-8');
          } else if (part.parts) extractParts(part);
        }
      } else if (payload.body?.data) {
        body = Buffer.from(payload.body.data, 'base64').toString('utf-8');
      }
    }
    extractParts(msgRes.data.payload);

    res.json({
      message: {
        id: msgRes.data.id, threadId: msgRes.data.threadId,
        subject: getH('Subject'), from: getH('From'), to: getH('To'), date: getH('Date'),
        body, htmlBody, snippet: msgRes.data.snippet || '', labelIds: msgRes.data.labelIds || [],
      },
    });
  } catch (err) {
    console.error('Gmail message error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/gmail/send
app.post('/api/gmail/send', async (req, res) => {
  try {
    const gmail = await getGmail();
    const { to, cc, bcc, subject, body, html, replyTo, inReplyTo, references } = req.body;

    if (!to || !subject || !body) {
      return res.status(400).json({ error: 'Missing required fields: to, subject, body' });
    }

    const boundary = 'boundary_' + Date.now() + '_' + Math.random().toString(36).slice(2);
    const from = 'SOETech AI <noreply@soetechllc.com>';
    const toArr = Array.isArray(to) ? to : [to];
    const headers = [`From: ${from}`, `To: ${toArr.join(', ')}`];

    if (cc) headers.push(`Cc: ${Array.isArray(cc) ? cc.join(', ') : cc}`);
    if (bcc) headers.push(`Bcc: ${Array.isArray(bcc) ? bcc.join(', ') : bcc}`);
    if (replyTo) headers.push(`Reply-To: ${replyTo}`);
    if (inReplyTo) {
      headers.push(`In-Reply-To: ${inReplyTo}`);
      headers.push(`References: ${references || inReplyTo}`);
    }

    headers.push(`Subject: ${subject}`, 'MIME-Version: 1.0', `Date: ${new Date().toUTCString()}`);

    if (html) {
      headers.push(`Content-Type: multipart/alternative; boundary="${boundary}"`, '',
        `--${boundary}`, 'Content-Type: text/plain; charset=utf-8', '', body, '',
        `--${boundary}`, 'Content-Type: text/html; charset=utf-8', '', html, '',
        `--${boundary}--`);
    } else {
      headers.push('Content-Type: text/plain; charset=utf-8', '', body);
    }

    const mimeMessage = headers.join('\r\n');
    const encodedMessage = Buffer.from(mimeMessage).toString('base64')
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    const result = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encodedMessage },
    });

    res.json({
      success: true,
      message: { id: result.data.id, threadId: result.data.threadId, labelIds: result.data.labelIds || [] },
    });
  } catch (err) {
    console.error('Gmail send error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/gmail/message (read/trash actions)
app.post('/api/gmail/message', async (req, res) => {
  try {
    const gmail = await getGmail();
    const { action, id } = req.body;
    if (!id) return res.status(400).json({ error: 'Missing id' });

    if (action === 'read') {
      await gmail.users.messages.modify({ userId: 'me', id, requestBody: { removeLabelIds: ['UNREAD'] } });
      return res.json({ success: true });
    }
    if (action === 'trash') {
      await gmail.users.messages.trash({ userId: 'me', id });
      return res.json({ success: true });
    }

    res.status(400).json({ error: 'Invalid action' });
  } catch (err) {
    console.error('Gmail action error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ===== Health =====
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'LNM Command Center API', timestamp: new Date().toISOString() });
});

// ===== Start =====
app.listen(PORT, () => {
  console.log(`LNM Command Center API running on http://localhost:${PORT}`);
  console.log(`Google Drive + Gmail integration ready`);
});
