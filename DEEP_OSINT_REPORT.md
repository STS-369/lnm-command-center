# Deep OSINT Pipeline — Completion Report

**Date:** 2026-08-19
**Skill:** soetech-deep-osint
**Author:** Cipher (Lead Coding Agent)
**Status:** Documentation Complete

---

## 1. Summary

The `soetech-deep-osint` skill provides a four-stage automated OSINT research pipeline
that enriches B2B lead records in the LNM Command Center with website intelligence:
technology stack detection, pain-point analysis, sales opportunities, and confidence
scoring. The pipeline was partially scaffolded with four Python scripts; this report
completes the skill by adding the missing `SKILL.md`, `references/data-schema.md`, and
`references/quality-gates.md` documentation.

All documentation is **reverse-engineered from the actual script code** — every field,
function name, constant, and behavioral rule described in these files was read directly
from the source scripts, not inferred.

## 2. Scripts Reviewed

| Script | Path | Lines | Purpose |
|--------|------|-------|---------|
| `select_batch.py` | `scripts/select_batch.py` | 327 | Stage 1: Batch selection and lead prioritization |
| `deep_osint.py` | `scripts/deep_osint.py` | 847 | Stage 2: Single-lead deep website research |
| `aggregate_dossier.py` | `scripts/aggregate_dossier.py` | 373 | Stage 3: Dossier aggregation and lead merge |
| `sync_to_lnmc.py` | `scripts/sync_to_lnmc.py` | 345 | Stage 4: Git push and deployment verification |

## 3. Deliverables Created

### 3.1 `SKILL.md` (Full Workflow Documentation)

**Path:** `/root/.hermes/skills/soetech-deep-osint/SKILL.md`

Contains:
- Pipeline overview with ASCII architecture diagram (all 4 stages)
- Stage-by-stage guide with purpose, input/output files, usage commands
- Selection algorithm details (priority scoring weights, industry map)
- Research pipeline steps (10-page scraping, tech detection, pain points, opportunities)
- Merge logic for dossier-to-lead aggregation
- Deployment sync workflow (git push + 30s cache wait + curl verification)
- Orchestration pattern with example bash/python invocation
- File inventory table with line counts
- Legal & compliance summary (CFAA, GDPR, CCPA, CAN-SPAM)
- Email sending policy reference
- Links to related skills

**Size:** ~14.8 KB

### 3.2 `references/data-schema.md`

**Path:** `/root/.hermes/skills/soetech-deep-osint/references/data-schema.md`

Documents the JSON schemas for all 6 data artifacts:

1. **Leads (`leads.json`)** — 23 fields including `id`, `name`, `website`, `industry`,
   `status`, `score`, `rating`, `website_status`, and the `osint_research` field added
   by the pipeline.
2. **Dossiers (`dossiers.json`)** — 15 fields including `business_name`,
   `technology_stack`, `pain_points`, `opportunities`, `confidence_score`,
   `research_sources`, `notes`, `filename`, plus the extended `osint_research`
   sub-object.
3. **Email Drafts (`EMAIL_DRAFTS_IN_APP.json`)** — 6 fields (`id`, `lead_id`,
   `lead_name`, `subject`, `body`, `status`, `created_at`).
4. **Batch (`batch_of_20.json`)** — Top-level `batch_id`, `created_at`,
   `total_leads_in_batch`, plus 20 lead objects with `priority_score`,
   `has_email_draft`, `existing_confidence_score`, and selection metadata.
5. **Individual Dossier Results (`dossier_results/`)** — Per-lead JSON output from
   `deep_osint.py`, including the `osint_research` nested object with
   `scraped_pages`, `contact_info`, `data_completeness`, and
   `legal_compliance`.
6. **Enriched Leads (`enriched_leads.json`)** — Full leads array with merged
   `osint_research` field and updated `confidence_score`/`status`.

Also includes:
- Data flow summary diagram
- Industry priority map (dentist=100, law firms=95, etc.)
- Status value reference table
- Sample JSON for batch and dossier formats

**Size:** ~14 KB

### 3.3 `references/quality-gates.md`

**Path:** `/root/.hermes/skills/soetech-deep-osint/references/quality-gates.md`

Documents:

1. **Confidence scoring (dual implementation):**
   - `deep_osint.py → calculate_confidence()` — 8 criteria, max 10 points
   - `aggregate_dossier.py → calculate_confidence_score()` — same scale, recomputed
     from stored dossier if score is 0
2. **Data completeness scoring** — 6 dimensions (10+5+10+10+5+5), percentage-style
   diagnostic
3. **Lead status assignment table** — `researched` (>=6), `partial_research` (3–5),
   `research_failed` (0–2)
4. **Four quality gates:**
   - Gate 1: Pre-research (lead must have name + website or phone)
   - Gate 2: During scraping (retry logic, 10-page limit, HTTP 200–399 only)
   - Gate 3: Post-aggregation (dossier replacement by business name, score overwrite
     rules, missing dossier handling)
   - Gate 4: Deployment verification (30s cache wait, curl checks for valid JSON,
     `osint_research` field presence)
