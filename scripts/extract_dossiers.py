import json

with open('src/lib/dossier-data.ts', 'r') as f:
    content = f.read()

# Find the start of the array
start_marker = 'export const PARSED_DOSSIERS: ParsedDossier[] = '
idx = content.find(start_marker)
if idx == -1:
    print("Could not find PARSED_DOSSIERS")
    exit(1)

# Find the opening [
array_start = content.find('[', idx + len(start_marker))

# Find matching closing ]
depth = 0
end = -1
for i in range(array_start, len(content)):
    c = content[i]
    if c == '[': depth += 1
    elif c == ']': depth -= 1
    if depth == 0 and i > array_start:
        end = i + 1
        break

json_str = content[array_start:end]
dossiers = json.loads(json_str)

with open('public/data/dossiers.json', 'w') as f:
    json.dump(dossiers, f)

print(f"Extracted {len(dossiers)} dossiers")
print(f"First dossier keys: {list(dossiers[0].keys())}")
