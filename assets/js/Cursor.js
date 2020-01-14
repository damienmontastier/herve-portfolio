import gsap from 'gsap'
import Emitter from '@/assets/js/Events'

class Cursor {
  constructor() {
    this.cursorElements = []
    this.isHover = false
  }

  add = () => {
    const elements = document.querySelectorAll('.cursor-js')
    elements.forEach(element => {
      this.cursorElements.push(element)
    })
    this.addEvents()
  }

  addEvents = () => {
    this.cursorElements.forEach(element => {
      element.addEventListener('mouseover', this.handleHover)
      element.addEventListener('mouseleave', this.handleHoverOut)
    })
  }

  handleHover = e => {
    Emitter.emit('blockCursor', true)

    const { top, right } = e.currentTarget.getBoundingClientRect()

    document.querySelector('.cursor').classList.add('is-active')

    gsap.to('.cursor', {
      x: right,
      y: top - 10,
      width: '10px',
      height: '10px',
      duration: 0.5
    })
  }

  handleHoverOut = () => {
    Emitter.emit('blockCursor', false)
    document.querySelector('.cursor').classList.remove('is-active')

    gsap.to('.cursor', {
      height: '100px',
      width: '100px',
      duration: 0.5
    })
  }
}
const cursor = new Cursor()

export default cursor
