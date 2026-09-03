import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

// Context
import { useMenu } from './context/MenuContext' // Adjust the path as necessary

// Helpers
import {
  click as a11yClick,
  escape as a11yEscape,
  isEscape
} from './helpers/a11y'
import { isLargeViewport, largeBreakpointQuery } from './helpers/responsive'
import { classNames } from './helpers/classNames'
import {
  config,
  renderMainMenuItem,
  renderLinkMenuItem,
  renderMegaMenuItem,
  renderSubMenuItem
} from './helpers/menu'
import { MENU_ITEM_TYPE_MEGA } from './config/menuItemTypes'

// Components
import TopBar from './components/TopBar'
import Logo from './components/Logo'
import TopBarTitle from './components/TopBarTitle'
import Hamburger from './components/Hamburger'
import Nav from './components/Nav'
import MainList from './components/MainList'

const defaultMenuConfig = config

/**
 * Element ids for one rendered Menu.
 *
 * With no `id` the defaults are the stable `rmm__*` ids consumers and
 * stylesheets already target. With a custom `id` the shell takes it verbatim
 * and the inner regions derive unique, predictable ids from it
 * (`<id>__nav`, `<id>__main`), so one `id` prop never lands on more than one
 * element (#101).
 */
export const deriveMenuIds = (id) =>
  id
    ? { menu: id, nav: `${id}__nav`, main: `${id}__main` }
    : { menu: 'rmm__menu', nav: 'rmm__nav', main: 'rmm__main' }

export const Menu = ({
  config = defaultMenuConfig,
  className,
  id,
  slideDirection = 'left',
  ...rest
}) => {
  const { resetMenus, megaMenuState, toggleMegaMenu, isMobile, setIsMobile } =
    useMenu()

  const wrapperRef = useRef(null) // used to detect clicks outside of component

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          resetMenus()
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleClickOutside)
      }
    }, [ref, resetMenus])
  }

  useEffect(() => {
    const handleEscape = (e) => {
      // a11yEscape's resetMenus() collapses every open level at once (mega,
      // sub, and sub-sub state all reset together), so the one
      // always-present, always-focusable "triggering item" to return focus
      // to is the top-level MainNavItem link that owns whichever panel
      // currently contains focus — found by walking up from
      // document.activeElement rather than threading a trigger ref through
      // MenuContext and every render helper.
      const activeElement = document.activeElement
      const focusIsInMenu =
        isEscape(e) &&
        wrapperRef.current &&
        activeElement &&
        wrapperRef.current.contains(activeElement)
      const trigger =
        focusIsInMenu &&
        activeElement.closest &&
        activeElement
          .closest('.rmm__main-nav-item')
          ?.querySelector(':scope > .rmm__main-nav-item-link')

      a11yEscape(e, resetMenus)

      if (trigger) {
        trigger.focus()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [resetMenus])

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(!isLargeViewport())
    }

    updateIsMobile()
    window.addEventListener('resize', updateIsMobile)

    // Prefer the media query's own 'change' event where available — it
    // fires precisely on breakpoint crossings rather than on every resize.
    let mediaQueryList
    if (typeof window.matchMedia === 'function') {
      mediaQueryList = window.matchMedia(largeBreakpointQuery)
      if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener('change', updateIsMobile)
      } else if (mediaQueryList.addListener) {
        // Safari < 14
        mediaQueryList.addListener(updateIsMobile)
      }
    }

    return () => {
      window.removeEventListener('resize', updateIsMobile)
      if (mediaQueryList) {
        if (mediaQueryList.removeEventListener) {
          mediaQueryList.removeEventListener('change', updateIsMobile)
        } else if (mediaQueryList.removeListener) {
          mediaQueryList.removeListener(updateIsMobile)
        }
      }
    }
  }, [])

  useOutsideAlerter(wrapperRef) // create bindings for closing menu from outside events

  // `ids.nav` is shared between Nav and the Hamburger's aria-controls so the
  // toggle is always wired to the region it actually expands/collapses.
  const ids = deriveMenuIds(id)

  return (
    <div
      role="navigation"
      ref={wrapperRef}
      {...rest}
      id={ids.menu}
      className={classNames('rmm__menu', className)}
    >
      <TopBar id="rmm__topbar">
        <Logo
          id={config.topbar.id}
          src={config.topbar.logo.src}
          alt={config.topbar.logo.alt}
          rel={config.topbar.logo.rel}
        />
        <TopBarTitle id="rmm__title">{config.topbar.title}</TopBarTitle>
      </TopBar>
      <Hamburger
        label="Menu"
        state={megaMenuState || 'closed'}
        onClick={(e) => toggleMegaMenu(e)}
        id="rmm__hamburger"
        ariaControls={ids.nav}
      />
      <Nav
        id={ids.nav}
        activeState={megaMenuState || 'closed'}
        isMobile={isMobile}
        ariaLabel="Main Navigation"
        slideDirection={slideDirection}
        className={className}
      >
        <MainList id={ids.main} ariaLabel="Main Menu" className="rmm__nav-list">
          {config.menu.items.map((item) => {
            if (item.type === MENU_ITEM_TYPE_MEGA) {
              return renderMegaMenuItem(
                item,
                a11yClick,
                renderLinkMenuItem,
                renderSubMenuItem,
                toggleMegaMenu
              )
            } else {
              return renderMainMenuItem(item, toggleMegaMenu)
            }
          })}
        </MainList>
      </Nav>
    </div>
  )
}

Menu.propTypes = {
  config: PropTypes.shape({
    topbar: PropTypes.shape({
      id: PropTypes.string.isRequired,
      logo: PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
        rel: PropTypes.string
      }),
      title: PropTypes.string.isRequired
    }),
    menu: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
          description: PropTypes.string
        })
      )
    })
  }),
  className: PropTypes.string,
  /**
   * Id of the menu shell. Defaults to `rmm__menu`, with the Nav and main list
   * defaulting to `rmm__nav` and `rmm__main`. A custom id is applied to the
   * shell only; the inner regions derive theirs from it as `<id>__nav` and
   * `<id>__main`, so the Hamburger's aria-controls always resolves to the Nav.
   */
  id: PropTypes.string,
  /**
   * Which side the off-canvas nav slides in from on mobile widths.
   * Defaults to 'left', matching the pre-v3 behavior.
   */
  slideDirection: PropTypes.oneOf(['left', 'right'])
}

export default Menu