5. **Pain point validation rules** — 10 pain point types with trigger conditions and
   industry context
6. **Batch selection validation** — Confidence threshold, deduplication, batch size,
   email draft priority, website reachability
7. **Bot behavior compliance** — Rate limiting, UA rotation, referrer spoofing,
   timeout, retry, page limit, no-email-sending
8. **Exit code summary** — All scripts' exit codes (0 = success, 1 = fatal)
9. **Threshold reference table** — All 13 constants from the scripts (CONFIDENCE_THRESHOLD=6,
   BATCH_SIZE=20, MIN_DELAY=2, MAX_DELAY=6, REQUEST_TIMEOUT=15, etc.)

**Size:** ~9.2 KB

## 4. Key Findings from Code Review

### 4.1 Pipeline is Sequential and Stateful
The four scripts form a linear pipeline with file-based handoffs. Each stage reads
the output of the previous stage. No shared memory or queue system is used.

### 4.2 Bot Protection is Comprehensive
`deep_osint.py` implements a multi-layered bot protection strategy:
- 7 hardcoded User-Agent strings (6 desktop browsers + 1 mobile)
- Round-robin UA index cycling (not truly random — deterministic rotation)
- 7 referrer URLs spoofed from common search/social platforms
- 2–6 second random delays before every request
- HTTP cookie processor for session persistence
- 3x retry on transient failures
- 15-second request timeout

### 4.3 Confidence Scoring is Dual-Implemented
Both `deep_osint.py` and `aggregate_dossier.py` contain independent confidence
scoring functions with identical logic. The aggregator's version is used as a
fallback if the dossier arrives with `confidence_score == 0`.

### 4.4 Pain Points are Industry-Aware
`identify_pain_points()` in `deep_osint.py` uses industry-specific branching:
- Dentist → "Limited Online Booking: Appointments require phone calls..."
- Law → "Limited Online Booking: Consultations require phone calls..."
- Florist → "Manual Ordering: No online order placement..."
- Funeral homes → "No Online Arrangement System: Families must call..."
- Senior care → "Limited Online Booking: Care visits require phone scheduling..."
- Marketing → "Manual Reporting: Campaign tracking appears manual..."

### 4.5 Email Draft Priority is Critical
`select_batch.py` gives leads with existing email drafts a +100 priority boost. This
ensures Alice's reviewed leads (which are closest to the sales pipeline) are researched
first, feeding fresh data back into the email drafting process.

### 4.6 No Cron Scheduling Exists
The scripts are standalone CLI tools with no built-in scheduling. They are designed
to be invoked from a cron job or manual orchestration. No `cronjob` entry currently
exists for this pipeline.

## 5. Verification

All four scripts were read in full and their behavior documented:

- `deep_osint.py`: 847 lines, read in full (lines 1–500 and 501–847)
- `aggregate_dossier.py`: 373 lines, read in full
- `select_batch.py`: 327 lines, read in full
- `sync_to_lnmc.py`: 345 lines, read in full

Live data files inspected:
- `leads.json` (393,870 bytes, 690+ leads) — field structure verified
- `dossiers.json` (92,739 bytes, 105 dossiers) — field structure verified
- `EMAIL_DRAFTS_IN_APP.json` (22,592 bytes, 99 drafts) — field structure verified
- `batch_of_20.json` (11,637 bytes, 20 leads) — output schema verified

## 6. Recommendations

1. **Schedule the pipeline as a cron job** — Currently no automated scheduling exists.
   A cron job running `select_batch.py → deep_osint.py (x20) → aggregate_dossier.py →
   sync_to_lnmc.py` once daily would keep lead data fresh.

2. **Add parallel execution for Stage 2** — `deep_osint.py` is invoked 20 times
   sequentially. Parallel execution (e.g., `xargs -P 5` or Python `concurrent.futures`)
   would reduce total research time from ~20 minutes to ~4 minutes.

3. **Persist confidence scores in dossiers** — Currently the aggregator only
   recomputes confidence if `confidence_score == 0`. The deep_osint output always
   includes a score, so this is a minor issue, but worth noting.

4. **Consider adding `data/dossier_results/` to `.gitignore`** — These are
   intermediate files that should not be committed to the LNM Command Center repo.

## 7. Files on Disk

```
/root/.hermes/skills/soetech-deep-osint/
├── SKILL.md                              [CREATED — this report's primary deliverable]
├── references/
│   ├── data-schema.md                    [CREATED — 6 schemas documented]
│   └── quality-gates.md                  [CREATED — 4 gates + scoring documented]
└── scripts/
    ├── select_batch.py                   [PRE-EXISTING — 327 lines, reviewed]
    ├── deep_osint.py                     [PRE-EXISTING — 847 lines, reviewed]
    ├── aggregate_dossier.py              [PRE-EXISTING — 373 lines, reviewed]
    └── sync_to_lnmc.py                   [PRE-EXISTING — 345 lines, reviewed]
```
