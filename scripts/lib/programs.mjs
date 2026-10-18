import fs from "node:fs";

export const REQUIRED_COLUMNS = [
  "id", "name", "provider", "region", "type", "short", "eligibility",
  "link", "status", "last_verified", "primary_category",
];

export function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (quoted) {
      if (char === '"' && next === '"') { cell += '"'; i += 1; }
      else if (char === '"') quoted = false;
      else cell += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") { row.push(cell); cell = ""; }
    else if (char === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (char !== "\r") cell += char;
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }
  const [headers, ...data] = rows;
  return data.filter((r) => r.some((value) => value.trim())).map((r) =>
    Object.fromEntries(headers.map((header, i) => [header, (r[i] ?? "").trim()])),
  );
}

export function readPrograms(file = "programs.csv") {
  return parseCsv(fs.readFileSync(file, "utf8"));
}

export function isUrl(value) {
  try { const url = new URL(value); return url.protocol === "https:"; }
  catch { return false; }
}

export function duplicateGroups(programs, key) {
  const groups = new Map();
  for (const program of programs) {
    const value = String(program[key] ?? "").trim().toLowerCase();
    if (!value) continue;
    groups.set(value, [...(groups.get(value) ?? []), program]);
  }
  return [...groups.entries()].filter(([, items]) => items.length > 1);
}
