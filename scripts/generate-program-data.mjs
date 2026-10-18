import fs from "node:fs";
import { readPrograms } from "./lib/programs.mjs";

const programs = readPrograms(process.argv[2] ?? "programs.csv");
const sourceLastVerified = [...new Set(programs.map((program) => program.last_verified).filter(Boolean))].sort().at(-1) ?? null;
fs.mkdirSync("data/generated", { recursive: true });
fs.writeFileSync("data/generated/programs.json", `${JSON.stringify({ schema_version: 1, source_last_verified: sourceLastVerified, programs }, null, 2)}\n`);
console.log(`✓ generated data/generated/programs.json (${programs.length} programs)`);
