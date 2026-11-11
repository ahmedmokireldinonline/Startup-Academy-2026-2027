#!/usr/bin/env node
import { execSync, spawn } from "node:child_process";
import process from "node:process";

const routes = [
  "/",
  "/admin/login",
  "/admin",
  "/admin/control",
  "/dashboard",
  "/register",
  "/programs",
  "/investors",
  "/books",
  "/databases",
  "/financial-model",
  "/financial-analysis",
  "/about",
];

const args = new Set(process.argv.slice(2));
const isBuildMode = args.has("--build");
const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173";
const port = Number(new URL(baseUrl).port || 4173);
let server;

function log(status, message) {
  console.log(`${status} ${message}`);
}

async function waitForServer(url, timeoutMs = 15000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.status < 500) return;
    } catch {
      // Server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function checkRoute(route) {
  const url = `${baseUrl.replace(/\/$/, "")}${route}`;
  const response = await fetch(url, { redirect: "follow" });
  const contentType = response.headers.get("content-type") || "";
  const body = await response.text();
  const isHtml = contentType.includes("text/html");
  const hasAppShell = body.includes('id="root"') || body.includes("id=\"root\"");
  const passed = response.status >= 200 && response.status < 400 && isHtml && hasAppShell;
  if (passed) {
    log("PASS", `${route} → ${response.status} ${contentType.split(";")[0]}`);
    return true;
  }
  log("FAIL", `${route} → ${response.status}; content-type=${contentType || "missing"}; app-shell=${hasAppShell}`);
  return false;
}

try {
  if (isBuildMode) {
    log("INFO", "Building the production static output with pnpm build:static...");
    execSync("pnpm build:static", { stdio: "inherit" });
    server = spawn("python3", ["-m", "http.server", String(port), "--directory", "dist/public"], { stdio: "ignore" });
    await waitForServer(`${baseUrl}/`);
    log("INFO", `Testing static output at ${baseUrl}`);
  } else {
    log("INFO", `Testing an already-running server at ${baseUrl}`);
    await waitForServer(`${baseUrl}/`);
  }

  const results = await Promise.all(routes.map(checkRoute));
  const passed = results.filter(Boolean).length;
  const failed = results.length - passed;
  console.log(`\nRoute check: ${passed}/${results.length} passed.`);
  if (failed) process.exitCode = 1;
} catch (error) {
  console.error(`\nRoute check could not run: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
} finally {
  server?.kill("SIGTERM");
}
