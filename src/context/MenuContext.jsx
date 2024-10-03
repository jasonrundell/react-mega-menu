import React, { createContext, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

import { stateMachine } from '../helpers/menu'

const MenuContext = createContext()

export const MenuProvider = ({ children }) => {
  const [megaMenuState, setMegaMenuState] = useState('')
  const [subMenuState, setSubMenuState] = useState('')
  const [subSubMenuState, setSubSubMenuState] = useState('')
  const [activeMenus, setActiveMenus] = useState([]) // array that captures the ids of active menus
  const [isMobile, setIsMobile] = useState(true) // array that captures the ids of active menus

  // Debugger
  //   useEffect(() => {
  //     console.log('activeMenus', activeMenus)
  //     console.log('subMenuState', subMenuState)
  //     console.log('subSubMenuState', subSubMenuState)
  //   }, [activeMenus, subMenuState, subSubMenuState])

  const resetMenus = () => {
    // close all menus and empty activeMenus array
    setActiveMenus([])
    setSubMenuState('closed')
    setSubSubMenuState('closed')
  }

  const updateActiveMenus = (state, menuId) => {
    if (state === 'open') {
      // add menuId from activeMenus
      setActiveMenus([...activeMenus, menuId])
    } else if (state === 'closed') {
      // remove menuId from activeMenus
      setActiveMenus(activeMenus.filter((item) => item !== menuId))
    }
  }

  const toggleMegaMenu = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault()
    }

    const nextState = stateMachine(megaMenuState)

    setMegaMenuState(nextState)

    updateActiveMenus(nextState, 'nav-main')

    if (megaMenuState === 'open') {
      resetMenus()
    }
  }

  const toggleSubMenu = (e, menuId) => {
    if (e && e.preventDefault) {
      e.preventDefault()
    }

    const nextState = stateMachine(subMenuState)

    setSubMenuState(stateMachine(subMenuState))
    /*
      I haven't come up with single solution (yet) that takes care of
      opening and closing menus for both small and large screens, so for
      now I fork the logic based on viewport size.
      */
    if (!isMobile) {
      if (activeMenus.includes(menuId)) {
        // menu is already open, remove it from activeMenus to close it
        setActiveMenus([])
      } else {
        // menu is not yet active, add it to activeMenus to open it
        setActiveMenus([menuId])
      }
    } else {
      // remove menuId from activeMenus
      updateActiveMenus(nextState, menuId)
    }
  }

  const toggleSubSubMenu = (e, menuId) => {
    if (e && e.preventDefault) {
      e.preventDefault()
    }

    const nextState = stateMachine(subSubMenuState)

    setSubSubMenuState(stateMachine(subSubMenuState))

    updateActiveMenus(nextState, menuId)
  }

  useEffect(() => {
    const updateIsMobile = () => {
      if (window.innerWidth >= 1024) {
        setIsMobile(false)
      } else {
        setIsMobile(true)
      }
    }

    updateIsMobile()
    window.addEventListener('resize', updateIsMobile)

    return () => {
      window.removeEventListener('resize', updateIsMobile)
    }
  }, [])

  return (
    <MenuContext.Provider
      value={{
        resetMenus,
        toggleMegaMenu,
        toggleSubMenu,
        toggleSubSubMenu,
        isMobile,
        setIsMobile,
        megaMenuState,
        activeMenus,
        setActiveMenus,
        setSubMenuState,
        setSubSubMenuState,
        updateActiveMenus
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = () => useContext(MenuContext)

MenuProvider.propTypes = {
  children: PropTypes.node.isRequired
}
