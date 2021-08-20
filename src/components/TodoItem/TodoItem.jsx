// @ts-check
import React from 'react'
import PropTypes from 'prop-types'

import './TodoItem.scss'

/**
 * @typedef {Object} TodoItem
 * @property {number} id
 * @property {string} text
 * @property {boolean} done
 */

/**
 * @typedef {Object} TodoItemProps
 * @property {TodoItem} item
 * @property {(
 *  item: TodoItem,
 *  checked: boolean
 * ) => void} onItemChecked
 * @property {(item: TodoItem) => void} onItemRemove
 */

/**
 * @type React.FC<TodoItemProps>
 */
const TodoItem = ({
  item,
  onItemChecked,
  onItemRemove
}) => {
  /**
   * @type {React.InputHTMLAttributes<HTMLInputElement>['onChange']}
   */
  const onCheck = ({ target }) => {
    onItemChecked(item, target.checked)
  }

  return (
    <li
      className="c-todo-item"
      data-testid="todoItem">
      <button
        data-testid="removeBtn"
        className="c-todo-item__remove-btn"
        onClick={() => onItemRemove(item)}>
        &times;
      </button>

      <input
        data-testid="toggleCheck"
        className="c-todo-item__done-check"
        type="checkbox"
        onChange={onCheck}
        checked={item.done} />

      <span
        data-testid="todoText"
        className={`c-todo-item__text ${item.done ? 'c-todo-item__text--done' : ''}`}>
        {item.text}
      </span>
    </li>
  )
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired
  }).isRequired,
  onItemChecked: PropTypes.func.isRequired,
  onItemRemove: PropTypes.func.isRequired
}

export default TodoItem
