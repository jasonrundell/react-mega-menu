# Design Tokens & Code Translation Reference

Patterns for translating brand identity tokens into implementation-ready code artifacts.

## Token Architecture

Tokens are organized in three tiers:

```
Global tokens  →  Semantic tokens  →  Component tokens
(raw values)      (purpose-mapped)     (scoped to UI)
```

| Tier      | Example                      | Changes when...          |
| --------- | ---------------------------- | ------------------------ |
| Global    | `blue-500: #3B82F6`          | Brand palette changes    |
| Semantic  | `color-primary: {blue-500}`  | Role assignment changes  |
| Component | `button-bg: {color-primary}` | Component design changes |

Code should reference **semantic** or **component** tokens, never globals directly.

## Tailwind CSS Translation

### Full Theme Extension

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "var(--brand-50)",
          100: "var(--brand-100)",
          200: "var(--brand-200)",
          300: "var(--brand-300)",
          400: "var(--brand-400)",
          500: "var(--brand-500)",
          600: "var(--brand-600)",
          700: "var(--brand-700)",
          800: "var(--brand-800)",
          900: "var(--brand-900)",
          950: "var(--brand-950)",
        },
        accent: {
          50: "var(--accent-50)",
          // ... full ramp
          950: "var(--accent-950)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        caption: [
          "var(--text-caption)",
          { lineHeight: "var(--leading-caption)" },
        ],
        body: ["var(--text-body)", { lineHeight: "var(--leading-body)" }],
        "body-lg": [
          "var(--text-body-lg)",
          { lineHeight: "var(--leading-body-lg)" },
        ],
        h4: ["var(--text-h4)", { lineHeight: "var(--leading-h4)" }],
        h3: ["var(--text-h3)", { lineHeight: "var(--leading-h3)" }],
        h2: ["var(--text-h2)", { lineHeight: "var(--leading-h2)" }],
        h1: ["var(--text-h1)", { lineHeight: "var(--leading-h1)" }],
        display: [
          "var(--text-display)",
          { lineHeight: "var(--leading-display)" },
        ],
      },
      borderRadius: {
        brand: "var(--radius-brand)",
      },
      boxShadow: {
        brand: "var(--shadow-brand)",
        "brand-lg": "var(--shadow-brand-lg)",
      },
    },
  },
};

export default config;
```

### CSS Custom Properties Layer

```css
@layer base {
  :root {
    /* Brand palette */
    --brand-50: #f0f5ff;
    --brand-100: #e0ebff;
    --brand-200: #c7d9fe;
    --brand-300: #a4c0fd;
    --brand-400: #7a9ffa;
    --brand-500: #5178f5; /* signature */
    --brand-600: #3b5de9;
    --brand-700: #2f49d6;
    --brand-800: #2a3dad;
    --brand-900: #283889;
    --brand-950: #1c2353;

    /* Accent palette */
    --accent-50: /* ... */;
    --accent-500: /* ... */;
    --accent-950: /* ... */;

    /* Typography */
    --font-display: "Inter", sans-serif;
    --font-body: "Inter", sans-serif;
    --font-mono: "JetBrains Mono", monospace;

    /* Type scale (1.200 ratio from 16px base) */
    --text-caption: 0.833rem;
    --text-body: 1rem;
    --text-body-lg: 1.2rem;
    --text-h4: 1.44rem;
    --text-h3: 1.728rem;
    --text-h2: 2.074rem;
    --text-h1: 2.488rem;
    --text-display: 2.986rem;

    /* Line heights */
    --leading-caption: 1.5;
    --leading-body: 1.625;
    --leading-body-lg: 1.5;
    --leading-h4: 1.3;
    --leading-h3: 1.25;
    --leading-h2: 1.2;
    --leading-h1: 1.15;
    --leading-display: 1.1;

    /* Spacing (8px base) */
    --space-unit: 0.5rem;
    --space-xs: 0.25rem; /* 4px */
    --space-sm: 0.5rem; /* 8px */
    --space-md: 1rem; /* 16px */
    --space-lg: 1.5rem; /* 24px */
    --space-xl: 2rem; /* 32px */
    --space-2xl: 3rem; /* 48px */
    --space-3xl: 4rem; /* 64px */

    /* Shape */
    --radius-brand: 0.5rem;

    /* Elevation */
    --shadow-brand:
      0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --shadow-brand-lg:
      0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }

  .dark {
    --brand-50: #1c2353;
    --brand-100: #283889;
    --brand-200: #2a3dad;
    --brand-300: #2f49d6;
    --brand-400: #3b5de9;
    --brand-500: #5178f5; /* signature holds */
    --brand-600: #7a9ffa;
    --brand-700: #a4c0fd;
    --brand-800: #c7d9fe;
    --brand-900: #e0ebff;
    --brand-950: #f0f5ff;

    --shadow-brand:
      0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3);
    --shadow-brand-lg:
      0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3);
  }
}
```

## Component Token Mapping Patterns

### Button

```
Token                   Light Mode        Dark Mode
──────────────────────  ────────────────  ────────────────
button-primary-bg       brand-500         brand-500
button-primary-bg-hover brand-600         brand-400
button-primary-text     white             white
button-primary-ring     brand-500/50      brand-400/50

