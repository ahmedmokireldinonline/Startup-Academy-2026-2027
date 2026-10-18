import fs from "node:fs";
import { duplicateGroups, readPrograms } from "./lib/programs.mjs";

const programs = readPrograms(process.argv[2] ?? "programs.csv");
const dimensions = ["provider", "region", "primary_category", "status"];
const countBy = (key) => Object.fromEntries([...programs.reduce((map, item) => map.set(item[key], (map.get(item[key]) ?? 0) + 1), new Map())].sort((a, b) => b[1] - a[1]));
const report = {
  generated_at: new Date().toISOString(),
  total_programs: programs.length,
  official_source_programs: programs.filter((p) => /^https:\/\//.test(p.link)).length,
  last_verified: [...new Set(programs.map((p) => p.last_verified).filter(Boolean))].sort().at(-1) ?? null,
  counts: Object.fromEntries(dimensions.map((key) => [key, countBy(key)])),
  duplicate_names: duplicateGroups(programs, "name").map(([value, items]) => ({ value, ids: items.map((item) => item.id) })),
};
fs.mkdirSync("data/generated", { recursive: true });
fs.writeFileSync("data/generated/catalog-report.json", `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
