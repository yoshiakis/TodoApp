import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow'
import Header from './Header'
import TodoTextInput from './TodoTextInput'

const setup = () => {
  const props = {
    addTodo: jest.fn()
  }

  const renderer = createRenderer()
  renderer.render(<Header {...props} />)
  const output = renderer.getRenderOutput()

  return { output, props }
}

describe('Header component', () => {
  it('should render correctly', () => {
    const { output } = setup()
    expect(output.type).toBe('header')
    expect(output.props.className).toBe('header')
    const [ h1, input ] = output.props.children
    expect(h1.type).toBe('h1')
    expect(h1.props.children).toBe('Todoアプリ')
    expect(input.type).toBe(TodoTextInput)
    expect(input.props.newTodo).toBe(true)
    expect(input.props.placeholder).toBe('何をしますか？')
  })

  it('should call addTodo it length of the text is greater than 0', () => {
    const { output, props } = setup()
    const input = output.props.children[1]
    input.props.onSave('')
    expect(props.addTodo).not.toBeCalled()
    input.props.onSave('Reactを勉強')
    expect(props.addTodo).toBeCalledWith('Reactを勉強')
  })
})
