import React from 'react'
import { MenuProvider, useMenu } from './context/MenuContext'
import { Menu } from './Menu'

const MenuWithProvider = (props) => (
  <MenuProvider>
    <Menu {...props} />
  </MenuProvider>
)

export { MenuWithProvider as Menu, MenuProvider, useMenu }
export default MenuWithProvider
