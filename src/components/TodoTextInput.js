import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class TodoTextInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.text || ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  static propTypes = {
    text: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    newTodo: PropTypes.bool,
    editing: PropTypes.bool
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  handleBlur(e) {
    const { editing, onSave } = this.props
    if (editing) {
      const text = e.target.value.trim()
      onSave(text)
    }
  }

  handleKeyDown(e) {
    const { onSave } = this.props
    if (e.which === 13) {
      const text = e.target.value.trim()
      onSave(text)
      this.setState({ text: ''})
    }
  }

  render() {
    const { placeholder, newTodo, editing } = this.props
    const { text } = this.state
    return(
      <input className={classnames({
              newTodo: newTodo,
              editing: editing
             })}
             placeholder={placeholder}
             value={text}
             onChange={this.handleChange}
             onKeyDown={this.handleKeyDown}
             onBlur={this.handleBlur}
             autoFocus />
    )
  }
}
