import React from 'react'
import { match, RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from '../common/store/configureStore'
import Root from '../common/containers/Root'
import getRoutes from '../common/routes'

// แยกส่วนที่ใช้สร้าง HTML ออกมาเป็นฟังก์ชัน
// รับพารามิเตอร์หนึ่งตัวคือ HTML
const renderHtml = (html) => (`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset='utf-8'>
      <title>Wiki!</title>
    </head>
    <body>
      <div id='app'>${html}</div>
      <script src='http://127.0.0.1:8081/static/bundle.js'></script>
    </body>
  </html>
`)

export default function(req, res) {
  // สร้าง history ฝั่งเซิร์ฟเวอร์
  const memoryHistory = createMemoryHistory(req.originalUrl)
  // สร้าง store โดยส่ง history ที่ได้เป็นอาร์กิวเมนต์
  const store = configureStore(memoryHistory)
  // ยังจำได้ไหมเอ่ย เราต้องการเพิ่มความสามารถให้กับ history
  // เราจึงใช้ react-router-redux ซึ่งเราต้องตั้งค่าผ่าน syncHistoryWithStore
  // เพื่อให้ store รับรู้ถึงการเปลี่ยนแปลงของ history เช่นรู้ว่าตอนนี้อยู่ที่ URL ไหน
  const history = syncHistoryWithStore(memoryHistory, store)

  // ใช้ match เพื่อพิจารณาว่าปัจจุบันเราอยู่ที่ URL ไหนโดยดูจาก req.originalUrl ที่ส่งไปเป็น location
  // match จะเข้าคู่ URL นี้กับ routes ที่เรามีทั้งหมด
  match({
    routes: getRoutes(store, history),
    location: req.originalUrl
  }, (error, redirectLocation, renderProps) => {
    // หากเกิด error ก็ให้โยน HTTP 500 Internal Server Error ออกไป
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      // แต่ถ้าเจอว่าเป็นการ redirect ก็ให้ redirect ไปที่ path ใหม่
      res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`)
    } else if (renderProps) {
      res.status(200).send(
        // ส่ง RouterContext เข้าไปสร้าง HTML ใน renderHtml
        renderHtml(renderToString(<RouterContext {...renderProps} />))
      )
    } else {
      // ถ้าจับอะไรไม่ได้ซักอย่างก็ 404 Not Found ไปเลย
      res.status(404).send('Not found')
    }
  })
}
