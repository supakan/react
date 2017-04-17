import React, { Component } from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import Root from '../common/containers/Root'

// เมื่อ JavaScript ฝั่งเบราเซอร์ทำงาน window จะเป็นตัวแปร global เข้าถึงได้ทุกที่
// เราดึงสถานะออกมาจากที่ตั้งค่าไว้ในเซิร์ฟเวอร์
const initialState = window.__INITIAL_STATE__
const rootEl = document.getElementById('app')

render(
  <AppContainer>
    <Root
      history={browserHistory}
      initialState={initialState} />
  </AppContainer>,
  rootEl
)

if (module.hot) {
  module.hot.accept('../common/containers/Root', () => {
    const NextRootApp = require('../common/containers/Root').default

    render(
      <AppContainer>
         <NextRootApp
           history={browserHistory}
           initialState={initialState} />
      </AppContainer>,
      rootEl
    )
  })
}
