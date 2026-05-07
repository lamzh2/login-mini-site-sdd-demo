# Login Mini Site Design

## Overview

Use Next.js App Router with Prisma and a hosted Postgres database. Authentication is implemented with server actions, bcrypt password hashing, and an httpOnly session cookie.

## Architecture

```text
Next.js App Router
-> Server Actions for register/login/logout
-> Prisma Client
-> Hosted Postgres database
-> httpOnly session cookie
-> Protected dashboard/profile page
```

## Pages

| Page | Route | Access |
| --- | --- | --- |
| Landing | `/` | Public |
| Register | `/register` | Public |
| Login | `/login` | Public |
| Dashboard | `/dashboard` | Authenticated |

## Data Model

```prisma
model User {
  id           String   @id @default(cuid())
  name         String
  email        String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
}
```

## Auth Flow

```text
Register
-> validate input
-> hash password
-> create user
-> create signed session cookie
-> redirect dashboard

Login
-> validate input
-> find user by email
-> compare password hash
-> create signed session cookie
-> redirect dashboard

Dashboard
-> read session cookie
-> resolve current user
-> redirect login if missing

Logout
-> clear session cookie
-> redirect home
```

## Boundary Definition

### Will Change

- Next.js app files.
- Prisma schema and database migration.
- Auth helper functions.
- Page components and server actions.
- Deployment config and environment setup.

### Will Not Change

- No external OAuth.
- No email delivery.
- No admin role model.
- No payment or billing.

## Validation Strategy

- Local validation: `npx prisma generate && npx prisma migrate dev --name init && npm run build`.
- Local smoke: run server and test pages/actions if environment is available.
- Deployment validation: use curl to verify GET/POST/auth behavior on Vercel URL.

## Deployment Strategy

- Create GitHub repository `login-mini-site-sdd-demo`.
- Push project source.
- Link/import with Vercel CLI.
- Add hosted Postgres integration and environment variables.
- Deploy production.
- Run E2E verification against production URL.

## Risks

- Vercel Marketplace database provisioning may require billing/interactive approval.
- Session signing secret must be generated and stored in Vercel env.
- Prisma migrations must run against production database before deployment works.
