import fs from 'fs'
import path from 'path'
import { rmmTokens } from './styles/rmmTokens'
import { breakpoints } from './config/breakpoints'
import packageJson from '../package.json'

// Resolve the shipped stylesheet path FROM package.json's exports field,
// rather than hardcoding "dist/style.css", so this test fails loudly if the
// export map ever points somewhere else.
const styleExport = packageJson.exports && packageJson.exports['./style.css']

describe('shipped stylesheet contract', () => {
  it('declares a "./style.css" entry in package.json exports', () => {
    expect(styleExport).toEqual(expect.any(String))
  })

  it('exists at the path package.json exports resolves it to', () => {
    const resolvedPath = path.resolve(__dirname, '..', styleExport)
    expect(fs.existsSync(resolvedPath)).toBe(true)
  })

  it('defines every documented --rmm-* token', () => {
    const resolvedPath = path.resolve(__dirname, '..', styleExport)
    const css = fs.readFileSync(resolvedPath, 'utf8')

    rmmTokens.forEach((token) => {
      // matches a custom-property declaration like "--rmm-menu-bg:"
      const declared = new RegExp(
        `${token.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\s*:`
      )
      expect(css).toMatch(declared)
    })
  })

  it('has no dead --rmm-* tokens: every declaration is consumed by a var(--rmm-*) use', () => {
    const resolvedPath = path.resolve(__dirname, '..', styleExport)
    const css = fs.readFileSync(resolvedPath, 'utf8')

    // A declaration is "--rmm-foo:" (a custom property being *set*); a use
    // is "var(--rmm-foo)" or "var(--rmm-foo, <fallback>)" (a custom
    // property being *read*). These are textually distinct — a declaration
    // is never itself preceded by "var(" — so a plain regex distinguishes
    // them without needing a real CSS parser.
    const declaredTokens = [
      ...new Set(
        [...css.matchAll(/--rmm-[a-zA-Z0-9-]+(?=\s*:)/g)].map((m) => m[0])
      )
    ]
    expect(declaredTokens.length).toBeGreaterThan(0)

    const deadTokens = declaredTokens.filter((token) => {
      const escaped = token.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
      const usePattern = new RegExp(`var\\(${escaped}[,)]`)
      return !usePattern.test(css)
    })

    expect(deadTokens).toEqual([])
  })

  it('has no unreplaced __RMM_BP_LARGE__ breakpoint placeholder', () => {
    const resolvedPath = path.resolve(__dirname, '..', styleExport)
    const css = fs.readFileSync(resolvedPath, 'utf8')

    expect(css).not.toMatch('__RMM_BP_LARGE__')
  })

  it('large-breakpoint @media rules match src/config/breakpoints.js (single source of truth)', () => {
    const resolvedPath = path.resolve(__dirname, '..', styleExport)
    const css = fs.readFileSync(resolvedPath, 'utf8')
    const expectedMinWidth = breakpoints.large['min-width']

    const mediaRules = css.match(/@media \(min-width:[^)]*\)/g) || []
    expect(mediaRules.length).toBeGreaterThan(0)

    mediaRules.forEach((rule) => {
      expect(rule).toBe(`@media (min-width: ${expectedMinWidth})`)
    })
  })
})

/**
 * Body of the first top-level `<selector> { ... }` rule in the stylesheet
 * (the one at column 0, outside any @media block). Rules are flat, so the
 * first `}` after the opening brace closes it.
 */
const firstRuleBody = (css, selector) => {
  const match = new RegExp(
    `^${selector.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}(?:,\n[^{]*)? {`,
    'm'
  ).exec(css)
  if (!match) {
    throw new Error(`No top-level rule for ${selector} in stylesheet`)
  }
  const openBrace = css.indexOf('{', match.index)
  return css.slice(openBrace + 1, css.indexOf('}', openBrace))
}

