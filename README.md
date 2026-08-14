# LNM Command Center

**Unified CRM, lead generation, sales pipeline, and AI agent dashboard for SOETech.**

## Overview

LNM (Lead Nurturing Machine) Command Center is a full-stack web application that automates and manages the complete sales lifecycle: lead generation → research → validation → outreach → proposals → deals → fulfillment → invoicing.

## Tech Stack

- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Database:** SQLite (better-sqlite3) for development, PostgreSQL-ready schema
- **Theme:** Dark cyberpunk with neon cyan/purple accents
- **Architecture:** Server-side rendering, API routes, responsive design

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app runs on [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with sidebar
│   ├── page.tsx            # Dashboard (home page)
│   ├── globals.css         # Cyberpunk theme + Tailwind
│   ├── pipeline/page.tsx   # Lead pipeline management
│   ├── research/page.tsx   # AI research (Phase 1)
│   ├── outreach/page.tsx   # Email outreach (Phase 1)
│   ├── tasks/page.tsx      # Task management (Phase 1)
│   ├── agents/page.tsx     # AI agents (Phase 2)
│   ├── settings/page.tsx   # Configuration
│   └── api/
│       ├── leads/route.ts  # Lead CRUD API
│       └── settings/route.ts # Settings API
├── components/
│   ├── Sidebar.tsx         # Navigation sidebar
│   └── Header.tsx          # Top header with search
└── lib/
    ├── db.ts               # SQLite database + schema
    └── seed.ts             # Demo data seeder
```

## Features (Phase 0 — Foundation)

- ✅ Dark cyberpunk theme with neon accents
- ✅ Sidebar navigation (Dashboard, Pipeline, Research, Outreach, Tasks, Agents, Settings)
- ✅ Dashboard with stats cards, pipeline summary, activity feed
- ✅ Pipeline page with lead table, status filters, and scoring
- ✅ Settings page with business context and AI configuration
- ✅ SQLite database with full schema
- ✅ Demo data seeder for development
- ✅ Responsive design (mobile-first)

## Roadmap

- **Phase 1:** Research engine, outreach management, task queue, proposals
- **Phase 2:** AI agent orchestration, Luke integration, automated processing
- **Phase 3:** Invoicing, deals pipeline, fulfillment tracking

## Database Schema

| Table | Description |
|-------|-------------|
| `users` | User accounts and roles |
| `leads` | Core pipeline entity with scoring |
| `research` | AI research data per lead |
| `outreach_emails` | Email templates and tracking |
| `proposals` | Sales proposals |
| `deals` | Active and closed deals |
| `invoices` | Invoice management |
| `tasks` | Task queue with priorities |
| `activity_log` | Full audit trail |
| `settings` | Key-value configuration |

## SOETech

Built by [SOETech LLC](https://soetech.com) — Web & AI Development Agency.

---

*Phase 0 — Foundation complete. Ready for Phase 1 development.*
