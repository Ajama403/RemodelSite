#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ---------------------------------------------------------------------------
// Arg parser (no dependencies)
// ---------------------------------------------------------------------------
function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith("--")) {
        args[key] = true;
      } else {
        args[key] = next;
        i++;
      }
    }
  }
  return args;
}

// ---------------------------------------------------------------------------
// Simple CSV parser (handles quoted fields with commas)
// ---------------------------------------------------------------------------
function parseCsvLine(line) {
  const fields = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      fields.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  fields.push(current.trim());
  return fields;
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim() !== "");
  if (lines.length === 0) return { headers: [], rows: [] };
  const headers = parseCsvLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] || "";
    });
    rows.push(row);
  }
  return { headers, rows };
}

function csvQuote(val) {
  const s = String(val || "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function writeCsv(filePath, headers, rows) {
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => csvQuote(row[h])).join(","));
  }
  fs.writeFileSync(filePath, lines.join("\n") + "\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const args = parseArgs(process.argv);
  const dryRun = args["dry-run"] === true;

  if (!args.input) {
    console.error("Missing required arg: --input <path-to-csv>");
    console.error(
      "\nUsage: node scripts/batch-clone.js --input <csv> [--limit N] [--dry-run]"
    );
    process.exit(1);
  }

  const csvPath = path.resolve(args.input);
  if (!fs.existsSync(csvPath)) {
    console.error(`CSV file not found: ${csvPath}`);
    process.exit(1);
  }

  const limit = args.limit ? parseInt(args.limit, 10) : Infinity;
  const cloneScript = path.join(__dirname, "clone.cjs");

  // 1. Read & parse CSV
  const csvText = fs.readFileSync(csvPath, "utf8");
  const { headers, rows } = parseCsv(csvText);

  // Ensure output columns exist in headers
  const outputHeaders = [...headers];
  if (!outputHeaders.includes("deployedUrl")) outputHeaders.push("deployedUrl");
  if (!outputHeaders.includes("dateDeployed")) outputHeaders.push("dateDeployed");

  // 2. Process rows
  let deployed = 0;
  let skipped = 0;
  let failed = 0;
  const total = Math.min(rows.length, limit);
  let processedCount = 0;

  for (let i = 0; i < rows.length && processedCount < limit; i++) {
    const row = rows[i];

    // Skip already-deployed rows (resume support)
    if (row.deployedUrl) {
      skipped++;
      continue;
    }

    processedCount++;

    // Build clone.js command
    const cmdParts = ["node", JSON.stringify(cloneScript)];
    const flagMap = {
      name: "name",
      phone: "phone",
      email: "email",
      city: "city",
      state: "state",
      trade: "trade",
      rating: "rating",
      reviews: "reviews",
      address: "address",
      zip: "zip",
      slug: "slug",
      logo: "logo",
      areas: "areas",
    };

    for (const [csvCol, flag] of Object.entries(flagMap)) {
      if (row[csvCol]) {
        cmdParts.push(`--${flag}`, JSON.stringify(row[csvCol]));
      }
    }

    if (dryRun) {
      cmdParts.push("--dry-run");
    }

    const cmd = cmdParts.join(" ");
    const slug = row.slug || slugify(`${row.name}-${row.city}`);

    console.log(`\n[${processedCount}/${total}] Cloning: ${row.name} (${slug}) ...`);

    try {
      const output = execSync(cmd, { encoding: "utf8", stdio: ["inherit", "pipe", "inherit"] });
      process.stdout.write(output);

      // Parse deployed URL from clone.js output
      let deployedUrl = "";
      if (dryRun) {
        deployedUrl = "dry-run";
      } else {
        const match = output.match(/DEPLOYED_URL:(.+)/);
        deployedUrl = match ? match[1].trim() : "UNKNOWN";
      }

      row.deployedUrl = deployedUrl;
      row.dateDeployed = new Date().toISOString();
      deployed++;
    } catch (err) {
      console.error(`FAILED: ${row.name} — ${err.message}`);
      failed++;
    }

    // Write CSV back after every row (crash-safe)
    writeCsv(csvPath, outputHeaders, rows);

    // Wait 20 seconds between deployments (skip after last one)
    if (!dryRun && processedCount < total) {
      console.log("Waiting 20 seconds before next deployment ...");
      execSync("sleep 20");
    }
  }

  // 3. Final summary
  console.log("\n=== Batch Summary ===");
  console.log(`  Deployed: ${deployed}`);
  console.log(`  Skipped:  ${skipped} (already deployed)`);
  console.log(`  Failed:   ${failed}`);
  console.log(`  CSV:      ${csvPath}`);
  console.log("=====================\n");
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

main();
