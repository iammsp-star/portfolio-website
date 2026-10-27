# Comprehensive Test Plan & Verification Specification

## 1. Definition of "Working"

In this application, a feature or component is strictly classified as **"working"** only when all of the following conditions are met:
1. **Compilation & Type Safety:** Compiles with zero TypeScript errors under strict mode (`tsc --noEmit` exits with code 0).
2. **Lint Cleanliness:** Passes ESLint with zero warnings or errors.
3. **Runtime Stability:** Executes in the browser and server without uncaught runtime exceptions or React console hydration warnings.
4. **Data Isolation (RLS):** Data transactions verifiably respect tenant boundaries; no user can inspect or alter unowned rows.
5. **Responsive Integrity:** Renders without horizontal scroll bleed or UI breakage across mobile, tablet, and desktop viewports.
6. **Graceful Degeneration:** Renders accessible loading skeletons during async operations and actionable error boundaries upon failure.

---

## 2. Security & Row-Level Security (RLS) Verification

Multi-tenant data isolation must be verified using automated test fixtures simulating distinct authenticated sessions:

```typescript
// Example verification test logic
describe("PostgreSQL Row-Level Security (RLS) Enforcement", () => {
  it("strictly prevents User A from selecting User B's private records", async () => {
    const userAClient = createTestSupabaseClient(USER_A_JWT);
    const userBClient = createTestSupabaseClient(USER_B_JWT);

    // Seed record owned by User B
    const { data: userBRecord } = await userBClient
      .from("projects")
      .insert({ title: "User B Confidential", user_id: USER_B_ID })
      .select()
      .single();

    // Query attempt by User A
    const { data: queriedRecords, error } = await userAClient
      .from("projects")
      .select("*")
      .eq("id", userBRecord.id);

    // Assertion: RLS must return an empty set or null, never User B's payload
    expect(queriedRecords).toHaveLength(0);
    expect(error).toBeNull();
  });

  it("strictly rejects User A attempting to update or delete User B's record", async () => {
    const userAClient = createTestSupabaseClient(USER_A_JWT);

    const { error } = await userAClient
      .from("projects")
      .update({ title: "Hacked by User A" })
      .eq("id", USER_B_RECORD_ID);

    // Assertion: 0 rows updated
    const { data: checkRecord } = await userBClient
      .from("projects")
      .select("title")
      .eq("id", USER_B_RECORD_ID)
      .single();

    expect(checkRecord.title).toBe("User B Confidential");
  });
});
```

---

## 3. Responsive Testing Viewports & Matrix

Every page must be evaluated and verified against the following target resolutions:

| Viewport Category | Width x Height | Primary Validation Criteria |
| :--- | :--- | :--- |
| **Mobile** | `375px x 667px` / `390px x 844px` | Hamburger / bottom navigation visible; touch targets >= `44px`; zero horizontal scrolling; cards stack vertically; form inputs do not auto-zoom (font size >= `16px`). |
| **Tablet** | `768px x 1024px` | Adaptive navigation (sidebar collapsed or compact top bar); 2-column card grids; modals adapt to viewport width with comfortable margins. |
| **Desktop** | `1440px x 900px` (and up to 4K) | Persistent multi-level sidebar navigation; full multi-column data tables; max container width constrained (`max-w-7xl`) to prevent content over-stretching. |

---

## 4. Functional & User Flow Verification Checklist

### Authentication
- [ ] Submitting valid credentials signs user in and redirects to `/dashboard`.
- [ ] Submitting invalid credentials shows accessible inline error banner without page crash.
- [ ] Expired session tokens trigger smooth refresh via middleware without dropping the user.

### Forms & Mutations
- [ ] Submitting malformed data (invalid email, too short password) triggers instantaneous Zod validation feedback under the corresponding input.
- [ ] Server action mutations display pending state (disabled button with spinner) to prevent duplicate submissions.
- [ ] Successful actions trigger immediate toast feedback and revalidate the page cache.

### Accessibility (a11y)
- [ ] Entire interface navigatable using `Tab`, `Shift+Tab`, `Space`, `Enter`, and `Escape`.
- [ ] Color contrast ratios strictly meet WCAG 2.1 AA requirements (minimum 4.5:1 for body text, 3:1 for large text).
