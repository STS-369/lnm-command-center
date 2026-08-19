# LNM Command Center — Alpha Launch Review

## Date: 2026-08-19
## Reviewed by: Alice (Income Engine) + Cipher (Lead Coding Agent)

---

## Executive Summary

The LNM Command Center is a Next.js 15 static export CRM dashboard deployed to GitHub Pages. It has significant architectural debt from rapid iteration. The core functionality works (passcode gate, dashboard, pipeline, outreach pages) but the data layer is broken — it loads demo data instead of real lead/email data.

**Alpha readiness: 60%** — UI works, data pipeline needs repair.

---

## Critical Issues (Must Fix for Alpha)

### 1. DATA LAYER BROKEN — Demo Data Only
**Status:** ❌ CRITICAL
**Impact:** App shows 12 fake leads instead of 690 real leads

**Root Cause:** `seedLocalStorage()` in `client-db.ts` uses `DEMO_LEADS` and `DEMO_EMAILS` constants instead of `IMPORT_LEADS` and `IMPORT_EMAILS` from `import-data.ts`.

**Fix:** Update `seedLocalStorage()` to load real data with type casting:
```typescript
const leadsToSeed = IMPORT_LEADS.length > 0 ? IMPORT_LEADS as unknown as Lead[] : DEMO_LEADS;
const emailsToSeed = IMPORT_EMAILS.length > 0 ? IMPORT_EMAILS as unknown as OutreachEmail[] : DEMO_EMAILS;
```

**Note:** Previous attempts to import 467KB of TS data caused client-side crashes. The `as unknown as` cast bypasses TypeScript but the data still needs to be bundled. Consider dynamic JSON loading instead.

### 2. DOSSIER DATA NOT CONNECTED
**Status:** ❌ CRITICAL
**Impact:** LeadDetailModal shows empty fields

**Root Cause:** `dossier-data.ts` exists (105 dossiers, 2912 lines) but is never imported or used in `client-db.ts`. The `PARSED_DOSSIERS` array is defined but not loaded into localStorage.

**Fix:** Import and load dossiers in `seedLocalStorage()`, match to leads by business name.

### 3. PASSCODEGATE HYDRATION
**Status:** ✅ FIXED
**Impact:** Was showing "INITIALIZING..." on SSR

**Fix:** Added `mounted` state flag to prevent SSR mismatch. Verified working on live site.

---

## Architecture Assessment

### Current Stack
| Layer | Technology | Status |
|-------|-----------|--------|
| Frontend | Next.js 15, React 18, Tailwind | ✅ Working |
| Static Export | `output: 'export'` | ✅ Working |
| Authentication | PasscodeGate (client-side) | ✅ Working |
| Data Storage | localStorage (client-side) | ⚠️ Demo data only |
| Backend | Express server.js (375 lines) | ⚠️ Not deployed |
| Database | SQLite (better-sqlite3) | ⚠️ Server-side only |
| Email | Gmail API integration | ✅ Working |
| Google Drive | API integration | ✅ Working |

### Key Files
| File | Size | Purpose |
|------|------|---------|
| `src/lib/client-db.ts` | 34KB | Database layer (localStorage) |
| `src/lib/import-data.ts` | 467KB | 690 leads + 99 emails |
| `src/lib/dossier-data.ts` | 106KB | 105 OSINT dossiers |
| `src/app/pipeline/page.tsx` | — | Lead management UI |
| `src/app/outreach/page.tsx` | — | Email management UI |
| `src/components/LeadDetailModal.tsx` | — | Dossier viewer |
| `server.js` | 375 lines | Express backend |

### Architecture Issues
1. **Static export can't use server-side features** — API routes are dead code
2. **467KB import-data.ts bundled into client JS** — causes crashes
3. **No data synchronization** — localStorage is isolated per browser
4. **Backend not deployed** — server.js has Gmail/Drive APIs but no hosting

---

## Sync Button Design

### Goal
Add a "Sync Data" button that triggers the Memory agent to synchronize data between GDrive and LNM_CC.

### Architecture

```
[Sync Button] → [API Call] → [Memory Agent] → [GDrive API] → [Update localStorage]
     UI              ↑              ↑              ↑              ↑
     ↓              │              │              │              ↓
     [Status] ← [Response] ← [Result] ← [Data] ← [Fresh Data]
```

### Implementation Plan

#### Phase 1: Backend Sync Endpoint
Create `src/api/sync/route.ts`:
- GET: Fetch leads/emails from GDrive
- POST: Push local changes to GDrive
- Uses Google Drive API (already in server.js)

#### Phase 2: Sync Button Component
Create `src/components/SyncButton.tsx`:
- Shows sync status (last synced, conflicts)
- Triggers sync on click
- Shows progress indicator

#### Phase 3: Memory Agent Integration
- Memory agent manages the canonical data in GDrive
- LNM_CC pulls from GDrive on sync
- Conflict resolution: GDrive wins (source of truth)

### Data Flow
1. User clicks "Sync Data"
2. Frontend calls `/api/sync`
3. Backend fetches from GDrive (leads.json, emails.json)
4. Backend returns merged data
5. Frontend updates localStorage
6. UI refreshes with new data

---

## Alpha Launch Checklist

### Critical (Must Have)
- [ ] Fix `seedLocalStorage()` to load real data
- [ ] Connect dossier-data to LeadDetailModal
- [ ] Deploy working build to GitHub Pages
- [ ] Verify all pages load correctly
- [ ] Test passcode authentication

### Important (Should Have)
- [ ] Add sync button UI
- [ ] Create sync API endpoint
- [ ] Integrate Memory agent for data management
- [ ] Add error handling for failed loads
- [ ] Add loading states

### Nice to Have
- [ ] Real-time sync indicator
- [ ] Conflict resolution UI
- [ ] Batch email sending
- [ ] Lead scoring visualization
- [ ] Export to CSV

### Known Limitations
- No server-side rendering (static export)
- No real-time updates (localStorage only)
- No user authentication (passcode only)
- No data persistence across devices
- Backend not deployed (server.js unused)

---

## Implementation Priority

### Today (Alpha Launch)
1. Fix data loading in `seedLocalStorage()`
2. Deploy to GitHub Pages
3. Verify on live site
4. Add sync button (basic)

### This Week
1. Deploy server.js backend
2. Implement sync API endpoint
3. Integrate Memory agent
4. Add error handling

### Next Week
1. Real-time sync
2. Conflict resolution
3. Batch operations
4. Analytics dashboard

---

## Files to Modify

| File | Change |
|------|--------|
| `src/lib/client-db.ts` | Fix `seedLocalStorage()` to load real data |
| `src/app/pipeline/page.tsx` | Add sync button |
| `src/components/SyncButton.tsx` | New component |
| `src/app/api/sync/route.ts` | New API endpoint |
| `next.config.ts` | May need API routes config |

---

## Verification Steps

After fixes:
1. `npx next build` — must succeed
2. Deploy to GitHub Pages
3. Visit https://lnm.soetechllc.com
4. Enter passcode: somoteitbe
5. Check Dashboard — should show 690 leads, 99 emails
6. Check Pipeline — should show real leads
7. Check Outreach — should show real emails
8. Click lead — should show dossier data

---

**So Mote It Be** 🐺
