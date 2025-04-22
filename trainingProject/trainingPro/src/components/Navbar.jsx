import React from 'react'
import { NavLink } from 'react-router-dom'
import Footer from './Footer'

function Navbar() {
  return (
    <div>
        <div>
            <h1>ElectroMart</h1>
        </div>
        <ul>
            <li>
                <a href="./Footer">About</a>
                {/* <NavLink to={features} >Features</NavLink> */}
            </li>
            <li>
                <a href="#products">Products</a>
            </li>
            <li>
                <a href="#contact">Contact</a>
            </li>
            <li>
                <button>Login</button>
                <button>Register</button>
            </li>
        </ul>
    </div>
  )
}

export default Navbar