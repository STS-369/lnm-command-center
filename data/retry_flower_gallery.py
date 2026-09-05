#!/usr/bin/env python3
"""Retry Flower Gallery lead after rate limit cooldown."""
import json
import sys
import os
import time

sys.path.insert(0, '/root/.hermes/skills/soetech-deep-osint/scripts')
from deep_osint import research_lead, log

RESULTS_DIR = '/tmp/lnm-command-center/public/data/dossier_results'
BATCH_FILE = '/tmp/lnm-command-center/public/data/batch_part_2.json'

os.makedirs(RESULTS_DIR, exist_ok=True)

with open(BATCH_FILE, 'r') as f:
    batch = json.load(f)

# Only Flower Gallery (index 5)
lead = batch['leads'][5]
lead_id = lead['id']
name = lead['name']

log(f"Retrying: {name} ({lead_id})")
log("Waiting 30s for rate limit cooldown...")
time.sleep(30)

try:
    dossier = research_lead(lead)
    output_path = os.path.join(RESULTS_DIR, f'{lead_id}.json')
    with open(output_path, 'w') as f:
        json.dump(dossier, f, indent=2, ensure_ascii=False)
    log(f"  SAVED: {output_path} (confidence: {dossier.get('confidence_score', 0)}/10)")
except Exception as e:
    log(f"  ERROR: {e}")

log("Done")
