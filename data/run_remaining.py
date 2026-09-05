#!/usr/bin/env python3
"""Process remaining 2 leads from batch_part_2.json."""
import json
import sys
import os

sys.path.insert(0, '/root/.hermes/skills/soetech-deep-osint/scripts')
from deep_osint import research_lead, log

RESULTS_DIR = '/tmp/lnm-command-center/public/data/dossier_results'
BATCH_FILE = '/tmp/lnm-command-center/public/data/batch_part_2.json'

os.makedirs(RESULTS_DIR, exist_ok=True)

with open(BATCH_FILE, 'r') as f:
    batch = json.load(f)

# Only process leads 5 and 6 (index 4 and 5)
remaining = batch['leads'][4:]
log(f"Processing {len(remaining)} remaining leads")

for i, lead in enumerate(remaining):
    lead_id = lead.get('id', 'unknown')
    name = lead.get('name', 'Unknown')
    website = lead.get('website', '')
    output_path = os.path.join(RESULTS_DIR, f'{lead_id}.json')

    # Skip if already done
    if os.path.exists(output_path):
        log(f"  SKIP (already exists): {name}")
        continue

    log(f"\n[{i+1}/{len(remaining)}] Processing: {name} ({lead_id})")
    if not website:
        log(f"  SKIPPING: No website")
        continue

    try:
        dossier = research_lead(lead)
        with open(output_path, 'w') as f:
            json.dump(dossier, f, indent=2, ensure_ascii=False)
        log(f"  SAVED: {output_path} (confidence: {dossier.get('confidence_score', 0)}/10)")
    except Exception as e:
        log(f"  ERROR: {e}")

log("\n=== Done ===")