button-secondary-bg     brand-50          brand-950
button-secondary-bg-hover brand-100       brand-900
button-secondary-text   brand-700         brand-200
button-secondary-border brand-200         brand-800

button-ghost-bg         transparent       transparent
button-ghost-bg-hover   brand-50          brand-950
button-ghost-text       brand-600         brand-400
```

### Card

```
Token                   Light Mode        Dark Mode
──────────────────────  ────────────────  ────────────────
card-bg                 white             gray-900
card-border             gray-200          gray-800
card-shadow             shadow-brand      shadow-brand
card-header-text        gray-900          gray-50
card-body-text          gray-600          gray-400
```

### Input

```
Token                   Light Mode        Dark Mode
──────────────────────  ────────────────  ────────────────
input-bg                white             gray-900
input-border            gray-300          gray-700
input-border-focus      brand-500         brand-400
input-ring-focus        brand-500/25      brand-400/25
input-text              gray-900          gray-50
input-placeholder       gray-400          gray-500
input-label             gray-700          gray-300
input-error-border      red-500           red-400
input-error-text        red-600           red-400
```

## Shared Style Constants Pattern

For Tailwind class strings reused across components, extract to a shared file:

```typescript
// lib/styles.ts — brand-driven shared class constants

export const brandButton = {
  primary:
    "bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-brand shadow-brand focus:ring-2 focus:ring-brand-500/50 focus:outline-none transition-colors",
  secondary:
    "bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 rounded-brand focus:ring-2 focus:ring-brand-500/50 focus:outline-none transition-colors",
  ghost:
    "bg-transparent hover:bg-brand-50 text-brand-600 rounded-brand focus:ring-2 focus:ring-brand-500/50 focus:outline-none transition-colors",
} as const;

export const brandCard =
  "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-brand shadow-brand" as const;

export const brandInput =
  "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-brand text-gray-900 dark:text-gray-50 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25 focus:outline-none transition-colors" as const;

export const brandHeading = {
  display:
    "font-display text-display leading-[var(--leading-display)] tracking-tight text-gray-950 dark:text-gray-50",
  h1: "font-display text-h1 leading-[var(--leading-h1)] tracking-tight text-gray-900 dark:text-gray-50",
  h2: "font-display text-h2 leading-[var(--leading-h2)] text-gray-900 dark:text-gray-50",
  h3: "font-display text-h3 leading-[var(--leading-h3)] text-gray-900 dark:text-gray-100",
  h4: "font-body text-h4 leading-[var(--leading-h4)] font-semibold text-gray-800 dark:text-gray-200",
} as const;
```

## Token Sync: Pencil → Code

When brand tokens change in Pencil, update code artifacts in this order:

1. **Export tokens**: `get_variables` from the .pen file
2. **Update CSS custom properties**: `:root` and `.dark` blocks
3. **Verify Tailwind config**: Ensure `theme.extend` references the updated variables
4. **Update shared style constants**: If class strings reference specific token values
5. **Run contrast check**: Verify WCAG AA compliance after any color change
6. **Visual regression**: Screenshot key screens and compare before/after

## Chart & Data Visualization Palette

Derive chart colors from the brand palette to maintain coherence:

```typescript
export const chartColors = {
  primary: "var(--brand-500)",
  secondary: "var(--accent-500)",
  tertiary: "var(--brand-300)",
  quaternary: "var(--accent-300)",
  quinary: "var(--brand-700)",
  senary: "var(--accent-700)",
} as const;

export const chartSemanticColors = {
  positive: "var(--green-500)",
  negative: "var(--red-500)",
  neutral: "var(--gray-400)",
} as const;
```

Rules for chart palette:

- Maximum 6 categorical colors before repetition
- Ensure distinguishable in grayscale (test by desaturating)
- Ensure accessible for common color vision deficiencies (deuteranopia, protanopia)
- Use opacity variation (100%, 60%, 30%) for related data series
