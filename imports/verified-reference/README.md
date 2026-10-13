# Imported verified reference batches

This directory imports files created in the referenced worldwide startup-program research task. The import is additive: the existing curated `programs.csv` was not rewritten.

## Contents

- [Unified imported dataset](programs-imported.csv) — 251 source rows; 246 not duplicated in the current curated list and 5 marked as existing-list duplicates.
- [Raw batch files](raw/) — original CSV files preserved unchanged.
- [Country inventory](raw/countries.csv) — 250-country reference list; not a program dataset and not counted in the unified rows.

## Scope of this import

The available referenced files cover African country batches and global startup-credit batches. They do **not** yet constitute the requested China, Ukraine, Russia, Portugal, Canada, or Australia batches.

The unified file preserves the original verification fields, including official links, link status, program status, eligibility status, last verified date, and verification notes. Rows marked `duplicate_of_current=yes` are retained for provenance but should not be counted as new entries in the curated directory.

Imported on: **2026-10-13**
