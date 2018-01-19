import React, { Component } from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

class Index extends Component{
  render() {
    return (
      <div>
        <AddTodo />
        <VisibleTodoList filter={this.props.params.filter || 'all'} />
        <Footer />
      </div>
    )
  }
}

export default Index
