# Login Mini Site Requirements

## Background

This project is an end-to-end experiment for the two-skill workflow. It must produce a small deployable website with login, database persistence, GitHub push, Vercel deployment, and deployment verification.

## Goal

Build and deploy a 3-4 page authenticated mini site:

- Home / landing page.
- Register page.
- Login page.
- Authenticated dashboard / profile page.

The site must use a real hosted database on Vercel-compatible infrastructure.

## Non-Goals

- No social login.
- No password reset.
- No email verification.
- No admin panel.
- No payment or billing.
- No complex role system.

## Functional Requirements

### REQ-001 Landing Page

The site must show a public landing page with navigation to register and login.

Acceptance criteria:

- Home page is accessible without authentication.
- Home page contains links to register and login.
- Home page explains the demo purpose.

### REQ-002 User Registration

The site must allow a visitor to create an account with name, email, and password.

Acceptance criteria:

- Empty name, invalid email, or short password is rejected.
- Duplicate email is rejected safely.
- Password is hashed before storage.
- Successful registration creates a user record in the database.

### REQ-003 User Login

The site must allow an existing user to login.

Acceptance criteria:

- Invalid credentials are rejected with a safe generic message.
- Successful login creates a server-side session cookie.
- Password is not logged or returned.

### REQ-004 Authenticated Dashboard

The site must show an authenticated dashboard or profile page.

Acceptance criteria:

- Unauthenticated users are redirected to login.
- Authenticated users can see their name and email.
- User can logout.

### REQ-005 Database Persistence

The site must use a hosted Postgres-compatible database.

Acceptance criteria:

- User data persists after deployment.
- Database schema is defined in source control.
- Production deployment has database environment variables configured.

### REQ-006 Deployment

The site must be pushed to GitHub and deployed to Vercel.

Acceptance criteria:

- GitHub repository exists and contains the project.
- Vercel deployment is live.
- Deployment URL is recorded.

## Non-Functional Requirements

- NFR-001 Build: `npm run build` must pass.
- NFR-002 Security: password hashing and safe error messages are required.
- NFR-003 UX: pages must be usable on mobile and desktop.
- NFR-004 Maintainability: auth and database code must be small and understandable.

## Security Constraints

- SEC-001 Do not commit secrets or tokens.
- SEC-002 Passwords must be hashed with bcrypt or equivalent.
- SEC-003 Session cookie must be httpOnly.
- SEC-004 User input must be rendered as text, not unsafe HTML.
- SEC-005 Login errors must not reveal whether an email exists.

## Deployment E2E Requirements

After deployment, verify:

- GET home page.
- GET register page.
- POST register.
- POST login.
- GET authenticated dashboard.
- XSS-safe user input.
- Empty content rejection.
- Logout.

## Open Questions / Assumptions

- Database provider will be Vercel Marketplace Prisma Postgres if CLI provisioning works.
- If marketplace provisioning is blocked, a documented fallback will be selected and reported.
- GitHub repository name will be `login-mini-site-sdd-demo` unless unavailable.
