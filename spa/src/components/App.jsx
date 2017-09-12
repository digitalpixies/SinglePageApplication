import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import {Framework7App} from 'framework7-react'
import PropTypes from 'prop-types'

const App = () => (
  <Framework7App>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </Framework7App>
)

export default App
