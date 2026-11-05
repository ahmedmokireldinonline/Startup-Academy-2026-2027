from __future__ import annotations
import json, re
from collections import defaultdict
from pathlib import Path
import openpyxl

ROOT = Path(__file__).resolve().parents[1]
TOOLKIT = ROOT / "SAAS Toolkit" / "Toolkit-A"
OUT = ROOT / "server" / "investorCatalog.ts"
REPORT = ROOT / "research" / "investor-import-report-2026-11-05.json"

COUNTRY_ALIASES = {
    "united states": "United States", "usa": "United States", "us": "United States",
    "canada": "Canada", "united kingdom": "United Kingdom", "uk": "United Kingdom",
    "israel": "Israel", "india": "India", "germany": "Germany", "france": "France",
    "spain": "Spain", "portugal": "Portugal", "brazil": "Brazil", "mexico": "Mexico",
    "australia": "Australia", "japan": "Japan", "singapore": "Singapore", "china": "China",
    "hong kong": "Hong Kong", "south korea": "South Korea", "netherlands": "Netherlands",
    "belgium": "Belgium", "switzerland": "Switzerland", "ireland": "Ireland", "italy": "Italy",
    "austria": "Austria", "denmark": "Denmark", "sweden": "Sweden", "norway": "Norway",
    "finland": "Finland", "poland": "Poland", "russia": "Russia", "ukraine": "Ukraine",
    "turkey": "Türkiye", "greece": "Greece", "romania": "Romania", "bulgaria": "Bulgaria",
    "south africa": "South Africa", "nigeria": "Nigeria", "kenya": "Kenya", "egypt": "Egypt",
    "saudi arabia": "Saudi Arabia", "uae": "United Arab Emirates", "united arab emirates": "United Arab Emirates",
    "kuwait": "Kuwait", "qatar": "Qatar", "bahrain": "Bahrain", "oman": "Oman",
    "dubai": "United Arab Emirates", "abu dhabi": "United Arab Emirates", "riyadh": "Saudi Arabia",
}
CITY_COUNTRIES = {
    "san francisco": "United States", "los angeles": "United States", "california": "United States",
    "cambridge": "United States", "palo alto": "United States", "new york city": "United States",
    "new york": "United States", "chicago": "United States", "detroit": "United States",
    "houston": "United States", "seattle": "United States", "boston": "United States",
    "phoenix": "United States", "boulder": "United States", "sunnyvale": "United States",
    "menlo park": "United States", "greenwich": "United States", "larkspur": "United States",
    "austin": "United States", "dallas": "United States", "denver": "United States",
    "vancouver": "Canada", "toronto": "Canada", "montreal": "Canada", "ottawa": "Canada",
    "tokyo": "Japan", "london": "United Kingdom", "berlin": "Germany", "paris": "France",
    "melbourne": "Australia", "sydney": "Australia", "tel aviv": "Israel", "jerusalem": "Israel",
    "amsterdam": "Netherlands", "brussels": "Belgium", "madrid": "Spain", "barcelona": "Spain",
    "lisbon": "Portugal", "sao paulo": "Brazil", "buenos aires": "Argentina", "santiago": "Chile",
    "delhi": "India", "mumbai": "India", "bangalore": "India", "bengaluru": "India",
    "singapore": "Singapore", "hong kong": "Hong Kong", "istanbul": "Türkiye", "athens": "Greece",
    "warsaw": "Poland", "dublin": "Ireland", "helsinki": "Finland", "zurich": "Switzerland",
}

def clean(value) -> str:
    return str(value).strip() if value not in (None, "") else ""

def country_for(value: str) -> str:
    raw = clean(value)
    low = raw.lower()
    if low in COUNTRY_ALIASES: return COUNTRY_ALIASES[low]
    if low in CITY_COUNTRIES: return CITY_COUNTRIES[low]
    for key, country in {**COUNTRY_ALIASES, **CITY_COUNTRIES}.items():
        if key in low and len(key) > 3: return country
    return ""

def locations_from_seed(value: str) -> list[str]:
    text = clean(value)
    if not text: return []
    pieces = re.split(r",|\n|\+\d+|;", text)
    out=[]
    for piece in pieces:
        piece=re.sub(r"^Investors in\s+", "", piece.strip(), flags=re.I)
        piece=re.sub(r"\s+\(.*?\)$", "", piece).strip()
        if piece and piece not in out: out.append(piece)
    return out

def image_for(url: str) -> str:
    # The current website's investor-image list uses AngelList-derived images.
    # Keep only those; do not invent photos for NFX/VC rows with no source image.
    m = re.match(r"https?://(?:www\.)?angel\.co/([^/?#]+)", url.lower())
    return f"https://unavatar.io/angel.co/{m.group(1)}" if m else ""

def read_rows(path: Path):
    ws = openpyxl.load_workbook(path, read_only=True, data_only=True).active
    rows = list(ws.iter_rows(values_only=True))
    header_index = next(i for i, row in enumerate(rows) if row and clean(row[0]).lower() == "name")
    headers = [clean(x).lower() for x in rows[header_index]]
    for row in rows[header_index+1:]:
        if not row or not clean(row[0]): continue
        yield {headers[i]: clean(row[i]) if i < len(row) else "" for i in range(len(headers))}

