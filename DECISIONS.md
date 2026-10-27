# Architectural Decision Records (ADRs)

This document records the foundational architectural decisions for this project. These decisions are binding; future changes require an explicit ADR update and rationale approval.

---

## ADR-001: Next.js App Router vs. Separate React SPA + Express Backend

### Context
When bootstrapping a modern full-stack application, teams frequently choose between a decoupled client/server architecture (e.g., Vite/React SPA + Node.js/Express REST API) versus a unified full-stack framework.

### Decision
We choose **Next.js App Router (React Server Components + Server Actions)**.

### Rationale
1. **Security & Data Fetching:** React Server Components (RSC) execute exclusively on the server, eliminating client-side API boilerplate, reducing JavaScript bundle size, and ensuring database and private integration keys are never exposed to browser runtimes.
2. **Simplified State & Mutation:** Next.js Server Actions replace REST endpoints with type-safe server functions directly callable from client buttons and forms.
3. **Optimized SEO & Performance:** Server-rendered initial HTML combined with streaming SSR delivers superior First Contentful Paint (FCP) and automatic OpenGraph/metadata generation.

### Consequences
- Team members must strictly understand the boundary between Server Components and Client Components (`"use client"`).
- Third-party libraries that rely on browser globals (`window`, `navigator`) must be wrapped within Client Components.

---

## ADR-002: Supabase with PostgreSQL Row Level Security (RLS) vs. Custom ORM Logic

### Context
Multi-tenant isolation and user data access rules can be enforced either at the application/ORM layer (e.g., Prisma queries with `where: { userId }`) or directly inside the database engine via PostgreSQL RLS.

### Decision
We enforce authorization at the database layer using **PostgreSQL Row Level Security (RLS)** via Supabase.

### Rationale
1. **Zero-Leak Guarantee:** Application-layer checks are susceptible to developer oversights (e.g., forgetting a `WHERE user_id = ...` clause). RLS enforces data boundaries at the SQL engine level; unauthorized rows cannot be selected or altered regardless of how the query is formulated.
2. **Direct Integration with Auth:** PostgreSQL policies can natively access `auth.uid()` from the active JWT provided by Supabase SSR.
3. **Type Generation:** Supabase CLI enables automated generation of accurate TypeScript interfaces directly from the database schema.

### Consequences
- All new database tables MUST have RLS explicitly enabled (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`).
- Developers must write and test explicit SQL policies for `SELECT`, `INSERT`, `UPDATE`, and `DELETE`.

---

## ADR-003: Tailwind CSS + Headless UI Primitives vs. Monolithic Component Frameworks

### Context
We evaluated pre-styled monolithic UI libraries (e.g., Material UI, Ant Design) against utility-first CSS paired with headless accessible primitives (Tailwind CSS + Radix UI / shadcn/ui).

### Decision
We adopt **Tailwind CSS paired with Radix UI headless primitives**.

### Rationale
1. **Design Control:** Monolithic frameworks impose heavy style overrides and opinionated DOM trees that fight against custom brand guidelines. Headless primitives provide full accessibility (WAI-ARIA compliance, keyboard navigation) while granting 100% control over CSS styles.
2. **Zero Runtime Overhead:** Tailwind compiles down to static, deduplicated atomic CSS classes with zero runtime JavaScript evaluation, ensuring optimal page load speeds.
3. **Dark Mode Parity:** CSS custom properties integrated with Tailwind make system/manual dark mode transitions instantaneous without CSS flashing.

### Consequences
- Component markup must maintain consistent use of shared tokenized classes rather than arbitrary ad-hoc pixel values.
