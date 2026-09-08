# Skill-Bridge — Agent Instructions

## 1. SOURCE OF TRUTH

The existing repository is the source of truth.

This project already has an established:
- UI/UX
- visual design system
- page structure
- business logic
- user flows
- API structure
- database structure
- authentication/authorization behavior
- component architecture

Do NOT reinterpret or redesign existing functionality unless the user explicitly asks for it.

When unsure, preserve the existing behavior.

---

## 2. CORE RULE — MINIMAL CHANGE

For every task:

1. Inspect the existing implementation first.
2. Identify the smallest set of files that actually need changes.
3. Modify only what is necessary.
4. Preserve everything else.
5. Reuse existing components, utilities, styles, patterns, and APIs.
6. Do not rewrite working code just because another implementation is preferred.

Do NOT:
- redesign pages
- change layouts
- change colors
- change typography
- change spacing
- replace components
- rename routes
- rename APIs
- change database fields
- change business rules
- restructure the project

unless explicitly required by the task.

---

## 3. UI PRESERVATION

Existing UI is intentional.

Before changing UI code, inspect:
- the page
- parent layout
- existing components
- Tailwind/classes/styles
- responsive behavior
- related pages

Preserve the current visual result.

Do NOT "improve" the design automatically.

Do NOT:
- introduce a new design system
- replace existing components with another library
- alter responsive breakpoints unnecessarily
- change animations/transitions unnecessarily
- modify existing spacing or sizing without a requirement
- replace icons unnecessarily
- simplify UI by removing existing functionality

If a task requires a UI change, change ONLY the requested portion.

---

## 4. BUSINESS LOGIC PRESERVATION

Existing business logic must remain unchanged unless the task explicitly modifies it.

Before changing logic:
- trace the current flow
- inspect related API routes
- inspect consumers of the function
- inspect state management
- inspect validation
- inspect persistence

Do not assume existing logic is wrong simply because it differs from your preferred approach.

If the requested change conflicts with existing behavior, identify the conflict before making unrelated changes.

---

## 5. API PRESERVATION

Preserve existing API contracts unless the task explicitly requires a breaking change.

Do NOT casually change:
- endpoint paths
- HTTP methods
- request fields
- response fields
- status codes
- error formats
- authentication requirements

When modifying an API, inspect its callers and update them only when necessary.

---

## 6. DATABASE PRESERVATION

Treat the existing database schema and data model as intentional.

Before changing database-related code:
1. Inspect the current schema.
2. Inspect existing queries.
3. Inspect all consumers.
4. Determine whether the change requires migration.

Do NOT:
- drop tables
- delete columns
- rename columns
- reset databases
- destroy existing data

unless explicitly authorized.

Never create destructive migrations as a shortcut.

---

## 7. AUTHENTICATION & SECURITY

Security changes require extra caution.

Never weaken existing authentication or authorization.

Never:
- hardcode credentials
- expose secrets
- expose authentication tokens unnecessarily
- bypass authorization
- trust client-provided identity for protected operations
- disable RLS
- disable security middleware
- remove security headers without justification
- commit `.env` files or secrets

When working on authentication, inspect the entire authentication flow rather than modifying one file in isolation.

Current security work may be incomplete. Do not assume an existing security implementation is production-ready merely because it exists.

---

## 8. FILE SAFETY

Before modifying files:

Inspect `git status`.

Do not overwrite unrelated uncommitted work.

Do not:
- reset the repository
- force-push
- rewrite Git history
- delete user work
- run destructive cleanup commands

unless explicitly requested.

Never use:
```bash
git reset --hard
git clean -fd
git push --force