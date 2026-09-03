# Brand Identity Framework — Deep Reference

Extended reference for the brand identity creation process. Read this when running a full brand identity engagement or when the brand brief phase needs structured workshop exercises.

## Brand Discovery Workshop

### Exercise 1 — Brand Personification

> "If this brand walked into a room, how would people describe them?"

Capture responses across these axes:

| Axis     | Spectrum                   |
| -------- | -------------------------- |
| Energy   | Calm ← → Energetic         |
| Tone     | Serious ← → Playful        |
| Approach | Traditional ← → Innovative |
| Presence | Understated ← → Bold       |
| Warmth   | Distant ← → Intimate       |

Plot the brand on each axis. The resulting profile drives visual decisions:

- **Calm + Understated** → muted palette, generous whitespace, serif or thin sans
- **Energetic + Bold** → saturated palette, tight layouts, geometric sans, motion-heavy
- **Innovative + Playful** → unexpected color pairings, custom type, illustration-driven

### Exercise 2 — Competitor Visual Audit

For each direct competitor, catalog:

```
Competitor: [Name]
Primary color: [hex]
Typography: [typefaces]
Visual style: [flat/dimensional/illustrative/photographic]
Brand personality read: [3 adjectives from their visual language]
Differentiation gap: [what they DON'T do visually]
```

Aggregate gaps into a visual whitespace map. The brand identity should occupy unclaimed territory.

### Exercise 3 — Word Association Filter

Start with 20+ adjectives that _could_ describe the brand. Filter to 3–5 through elimination:

1. Remove anything that describes any competitor equally well
2. Remove anything the team disagrees on
3. Remove anything that doesn't translate to visual decisions
4. Rank the remainder by "would a customer use this word about us?"

The surviving attributes become design drivers.

## Color System Construction

### Building a Brand Palette from Scratch

#### Step 1 — Select the Signature Hue

The primary brand color should:

- Be distinct from the top 3 competitors' primaries
- Pass the "thumbnail test" — recognizable at 16×16px
- Work as both a background and a foreground accent
- Carry the right emotional weight (blue=trust, green=growth, purple=premium, orange=energy)

#### Step 2 — Generate the Full Ramp

From the signature hue, generate a 10-stop ramp (50–950):

| Stop | Lightness Target | Use Case                          |
| ---- | ---------------- | --------------------------------- |
| 50   | ~97%             | Subtle backgrounds, hover states  |
| 100  | ~93%             | Card backgrounds, badges          |
| 200  | ~85%             | Borders, dividers                 |
| 300  | ~75%             | Disabled states                   |
| 400  | ~60%             | Secondary buttons, icons          |
| 500  | ~45%             | Primary brand color — CTAs, links |
| 600  | ~35%             | Hover on primary                  |
| 700  | ~25%             | Active/pressed states             |
| 800  | ~15%             | Dark mode accents                 |
| 900  | ~10%             | Text on light backgrounds         |
| 950  | ~5%              | Headings, high-contrast text      |

Use OKLCH or CIELAB for perceptually uniform steps. HSL ramps produce uneven perceived brightness.

#### Step 3 — Derive the Secondary Palette

Choose a secondary that creates intentional contrast with the primary:

- **Complementary** (opposite on the wheel) — maximum contrast, high energy
- **Analogous** (adjacent) — harmonious, subtle differentiation
- **Split-complementary** — balanced contrast with variety

Generate the same 50–950 ramp.

#### Step 4 — Neutral Palette

Build a neutral ramp that carries a slight tint of the primary hue. Pure gray feels disconnected from the brand. A 2–5% hue shift in the neutral ramp creates subtle coherence.

#### Step 5 — Semantic Colors

Define semantic colors independently of the brand palette:

- **Success**: Green (not the brand green — dedicated semantic green)
- **Warning**: Amber/yellow
- **Error**: Red
- **Info**: Blue (can overlap with brand if brand is blue)

Each gets its own ramp optimized for readability and conventional meaning.

#### Step 6 — Contrast Verification Matrix

Test every foreground/background pairing that will appear in the product:

| Foreground | Background | Ratio | Pass AA | Pass AAA |
| ---------- | ---------- | ----- | ------- | -------- |
| brand-900  | brand-50   | ?     | ?       | ?        |
| white      | brand-500  | ?     | ?       | ?        |
| brand-500  | white      | ?     | ?       | ?        |
| gray-700   | gray-50    | ?     | ?       | ?        |

Minimum targets: 4.5:1 for body text, 3:1 for large text (18px+) and UI components.

## Typography System Construction

### Typeface Selection Criteria

