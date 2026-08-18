# LNM Command Center — SOETech

Unified CRM, lead generation, sales pipeline, and AI agent dashboard for SOETech.

**Live at:** [lnm.soetechllc.com](https://lnm.soetechllc.com/)

## Features

### Dashboard
- Lead overview and pipeline stats
- Real-time metrics from SQLite database

### Pipeline
- 690+ leads imported with email tracking
- Filter by status, city, and search
- Pagination (20/50/100 per page)

### Document Vault (`/vault`)
- Google Drive integration via SOETech CRM folder structure
- Auto-creates: `SOETech CRM/[Client]/01-Proposals, 02-Contracts, 03-Invoices, 04-Research`
- File upload, download, search, delete
- Direct link to open in Google Drive

### Outreach (`/outreach`)
- **Drafts tab:** Pre-written email drafts from lead data
- **Gmail Inbox tab:** Live Gmail inbox (soetechllc@gmail.com)
- **Compose tab:** Send emails directly from CRM
- CC/BCC support, thread reply support

### Gmail Integration
- Send/receive via Google OAuth token
- View inbox with search and pagination
- Read, mark as read, trash messages
- From address: `SOETech AI <noreply@soetechllc.com>`

## Architecture

```
Frontend:  Next.js (static) → GitHub Pages → lnm.soetechllc.com
Backend:   Express server (localhost:3001) → Google Drive + Gmail APIs
Database:  SQLite (Drizzle ORM) — leads, emails, tasks
Auth:      Google OAuth token at ~/.hermes/google_token.json
```

## Setup

### Frontend (GitHub Pages)
Already deployed at https://lnm.soetechllc.com/

### Backend Server (for Drive + Gmail)
```bash
cd /tmp/lnm-command-center
npm install
node server.js
# Runs on http://localhost:3001
```

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/drive/setup` | Create CRM folder structure |
| GET | `/api/drive/list` | List files/folders |
| POST | `/api/drive/upload` | Upload file |
| DELETE | `/api/drive/delete` | Delete file |
| GET | `/api/gmail/list` | List inbox messages |
| GET | `/api/gmail/message?id=` | Get message detail |
| POST | `/api/gmail/send` | Send email |
| POST | `/api/gmail/message` | Read/trash action |

## Tech Stack
- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4
- SQLite + Drizzle ORM
- Google APIs (Drive v3, Gmail v1)
- Express.js backend server

## Google OAuth Token
Located at `~/.hermes/google_token.json` with scopes:
- `drive` — Google Drive access
- `gmail.send`, `gmail.modify`, `gmail.readonly` — Gmail access
- `calendar` — Calendar access
- `forms`, `spreadsheets`, `documents` — Workspace access

## DNS Configuration
| Type | Name | Value |
|------|------|-------|
| CNAME | lnm | sts-369.github.io |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Custom domain: `lnm.soetechllc.com` ✓ (verified, HTTPS enforced)
