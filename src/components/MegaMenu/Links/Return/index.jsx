import React from 'react'
import PropTypes from 'prop-types'

// CSS
import styles from './index.module.scss'

const ReturnLink = ({
  children,
  onClick,
  onKeyDown,
  ariaControls,
  id,
  url,
}) => {
  return (
    <a
      role="menuitem"
      id={id}
      href={url}
      className={styles['root']}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-haspopup="true"
      aria-controls={ariaControls}
    >
      {children}
    </a>
  )
}

ReturnLink.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  ariaControls: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default ReturnLink
