import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './layout/Layout.jsx'
import Home from './pages/Home.jsx'
import ProductDetails from './pages/cart/ProductDetails.jsx'
import Products from './pages/cart/Products.jsx'
import Checkout from './pages/cart/Checkout.jsx'
import Category from './pages/Category.jsx'
import Login from './auth/Login.jsx'
import Cart from './pages/cart/Cart.jsx'
import Register from './auth/Register.jsx'
import NotFound from './pages/NotFound.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {path: "", element: <Home />},
      {path: "products", element: <Products />},
      { path: "product/:id", element: <ProductDetails /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "category/:type", element: <Category /> },
      {path: "login", element: <Login />},
      {path: "register", element: <Register />},
      {path: "*", element: <NotFound />},
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
