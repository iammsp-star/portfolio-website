# Design System Specification & Style Guide

## 1. Typography & Hierarchy

### Primary Font Families
- **Display & Headings:** `Outfit`, sans-serif (Weights: `600`, `700`, `800`)
- **Body & Interface:** `Inter`, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif (Weights: `400`, `500`, `600`)
- **Monospace & Code:** `JetBrains Mono`, "Fira Code", monospace (Weights: `400`, `500`)

### Type Scale Tokens
| Level | Font Size | Line Height | Tracking | Weight | Target Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `text-display` | `3.75rem` (60px) | `1.1` | `-0.025em` | `800` | Hero section headlines |
| `text-h1` | `2.5rem` (40px) | `1.2` | `-0.02em` | `700` | Page title headings (`h1`) |
| `text-h2` | `2.0rem` (32px) | `1.25` | `-0.015em` | `700` | Major section headers (`h2`) |
| `text-h3` | `1.5rem` (24px) | `1.3` | `-0.01em` | `600` | Subsection headers / card titles |
| `text-body` | `1.0rem` (16px) | `1.5` | `0em` | `400` | Default paragraph & input text |
| `text-small` | `0.875rem` (14px) | `1.4` | `0em` | `500` | Badges, metadata, form labels |
| `text-caption` | `0.75rem` (12px) | `1.4` | `0.01em` | `400` | Timestamps, helper messages |

---

## 2. Color Palette & Token Definitions

All colors are implemented using HSL tailored CSS custom properties with strict dark mode parity.

```css
:root {
  /* Neutral scale */
  --background: 220 20% 98%;           /* #F8FAFC */
  --foreground: 222 47% 11%;           /* #0F172A */
  --muted: 215 16% 47%;                /* #64748B */
  --muted-background: 210 40% 96%;     /* #F1F5F9 */
  --border: 214 32% 91%;               /* #E2E8F0 */
  --input: 214 32% 91%;                /* #E2E8F0 */
  --ring: 221 83% 53%;                 /* #2563EB */

  /* Brand & Accents */
  --primary: 221 83% 53%;              /* #2563EB */
  --primary-foreground: 210 40% 98%;   /* #FFFFFF */
  --secondary: 210 40% 96%;            /* #F1F5F9 */
  --secondary-foreground: 222 47% 11%; /* #0F172A */
  --accent: 262 83% 58%;               /* #7C3AED */
  --accent-foreground: 210 40% 98%;    /* #FFFFFF */

  /* Status Colors */
  --success: 142 71% 45%;              /* #16A34A */
  --warning: 38 92% 50%;               /* #F59E0B */
  --destructive: 0 84% 60%;            /* #EF4444 */
  --destructive-foreground: 0 0% 100%;
}

.dark {
  /* Dark Mode Palette */
  --background: 224 71% 4%;            /* #020617 (Deep obsidian) */
  --foreground: 210 40% 98%;           /* #F8FAFC */
  --muted: 215 20% 65%;                /* #94A3B8 */
  --muted-background: 222 47% 11%;     /* #0F172A */
  --border: 217 33% 17%;               /* #1E293B */
  --input: 217 33% 17%;                /* #1E293B */
  --ring: 217 91% 60%;                 /* #3B82F6 */

  --primary: 217 91% 60%;              /* #3B82F6 */
  --primary-foreground: 222 47% 11%;   /* #020617 */
  --secondary: 217 33% 17%;            /* #1E293B */
  --secondary-foreground: 210 40% 98%; /* #F8FAFC */
  --accent: 263 70% 66%;               /* #8B5CF6 */
  --accent-foreground: 0 0% 100%;

  --success: 142 71% 45%;              /* #22C55E */
  --warning: 38 92% 50%;               /* #FBBF24 */
  --destructive: 0 62% 30%;            /* #7F1D1D */
  --destructive-foreground: 210 40% 98%;
}
```

---

## 3. Component Specs & Design Tokens

### Button Variants
Every button must have a minimum target size of `44px` on touch viewports.
- **Primary:** `bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-4 py-2.5 rounded-lg shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- **Secondary:** `bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium px-4 py-2.5 rounded-lg border border-border transition-all focus-visible:ring-2 focus-visible:ring-ring`
- **Ghost:** `bg-transparent hover:bg-secondary text-foreground font-medium px-4 py-2.5 rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-ring`
- **Destructive:** `bg-destructive text-destructive-foreground hover:bg-destructive/90 font-medium px-4 py-2.5 rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-destructive`

### Elevation, Borders & Radii
- **Card Border Radius:** `rounded-xl` (`0.75rem` / `12px`) standard; `rounded-2xl` (`1.0rem` / `16px`) for modal dialogs and hero cards.
- **Card Styling:** `bg-card text-card-foreground border border-border shadow-sm backdrop-blur-sm`
- **Spatial Grid:** 4px geometric scaling (`space-1` = 4px, `space-2` = 8px, `space-3` = 12px, `space-4` = 16px, `space-6` = 24px, `space-8` = 32px, `space-12` = 48px).

---

## 4. UX & State Guidelines

### 1. Mobile-First Responsive Layouts
- Layouts are designed for `375px` viewport first, expanding cleanly to `768px` (tablets) and `1280px` / `1440px` (desktop).
- Touch targets must be at least `44px x 44px`.
- Tables must convert to stacked cards or support smooth horizontal overflow with visual cues on small viewports.

### 2. Loading States
- Never present an unstyled or flickering blank screen.
- Use animated pulse skeletons (`animate-pulse bg-muted/40 rounded`) mirroring the exact geometry of upcoming content cards and list items.
- Full-page or action-triggered loading states must feature a discreet, accessible spinner paired with `aria-live="polite"` feedback.

### 3. Empty States
- When queries yield zero records, render an `EmptyState` component containing:
  1. Semantic contextual illustration or icon.
  2. Clear heading explaining the status (e.g., "No projects created yet").
  3. Actionable description guiding next steps.
  4. Primary Call to Action (CTA) button (e.g., "Create First Project").

### 4. Error Boundaries & Form Guidelines
- Every critical route must feature an `error.tsx` displaying user-friendly recovery instructions with a "Try again" button.
- All form inputs require:
  - Explicit `<label>` elements linked with `htmlFor`.
  - Visible `:focus-visible` ring outline (never suppressed without an alternative indicator).
  - Inline error validation messages with `role="alert"` and `aria-invalid="true"`.
