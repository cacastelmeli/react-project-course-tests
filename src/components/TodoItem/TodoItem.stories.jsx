// @ts-check
import TodoItem from './TodoItem'

export default {
  title: 'Components/TodoItem',
  component: TodoItem 
}

export const Default = props => (
  <TodoItem
    item={{
      id: Math.random(),
      text: 'Prueba',
      done: false
    }}
    {...props} />
)
