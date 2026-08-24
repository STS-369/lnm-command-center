#!/usr/bin/env python3
"""Batch runner for batch_part_3.json — runs deep_osint.py for each lead."""
import json
import subprocess
import sys
import os
import time

SCRIPT = "/root/.hermes/skills/soetech-deep-osint/scripts/deep_osint.py"
BATCH = "/tmp/lnm-command-center/public/data/batch_part_3.json"
OUTPUT_DIR = "/tmp/lnm-command-center/public/data/dossier_results"

with open(BATCH) as f:
    batch = json.load(f)

leads = batch["leads"]
print(f"Processing {len(leads)} leads...")

for i, lead in enumerate(leads):
    lead_id = lead["id"]
    name = lead["name"]
    website = lead.get("website", "")
    
    if not website:
        print(f"[{i+1}/{len(leads)}] SKIP {name} — no website")
        continue
    
    print(f"\n[{i+1}/{len(leads)}] Processing: {name} ({lead_id})")
    start = time.time()
    
    try:
        result = subprocess.run(
            [sys.executable, SCRIPT],
            input=json.dumps(lead),
            capture_output=True,
            text=True,
            timeout=600
        )
        
        elapsed = time.time() - start
        
        if result.returncode == 0:
            stdout = result.stdout
            # Find the first { and last } in the output
            first_brace = stdout.find('{')
            last_brace = stdout.rfind('}')
            
            if first_brace >= 0 and last_brace > first_brace:
                json_text = stdout[first_brace:last_brace + 1]
                dossier = json.loads(json_text)
                out_path = os.path.join(OUTPUT_DIR, f"{lead_id}.json")
                with open(out_path, "w") as f:
                    json.dump(dossier, f, indent=2)
                print(f"  ✓ Saved (confidence: {dossier.get('confidence_score', '?')}/10, {elapsed:.1f}s)")
            else:
                print(f"  ✗ Could not find JSON braces ({elapsed:.1f}s)")
        else:
            print(f"  ✗ Script failed (exit {result.returncode}, {elapsed:.1f}s)")
            if result.stderr:
                for line in result.stderr.strip().split('\n')[-5:]:
                    print(f"    {line}")
    except subprocess.TimeoutExpired:
        print(f"  ✗ Timeout after 600s")
    except Exception as e:
        print(f"  ✗ Error: {e}")

print("\nDone.")
