import fs from "node:fs/promises";
import { setTimeout as sleep } from "node:timers/promises";

const input = "client/src/data/investors.json";
const output = "client/public/data/investors.json";
const items = JSON.parse(await fs.readFile(input, "utf8"));
const countryNames = ["United States", "Canada", "Mexico", "Brazil", "Argentina", "Chile", "Colombia", "Peru", "United Kingdom", "Ireland", "France", "Germany", "Spain", "Portugal", "Italy", "Netherlands", "Belgium", "Switzerland", "Austria", "Sweden", "Norway", "Denmark", "Finland", "Poland", "Czech Republic", "Romania", "Ukraine", "Russia", "Turkey", "Israel", "Egypt", "South Africa", "Nigeria", "Kenya", "Ghana", "Morocco", "Tunisia", "Algeria", "United Arab Emirates", "Saudi Arabia", "Qatar", "Jordan", "India", "Pakistan", "Bangladesh", "China", "Japan", "South Korea", "Singapore", "Indonesia", "Malaysia", "Thailand", "Vietnam", "Philippines", "Australia", "New Zealand"];
const countryAliases = { USA: "United States", US: "United States", UK: "United Kingdom", UAE: "United Arab Emirates", "United States of America": "United States" };
const cityCountries = {
  Cambridge: "United States", "San Francisco": "United States", "San Francisco Bay Area": "United States", "SF Bay Area": "United States", "New York City": "United States", "New York": "United States", Boston: "United States", Chicago: "United States", "Los Angeles": "United States", Austin: "United States", Seattle: "United States", Denver: "United States", Toronto: "Canada", Vancouver: "Canada", Montreal: "Canada", London: "United Kingdom", Paris: "France", Berlin: "Germany", Tokyo: "Japan", Singapore: "Singapore", "Tel Aviv": "Israel", Mumbai: "India", Bangalore: "India", Bengaluru: "India", Islamabad: "Pakistan", Sydney: "Australia", Melbourne: "Australia"
};
const escaped = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function countriesFor(item) {
  const text = `${item.location || ""} ${item.details || ""}`.replace(/\+/g, " ");
  const found = [];
  for (const name of countryNames) if (new RegExp(`\\b${escaped(name)}\\b`, "i").test(text)) found.push(name);
  for (const [alias, name] of Object.entries(countryAliases)) if (new RegExp(`\\b${escaped(alias)}\\b`, "i").test(text)) found.push(name);
  for (const [city, name] of Object.entries(cityCountries)) if (new RegExp(`\\b${escaped(city)}\\b`, "i").test(text)) found.push(name);
  return [...new Set(found)].sort();
}
function imageFromHtml(html) {
  const patterns = [/property=["']og:image["'][^>]*content=["']([^"']+)/i, /content=["']([^"']+)["'][^>]*property=["']og:image["']/i, /"image"\s*:\s*"([^"']+)/i];
  for (const pattern of patterns) {
    const image = html.match(pattern)?.[1]?.replaceAll("\\u0026", "&");
    if (image && !/wellfound\.com\/assets\/logo|wellfound\.com\/images\/shared\/nopic/i.test(image)) return image;
  }
  return "";
}
async function fetchImage(item) {
  if (!item.url?.startsWith("http")) return "";
  try {
    const response = await fetch(item.url, { headers: { "user-agent": "Mozilla/5.0 Startup Academy public profile metadata" }, signal: AbortSignal.timeout(12000) });
    return response.ok ? imageFromHtml(await response.text()) : "";
  } catch { return ""; }
}
let completed = 0;
const concurrency = 18;
for (let start = 0; start < items.length; start += concurrency) {
  const batch = items.slice(start, start + concurrency);
  const results = await Promise.all(batch.map(async (item) => ({ item, image: await fetchImage(item) })));
  for (const { item, image } of results) {
    item.countries = countriesFor(item);
    if (image) { item.image = image; item.imageSource = item.url; }
  }
  completed += batch.length;
  if (completed % 180 === 0 || completed === items.length) console.log(`enriched ${completed}/${items.length}`);
  await sleep(50);
}
await fs.writeFile(output, JSON.stringify(items));
await fs.writeFile(input, `${JSON.stringify(items, null, 2)}\n`);
const withImages = items.filter((item) => item.image).length;
const withCountries = items.filter((item) => item.countries?.length).length;
const countryCounts = Object.fromEntries([...new Set(items.flatMap((item) => item.countries || []))].sort().map((country) => [country, items.filter((item) => item.countries?.includes(country)).length]));
await fs.mkdir("data/generated", { recursive: true });
await fs.writeFile("data/generated/investor-enrichment-report.json", `${JSON.stringify({ generatedAt: new Date().toISOString(), total: items.length, withImages, withCountries, countryCounts }, null, 2)}\n`);
console.log(JSON.stringify({ total: items.length, withImages, withCountries, countryCounts }, null, 2));
