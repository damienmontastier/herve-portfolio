import Vue from 'vue'
import gsap from 'gsap'

let blockRotation = false

export const cursorHandler = {
  bind(el, { value: route }, vnode) {
    document.addEventListener('mousemove', handlerMouseMove.bind(this, el))
  },
  update(el, binding) {
    switch (binding.value) {
      case 'index':
        blockRotation = false
        break
      case 'works-project':
      case 'about':
        blockRotation = true
        break

      default:
        break
    }
  }
}

const handlerMouseMove = (el, e) => {
  if (!blockRotation && e.clientY < window.innerHeight / 2) {
    gsap.to(el, {
      duration: 0.8,
      rotation: '-180deg',
      ease: 'power2.out'
    })
  } else {
    gsap.to(el, {
      duration: 0.8,
      rotation: '0deg',
      ease: 'power2.out'
    })
  }
}

Vue.directive('cursorHandler', cursorHandler)
