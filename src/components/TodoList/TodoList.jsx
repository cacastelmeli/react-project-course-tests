// @ts-check
import React from 'react'
import { apiClient } from '../../api/client'

import TodoItem from '../TodoItem/TodoItem'
import './TodoList.scss'

/**
 * @typedef {Object} TodoListProps
 * @property {Array<import('../TodoItem/TodoItem').TodoItem>} items
 * @property {(nextTodos: Array<import('../TodoItem/TodoItem').TodoItem>) => void} setNextTodos
 */

/**
 * @type React.FC<TodoListProps>
 */
const TodoList = ({
  items,
  setNextTodos
}) => {
  /**
   * @type {import('../TodoItem/TodoItem').TodoItemProps['onItemChecked']}
   */
  const onItemChecked = async (item, checked) => {
    const nextTodo = {
      ...item,
      done: checked
    }

    await apiClient.patch('todos', {
      json: nextTodo
    })

    setNextTodos(
      items.map(_item => {
        if (item.id !== _item.id) {
          return _item
        }

        return nextTodo
      })
    )
  }

  /**
   * @type {import('../TodoItem/TodoItem').TodoItemProps['onItemRemove']}
   */
  const onItemRemove = async item => {
    await apiClient.delete(`todos/${item.id}`)

    setNextTodos(
      items.filter(_item => _item.id !== item.id)
    )
  }

  return (
    <ul className="c-todo-list">
      {items.map(item => (
        <TodoItem
          key={item.id}
          item={item}
          onItemChecked={onItemChecked}
          onItemRemove={onItemRemove} />
      ))}
    </ul>
  )
}

export default TodoList
