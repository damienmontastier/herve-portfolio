// import gsap from 'gsap'
// const store = require('@/store/index.js')
// import { store } from '@/store/index.js'
// console.log(store)

let VirtualScroll

export default class Slider {
  constructor({ listRow, topElements, centerElements, bottomElements }) {
    if (process.client) {
      VirtualScroll = require('virtual-scroll')
    }

    this.scrollHandler = new VirtualScroll({
      useKeyboard: false,
      passive: true
    })

    this.handleEvents()
  }
  handleEvents() {
    document.addEventListener('click', this.handleSlider)

    this.scrollHandler.on(e => this.handleSlider)
  }

  removeEvents() {
    document.removeEventListener('click', this.handleSlider)

    this.scrollHandler.off(() => this.handleSlider)
  }

  handleSlider = e => {
    const y = -(e.pageY / window.innerHeight) * 2 + 1

    e.type === 'click' && y > 0 ? this.changeSlide('-1') : this.changeSlide('1')
  }
  changeSlide = direction => {
    console.log(direction)
  }
}
