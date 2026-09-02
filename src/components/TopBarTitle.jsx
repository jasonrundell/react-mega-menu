import React from 'react'
import PropTypes from 'prop-types'
import { Heading } from '@jasonrundell/topiary'

const TopBarTitle = ({ id, className, children, ...props }) => (
  <Heading
    level={1}
    id={id}
    className={['rmm__title', className].filter(Boolean).join(' ')}
    {...props}
  >
    {children}
  </Heading>
)

TopBarTitle.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default TopBarTitle
