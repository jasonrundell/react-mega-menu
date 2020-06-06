import React from 'react'
import PropTypes from 'prop-types'

// CSS
import styles from './index.module.scss'

const Hamburger = ({ label, state, onClick }) => {
  if (state === '') state = 'closed'
  return (
    <button className={`${styles['root']} ${styles[state]}`} onClick={onClick}>
      <div className={styles['slice-container']}>
        <span className={styles['slice']}></span>
        <span className={styles['slice']}></span>
        <span className={styles['slice']}></span>
        <span className={styles['slice']}></span>
      </div>
      {label && (
        <div className={styles['label-container']}>
          <span className={styles['label']}>{label}</span>
        </div>
      )}
    </button>
  )
}

Hamburger.defaultProps = { label: null, state: 'closed' }
Hamburger.propTypes = {
  label: PropTypes.string,
  state: PropTypes.oneOf(['', 'open', 'closed']),
  onClick: PropTypes.func,
}

export default Hamburger
