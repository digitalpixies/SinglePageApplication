import React from 'react'
import PropTypes from 'prop-types'
import {ListItem} from 'framework7-react'

const Todo = ({ onClick, completed, text }) => (
  <ListItem
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </ListItem>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
