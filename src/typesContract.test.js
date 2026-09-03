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
  const conditions = ['import', 'require']

  it('declares a "types" field and import / require conditions on the "." export', () => {
    expect(typesField).toEqual(expect.any(String))
    expect(rootExport).toEqual(expect.any(Object))
    conditions.forEach((condition) => {
      expect(rootExport[condition]).toEqual(expect.any(Object))
      expect(rootExport[condition].types).toEqual(expect.any(String))
      expect(rootExport[condition].default).toEqual(expect.any(String))
    })
  })

  it('points the "types" field at the ESM declaration', () => {
    expect(path.resolve(rootDir, rootExport.import.types)).toBe(
      path.resolve(rootDir, typesField)
    )
  })

  it('lists "types" first inside each condition, so resolvers that take the first match see it', () => {
    // publint / arethetypeswrong both flag a "types" condition that is not
    // first: Node-style resolution stops at the first matching key.
    conditions.forEach((condition) => {
      expect(Object.keys(rootExport[condition])[0]).toBe('types')
    })
  })

  it('ships CommonJS as .cjs with a .d.cts declaration, so require() never resolves to ESM', () => {
    // The package is "type": "module", so a .js CommonJS file would be read
    // as ESM by Node and flagged by publint / arethetypeswrong.
    expect(packageJson.type).toBe('module')
    expect(rootExport.require.default).toMatch(/\.cjs$/)
    expect(rootExport.require.types).toMatch(/\.d\.cts$/)
    expect(rootExport.import.default).toMatch(/\.js$/)
    expect(rootExport.import.types).toMatch(/\.d\.ts$/)
  })

  it('emits every declared entry and declaration file on build', () => {
    const files = [
      typesField,
      ...conditions.flatMap((condition) => [
        rootExport[condition].types,
        rootExport[condition].default
      ])
    ]
    files.forEach((file) => {
      expect({ [file]: fs.existsSync(path.resolve(rootDir, file)) }).toEqual({
        [file]: true
      })
    })
  })

  it('ships identical declarations for the ESM and CommonJS entries', () => {
    expect(
      fs.readFileSync(path.resolve(rootDir, rootExport.require.types), 'utf8')
    ).toBe(
      fs.readFileSync(path.resolve(rootDir, rootExport.import.types), 'utf8')
    )
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
