import fs from 'fs'
import path from 'path'
import { spawnSync } from 'child_process'
import packageJson from '../package.json'

// Resolve the shipped declaration path FROM package.json, rather than
// hardcoding "dist/index.d.ts", so this test fails loudly if the "types"
// field or the export map ever points somewhere else (mirrors
// styleContract.test.js for the stylesheet).
const rootDir = path.resolve(__dirname, '..')
const typesField = packageJson.types
const rootExport = packageJson.exports && packageJson.exports['.']

describe('shipped type declarations contract (#102)', () => {
  it('declares a "types" field and a "types" condition on the "." export', () => {
    expect(typesField).toEqual(expect.any(String))
    expect(rootExport).toEqual(expect.any(Object))
    expect(rootExport.types).toEqual(expect.any(String))
  })

  it('points the "types" field and the export condition at the same file', () => {
    expect(path.resolve(rootDir, rootExport.types)).toBe(
      path.resolve(rootDir, typesField)
    )
  })

  it('lists the "types" condition first, so resolvers that take the first match see it', () => {
    // publint / arethetypeswrong both flag a "types" condition that is not
    // first: Node-style resolution stops at the first matching key.
    expect(Object.keys(rootExport)[0]).toBe('types')
  })

  it('emits the declaration file at that path on build', () => {
    expect(fs.existsSync(path.resolve(rootDir, typesField))).toBe(true)
  })

  it('typechecks the consumer fixture against the shipped declaration', () => {
    // test/types/menu.fixture.tsx imports the package by name (mapped onto
    // the built dist/index.d.ts) and renders the real default config against
    // the declared props. If the declaration drifts from what Menu accepts,
    // tsc fails here and so does the suite.
    const result = spawnSync(
      process.execPath,
      [
        path.join(rootDir, 'node_modules', 'typescript', 'bin', 'tsc'),
        '-p',
        path.join(rootDir, 'test', 'types', 'tsconfig.json'),
        '--noEmit',
        '--pretty',
        'false'
      ],
      { encoding: 'utf8' }
    )
    expect(result.stdout + result.stderr).toBe('')
    expect(result.status).toBe(0)
  })
})
