import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
      <h1>Footer</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/features">Features</Link>
      </div>
    </div>
  )
}

export default Footer