import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'
import routes from '../routes'

export default class App extends Component {
  render() {
    // ส่งมาให้ฉันที
    const { history } = this.props
    const store = configureStore(history)

    return (
      <Provider store={store} key='provider'>
        {routes(store, history)}
      </Provider>
    )
  }
}
