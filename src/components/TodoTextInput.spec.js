import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow'
import TodoTextInput from './TodoTextInput'

const setup = propOverrides => {
  const props = Object.assign({
    onSave: jest.fn()
  }, propOverrides)

  const renderer = createRenderer()
  renderer.render(<TodoTextInput {...props} />)
  const output = renderer.getRenderOutput()

  return { output, props, renderer }
}

const newTodoTrue = {
  newTodo: true,
  placeholder: '何をしますか？'
}

const editingTrue = {
  editing: true,
  text: 'Reactを勉強'
}

describe('TodoTextInput component', () => {
  it('should render correctly if newTodo=true', () => {
    const { output } = setup(newTodoTrue)
    expect(output.type).toBe('input')
    expect(output.props.placeholder).toBe('何をしますか？')
    expect(output.props.value).toBe('')
    expect(output.props.autoFocus).toBe(true)
  })

  it('should change value on change', () => {
    const { output, renderer } = setup(newTodoTrue)
    output.props.onChange({ target: { value: 'a'　}})
    const updated = renderer.getRenderOutput()
    expect(updated.props.value).toBe('a')
  })

  it('should call onSave and clear value on enter keyDown', () => {
    const { output, props, renderer } = setup(newTodoTrue)
    output.props.onChange({ target: { value: 'Reduxを学習 '}})
    output.props.onKeyDown({ which: 13, target: { value: 'Reduxを学習 '　}})
    expect(props.onSave).toBeCalledWith('Reduxを学習')
    const updated = renderer.getRenderOutput()
    expect(updated.props.value).toBe('')
  })

  it('should not call onSave on any keyDown except enter', () => {
    const { output, props } = setup(newTodoTrue)
    output.props.onKeyDown({ which: 32, target: { value: 'Reduxを学習'}})
    expect(props.onSave).not.toBeCalled()
  })

  it('should not call onSave on blur if newTodo=true' , () => {
    const { output, props } = setup(newTodoTrue)
    output.props.onBlur({ target: { value: 'Reduxを学習'　}})
    expect(props.onSave).not.toBeCalled()
  })

  it('should render correctly if editing=true', () => {
    const { output } = setup(editingTrue)
    expect(output.type).toBe('input')
    expect(output.props.placeholder).toBe(undefined)
    expect(output.props.value).toBe('Reactを勉強')
  })

  it('should call onSave on blur if editing=true', () => {
    const { output, props } = setup(editingTrue)
    output.props.onBlur({ target: { value: 'Jestでテスト ' }})
    expect(props.onSave).toBeCalledWith('Jestでテスト')
  })
})
