import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
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
