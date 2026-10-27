# Engineering & Development Rules

These rules are strict, non-negotiable standards binding upon all developers and AI pair programmers working within this repository.

---

### Rule 1: TypeScript Strictness — Zero Tolerance for `any`
- Every variable, parameter, return type, and API boundary must be strictly typed.
- The use of `any` is strictly prohibited. If a type is genuinely polymorphic or unknown at compile time, use `unknown` accompanied by explicit type narrowing or Zod parsing.
- Keep `tsconfig.json` set with `"strict": true` and `"noImplicitAny": true`.

### Rule 2: Component Reuse Over Duplication
- Always inspect `components/ui/` and `components/shared/` before creating a new UI element.
- Do not build bespoke buttons, input fields, badges, or dialogs if existing primitives can be extended or configured via variant props.
- Keep shared design primitives decoupled from specific database entities or route queries.

### Rule 3: Function Modularity & Single Responsibility
- Keep individual functions small, focused, and pure where possible (ideally under 40 lines).
- Extract data transformation logic, formatters, and complex condition trees into dedicated utility modules under `lib/` or service modules under `server/services/`.

### Rule 4: Strict Task Scoping — Never Touch Unrelated Files
- Restrict modifications exclusively to the files required to fulfill the active task.
- Do NOT perform unsolicited refactoring, formatting sweeps, or dependency removals on unrelated parts of the codebase.
- Preserve existing comments and docstrings.

### Rule 5: Read Documentation Before Implementing
- Before utilizing complex third-party libraries (e.g., GSAP ScrollSmoother, Three.js shaders, Supabase SSR helpers, Stripe SDK), consult active documentation or local reference skills.
- Do not guess library APIs or pass invented parameters.

### Rule 6: Plan Large Changes Before Execution
- For tasks spanning multiple components, schema migrations, or state rewires, produce a clear bulleted plan or architectural breakdown before modifying code.
- Align on data schemas and interface contracts prior to editing UI layers.

### Rule 7: Validate All User Input with Zod
- Every form submission, Server Action payload, and Route Handler request body MUST be validated using a Zod schema.
- Validate on the server side even if client-side validation is already performed. Never trust client payload data blindly.

### Rule 8: Absolute Secrecy of Private Keys & Secrets
- Never expose private keys, database URLs, service role secrets, or encryption keys to the client.
- Prefix ONLY public-facing variables with `NEXT_PUBLIC_`.
- Run checks to ensure secrets are never logged in console outputs or committed to git.

### Rule 9: Automated Tests for Critical Logic
- Provide automated unit or integration tests for critical business calculations, authentication state transitions, and authorization checks.
- Test both the happy path and malicious/invalid edge cases (e.g., unauthorized access, malformed payloads).

### Rule 10: Atomic, Descriptive Git Commits
- Commit early and make commits focused on a single atomic concern.
- Use Conventional Commits formatting:
  - `feat: <description>` (new capabilities)
  - `fix: <description>` (bug fixes)
  - `refactor: <description>` (cleanups without behavior changes)
  - `test: <description>` (adding or modifying tests)
  - `docs: <description>` (documentation updates)
