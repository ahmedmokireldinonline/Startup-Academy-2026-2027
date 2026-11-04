import fs from "node:fs";
import path from "node:path";

const errors = [];
const investors = JSON.parse(fs.readFileSync("client/src/data/investors.json", "utf8"));
const requiredInvestorFields = ["id", "name", "location", "focus", "source"];
const seenInvestorIds = new Set();
const seenInvestorNames = new Map();
for (const [index, item] of investors.entries()) {
  const row = index + 1;
  for (const field of requiredInvestorFields) if (!String(item[field] ?? "").trim()) errors.push(`investors:${row}: missing ${field}`);
  if (seenInvestorIds.has(item.id)) errors.push(`investors:${row}: duplicate id ${item.id}`);
  seenInvestorIds.add(item.id);
  const key = String(item.name ?? "").trim().toLowerCase();
  if (key) seenInvestorNames.set(key, (seenInvestorNames.get(key) ?? 0) + 1);
}
const duplicateInvestorNames = [...seenInvestorNames].filter(([, count]) => count > 1);
const booksSource = fs.readFileSync("client/src/data/books.ts", "utf8");
const bookIds = [...booksSource.matchAll(/"id":\s*"([^"]+)"/g)].map((match) => match[1]);
const missingCovers = [...booksSource.matchAll(/"image":\s*"([^"]+)"/g)].map((match) => match[1]).filter((image) => !fs.existsSync(path.join("client/public", image.replace(/^\//, ""))));
const programsSource = fs.readFileSync("client/src/data/programs.ts", "utf8");
const programIds = [...programsSource.matchAll(/"id":\s*"([^"]+)"/g)].map((match) => match[1]);
const duplicate = (values) => [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
if (duplicate(bookIds).length) errors.push(`books: duplicate ids ${duplicate(bookIds).join(", ")}`);
if (missingCovers.length) errors.push(`books: missing cover files ${missingCovers.join(", ")}`);
if (duplicate(programIds).length) errors.push(`programs: duplicate ids ${duplicate(programIds).join(", ")}`);
const report = {
  generatedAt: new Date().toISOString(),
  investors: { total: investors.length, duplicateNames: duplicateInvestorNames.map(([name, count]) => ({ name, count })) },
  books: { total: bookIds.length, missingCovers: missingCovers.length },
  programs: { total: programIds.length, duplicateIds: duplicate(programIds).length },
  errors,
};
fs.mkdirSync("data/generated", { recursive: true });
fs.writeFileSync("data/generated/catalog-quality.json", `${JSON.stringify(report, null, 2)}\n`);
if (errors.length) { console.error(errors.map((error) => `✗ ${error}`).join("\n")); process.exit(1); }
console.log(`✓ catalog quality passed: ${investors.length} investors, ${bookIds.length} books, ${programIds.length} programs`);
if (duplicateInvestorNames.length) console.log(`! duplicate investor names for review: ${duplicateInvestorNames.length}`);
