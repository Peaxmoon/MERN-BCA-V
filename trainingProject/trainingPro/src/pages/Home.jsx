import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Login from '../auth/Login'
import Features from '../common/Features'
import About from '../common/About'
import Category from './Category'

function Home() {
  return (
    <div>
      <h1>This is home page</h1>
      <h3>Search feature in Navbar</h3>
      <Category />
      <Features />
      <About />
    </div>
  )
}

export default Home