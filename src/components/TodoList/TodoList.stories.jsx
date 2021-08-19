// @ts-check
import TodoList from './TodoList'

export default {
  title: 'Components/TodoList',
  component: TodoList 
}

const Template = props => (
  <TodoList {...props}  />
)

export const Default = Template.bind()

Default.args = {
  items: [
    {
      id: Math.random(),
      text: 'Prueba 1',
      done: false
    },
    {
      id: Math.random(),
      text: 'Prueba 2',
      done: true
    }
  ]
}
