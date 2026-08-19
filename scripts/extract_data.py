import json
import re

# Extract leads
with open('src/lib/import-data.ts', 'r') as f:
    content = f.read()

# Find IMPORT_LEADS array
idx = content.find('IMPORT_LEADS: ImportLead[] = [{')
rest = content[idx:]
bracket_start = rest.find('[{')
depth = 0
end = -1
for i in range(bracket_start, len(rest)):
    c = rest[i]
    if c == '[': depth += 1
    elif c == ']': depth -= 1
    if depth == 0 and i > bracket_start:
        end = i + 1
        break
leads_json = rest[bracket_start:end]
leads = json.loads(leads_json)

# Find IMPORT_EMAILS array
idx2 = content.find('IMPORT_EMAILS: ImportEmail[] = [{')
rest2 = content[idx2:]
bracket_start2 = rest2.find('[{')
depth2 = 0
end2 = -1
for i in range(bracket_start2, len(rest2)):
    c = rest2[i]
    if c == '[': depth2 += 1
    elif c == ']': depth2 -= 1
    if depth2 == 0 and i > bracket_start2:
        end2 = i + 1
        break
emails_json = rest2[bracket_start2:end2]
emails = json.loads(emails_json)

# Write to public directory for dynamic loading
with open('public/data/leads.json', 'w') as f:
    json.dump(leads, f)

with open('public/data/emails.json', 'w') as f:
    json.dump(emails, f)

print(f"Extracted {len(leads)} leads to public/data/leads.json")
print(f"Extracted {len(emails)} emails to public/data/emails.json")

# Also extract dossiers
with open('src/lib/dossier-data.ts', 'r') as f:
    dossier_content = f.read()

idx3 = dossier_content.find('PARSED_DOSSIERS: ParsedDossier[] = [{')
rest3 = dossier_content[idx3:]
bracket_start3 = rest3.find('[{')
depth3 = 0
end3 = -1
for i in range(bracket_start3, len(rest3)):
    c = rest3[i]
    if c == '[': depth3 += 1
    elif c == ']': depth3 -= 1
    if depth3 == 0 and i > bracket_start3:
        end3 = i + 1
        break
dossiers_json = rest3[bracket_start3:end3]
dossiers = json.loads(dossiers_json)

with open('public/data/dossiers.json', 'w') as f:
    json.dump(dossiers, f)

print(f"Extracted {len(dossiers)} dossiers to public/data/dossiers.json")
