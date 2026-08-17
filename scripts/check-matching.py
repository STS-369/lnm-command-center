import re

# Read the import data file
with open('src/lib/import-data.ts', 'r') as f:
    content = f.read()

# Extract email lead names (first 20)
email_pattern = r'"lead_name":"([^"]+)"'
emails = re.findall(email_pattern, content)
print(f"Total email lead names: {len(emails)}")
print("First 10 email names:")
for name in emails[:10]:
    print(f"  - {name}")

# Extract lead names (first 20)
lead_pattern = r'"name":"([^"]+)"'
leads = re.findall(lead_pattern, content)
print(f"\nTotal lead names: {len(leads)}")
print("First 10 lead names:")
for name in leads[:10]:
    print(f"  - {name}")

# Check for matches
email_set = set(n.lower().strip() for n in emails)
lead_set = set(n.lower().strip() for n in leads)
matches = email_set and lead_set
print(f"\nExact matches: {len(matches)}")
print(f"Unmatched emails: {len(email_set - lead_set)}")
print("\nUnmatched email names (first 10):")
for name in sorted(email_set - lead_set)[:10]:
    print(f"  - {name}")
