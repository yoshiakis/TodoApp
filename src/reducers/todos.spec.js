import { ADD_TODO, DELETE_TODO, EDIT_TODO } from '../constants/ActionTypes'
import todos from './todos'

describe('todos reducer', () => {
  it('should handle initial state', () => {
    expect(todos(undefined, {})).toEqual([])
  })

  it('should handle ADD_TODO', () => {
    expect(todos([], {
      type: ADD_TODO,
      text: 'Reactを勉強'
    })).toEqual([
      {
        id: 0,
        text: 'Reactを勉強'
      }
    ])

    expect(todos([
      {
        id: 0,
        text: 'Reactを勉強'
      }
    ], {
      type: ADD_TODO,
      text: 'Reduxを学習'
    })).toEqual([
      {
        id: 1,
        text: 'Reduxを学習'
      }, {
        id: 0,
        text: 'Reactを勉強'
      }
    ])
  })

  it('should handle DELETE_TODO', () => {
    expect(todos([
      {
        id: 2,
        text: 'Jestでテスト'
      }, {
        id: 1,
        text: 'Reduxを学習'
      }, {
        id: 0,
        text: 'Reactを勉強'
      }
    ], {
      type: DELETE_TODO,
      id: 1
    })).toEqual([
      {
        id: 2,
        text: 'Jestでテスト'
      }, {
        id: 0,
        text: 'Reactを勉強'
      }
    ])
  })

  it('should handle EDIT_TODO', () => {
    expect(todos([
      {
        id: 2,
        text: 'Jestでテスト'
      }, {
        id: 1,
        text: 'Reduxを学習'
      }, {
        id: 0,
        text: 'Reactを勉強'
      }
    ], {
      type: EDIT_TODO,
      id: 1,
      text: 'Reduxを猛勉強'
    })).toEqual([
      {
        id: 2,
        text: 'Jestでテスト'
      }, {
        id: 1,
        text: 'Reduxを猛勉強'
      }, {
        id: 0,
        text: 'Reactを勉強'
      }
    ])
  })

  it('should handle unknown action correctly', () => {
    expect(todos([
      {
        id: 2,
        text: 'Jestでテスト'
      }, {
        id: 1,
        text: 'Reduxを学習'
      }, {
        id: 0,
        text: 'Reactを勉強'
      }
    ], {
      type: 'UNKNOWN'
    })).toEqual([
      {
        id: 2,
        text: 'Jestでテスト'
      }, {
        id: 1,
        text: 'Reduxを学習'
      }, {
        id: 0,
        text: 'Reactを勉強'
      }
    ])
  })
})
