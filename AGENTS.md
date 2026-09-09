# Skill-Bridge — Agent Instructions

## 1. SOURCE OF TRUTH

The existing repository is the source of truth for code, UI patterns, and component architecture.
Supabase is the single source of truth for persistent application data (see Section 11: Data Source Rule).

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
Persistent application data is governed by Section 11 (Data Source Rule).

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
```

---

## 9. UI / DESIGN SYSTEM RULES

Skill-Bridge uses shadcn/ui as the standard frontend UI foundation.

The following components are installed and should be reused instead of creating duplicate custom implementations:
- Sidebar
- Skeleton
- Sonner
- Table
- Tabs
- Alert
- Alert Dialog
- Typeset/Typography

Rules:
- Prefer existing shadcn/ui components before creating custom equivalents.
- Keep UI consistent across Student, Faculty, Industry, Campus and Admin portals.
- Use Skeleton for loading states instead of fake/loading data.
- Use Sonner for transient success/error feedback.
- Use Alert for persistent contextual information.
- Use Alert Dialog for destructive/consequential confirmations.
- Use Table for data-heavy interfaces where appropriate.
- Use Tabs when content naturally belongs to separate sections.
- Use Typeset/Typography for consistent content hierarchy and long-form content.
- Do not install duplicate UI libraries without explicit approval.
- Do not create duplicate versions of existing shadcn components.
- Preserve responsive and accessible behavior.

### Shared Sidebar
- Skill Bridge uses shadcn/ui Sidebar as the standard shared sidebar foundation.
- Do not create duplicate custom sidebar implementations.
- Preserve role-based navigation and routing.
- Use shadcn Sidebar primitives for sidebar structure, collapse and responsive behavior.
- Use ScrollArea/ScrollBar for clean sidebar scrolling: `SidebarContent` acts as the `flex-1 min-h-0 overflow-hidden` wrapper hosting `<ScrollArea className="h-full">`, containing compact vertical items (`h-auto shrink-0`).
- Ensure `SidebarMenuButton` cleanly renders direct children as well as `asChild` composition.
- Avoid unnecessary nested scroll containers.

### Profile Avatar
- The Document Submission Passport Sized Photo is the canonical student profile/avatar photo.
- Do not create a second profile-photo upload system.
- Reuse the existing stored/referenceable photo.
- Do not use fake/static avatar data.
- Future persistent avatar storage must follow the Supabase-only architecture.
- Private student files must remain protected.

---

## 10. FRONTEND / BACKEND ARCHITECTURE

The project is being organized into strict frontend/backend separation.

`frontend/`:
- Contains frontend/UI code only.
- React/Next.js pages, components, styling, hooks and client-side presentation logic.
- No backend implementation should be placed here except the minimum frontend API client/request layer required to communicate with the backend.

`backend/`:
- Contains backend/server-side code only.
- APIs, authentication/authorization, RBAC, business logic, validation, AI integrations, server-side services and database access belong here.
- DO NOT put frontend pages, React UI components, Tailwind UI, shadcn UI or presentation code inside `backend/`.

---

## 11. DATA SOURCE RULE

SUPABASE IS THE SINGLE SOURCE OF TRUTH FOR PERSISTENT APPLICATION DATA.

Do NOT use:
- Static arrays as persistent application data
- Mock databases
- Local JSON as a database
- localStorage as a replacement for the database
- In-memory persistence
- Duplicate sources of truth

Persistent data must ultimately be stored/retrieved through Supabase.

- Use Supabase PostgreSQL for structured data.
- Use Supabase Auth for authentication where applicable.
- Use Supabase Storage for private user documents/files.
- Use Supabase RLS and server-side authorization to protect data.

Never expose Supabase service-role credentials in frontend code.

---

## 12. IMPLEMENTATION RULES

- READ AGENTS.md BEFORE EVERY TASK.
- Do not make assumptions when an existing implementation can be inspected.
- Reuse existing components and architecture.
- Do not create fake data to make a feature appear functional.
- Do not silently replace working functionality.
- Do not modify unrelated areas of the application.
- Keep changes within the requested scope.
- Verify changes with TypeScript/build checks when applicable.
- When implementing a requested feature, ACTUALLY MODIFY THE CODE rather than only providing recommendations or an implementation plan.

---

## 13. FACULTY ROLE & ARCHITECTURE RULES

Faculty is an academic/institutional role responsible for monitoring and supporting their authorized/assigned cohort of students.

### Boundaries & Permissions
- **Academic Monitoring Role Only**: Faculty monitors student progress, skill gaps, learning development, and placement journeys. Faculty is **NOT** an Admin, **NOT** an Industry hiring authority, and **NOT** a Campus administrator.
- **Assigned Student Scope**: Faculty can ONLY access authorized students within their assigned cohort/department. They are strictly unauthorized to view unrelated student profiles, private submissions, or sensitive records outside their purview.
- **Not a Hiring Authority**: Industry owns screening, shortlisting, interviewing, and final hiring decisions. Faculty has monitoring visibility into the placement funnel (Eligible → Applied → Shortlisted → Interviewed → Selected → Placed) but must never be given hiring controls, evaluation overrides, or candidate selection actions.
- **Authoritative Data Integrity**: Faculty may view authoritative results (e.g., Knowledge Testing scores, Skill Gap diagnoses). Faculty must not be allowed to arbitrarily alter, forge, or override standardized test scores or gap results.

### Component & UI Standards
- **Shared shadcn Sidebar**: Faculty navigation must use the canonical shadcn Sidebar structure (`Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarRail`, `ScrollArea`). Do not build custom sidebars.
- **Standard Navigation Groups**:
  - MAIN: Dashboard
  - STUDENTS: My Students, Student Progress
  - DEVELOPMENT: Skill Gaps, Learning / Mentoring
  - OPPORTUNITIES: Applications, Placement Progress
  - INSIGHTS: Reports
  - ACCOUNT: Profile, Settings
- **Design System Consistency**: Use standard shadcn components (`Table` for primary student data, `Tabs` for student details, `Skeleton` for all loading states, `Sonner` for feedback, `Alert` for warnings, `Progress` indicators, and `Badge` for status).
- **Profile / Avatar**: Reuse the canonical student photo / initial avatar. Do not create duplicate photo upload systems.
- **Zero Fake Data**: Metrics, charts, tables, and pipeline counters must be computed dynamically from active data sources. If data is absent for a student or metric, render explicit, honest empty or unassessed states.

---

## 14. ADMIN LIVE UPDATES & ACTIVITY MONITORING ARCHITECTURE

Admin is the central platform oversight role responsible for monitoring system health, institutional activity, approvals, compliance, and placement operations across all portals.

### Core Realtime Principles
- **Authoritative Data Source**: Supabase remains the single source of truth for all platform entities. In local development or until Supabase is provisioned, the authoritative database is `frontend/data/skill_bridge.json`. Never use `localStorage` as a database or create in-memory mock persistence.
- **Never Fake Realtime**: If real Supabase Realtime credentials (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are not configured, DO NOT fake realtime using `setInterval`, `setTimeout` loops, random refreshes, or mock WebSocket events. Display an explicit, transparent telemetry status indicator (`Standby / Unconfigured`) and allow manual synchronization.
- **Scoped Subscriptions & Teardown**: When Supabase Realtime is connected, subscriptions must be strictly scoped to Admin-visible tables (`hiring_requests`, `campus_requests`, `student_verifications`, `job_applications`, `industry_hiring_posts`, `education_programs`, `users`, `audit_logs`). Subscriptions must clean up on unmount, deduplicate events by event key (`${table}:${eventType}:${id}`), and handle reconnects safely without memory leaks.
- **Admin Authorization & Privacy**: Realtime payloads and administrative updates must respect RBAC. Never broadcast private message contents, confidential student records, or unauthenticated identities through public realtime channels.

### Monitored Entities & Live Updates
- **Faculty Activity**: Registrations, profile updates, approvals, suspensions/deactivations, department updates, and course contributions.
- **Industry Activity**: Recruiter registrations, company verifications, hiring freeze toggles, job postings, internship postings, and compliance alerts.
- **Campus Activity**: Institution registrations, curriculum verification drives, student batch uploads, campus suspensions, and placement schedule updates.
- **Members & Students**: Student registrations, document verification submissions, status transitions, and placement milestones.
- **Posts & Education Drives**: New programs published, curriculum updates, enrollment telemetry, and program completions.
- **Jobs, Internships & Applications**: Live funnel transitions (`Applied → Shortlisted → Interviewed → Selected → Placed`).
- **Centralized Approvals Queue**: Live counter badges, pending queue tables, and single-click approval/rejection workflows with audit ledger persistence.