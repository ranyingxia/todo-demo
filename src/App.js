import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'
import reducer from './reducers'
import Index from './components/Index'
import RegexInput from './page/custom/RegexInput'
import DynamicFieldSet from './page/custom/DynamicFieldSet'
import Layout from './Layout';

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
            <Route path='custom'>
              <IndexRedirect to="input" />
              <Route path="input" component={RegexInput} />
              <Route path="dynamicFieldSet" component={DynamicFieldSet} />
            </Route>
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default App;
