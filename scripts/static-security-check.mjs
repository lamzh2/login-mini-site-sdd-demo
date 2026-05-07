import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = [
  "lib/actions.ts",
  "lib/password.ts",
  "lib/session.ts",
  "lib/validation.ts",
  "app/register/register-form.tsx",
  "app/login/login-form.tsx",
  "app/dashboard/page.tsx",
  "prisma/schema.prisma"
];

function read(file) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) throw new Error(`Missing ${file}`);
  return fs.readFileSync(fullPath, "utf8");
}

const contents = Object.fromEntries(files.map((file) => [file, read(file)]));
const combined = Object.values(contents).join("\n");

if (combined.includes("innerHTML")) throw new Error("innerHTML must not be used.");
if (/console\.(log|debug|info)\([^)]*password/i.test(combined)) throw new Error("Password values must not be logged.");
if (!contents["lib/password.ts"].includes("bcrypt")) throw new Error("bcrypt password hashing is required.");
if (!contents["lib/session.ts"].includes("httpOnly: true")) throw new Error("Session cookie must be httpOnly.");
if (!contents["lib/actions.ts"].includes("Email or password is incorrect.")) throw new Error("Generic login error is required.");
if (!contents["prisma/schema.prisma"].includes("email        String   @unique")) throw new Error("User email must be unique.");

console.log("STATIC_SECURITY_CHECK_PASSED");
