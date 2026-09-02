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
