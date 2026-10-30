from pathlib import Path
import json
import re
import openpyxl

ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "SAAS Toolkit" / "Toolkit-A"
OUTPUT = ROOT / "client" / "src" / "data" / "investors.ts"

FILES = [
    ("+1200 SaaS Angel Investors  .xlsx", "Angel investors"),
    ("+900 SaaS Seed Investors .xlsx", "Seed investors"),
    ("Active Seed Stage SaaS Investors.xlsx", "Active seed-stage funds"),
]

def clean(value):
    if value is None:
        return ""
    if isinstance(value, float) and value.is_integer():
        return str(int(value))
    return str(value).strip()

def normalize(value):
    return re.sub(r"[^a-z0-9]+", "", clean(value).lower())

def first_nonempty(row):
    return next((clean(v) for v in row if clean(v)), "")

merged = {}
for filename, kind in FILES:
    workbook = openpyxl.load_workbook(SOURCE_DIR / filename, read_only=True, data_only=True)
    sheet = workbook.active
    rows = list(sheet.iter_rows(values_only=True))
    header_index = next(i for i, row in enumerate(rows) if any(clean(v).lower() == "name" for v in row))
    headers = [clean(v).lower() for v in rows[header_index]]
    for row in rows[header_index + 1:]:
        values = {headers[i]: clean(row[i]) if i < len(row) else "" for i in range(len(headers))}
        name = first_nonempty(row)
        if not name or name.lower() in {"nan", "none"}:
            continue
        key = normalize(name)
        if key not in merged:
            merged[key] = {
                "id": key,
                "name": name,
                "types": [],
                "location": values.get("location", ""),
                "market": values.get("market", ""),
                "role": values.get("role", ""),
                "sweetSpot": values.get("sweet spot", ""),
                "description": values.get("description", ""),
                "investments": values.get("investments", ""),
                "url": values.get("profile url", "") or values.get(" url", "") or values.get("link", ""),
                "sources": [],
            }
        item = merged[key]
        if kind not in item["types"]:
            item["types"].append(kind)
        item["sources"].append(filename)
        for field, header_names in {
            "location": ["location"], "market": ["market"], "role": ["role"],
            "sweetSpot": ["sweet spot"], "description": ["description"],
            "investments": ["investments"], "url": ["profile url", " url", "link"],
        }.items():
            if not item[field]:
                for header in header_names:
                    if values.get(header):
                        item[field] = values[header]
                        break

items = sorted(merged.values(), key=lambda item: item["name"].lower())
for item in items:
    item["types"] = sorted(item["types"])
    item["sources"] = sorted(set(item["sources"]))

payload = json.dumps(items, ensure_ascii=False, indent=2)
OUTPUT.write_text(
    "export type Investor = { id: string; name: string; types: string[]; location: string; market: string; role: string; sweetSpot: string; description: string; investments: string; url: string; sources: string[]; };\n\n"
    f"export const investors: Investor[] = {payload};\n",
    encoding="utf-8",
)
print(f"Generated {len(items)} unique investors at {OUTPUT}")
