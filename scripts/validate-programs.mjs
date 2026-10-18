import fs from "node:fs";
import { REQUIRED_COLUMNS, readPrograms, isUrl, duplicateGroups } from "./lib/programs.mjs";

const file = process.argv[2] ?? "programs.csv";
const programs = readPrograms(file);
const errors = [];
if (!programs.length) errors.push(`${file}: no data rows found`);
for (const column of REQUIRED_COLUMNS) {
  if (!(column in (programs[0] ?? {}))) errors.push(`${file}: missing required column '${column}'`);
}
const ids = new Set();
for (const [index, program] of programs.entries()) {
  const row = index + 2;
  for (const field of REQUIRED_COLUMNS) if (!program[field]) errors.push(`${file}:${row}: missing ${field}`);
  if (program.id && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(program.id)) errors.push(`${file}:${row}: invalid id '${program.id}'`);
  if (program.id && ids.has(program.id)) errors.push(`${file}:${row}: duplicate id '${program.id}'`);
  ids.add(program.id);
  if (program.link && !isUrl(program.link)) errors.push(`${file}:${row}: link must be HTTPS '${program.link}'`);
  if (program.last_verified && !/^\d{4}-\d{2}-\d{2}$/.test(program.last_verified)) errors.push(`${file}:${row}: invalid last_verified date`);
}
for (const [key, items] of duplicateGroups(programs, "link")) {
  const idsForLink = items.map((item) => item.id).join(", ");
  errors.push(`${file}: duplicate official link '${key}' used by ${idsForLink}`);
}
if (errors.length) { console.error(errors.map((error) => `✗ ${error}`).join("\n")); process.exit(1); }
console.log(`✓ ${file}: ${programs.length} programs passed schema and integrity checks`);
