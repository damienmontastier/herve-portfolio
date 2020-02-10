import Vue from 'vue'
import gsap from 'gsap'

let blockRotation = false

export const cursorHandler = {
  bind(el, { value: route }, vnode) {
    document.addEventListener('mousemove', handlerMouseMove.bind(this, el))
  },
  update(el, binding, vnode) {
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

  const { width } = el.getBoundingClientRect()

  gsap.to(el, {
    duration: 0.5,
    x: e.clientX - width / 2,
    y: e.clientY - width / 2,
    ease: 'power1.out'
  })
}

Vue.directive('cursorHandler', cursorHandler)
