import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow'
import MainSection from './MainSection'
import TodoItem from './TodoItem'

const setup = propOverrides => {
  const props = Object.assign({
    todos: [],
    actions: {
      addTodo: jest.fn(),
      deleteTodo: jest.fn(),
      editTodo: jest.fn()
    }
  }, propOverrides)

  const renderer = createRenderer()
  renderer.render(<MainSection {...props} />)
  const output = renderer.getRenderOutput()

  return { output, props }
}

describe('MainSection component', () => {
  it('should render correctly', () => {
    const { output, props } = setup({ todos: [
      {
        id: 0,
        text: 'Reactを勉強'
      }, {
        id: 1,
        text: 'Reduxを学習'
      }, {
        id: 2,
        text: 'Jestでテスト'
      }
    ]})
    expect(output.type).toBe('section')
    const list = output.props.children
    expect(list.type).toBe('ul')
    expect(list.props.children.length).toBe(3)
    list.props.children.forEach((item, i) => {
      expect(item.type).toBe(TodoItem)
      expect(item.props.addTodo).toBe(props.actions.addTodo)
      expect(item.props.completeTodo).toBe(props.actions.completeTodo)
      expect(item.props.editTodo).toBe(props.actions.editTodo)
      expect(item.props.text).toBe(props.todos[i].text)
    })
  })
})
