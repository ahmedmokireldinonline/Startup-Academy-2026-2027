export type InvestorPlatform = {
  id: string;
  name: string;
  category: string;
  coverage: string;
  use: string;
  verifiedOn: string;
};

/** Public-safe registry: platform names and scope only; source URLs stay outside the public card data. */
export const investorPlatforms: InvestorPlatform[] = [
  { id: "openvc", name: "OpenVC", category: "Investor matching", coverage: "Global angels, VCs, family offices and accelerators", use: "Stage, sector, geography and check-size discovery", verifiedOn: "2026-10-28" },
  { id: "dealroom", name: "Dealroom", category: "Startup intelligence", coverage: "Global funds, rounds, companies and ecosystems", use: "Investor participation, funding-round and ecosystem research", verifiedOn: "2026-10-28" },
  { id: "f6s", name: "F6S", category: "Funding ecosystem", coverage: "Accelerators, grants, funding opportunities and startup programs", use: "Program discovery and founder ecosystem mapping", verifiedOn: "2026-10-28" },
  { id: "wellfound", name: "Wellfound", category: "Founder and investor ecosystem", coverage: "Angel and venture/startup ecosystem profiles", use: "Founder-market and early-stage ecosystem discovery", verifiedOn: "2026-10-28" },
  { id: "ramp", name: "Ramp Investor Database", category: "Investor directory", coverage: "VCs and angels across sectors and stages", use: "Sector and stage-based investor-name research", verifiedOn: "2026-10-28" },
  { id: "angel-investors-network", name: "Angel Investors Network", category: "Angel networks", coverage: "Angel groups organized by geography and industry", use: "US angel-network and sector mapping", verifiedOn: "2026-10-28" },
  { id: "startup-wise-guys", name: "Startup Wise Guys", category: "Accelerator network", coverage: "B2B startup founders, mentors and investors", use: "European early-stage ecosystem research", verifiedOn: "2026-10-28" },
  { id: "mena-ecosystems", name: "MENA startup ecosystem directories", category: "Regional research", coverage: "MENA accelerators, funds, angels and ecosystem bodies", use: "Country-specific investor mapping for MENA founders", verifiedOn: "2026-10-28" },
];
