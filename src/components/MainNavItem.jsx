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

  ${({ isForward }) =>
    isForward &&
    `
    ${respondTo('large')} {
      margin-right: 1rem;
    }

    &::after {
      content: url('../../images/icons/angle-right.svg');
      position: absolute;
      right: 2rem;
      bottom: -30%;
      width: 1rem;
      height: 2rem;

      ${respondTo('large')} {
        content: url('../../images/icons/angle-up.svg');
        top: 1.25rem;
        right: -1.5rem;
        width: 1rem;
      }
    }
  `}
`

const MainNavItem = ({
  id,
  role,
  isHeading,
  isForward,
  children,
  ...props
}) => (
  <StyledMainNavItem
    id={id}
    role={role}
    isHeading={isHeading}
    isForward={isForward}
    {...props}
  >
    {children}
  </StyledMainNavItem>
)

MainNavItem.defaultProps = {
  role: 'none',
  isHeading: false,
  isForward: false
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
   * Whether the list item is a forward navigation item.
   */
  isForward: PropTypes.bool,
  /**
   * The content of the list item.
   */
  children: PropTypes.node.isRequired
}

export default MainNavItem
