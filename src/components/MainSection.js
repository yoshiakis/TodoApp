import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

export default class MainSection extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  renderTodoItem(todos, actions) {
    return todos.map(todo =>
      <TodoItem key={todo.id}
                {...actions}
                {...todo} />
    )
  }

  render() {
    const { todos, actions } = this.props
    return (
      <section>
        <ul>
          {this.renderTodoItem(todos, actions)}
        </ul>
      </section>
    )
  }
}
