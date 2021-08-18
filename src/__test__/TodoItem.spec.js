// @ts-check
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import TodoItem from '../components/TodoItem/TodoItem'

/**
 * @type {import('../components/TodoItem/TodoItem').TodoItem}
 */
const testItem = {
  id: 1,
  text: 'test',
  done: false
}

const noop = () => {}

test('should render correctly', () => {
  const { container } = render(
    <TodoItem
      item={testItem}
      onItemChecked={noop}
      onItemRemove={noop} />
  )

  expect(container).toMatchSnapshot()
})

test('should call prop events', async () => {
  let currentTestItem = testItem
  const onItemChecked = jest.fn().mockImplementation((_, done) => (
    currentTestItem = {
      ...currentTestItem,
      done
    }
  ))

  const onItemRemove = jest.fn()

  const renderFn = () => (
    <TodoItem
      item={currentTestItem}
      onItemChecked={onItemChecked}
      onItemRemove={onItemRemove} />
  )

  const { findByTestId, rerender } = render(renderFn())

  const removeBtn = await findByTestId('removeBtn')
  const toggleCheck = await findByTestId('toggleCheck')
  const text = await findByTestId('text')

  fireEvent.click(removeBtn)
  fireEvent.click(toggleCheck)

  // Assert item removing
  expect(onItemRemove).toBeCalledWith(testItem)
  expect(onItemRemove).toBeCalledTimes(1)

  // Assert item's status toggling
  expect(onItemChecked).toBeCalledWith(testItem, true)
  expect(onItemChecked).toBeCalledTimes(1)

  expect(text.classList.contains('c-todo-item__text--done')).toBe(false)

  rerender(renderFn())

  expect(text.classList.contains('c-todo-item__text--done')).toBe(true)
})
