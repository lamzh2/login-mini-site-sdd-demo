# 登录小网站任务拆解

> 外层：Kiro 风格 task。
> 内部：每个 task 都必须用 `smart-code-worker` 的 Visible Work Protocol 执行。
> 每个 task 产物：代码改动 + `worklogs/TXX.task.worklog.json`。

## Task T01 - 初始化 Next.js 项目与基础页面

### Summary

- Status: `[ ]`
- Goal: 初始化 Next.js App Router 项目，创建 `/`、`/register`、`/login`、`/dashboard` 四个页面的基础 UI。
- Requirement Trace: `REQ-001`, `REQ-004`, `NFR-003`
- Risk: `R1 Medium`

### Frame

- Problem: 需要一个可部署的基础站点骨架承载后续认证和数据库功能。
- Outcome: 页面路由存在，UI 可用，移动端基础可读。
- Non-Goals: 不实现真实认证逻辑；不连接数据库。
- Constraints: 不提交 token 或 secrets；保持页面简单但专业。

### Scope Boundary

- May Change: `package.json`, Next.js config, app pages, global styles.
- Must Not Change: skill files, global Codex config, unrelated experiments.
- File Scope: `experiments/login-mini-site/`

### Troubleshooting Protocol

- Trigger: dependency install/build errors, Next.js API uncertainty, repeated route/build failure.
- Freeze: record command, exit code, error, files, environment, attempts.
- Classify: environment / dependency-version / API-contract / code-logic / build-config / missing-docs.
- Hypothesize: up to 3 root causes with evidence and probes.
- Probe Limit: max 2 checks per hypothesis.
- Evidence Search: project files -> official docs -> GitHub issues/release notes.
- Search Query Limit: max 2 focused queries per layer.
- Missing Source Rule: record `not_found`.
- Direction Change Sentence 1: previous direction failed because `<root cause>`.
- Direction Change Sentence 2: new direction is more likely because `<evidence>`.
- Escalation Rule: 5 failed hypotheses debug note; 10 failed directions troubleshooting report.
- Verify After Fix: rerun project validation.
- Learn: capture setup/build notes.

### Build Protocol

- Red Step: no project exists; build should fail before initialization.
- Implementation Step: create Next.js project files and pages.
- Green Step: `npm run build` passes.

### Build Verification Gate

- Required Command: `npm run build`
- Project Command Match: Next.js project build.
- Required Evidence: command, exit code, key output.
- Cannot Mark Done Unless: build passes and worklog exists.
- If Failed: fix and rerun full validation.
- If Blocked: mark `[?]` and record exact blocker.

### Adversarial Review

- Requirement Coverage: `/`, `/register`, `/login`, `/dashboard` exist.
- Scope Drift: no auth/database yet.
- Security: no secrets committed.
- Regression: isolated to project directory.
- Evidence Quality: build output required.

### Deployment E2E Protocol

- Required If Deployed: `covered_by_final_task`
- Platform Ready Is Not Enough: final task validates production URL.
- GET / Read: `covered_by_final_task`
- POST / Submit: `covered_by_final_task`
- DELETE / Destructive: `not_applicable`
- XSS / Injection Input: `covered_by_final_task`
- Empty Content Rejection: `covered_by_final_task`
- Auth / Permission Boundary: `covered_by_final_task`
- If Any Check Fails: fix, redeploy, rerun full E2E.

### Checkpoint / Commit / Done Rule

- Build Passed: required
- Evidence Recorded: required
- Agent Documents / Knowledge Updated: use `specs/knowledge.md` if reusable.
- Review Passed: required
- Commit Allowed: only after verification and review.
- Mark `[x]` Allowed: only after evidence exists and commit is done or explicitly deferred.

### Learning

- Capture: Next.js setup command and build notes.

## Task T02 - 添加 Prisma 数据库模型和认证基础

### Summary

- Status: `[ ]`
- Goal: 添加 Prisma schema、User 模型、Prisma Client、密码哈希和 session cookie helper。
- Requirement Trace: `REQ-002`, `REQ-003`, `REQ-005`, `SEC-002`, `SEC-003`
- Risk: `R2 High`

### Frame

- Problem: 登录网站必须有真实持久用户数据和安全认证基础。
- Outcome: 数据模型、数据库 client、hash/verify、session helper 存在并可构建。
- Non-Goals: 不做 OAuth、邮件验证、密码重置。
- Constraints: secrets 只通过 env；数据库 URL 不写入源码。

### Scope Boundary

- May Change: Prisma schema, auth/database helpers, package dependencies, env examples.
- Must Not Change: token storage, unrelated pages beyond auth wiring.
- File Scope: `experiments/login-mini-site/`

### Troubleshooting Protocol

