import gsap from 'gsap'

class Cursor {
  constructor() {
    if (process.client) {
      this.cursor = document.querySelector('.cursor')
    }

    this.cursorElements = []
    this.isHover = false
  }
  add() {
    const elements = document.querySelectorAll('.cursor-js')
    elements.forEach(element => {
      this.cursorElements.push(element)
    })
    this.addEvents()
  }
  addEvents() {
    this.cursorElements.forEach(element => {
      element.addEventListener('mouseenter', this.handleHover)
      element.addEventListener('mouseleave', this.handleHoverOut)
    })
  }
  handleHover() {
    console.log('yoo')
    gsap.to(this.cursor, {
      height: '10',
      width: '10px'
    })
  }
}
const cursor = new Cursor()

export default cursor
