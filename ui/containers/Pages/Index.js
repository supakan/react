import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
// เรียก PAGES_ENDPOINT มาใช้งาน
import { PAGES_ENDPOINT } from '../../constants/endpoints'
import { Pages } from '../../components'

export default class PagesContainer extends Component {
  state = {
    pages: []
  }

  // ถ้า pages ของเดิมกับของใหม่เท่ากัน ก็ไม่ต้องทำอะไร
  shouldComponentUpdate(_nextProps, nextState) {
    return this.state.pages !== nextState.pages;
  }

  onReloadPages = () => {
    fetch(PAGES_ENDPOINT)
      .then((response) => response.json())
      .then((pages) => this.setState({ pages }))
  }

  componentDidMount() {
    // เนื่องจากทั้งปุ่ม reload และใน componentDidMount
    // มีการโหลดข้อมูลจากเซิร์ฟเวอร์ทั้งคู่
    // จึงย้ายโค๊ดที่ซ้ำซ้อนแบกไปไว้อีกเมธอดชื่อ onReloadPages
    this.onReloadPages()
  }

  render() {
    // ส่ง onReloadPages ไปให้ ui/components/Pages
    // เมื่อผู้ใช้งานระบบคลิกปุ่ม reload pages
    // ui/components/Pages จะเรียกเมธอด onReloadPages ให้ทำงาน
    return (
      <Pages
        pages={this.state.pages}
        onReloadPages={this.onReloadPages} />
    )
  }
}
