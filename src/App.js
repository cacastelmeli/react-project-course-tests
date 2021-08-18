// @ts-check
import React, { useEffect, useState } from 'react'
import { apiClient } from './api/client'
import CreateTodoForm from './components/CreateTodoForm'

import Header from './components/Header'
import TodoList from './components/TodoList/TodoList'

function App() {
  const [todoItems, setTodoItems] = useState([])

  /**
   * @type {import('./components/CreateTodoForm').CreateTodoFormProps['onTodoCreated']}
   */
  const onTodoCreated = todoCreated => {
    setTodoItems([...todoItems, todoCreated])
  }

  const loadTodos = async () => {
    const loadedTodos = await apiClient.get('todos').json()

    setTodoItems(loadedTodos)
  }

  useEffect(() => {
    loadTodos()
  }, [])

  return (
    <main>
      <Header title="To-Do App" />
      <CreateTodoForm onTodoCreated={onTodoCreated} />

      <TodoList
        items={todoItems}
        setNextTodos={setTodoItems} />
    </main>
  )
}

export default App
