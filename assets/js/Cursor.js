import gsap from 'gsap'
// import Events from '../../plugins/bus'
import Events from '@/plugins/bus'

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
      element.addEventListener('mouseenter', this.handleHover)
      element.addEventListener('mouseleave', this.handleHoverOut)
    })
  }
  handleHover = e => {
    const {
      left,
      top,
      width,
      height,
      right,
      bottom
    } = e.currentTarget.getBoundingClientRect()
    console.log(left, top, width, height, right, bottom)

    console.log('here', Events)
    Events.$on('blockCursor', () => {
      console.log('yos')
    })

    gsap.to('.cursor', {
      height: '10px',
      width: '10px',
      x: 100,
      y: 50
    })
  }
  handleHoverOut = () => {
    gsap.set('.cursor', { clearProps: 'all' })
  }
}
const cursor = new Cursor()

export default cursor
