import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Features } from 'tailwindcss'
import Hero from '../components/Hero'

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      {/* <Navbar /> */}
      {/* <Outlet /> */}
      {/* <Features /> */}
      <Footer />
    </div>
  )
}

export default Home