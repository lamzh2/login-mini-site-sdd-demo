import { spawnSync } from "node:child_process";
import fs from "node:fs";

const [, , command, ...args] = process.argv;

if (!command) {
  console.error("Usage: node scripts/run-with-env-local.mjs <command> [...args]");
  process.exit(1);
}

const env = { ...process.env };

if (fs.existsSync(".env.local")) {
  for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) continue;

    let value = match[2];
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    env[match[1]] = value;
  }
}

const result = spawnSync(command, args, {
  stdio: "inherit",
  shell: process.platform === "win32",
  env
});

process.exit(result.status ?? 1);
