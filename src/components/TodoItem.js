import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoTextInput from './TodoTextInput'

export default class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.state = { editing: false }

    this.handleTextClick = this.handleTextClick.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired
  }

  handleTextClick() {
    this.setState({ editing: true })
  }

  handleButtonClick() {
    const { id, deleteTodo } = this.props
    deleteTodo(id)
  }

  handleSave(text) {
    const { id, editTodo, deleteTodo } = this.props
    if (text) {
      editTodo(id, text)
      this.setState({ editing: false })
    } else {
      deleteTodo(id)
    }
  }

  render() {
    const { text } = this.props
    const { editing } = this.state
    if (editing) {
      return (
        <li>
          <TodoTextInput editing
                         text={text}
                         onSave={this.handleSave} />
        </li>
      )
    }
    return (
      <li className="todo-item">
        <span className="todo-item-text"
              onClick={this.handleTextClick}>
          {text}
        </span>
        <button className="delete-button"
                onClick={this.handleButtonClick}>
          ×
        </button>
      </li>
    )
  }
}
