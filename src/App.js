import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'
import reducer from './reducers'
import Index from './components/Index'
import pageIndex from './page/index'
import Layout from './Layout'

const store = createStore(reducer)
const AppComponent = props => <Layout location={props.location}>{props.children || null}</Layout>

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path='/' component={AppComponent}>
            <IndexRedirect to="todo/all" />
            <Route path="todo/:filter" component={Index} />
            <Route path='component'>
              <IndexRedirect to="input" />
              <Route path="input" component={pageIndex} />
            </Route>
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default App;
