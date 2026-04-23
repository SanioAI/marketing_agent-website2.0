import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

function parseDotenv(contents) {
  const out = {};
  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) {
      out[key] = val;
    }
  }
  return out;
}

function loadEnvFile(rel) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) return;
  const contents = fs.readFileSync(p, "utf8");
  const parsed = parseDotenv(contents);
  for (const [k, v] of Object.entries(parsed)) {
    process.env[k] = v;
  }
}

// Mimic Next.js local env resolution for self-hosted standalone.
loadEnvFile(".env");
loadEnvFile(".env.local");

// Ensure static assets exist for standalone runtime.
const srcStatic = path.join(root, ".next", "static");
const dstStatic = path.join(root, ".next", "standalone", ".next", "static");
if (fs.existsSync(srcStatic) && !fs.existsSync(dstStatic)) {
  fs.mkdirSync(path.dirname(dstStatic), { recursive: true });
  fs.cpSync(srcStatic, dstStatic, { recursive: true });
}

const serverPath = path.join(root, ".next", "standalone", "server.js");
if (!fs.existsSync(serverPath)) {
  console.error("Missing standalone server. Run `npm run build` first.");
  process.exit(1);
}

await import(serverPath);