describe('panel chrome', () => {
  // The v2 demo painted the off-canvas nav and the mega / sub panels from
  // its theme CSS by reaching into Emotion internals; v3 dropped that with
  // no token to replace it, so panels rendered transparent over page
  // content. Every panel surface must now paint from --rmm-panel-bg.
  const resolvedPath = path.resolve(__dirname, '..', styleExport)
  const css = fs.readFileSync(resolvedPath, 'utf8')

  it.each(['.rmm__nav', '.rmm__mega-list', '.rmm__nav-list--sub'])(
    '%s paints its background from --rmm-panel-bg',
    (selector) => {
      expect(collapse(firstRuleBody(css, selector))).toMatch(
        /background(?:-color)?: var\(--rmm-panel-bg\)/
      )
    }
  )

  it('no longer positions the hamburger by removed offset tokens', () => {
    expect(rmmTokens).not.toContain('--rmm-hamburger-top')
    expect(rmmTokens).not.toContain('--rmm-hamburger-left')
  })
})

const collapse = (s) => s.replace(/\s+/g, ' ').trim()

/**
 * Extracts the body of a single `@keyframes <name> { ... }` block from raw
 * CSS text, using brace-depth counting rather than a non-greedy regex, since
 * the block itself contains nested `{ }` pairs (one per keyframe selector)
 * that a naive `[\s\S]*?\}` match would stop at prematurely.
 */
const extractKeyframesBlock = (css, name) => {
  const marker = `@keyframes ${name}`
  const start = css.indexOf(marker)
  if (start === -1) {
    throw new Error(`@keyframes ${name} not found in stylesheet`)
  }
  const openBrace = css.indexOf('{', start)
  let depth = 0
  let i = openBrace
  for (; i < css.length; i++) {
    if (css[i] === '{') depth++
    else if (css[i] === '}') {
      depth--
      if (depth === 0) break
    }
  }
  return css.slice(openBrace + 1, i)
}

/**
 * Reads the translate3d X percentage out of a keyframe block's terminal
 * selector — `to { ... }` in this stylesheet's authored source, which is
 * equivalent to a `100%` selector once parsed. Written against the raw
 * source text (not the CSSOM) so it exercises exactly what ships in
 * dist/style.css, independent of any browser's keyframe normalization.
 */
const endTranslateXPercent = (keyframesBody) => {
  const match = keyframesBody.match(
    /to\s*\{\s*transform:\s*translate3d\(\s*(-?[\d.]+)%/
  )
  if (!match) {
    throw new Error(
      `Could not find a "to { transform: translate3d(N%, ...) }" rule in: ${keyframesBody}`
    )
  }
  return Number(match[1])
}

describe('Nav slide-direction keyframes (issue #64)', () => {
  // Regression guard for a bug class that's invisible to jsdom (no real CSS
  // animation timeline) and easy to mismeasure even in a real browser (a
  // backgrounded/hidden tab freezes the Web Animations API's currentTime at
  // 0, which reads back as the *start* keyframe rather than the end one —
  // exactly the shape of a "the direction is inverted" false positive).
  // Asserting the authored end (`to`) keyframe values directly against the
  // stylesheet source sidesteps needing a live, foregrounded animation
  // timeline at all.
  const resolvedPath = path.resolve(
    __dirname,
    '..',
    packageJson.exports['./style.css']
  )
  const css = fs.readFileSync(resolvedPath, 'utf8')

  it('rmm-slide-open (left, open) ends at +100% — on-screen from the left', () => {
    expect(
      endTranslateXPercent(extractKeyframesBlock(css, 'rmm-slide-open'))
    ).toBe(100)
  })

  it('rmm-slide-closed (left, closed) ends at -100% — off-screen to the left', () => {
    expect(
      endTranslateXPercent(extractKeyframesBlock(css, 'rmm-slide-closed'))
    ).toBe(-100)
  })

  it('rmm-slide-open-right (right, open) ends at -100% — on-screen from the right', () => {
    expect(
      endTranslateXPercent(extractKeyframesBlock(css, 'rmm-slide-open-right'))
    ).toBe(-100)
  })

  it('rmm-slide-closed-right (right, closed) ends at +100% — off-screen to the right', () => {
    expect(
      endTranslateXPercent(extractKeyframesBlock(css, 'rmm-slide-closed-right'))
    ).toBe(100)
  })
})
