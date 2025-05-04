import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppCon from './contextLearn/AppCon'
import AppTodo from './reduxtodo/AppTodo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <AppCon /> */}
    <AppTodo />
  </StrictMode>,
)
