import React from 'react'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'
import { Provider } from 'react-redux'
import { store } from './app/store'

function AppTodo() {
  return (
    <Provider store={store}>
    <div>AppTodos</div>
    <AddTodo />
    <Todos />
    </Provider>
  )
}

export default AppTodo