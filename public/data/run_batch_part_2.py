#!/usr/bin/env python3
"""Batch runner for deep_osint.py — processes all leads and saves results."""
import json
import sys
import os

# Add the deep_osint script directory to path
sys.path.insert(0, '/root/.hermes/skills/soetech-deep-osint/scripts')

# Import the research function directly
from deep_osint import research_lead, log

RESULTS_DIR = '/tmp/lnm-command-center/public/data/dossier_results'
BATCH_FILE = '/tmp/lnm-command-center/public/data/batch_part_2.json'

os.makedirs(RESULTS_DIR, exist_ok=True)

with open(BATCH_FILE, 'r') as f:
    batch = json.load(f)

leads = batch.get('leads', [])
log(f"Processing {len(leads)} leads from batch_part_2.json")

for i, lead in enumerate(leads):
    lead_id = lead.get('id', 'unknown')
    name = lead.get('name', 'Unknown')
    website = lead.get('website', '')

    log(f"\n[{i+1}/{len(leads)}] Processing: {name} ({lead_id})")

    if not website:
        log(f"  SKIPPING: No website for {name}")
        continue

    try:
        dossier = research_lead(lead)
        output_path = os.path.join(RESULTS_DIR, f'{lead_id}.json')
        with open(output_path, 'w') as f:
            json.dump(dossier, f, indent=2, ensure_ascii=False)
        log(f"  SAVED: {output_path} (confidence: {dossier.get('confidence_score', 0)}/10)")
    except Exception as e:
        log(f"  ERROR processing {name}: {e}")

log("\n=== Batch processing complete ===")
