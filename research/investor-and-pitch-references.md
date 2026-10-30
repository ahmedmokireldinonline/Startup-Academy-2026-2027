# Investor directory and pitch-deck references

- Crunchbase investor filter reference: https://support.crunchbase.com/hc/en-us/articles/30646708323091-Investors-Filters-Definitions
  - Relevant filter groups: Basic Information, Investor Details, Investments, Accelerator Programs, Rank & Scores, Contacts.
  - Useful fields for this site: name, location, description, investor type, investment stage, number of investments, portfolio organizations, and accelerator details.
- ClickUp pitch deck template reference: https://clickup.com/blog/pitch-deck-template/
  - Useful pitch-deck building blocks: product overview, product benefits, customer pain points, company overview, business model, market share, competitor benchmarking, growth strategy, and financial plan.
  - The site also distinguishes short elevator pitches from detailed investor/client decks.
- Local source catalog: SAAS Toolkit/Airtable sheets/Pitch Decks Templates of 46 Startups Before They Became Billion-Dollar Companies-Grid view.csv
- Local investor sources:
  - SAAS Toolkit/Toolkit-A/+1200 SaaS Angel Investors  .xlsx
  - SAAS Toolkit/Toolkit-A/+900 SaaS Seed Investors .xlsx
  - SAAS Toolkit/Toolkit-A/Active Seed Stage SaaS Investors.xlsx

Implementation note: investor records are normalized by name into client/src/data/investors.ts. The generated index keeps source categories and the original profile URL; the website uses local data rather than querying or copying Crunchbase data.
