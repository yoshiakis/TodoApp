import React from 'react'
import PropTypes from 'prop-types'
import TodoTextInput from './TodoTextInput'

const Header = ({ addTodo }) => {
  const handleSave = text => {
    if (text) {
      addTodo(text)
    }
  }

  return (
    <header className="header">
      <h1>
        Todoアプリ
      </h1>
      <TodoTextInput newTodo
                     onSave={handleSave}
                     placeholder="何をしますか？" />
    </header>
  )
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired
}

export default Header
