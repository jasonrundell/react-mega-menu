import fs from 'fs'
import path from 'path'
import { rmmTokens } from './styles/rmmTokens'
import packageJson from '../package.json'

// The README is the v3 theming API's documentation, so it is held to the
// same contract as the stylesheet (styleContract.test.js): every documented
// --rmm-* token appears in its token table with the default the stylesheet
// really declares. Sections the release ticket (#98) requires are checked by
// heading so they can't be dropped in a rewrite without failing here.
const rootDir = path.resolve(__dirname, '..')
const readme = fs.readFileSync(path.join(rootDir, 'README.md'), 'utf8')
const stylesheet = fs.readFileSync(
  path.join(rootDir, 'src/styles/style.css'),
  'utf8'
)

// CSS is whitespace-insensitive inside var(): the stylesheet wraps one long
// declaration across lines, so compare with spaces collapsed and none
// adjacent to parentheses.
const collapse = (s) =>
  s.replace(/\s+/g, ' ').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')').trim()

// Declared defaults: the first `.rmm__menu { ... }` block of the stylesheet.
const declaredDefaults = () => {
  const block = stylesheet.slice(stylesheet.indexOf('.rmm__menu {'))
  const body = block.slice(0, block.indexOf('\n}\n'))
  const out = {}
  for (const m of body.matchAll(/(--rmm-[\w-]+)\s*:\s*([^;]+);/g)) {
    out[m[1]] = collapse(m[2])
  }
  return out
}

// Documented defaults: README table rows of the form
// | `--rmm-token` | purpose | `default value` |
const documentedDefaults = () => {
  const out = {}
  for (const line of readme.split('\n')) {
    const m = line.match(/^\|\s*`(--rmm-[\w-]+)`\s*\|.*\|\s*`([^`]+)`\s*\|\s*$/)
    if (m) out[m[1]] = collapse(m[2])
  }
  return out
}

describe('README contract (#98)', () => {
  const declared = declaredDefaults()
  const documented = documentedDefaults()

  it('documents every --rmm-* token, and only documented tokens', () => {
    expect(Object.keys(documented).sort()).toEqual([...rmmTokens].sort())
  })

  it('lists the default the stylesheet declares for each token', () => {
    rmmTokens.forEach((token) => {
      expect({ [token]: documented[token] }).toEqual({
        [token]: declared[token]
      })
    })
  })

  it('states the peer dependency ranges from package.json', () => {
    const peers = packageJson.peerDependencies
    Object.entries(peers).forEach(([name, range]) => {
      expect(readme).toContain(`\`${name}\``)
      expect(readme).toContain(range)
    })
  })

  it('shows both stylesheet imports and the data-theme attribute', () => {
    expect(readme).toContain("import '@jasonrundell/topiary/style.css'")
    expect(readme).toContain("import '@jasonrundell/react-mega-menu/style.css'")
    expect(readme).toMatch(/data-theme="[a-z]+"/)
  })

  it('has the sections the v3 release requires', () => {
    ;[
      /^## .*Install/m,
      /^## .*Theming/m,
      /^## .*`slideDirection`|slideDirection/m,
      /^## .*Migrating from v2/m,
      /^## .*TypeScript/m
    ].forEach((heading) => expect(readme).toMatch(heading))
    expect(readme).toMatch(/v2\.x[^\n]*React 18/)
  })
})
