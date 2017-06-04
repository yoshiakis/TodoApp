import { ADD_TODO, DELETE_TODO, EDIT_TODO } from '../constants/ActionTypes'
import { addTodo, deleteTodo, editTodo } from './index'

describe('action creators', () => {
  it('should create ADD_TODO action', () => {
    expect(addTodo('Reactを勉強')).toEqual({
      type: ADD_TODO,
      text: 'Reactを勉強'
    })
  })

  it('should create DELETE_TODO action', () => {
    expect(deleteTodo(1)).toEqual({
      type: DELETE_TODO,
      id: 1
    })
  })

  it('should create EDIT_TODO action', () => {
    expect(editTodo(2, 'Reduxを学習')).toEqual({
      type: EDIT_TODO,
      id: 2,
      text: 'Reduxを学習'
    })
  })
})
