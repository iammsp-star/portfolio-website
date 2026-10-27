# Security Governance & Threat Mitigation Policy

## 1. Non-Negotiable Core Principles

This application adheres to zero-trust architecture principles. The browser client is treated as an inherently untrusted, potentially hostile execution environment.

---

## 2. Authentication & Route Protection

1. **Server-Side Verification:**
   - Client-side token presence checks are insufficient for security decisions.
   - Every protected route, Server Action, and Route Handler must verify session authenticity directly with Supabase via `auth.getUser()`.
   - Never rely on `auth.getSession()` on the server, as it does not validate the JWT against the authentication database.

2. **Session Cookie Security:**
   - Authentication cookies must be issued with strict attributes:
     - `HttpOnly`: Prevents access via client JavaScript and XSS vectors.
     - `Secure`: Transmitted exclusively over HTTPS.
     - `SameSite=Lax` (or `Strict` where practical): Mitigates Cross-Site Request Forgery (CSRF).

---

## 3. Database Isolation via PostgreSQL Row-Level Security (RLS)

1. **Mandatory RLS Activation:**
   Every table in the `public` schema must explicitly have RLS enabled:
   ```sql
   ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
   ```
2. **Explicit Granular Policies:**
   Default to total denial. Explicitly authorize actions on a per-command basis (`SELECT`, `INSERT`, `UPDATE`, `DELETE`):
   ```sql
   -- SELECT Policy
   CREATE POLICY "Users can only read their own projects"
   ON public.projects FOR SELECT
   TO authenticated
   USING (auth.uid() = user_id);

   -- INSERT Policy
   CREATE POLICY "Users can only create projects assigned to themselves"
   ON public.projects FOR INSERT
   TO authenticated
   WITH CHECK (auth.uid() = user_id);

   -- UPDATE Policy
   CREATE POLICY "Users can only update their own projects"
   ON public.projects FOR UPDATE
   TO authenticated
   USING (auth.uid() = user_id)
   WITH CHECK (auth.uid() = user_id);

   -- DELETE Policy
   CREATE POLICY "Users can only delete their own projects"
   ON public.projects FOR DELETE
   TO authenticated
   USING (auth.uid() = user_id);
   ```

---

## 4. Secrets & Environment Variable Management

1. **Client Isolation:**
   - Only variables that strictly dictate client presentation (e.g., public app URL, public Supabase anon key) may carry the `NEXT_PUBLIC_` prefix.
   - Master database connection strings (`DATABASE_URL`), `SUPABASE_SERVICE_ROLE_KEY`, Stripe secret keys, and encryption seeds must NEVER be prefixed with `NEXT_PUBLIC_`.
2. **Leak Detection:**
   - Automated git hooks and CI scanning (e.g., git-secrets or TruffleHog) must scan for accidental commits of `.env` files or secret tokens.
   - Never log authorization headers, passwords, or session tokens to application log streams.

---

## 5. Input Validation, Sanitization & File Upload Security

1. **Schema Validation:**
   - All input entering Server Actions or API routes must be parsed through strict Zod schemas with `.strip()` or strict key whitelisting to prevent prototype pollution and parameter injection.
2. **HTML / XSS Protection:**
   - Avoid `dangerouslySetInnerHTML`. If markdown rendering is required, sanitize all HTML nodes using an audited library (e.g., DOMPurify or sanitize-html) configured to strip `<script>`, `<iframe>`, `onload`, and javascript-protocol hrefs.
3. **File Upload Hardening:**
   - File uploads must validate:
     1. **MIME type whitelist** (e.g., `image/jpeg`, `image/png`, `application/pdf`). Never trust the client-provided file extension alone.
     2. **File size bounds** (maximum 5MB for images, 10MB for documents).
     3. **Storage isolation:** Store uploaded files with UUID-based keys in Supabase storage buckets protected by bucket-level RLS policies.
