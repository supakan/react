import React from 'react'
import { match, RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from '../common/store/configureStore'
import Root from '../common/containers/Root'
import getRoutes from '../common/routes'
import { fetchComponent } from './fetchComponent.js'

// renderHtml ของเรารอบนี้รับ state เริ่มต้นมาด้วย
const renderHtml = (html, initialState) => (`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset='utf-8'>
      <title>Wiki!</title>
    </head>
    <body>
      <div id='app'>${html}</div>
      <script>
        <!-- เราจะนำสถานะเริ่มต้นนี้แปะไว้ใน window.__INITIAL_STATE__ -->
        <!-- เมื่อ React ฝั่ง client ทำงานจะนำค่านี้ไปฉีดใส่ store ของเรา -->
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>
      <script src='http://127.0.0.1:8081/static/bundle.js'></script>
    </body>
  </html>
`)

export default function(req, res) {
  const memoryHistory = createMemoryHistory(req.originalUrl)
  const store = configureStore(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

  match({
    routes: getRoutes(store, history),
    location: req.originalUrl
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.log(error)
      res.status(500).send('Internal Server Error')
    } else if (redirectLocation) {
      res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`)
    } else if (renderProps) {
      const { components, params } = renderProps

      fetchComponent(store.dispatch, components, params)
        .then(html => {
          const componentHTML = renderToString(
            <Provider store={store} key='provider'>
              <RouterContext {...renderProps} />
            </Provider>
          )

          // เรียก getState เพื่อดึงค่าจาก store ปัจจุบันของฝั่งเซิร์ฟเวอร์
          // state ของเซิร์ฟเวอร์จะอัดฉีดลง store ฝั่ง client ภายหลัง
          const initialState = store.getState()

          res.status(200).send(
            renderHtml(componentHTML, initialState)
          )
        })
        .catch(error => {
          console.log(error)
          res.status(500).send('Internal Server Error')
        })
    } else {
      res.status(404).send('Not found')
    }
  })
}
