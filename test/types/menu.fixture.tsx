/**
 * Consumer-side type fixture for the shipped declaration (dist/index.d.ts).
 *
 * Typechecked by src/typesContract.test.js via `tsc -p test/types`. It is not
 * executed. Every block below is a compile-time assertion: a positive case
 * that must typecheck, or a `@ts-expect-error` line that must NOT (so if the
 * declaration ever loosens, tsc reports an unused directive and the test
 * fails).
 */
import DefaultMenu, {
  Menu,
  type MenuConfigItem,
  type MenuConfigShape,
  type MenuItemType,
  type MenuProps
} from '@jasonrundell/react-mega-menu'
import { config as defaultConfig } from '../../src/config/defaultMenuConfig.js'

// --- The real default config satisfies the declared config type ------------
// (the file itself is checked with JSDoc typing, see src/config/defaultMenuConfig.js)
const checkedDefault: MenuConfigShape = defaultConfig

// --- Every prop the README documents ----------------------------------------
export const Full = () => (
  <Menu
    config={checkedDefault}
    id="site-menu"
    className="site-menu"
    slideDirection="right"
    data-testid="menu"
  />
)

export const Minimal = () => <Menu />

// --- Named and default export are the same component ------------------------
const sameAsNamed: typeof Menu = DefaultMenu
const sameAsDefault: typeof DefaultMenu = Menu
export { sameAsNamed, sameAsDefault }

// --- The config shape is a named, exported type consumers can annotate with --
const item: MenuConfigItem = {
  id: 'store',
  label: 'Store',
  type: 'mega',
  url: '/store/',
  items: [
    {
      id: 'deals',
      label: 'Deals',
      type: 'link',
      url: '/store/deals/',
      description: 'optional'
    }
  ]
}
const itemType: MenuItemType = item.type
export { item, itemType }

// --- Negative cases: these must be rejected ---------------------------------
// @ts-expect-error slideDirection only accepts 'left' | 'right'
export const BadDirection = () => <Menu slideDirection="up" />

const badType: MenuConfigItem = {
  id: 'x',
  label: 'x',
  // @ts-expect-error item type is the four-value union, not any string
  type: 'bogus',
  url: '/x/'
}
export { badType }

// @ts-expect-error `url` is required on every item
const missingUrl: MenuConfigItem = { id: 'x', label: 'x', type: 'main' }
export { missingUrl }

const props: MenuProps = { slideDirection: 'left' }
export { props }
