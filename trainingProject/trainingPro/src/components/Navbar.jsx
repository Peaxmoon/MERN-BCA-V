import React from 'react'
import { NavLink } from 'react-router-dom'
import Footer from './Footer'
import routes from '../routes/routeConfig'

function Navbar() {
  return (
    <nav className="bg-yellow-200 p-4 text-white flex gap-4">
      <div className='text-black'>Search for products</div>
        {routes.map((route) => (
            <NavLink key={route.path} to={route.path}
                className={({ isActive }) => isActive ? 'font-bold text-blue-900' : 'hover: text-blue-700'}>
                {route.name}
                </NavLink>
        ))}
    </nav>
  )
}

export default Navbar