| Criterion               | Weight    | Rationale                                                        |
| ----------------------- | --------- | ---------------------------------------------------------------- |
| Brand alignment         | High      | Does it _feel_ like the brand attributes?                        |
| Legibility at body size | High      | SaaS products are text-heavy                                     |
| Weight range            | Medium    | Need at least regular, medium, semibold, bold                    |
| Language support        | Medium    | Match the product's locale requirements                          |
| Performance             | Medium    | Variable fonts preferred for web (single file, multiple weights) |
| Licensing               | Must-pass | Verify license covers SaaS web embedding                         |

### Type Scale Generation

Use a modular scale. Choose a ratio based on brand energy:

| Ratio                  | Feel                | Brand Fit                          |
| ---------------------- | ------------------- | ---------------------------------- |
| 1.125 (Major Second)   | Compact, efficient  | Data-dense SaaS, technical brands  |
| 1.200 (Minor Third)    | Balanced, readable  | Most SaaS products                 |
| 1.250 (Major Third)    | Spacious, editorial | Content-heavy, premium brands      |
| 1.333 (Perfect Fourth) | Dramatic, bold      | Marketing-heavy, expressive brands |

Generate the scale from a base size (16px recommended):

```
caption:   base / ratio        → ~13–14px
body:      base                → 16px
body-lg:   base × ratio       → ~18–19px
h4:        base × ratio²      → ~20–23px
h3:        base × ratio³      → ~24–28px
h2:        base × ratio⁴      → ~29–34px
h1:        base × ratio⁵      → ~35–43px
display:   base × ratio⁶      → ~42–57px
```

### Line Height & Tracking Rules

| Text Size          | Line Height | Letter Spacing     |
| ------------------ | ----------- | ------------------ |
| Display (36px+)    | 1.1–1.2     | -0.02em to -0.01em |
| Headings (24–36px) | 1.2–1.3     | -0.01em to 0       |
| Body (14–18px)     | 1.5–1.75    | 0                  |
| Caption (12–14px)  | 1.4–1.6     | 0.01em to 0.02em   |

## Brand-Driven SaaS Screen Patterns

### Navigation Chrome

The navigation is the most persistent brand surface. Apply brand identity here first:

- **Sidebar**: Brand primary as background (dark variant) or brand-tinted neutral
- **Logo placement**: Top-left, respecting clear space rules
- **Active state**: Brand accent or primary highlight
- **Hover state**: Subtle brand-50 or brand-100 background shift

### Dashboard & Data Screens

- Chart colors: Derive from brand palette. Primary → secondary → then sequential lighter stops
- Metric cards: Brand-50 backgrounds with brand-700+ text
- Empty states: Branded illustration + personality-matched copy
- Loading states: Brand-colored skeleton loaders or spinners

### Forms & Input Patterns

- Focus ring: Brand primary (brand-500) with visible outline
- Validation: Semantic colors (not brand colors) for success/error
- Labels: Brand neutral-700 on light, neutral-200 on dark
- Placeholder text: Neutral-400, never brand-colored

### Onboarding & First-Run

The highest-impact brand moment. Invest here disproportionately:

- Welcome screen: Display typography, brand illustration, warm copy
- Progress indicators: Brand primary fill
- Success celebrations: Brand accent, micro-animation matching brand energy
- Empty-to-full transitions: Guide the user with branded placeholder content

## Dark Mode Brand Adaptation

Dark mode is not light mode inverted. Adapt deliberately:

| Light Mode          | Dark Mode Adaptation                           |
| ------------------- | ---------------------------------------------- |
| White backgrounds   | Gray-900 or gray-950 (not pure black)          |
| Brand-500 CTAs      | Brand-400 (lighter for contrast against dark)  |
| Brand-50 card bg    | Gray-800 with slight brand tint                |
| Gray-900 text       | Gray-50 or gray-100 text                       |
| Shadows             | Reduce or replace with subtle light borders    |
| Brand illustrations | Verify legibility; may need dark-mode variants |

Key rule: The brand should be _recognizable_ in dark mode, not identical to light mode.

## Brand Audit Checklist

Use this when reviewing an existing product for brand coherence:

- [ ] **Logo**: Used correctly, never distorted, clear space respected
- [ ] **Color**: All colors trace back to the token system; no orphaned hex values
- [ ] **Typography**: All text uses the defined type scale; no arbitrary sizes
- [ ] **Spacing**: All spacing derives from the base unit; no magic numbers
- [ ] **Voice**: UI copy matches the brand tone (check button labels, empty states, error messages)
- [ ] **Consistency**: Same element looks the same everywhere (buttons, cards, inputs)
- [ ] **Differentiation**: The product is visually distinct from competitors at a glance
- [ ] **Emotional response**: A 5-second look at any screen conveys the intended brand feeling
- [ ] **Dark mode**: Brand is recognizable in both themes
- [ ] **Responsive**: Brand expression is maintained across breakpoints — not just layout, but _feeling_
