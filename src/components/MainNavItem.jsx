import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { respondTo } from '../helpers/responsive'

const StyledMainNavItem = styled.li`
  list-style: none;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 1rem;
  margin-left: 0;
  padding: 0;

  ${respondTo('large')} {
    display: flex;
    flex-direction: column;
    height: auto;
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 0;
    margin-left: 2rem;
    align-items: center;
  }

  ${({ isHeading }) =>
    isHeading &&
    `
    font-weight: 700;
    ${respondTo('large')} {
      display: none;
    }
  `}
`

const MainNavItem = ({ id, role, isHeading, children, ...props }) => (
  <StyledMainNavItem id={id} role={role} isHeading={isHeading} {...props}>
    {children}
  </StyledMainNavItem>
)

MainNavItem.defaultProps = {
  role: 'none',
  isHeading: false
}

MainNavItem.propTypes = {
  /**
   * The id attribute of the list item.
   */
  id: PropTypes.string.isRequired,
  /**
   * The role attribute of the list item.
   */
  role: PropTypes.string,
  /**
   * Whether the list item is a heading.
   */
  isHeading: PropTypes.bool,
  /**
   * The content of the list item.
   */
  children: PropTypes.node.isRequired
}

export default MainNavItem
