import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppCon from './contextLearn/AppCon'
import AppTodo from './reduxtodo/AppTodo.jsx'
import Apptodo from './contexttodo/Apptodo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <AppCon /> */}
     <AppTodo /> 
    {/*<Apptodo />*/}
  
  </StrictMode>,
)
