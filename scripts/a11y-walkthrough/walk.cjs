/*
 * Real-browser keyboard walkthrough for docs/accessibility/keyboard-walkthrough.md.
 *
 * Usage (from the repo root):
 *   npm run build
 *   npx vite build --config scripts/a11y-walkthrough/vite.config.js
 *   npm i --no-save playwright && npx playwright install chromium   # once
 *   node scripts/a11y-walkthrough/walk.cjs
 *
 * Set CHROMIUM_PATH to use an existing Chromium binary instead of the one
 * Playwright downloads.
 */
const http = require('http')
const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')

const buildDir = path.join(__dirname, 'build')
const PORT = 4173
const MOBILE = { width: 400, height: 800 }
const DESKTOP = { width: 1280, height: 800 }
const ANIMATION_MS = 900 // slideOpen/slideClosed run for 0.75s

const CONTENT_TYPES = {
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.html': 'text/html'
}
const contentType = (file) => CONTENT_TYPES[path.extname(file)] || 'text/html'

const server = http
  .createServer((req, res) => {
    const file = path.join(
      buildDir,
      req.url === '/' ? 'index.html' : req.url.split('?')[0]
    )
    if (!fs.existsSync(file)) {
      res.writeHead(404)
      return res.end()
    }
    res.setHeader('content-type', contentType(file))
    fs.createReadStream(file).pipe(res)
  })
  .listen(PORT)

const activeId = (page) =>
  page.evaluate(() => {
    const el = document.activeElement
    return (
      el.id || `${el.tagName}:${(el.textContent || '').trim().slice(0, 20)}`
    )
  })

const navIsInert = (page) =>
  page.evaluate(() => document.getElementById('rmm__nav').hasAttribute('inert'))

const results = []
const check = (name, ok, detail) => {
  results.push(ok)
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}  [${detail}]`)
}

const tabFromHamburger = async (page, key = 'Tab') => {
  await page.focus('#rmm__hamburger')
  await page.keyboard.press(key)
  return activeId(page)
}

const walkMobile = async (browser, reducedMotion) => {
  const label = ` (mobile, reduced-motion=${reducedMotion})`
  const ctx = await browser.newContext({ viewport: MOBILE, reducedMotion })
  const page = await ctx.newPage()
  await page.goto(`http://localhost:${PORT}/`)
  await page.waitForSelector('#rmm__nav')

  let inert = await navIsInert(page)
  check(`row 13: closed nav has inert${label}`, inert, `inert=${inert}`)
  let active = await tabFromHamburger(page)
  check(
    `row 13: Tab from closed hamburger skips nav${label}`,
    active === 'after',
    `active=${active}`
  )
  active = await tabFromHamburger(page, 'Shift+Tab')
  check(
    `row 13: Shift+Tab from hamburger reaches before${label}`,
    active === 'before',
    `active=${active}`
  )

  await page.click('#rmm__hamburger')
  await page.waitForTimeout(ANIMATION_MS)
  inert = await navIsInert(page)
  check(`row 13a: open nav has no inert${label}`, !inert, `inert=${inert}`)
  active = await tabFromHamburger(page)
  check(
    `row 13a: Tab from open hamburger enters nav${label}`,
    active !== 'after' && active !== 'before',
    `active=${active}`
  )

  await page.click('#rmm__hamburger')
  await page.waitForTimeout(ANIMATION_MS)
  inert = await navIsInert(page)
  check(`row 13a: re-closed nav has inert${label}`, inert, `inert=${inert}`)
  active = await tabFromHamburger(page)
  check(
    `row 13a: Tab after re-close skips nav${label}`,
    active === 'after',
    `active=${active}`
  )
  await ctx.close()
}

const walkDesktop = async (browser) => {
  const ctx = await browser.newContext({ viewport: DESKTOP })
  const page = await ctx.newPage()
  await page.goto(`http://localhost:${PORT}/`)
  await page.waitForSelector('#rmm__nav')
  const inert = await navIsInert(page)
  check('row 13c: desktop closed nav has no inert', !inert, `inert=${inert}`)
  await page.focus('#before')
  await page.keyboard.press('Tab')
  const active = await activeId(page)
  check(
    'row 13c: desktop Tab from before reaches a nav link',
    active.startsWith('rmm-'),
    `active=${active}`
  )
  await ctx.close()
}

;(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined
  })
  await walkMobile(browser, 'no-preference')
  await walkMobile(browser, 'reduce')
  await walkDesktop(browser)
  await browser.close()
  server.close()
  const allPassed = results.every(Boolean)
  console.log(allPassed ? 'ALL PASS' : 'SOME FAILED')
  process.exit(allPassed ? 0 : 1)
})().catch((err) => {
  console.error(err)
  server.close()
  process.exit(2)
})
