import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'
import Page from './Page'

// เราเขียนคอมโพแนนท์ประเภทนี้เหมือนการประกาศฟังก์ชัน
// เราจึงเรียกมันว่า functional component
// สิ่งที่ส่งเข้ามาในฟังก์ชันคือค่า props
// คุณจะเขียนเป็น Pages = (props) แบบนี้ก็ได้
// แต่ผมต้องการใช้แค่ pages และ onReloadPages ไม่สนใจอย่างอื่น
// จึงดึงสองค่านี้ออกมา ซึ่งเป็นลักษณะเดียวกับการประกาศว่า
// const { pages, onReloadPages } = props
const Pages = ({
  pages,
  onReloadPages
}) => (
  <div>
    <button
      className='button'
      onClick={() => onReloadPages()}>
      Reload Pages
    </button>
    <hr />
    <table className='table'>
    <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          pages.map((page) => (
            <Page
              key={page.id}
              id={page.id}
              title={page.title} />
          ))
        }
      </tbody>
    </table>
  </div>
)

// functional component ไม่ใช่คลาส
// จึงไม่มีการนิยาม static จากภายใน
// ต้องมาประกบร่างข้างนอกแทน
Pages.propTypes = {
  pages: PropTypes.array.isRequired,
  onReloadPages: PropTypes.func.isRequired
}

export default Pages