- Trigger: Prisma generate/migration/build errors, database env uncertainty, bcrypt runtime issues.
- Freeze: record command, exit code, error, files, environment, attempts.
- Classify: dependency-version / API-contract / build-config / database-env / code-logic.
- Hypothesize: up to 3 root causes with evidence and probes.
- Probe Limit: max 2 checks per hypothesis.
- Evidence Search: project files -> Prisma docs -> Next.js docs -> GitHub issues.
- Search Query Limit: max 2 focused queries per layer.
- Missing Source Rule: record `not_found`.
- Direction Change Sentence 1: previous direction failed because `<root cause>`.
- Direction Change Sentence 2: new direction is more likely because `<evidence>`.
- Escalation Rule: 5 failed hypotheses debug note; 10 failed directions troubleshooting report.
- Verify After Fix: rerun Prisma generate and build.
- Learn: capture Prisma/Vercel DB notes.

### Build Protocol

- Red Step: database/auth helpers missing.
- Implementation Step: install/add Prisma, schema, client, bcrypt/session helpers.
- Green Step: `npx prisma generate && npm run build` passes.

### Build Verification Gate

- Required Command: `npx prisma generate && npm run build`
- Project Command Match: Next.js + Prisma build.
- Required Evidence: command, exit code, key output.
- Cannot Mark Done Unless: generate/build pass and worklog exists.
- If Failed: fix and rerun full validation.
- If Blocked: mark `[?]` and record exact blocker.

### Adversarial Review

- Requirement Coverage: User model, hash, session helper.
- Scope Drift: no unnecessary auth provider.
- Security: secrets not committed; password hashing present.
- Regression: pages still build.
- Evidence Quality: generate/build output required.

### Deployment E2E Protocol

- Required If Deployed: `covered_by_final_task`
- Platform Ready Is Not Enough: final task validates production URL.
- GET / Read: `covered_by_final_task`
- POST / Submit: `covered_by_final_task`
- DELETE / Destructive: `not_applicable`
- XSS / Injection Input: `covered_by_final_task`
- Empty Content Rejection: `covered_by_final_task`
- Auth / Permission Boundary: `covered_by_final_task`
- If Any Check Fails: fix, redeploy, rerun full E2E.

### Checkpoint / Commit / Done Rule

- Build Passed: required
- Evidence Recorded: required
- Agent Documents / Knowledge Updated: use `specs/knowledge.md` if reusable.
- Review Passed: required
- Commit Allowed: only after verification and review.
- Mark `[x]` Allowed: only after evidence exists and commit is done or explicitly deferred.

### Learning

- Capture: Prisma DB and session notes.

## Task T03 - 实现注册、登录、登出和受保护页面

### Summary

- Status: `[ ]`
- Goal: 实现注册、登录、登出 server actions，保护 dashboard，展示当前用户。
- Requirement Trace: `REQ-002`, `REQ-003`, `REQ-004`, `SEC-004`, `SEC-005`
- Risk: `R2 High`

### Frame

- Problem: 网站需要完整认证闭环，而不是只有 UI 和数据库模型。
- Outcome: 用户可注册、登录、访问 dashboard、登出；错误安全。
- Non-Goals: 不做邮件验证、密码重置、角色系统。
- Constraints: 不暴露用户枚举；不记录密码；输入安全渲染。

### Scope Boundary

- May Change: auth actions, pages, validation helpers, dashboard.
- Must Not Change: database provider setup outside env; deployment config unless required.
- File Scope: `experiments/login-mini-site/`

### Troubleshooting Protocol

- Trigger: server action/cookie/redirect/build/database runtime errors.
- Freeze: record command, exit code, error, files, environment, attempts.
- Classify: API-contract / code-logic / database-env / build-config / session.
- Hypothesize: up to 3 root causes with evidence and probes.
- Probe Limit: max 2 checks per hypothesis.
- Evidence Search: project files -> Next.js docs -> Prisma docs -> GitHub issues.
- Search Query Limit: max 2 focused queries per layer.
- Missing Source Rule: record `not_found`.
- Direction Change Sentence 1: previous direction failed because `<root cause>`.
- Direction Change Sentence 2: new direction is more likely because `<evidence>`.
- Escalation Rule: 5 failed hypotheses debug note; 10 failed directions troubleshooting report.
- Verify After Fix: rerun build and auth smoke checks.
- Learn: capture server action/auth notes.

### Build Protocol

- Red Step: auth actions absent; dashboard unprotected.
- Implementation Step: implement validation, register/login/logout actions, current user resolution, protected dashboard.
- Green Step: build passes and local smoke can register/login if DB env exists.

### Build Verification Gate

- Required Command: `npm run build`
- Project Command Match: Next.js auth build.
- Required Evidence: command, exit code, key output; local smoke if database env exists.
- Cannot Mark Done Unless: build passes and worklog exists.
- If Failed: fix and rerun full validation.
- If Blocked: mark `[?]` and record exact blocker.

### Adversarial Review

