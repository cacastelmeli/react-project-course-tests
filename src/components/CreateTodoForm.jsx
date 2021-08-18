// @ts-check
import React, { useState } from 'react'

import { apiClient } from '../api/client'

/**
 * @typedef {Object} CreateTodoFormProps
 * @property {(todoCreated: import('./TodoItem/TodoItem').TodoItem) => void} onTodoCreated
 */

/**
 * @type React.FC<CreateTodoFormProps>
 */
const CreateTodoForm = ({
  onTodoCreated
}) => {
  const [todoText, setTodoText] = useState('')
  const [creatingTodo, setCreatingTodo] = useState(false)

  const createTodo = async () => {
    if (!todoText.trim()) {
      return
    }

    setCreatingTodo(true)

    try {
      /**
       * @type {import('./TodoItem/TodoItem').TodoItem}
       */
      const todo = {
        id: Math.random(), // <- Ignored on server
        text: todoText.trim(),
        done: false
      }

      await apiClient.post('todos', {
        json: todo
      })

      setTodoText('')
      onTodoCreated(todo)
    } catch (error) {
      console.error('Error while trying to save To-Do:', error)
      alert('Error while saving To-Do')
    }

    setCreatingTodo(false)
  }

  /**
   * @type {React.DOMAttributes<HTMLInputElement>['onKeyDown']}
   */
  const onInputKeyDown = async ({ target, key }) => {
    if (key.toLowerCase() === 'enter') {
      await createTodo()

      /** @type {any} */
      const t = target
      t.focus()
    }
  }

  /**
   * @type {React.DOMAttributes<HTMLInputElement>['onInput']}
   */
  const onInputText = ({ target }) => {
    /** @type {any} */
    const t = target

    setTodoText(t.value)
  }

  return (
    <form>
      <input
        type="text"
        placeholder="To-Do text"
        onKeyDown={onInputKeyDown}
        disabled={creatingTodo}
        onInput={onInputText}
        value={todoText} />
    </form>
  )
}

export default CreateTodoForm
