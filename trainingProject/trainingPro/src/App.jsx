import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './common/About'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Features from './common/Features'
import NotFound from './pages/NotFound'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/about" element={<About />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/features" element={<Features />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="*" element={<NotFound />} />

          
          {/* <Route path="/contact" element={<Contact />} /> */}
          {/* <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>

  )
}

export default App