- Requirement Coverage: register/login/dashboard/logout.
- Scope Drift: no extra auth features.
- Security: generic login errors, no password logs, text rendering.
- Regression: public pages still accessible.
- Evidence Quality: build output and smoke notes.

### Deployment E2E Protocol

- Required If Deployed: `covered_by_final_task`
- Platform Ready Is Not Enough: final task validates production URL.
- GET / Read: `covered_by_final_task`
- POST / Submit: `covered_by_final_task`
- DELETE / Destructive: `not_applicable`
- XSS / Injection Input: `covered_by_final_task`
- Empty Content Rejection: `covered_by_final_task`
- Auth / Permission Boundary: `covered_by_final_task`
- If Any Check Fails: fix, redeploy, rerun full E2E.

### Checkpoint / Commit / Done Rule

- Build Passed: required
- Evidence Recorded: required
- Agent Documents / Knowledge Updated: use `specs/knowledge.md` if reusable.
- Review Passed: required
- Commit Allowed: only after verification and review.
- Mark `[x]` Allowed: only after evidence exists and commit is done or explicitly deferred.

### Learning

- Capture: auth action and cookie gotchas.

## Task T04 - GitHub 推送、Vercel 数据库、部署和线上 E2E

### Summary

- Status: `[ ]`
- Goal: 创建 GitHub 仓库，配置 Vercel 项目和数据库，部署生产站点并完成线上 E2E 验证。
- Requirement Trace: `REQ-005`, `REQ-006`, Deployment E2E Requirements
- Risk: `R3 Critical`

### Frame

- Problem: 本实验必须证明端到端交付，而不是只在本地运行。
- Outcome: GitHub repo、Vercel live URL、数据库、生产 E2E 证据齐全。
- Non-Goals: 不保留用户 tokens；不公开 secrets；不做复杂监控。
- Constraints: tokens 只用于进程环境；部署后用户会撤销 tokens。

### Scope Boundary

- May Change: git repo, Vercel project, env vars, production deployment, migration scripts.
- Must Not Change: global secrets files, unrelated repositories.
- File Scope: `experiments/login-mini-site/`

### Troubleshooting Protocol

- Trigger: GitHub API errors, Vercel CLI errors, database integration blocked, migration/deploy/E2E failure.
- Freeze: record command, exit code, sanitized error, files, environment, attempts.
- Classify: permission / token / marketplace-billing / database-env / build-config / runtime / E2E.
- Hypothesize: up to 3 root causes with evidence and probes.
- Probe Limit: max 2 checks per hypothesis.
- Evidence Search: Vercel docs -> GitHub API docs -> provider docs -> issues.
- Search Query Limit: max 2 focused queries per layer.
- Missing Source Rule: record `not_found`.
- Direction Change Sentence 1: previous direction failed because `<root cause>`.
- Direction Change Sentence 2: new direction is more likely because `<evidence>`.
- Escalation Rule: 5 failed hypotheses debug note; 10 failed directions troubleshooting report.
- Verify After Fix: rerun deploy/E2E.
- Learn: capture deployment gotchas without tokens.

### Build Protocol

- Red Step: no repo/deployment/database exists.
- Implementation Step: create repo, push, provision DB/env, deploy, run migrations, run E2E.
- Green Step: production E2E passes.

### Build Verification Gate

- Required Command: `npm run build` before deploy; Vercel production deploy; curl E2E after deploy.
- Project Command Match: production delivery validation.
- Required Evidence: repo URL, deployment URL, command outputs, HTTP statuses and bodies.
- Cannot Mark Done Unless: production E2E passes and worklog exists.
- If Failed: fix, redeploy, rerun complete E2E.
- If Blocked: mark `[?]`, record root cause and report user.

### Adversarial Review

- Requirement Coverage: database, repo, deployment, E2E.
- Scope Drift: no unrelated repos or secrets.
- Security: tokens not committed or printed; env vars in Vercel only.
- Regression: production build matches local build.
- Evidence Quality: live URL and curl evidence required.

### Deployment E2E Protocol

- Required If Deployed: `required`
- Platform Ready Is Not Enough: verify status code, response body, and auth behavior.
- GET / Read: `required`, home/register/login/dashboard redirects.
- POST / Submit: `required`, register/login/logout.
- DELETE / Destructive: `not_applicable`, no delete feature.
- XSS / Injection Input: `required`, registered name with script-like text renders safely.
- Empty Content Rejection: `required`, empty register/login rejected.
- Auth / Permission Boundary: `required`, dashboard requires session.
- If Any Check Fails: fix, redeploy, rerun full E2E.

### Checkpoint / Commit / Done Rule

- Build Passed: required
- Evidence Recorded: required
- Agent Documents / Knowledge Updated: use `specs/knowledge.md` if reusable.
- Review Passed: required
- Commit Allowed: only after verification and review.
- Mark `[x]` Allowed: only after evidence exists and commit is done or explicitly deferred.

### Learning

- Capture: Vercel DB/deploy/E2E notes without secrets.
