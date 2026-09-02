import React from 'react'
import { MenuProvider } from './context/MenuContext'
import { Menu } from './Menu'

const MenuWithProvider = (props) => (
  <MenuProvider>
    <Menu {...props} />
  </MenuProvider>
)

export { MenuWithProvider as Menu }
export default MenuWithProvider
