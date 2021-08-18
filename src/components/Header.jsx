// @ts-check
import React from 'react'

/**
 * @typedef {Object} HeaderProps
 * @property {string} title
 */

/**
 * @type React.FC<HeaderProps>
 */
const Header = ({
  title
}) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  )
}

export default Header