files = [
    (TOOLKIT / "+1200 SaaS Angel Investors  .xlsx", "Angel investor", "SaaS Angel Investors"),
    (TOOLKIT / "+900 SaaS Seed Investors .xlsx", "Seed investor", "900+ SaaS Seed Investors"),
    (TOOLKIT / "Active Seed Stage SaaS Investors.xlsx", "Active seed fund", "Active Seed Stage SaaS Investors"),
]
records=[]
for path, kind, source in files:
    for row in read_rows(path):
        if kind == "Angel investor":
            name, url = row.get("name", ""), row.get("profile url", "")
            raw_location = row.get("location", "")
            locations = [raw_location] if raw_location else []
            details, focus, role = row.get("description", ""), row.get("market", ""), kind
            extra = {"investmentsCount": row.get("investments", "")}
        elif kind == "Seed investor":
            name, url = row.get("name", ""), row.get("url", "")
            locations = locations_from_seed(row.get("investors", ""))
            raw_location = ", ".join(locations[:3])
            details, focus, role = "", row.get("sweet spot", ""), row.get("role", "") or kind
            extra = {"investorLocations": row.get("investors", "")}
        else:
            name, url = row.get("name", ""), row.get("link", "")
            locations = [row.get("location", "")] if row.get("location", "") else []
            raw_location = row.get("location", "")
            details, focus, role = row.get("description", ""), "SaaS / Seed stage", kind
            extra = {}
        countries=[]
        for loc in locations:
            c=country_for(loc)
            if c and c not in countries: countries.append(c)
        records.append({
            "name": name, "type": kind, "location": raw_location, "locations": locations,
            "countries": countries, "focus": focus, "role": role, "details": details,
            "url": url, "source": source, "image": image_for(url), "investmentsCount": extra.get("investmentsCount", ""), **extra,
        })

# Merge repeated names across the angel/seed lists and remove the exact duplicate row.
merged=[]; by_name={}; merged_groups=[]
for record in records:
    key=re.sub(r"\s+", " ", record["name"].casefold()).strip()
    existing=by_name.get(key)
    if existing is None:
        record["id"] = f"investor-{len(merged)+1}"
        by_name[key]=record; merged.append(record)
        continue
    # Merge only same normalized name; preserve every source URL and source label.
    if record["url"] == existing["url"] and record["location"] == existing["location"]:
        merged_groups.append({"name":record["name"],"kind":"exact_duplicate"})
        continue
    merged_groups.append({"name":record["name"],"kind":"cross_file_name_match"})
    for field in ("countries", "locations"):
        for value in record[field]:
            if value and value not in existing[field]: existing[field].append(value)
    for field in ("details", "focus", "role", "location", "url", "image", "source"):
        if record.get(field) and not existing.get(field): existing[field]=record[field]
    existing.setdefault("sources", [existing.get("source", "")])
    if record["source"] not in existing["sources"]: existing["sources"].append(record["source"])
    if record["url"] and record["url"] != existing.get("url"): existing.setdefault("profileUrls", []).append(record["url"])

for record in merged:
    record.setdefault("sources", [record.get("source", "")])
    record.setdefault("profileUrls", [])
    # Sort canonical country names and remove empty placeholders.
    record["countries"] = sorted({x for x in record["countries"] if x})
    record["locations"] = sorted({x for x in record["locations"] if x})

public=[]
for r in merged:
    public.append({k:r.get(k, "") for k in ("id","name","type","location","locations","countries","focus","role","image","investmentsCount")})

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text("// Generated from SAAS Toolkit/Toolkit-A investor workbooks. Do not import into client code.\nexport const investorCatalog = " + json.dumps(merged, ensure_ascii=False, indent=2) + " as const;\n", encoding="utf-8")
(Path("client/src/data/investorPublic.json")).write_text(json.dumps(public, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
report={
    "sourceFiles":[p.name for p,_,_ in files], "sourceRows":len(records), "importedUniqueRecords":len(merged),
    "mergedDuplicateGroups":len(merged_groups), "exactDuplicateGroups":sum(x["kind"]=="exact_duplicate" for x in merged_groups),
    "crossFileNameMatches":sum(x["kind"]=="cross_file_name_match" for x in merged_groups),
    "countries":sorted({c for r in merged for c in r["countries"]}),
    "countryCount":len({c for r in merged for c in r["countries"]}),
    "recordsWithImage":sum(bool(r["image"]) for r in merged), "recordsWithoutImage":sum(not bool(r["image"]) for r in merged),
    "egyptMatches":sum("Egypt" in r["countries"] for r in merged),
    "gulfMatches":sum(bool(set(r["countries"]) & {"Saudi Arabia","United Arab Emirates","Kuwait","Qatar","Bahrain","Oman"}) for r in merged),
    "missingSourceFields":{
        "name":sum(not r["name"] for r in merged), "locationOrCountry":sum(not (r["locations"] or r["countries"]) for r in merged),
        "image":sum(not r["image"] for r in merged), "profileUrl":sum(not r["url"] for r in merged)
    },
    "notes":["No Egypt/Cairo record was found in the three original investor workbooks.","Only Angel.co-derived images are retained because the original workbooks contain no image column and no verified image list was present in SAAS Toolkit.","Full fields are generated for server-side use; the client receives sanitized records only."]
}
REPORT.write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print(json.dumps(report,ensure_ascii=False,indent=2))
