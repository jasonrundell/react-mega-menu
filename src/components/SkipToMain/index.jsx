import React from 'react'
import PropTypes from 'prop-types'

import styles from './index.module.scss'

const SkipToMain = ({ children }) => (
  <a href="#main" className={styles.root}>
    {children}
  </a>
)

SkipToMain.propTypes = {
  children: PropTypes.any.isRequired,
}

export default SkipToMain
