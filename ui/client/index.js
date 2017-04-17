import React, { Component } from 'react'
import { render } from 'react-dom'
// import เข้ามาก่อน
import { browserHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import Root from '../common/containers/Root'

const rootEl = document.getElementById('app')

render(
  <AppContainer>
    <Root
      history={browserHistory} />
  </AppContainer>,
  rootEl
)

if (module.hot) {
  module.hot.accept('../common/containers/Root', () => {
    const NextRootApp = require('../common/containers/Root').default

    render(
      <AppContainer>
         <NextRootApp
           history={browserHistory} />
      </AppContainer>,
      rootEl
    )
  })
}
