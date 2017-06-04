import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow'
import TodoItem from './TodoItem'
import TodoTextInput from './TodoTextInput'

const setup = ( editing = false ) => {
  const props = {
    id: 1,
    text: 'Reactを勉強',
    deleteTodo: jest.fn(),
    editTodo: jest.fn()
  }

  const renderer = createRenderer()
  renderer.render(<TodoItem {...props} />)
  const output = renderer.getRenderOutput()

  if( editing === false ) {
    return { output, props }
  }
  output.props.children[0].props.onClick()
  const updated = renderer.getRenderOutput()
  return { updated, props, renderer }
}

describe('TodoItem component', () => {
  it('should render correctly', () => {
    const { output } = setup()
    expect(output.type).toBe('li')
    const [ todo, button ] = output.props.children
    expect(todo.type).toBe('span')
    expect(todo.props.children).toBe('Reactを勉強')
    expect(button.type).toBe('button')
    expect(button.props.children).toBe('×')
  })

  it('should change into editing on click todo', () => {
    const { updated } = setup(true)
    expect(updated.type).toBe('li')
    const input = updated.props.children
    expect(input.type).toBe(TodoTextInput)
    expect(input.props.editing).toBe(true)
    expect(input.props.text).toBe('Reactを勉強')
  })

  it('input onSave should call editTodo and finish editing if input is not empty', () => {
    const { updated, props, renderer } = setup(true)
    const input = updated.props.children
    input.props.onSave('Reduxを学習')
    expect(props.editTodo).toBeCalledWith(1, 'Reduxを学習')
    const output = renderer.getRenderOutput()
    expect(output.type).toBe('li')
    const [ todo, button ] = output.props.children
    expect(todo.type).toBe('span')
    expect(button.type).toBe('button')
    expect(button.props.children).toBe('×')
  })

  it('input onSave should call deleteTodo if input is empty', () => {
    const { updated, props } = setup(true)
    const input = updated.props.children
    input.props.onSave('')
    expect(props.deleteTodo).toBeCalledWith(1)
  })

  it('button should call deleteTodo', () => {
    const { output, props } = setup()
    const button = output.props.children[1]
    button.props.onClick()
    expect(props.deleteTodo).toBeCalledWith(1)
  })
})
