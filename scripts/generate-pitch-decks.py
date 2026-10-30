from pathlib import Path
import csv, json
ROOT = Path(__file__).resolve().parents[1]
source = ROOT / "SAAS Toolkit" / "Airtable sheets" / "Pitch Decks Templates of 46 Startups Before They Became Billion-Dollar Companies-Grid view.csv"
output = ROOT / "client" / "src" / "data" / "pitchDecks.ts"
items=[]
with source.open(encoding="utf-8-sig", newline="") as f:
    for row in csv.DictReader(f):
        if row.get("Name", "").strip():
            items.append({"name": row.get("Name", "").strip(), "valuation": row.get("Current valuation", "").strip(), "url": row.get("URL", "").strip()})
payload=json.dumps(items, ensure_ascii=False, indent=2)
output.write_text("export type PitchDeck = { name: string; valuation: string; url: string; };\n\nexport const pitchDecks: PitchDeck[] = " + payload + ";\n", encoding="utf-8")
print(f"Generated {len(items)} pitch deck references at {output}")
