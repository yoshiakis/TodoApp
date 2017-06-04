import { ADD_TODO, DELETE_TODO, EDIT_TODO } from '../constants/ActionTypes'

const newTodoId = state =>
  state.reduce((maxId, todo) => maxId > todo.id ? maxId : todo.id + 1, 0)

export default function todos(state = [], action) {
  switch(action.type) {
    case ADD_TODO:
      return [
        {
          id: newTodoId(state),
          text: action.text
        },
        ...state
      ]
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id)
    case EDIT_TODO:
      return state.map(todo => {
        if (todo.id !== action.id) {
          return todo
        }
        return {
          ...todo,
          text: action.text
        }
      })
    default:
      return state;
  }
}
