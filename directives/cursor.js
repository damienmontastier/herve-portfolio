// import Vue from 'vue'
import gsap from 'gsap'
import Emitter from '@/assets/js/Events'

let blockRotation = false
let cursorHoverActive = false

export default {
  bind(el, { value: route }, vnode) {
    Emitter.on('cursorHoverProject', handlerHoverProject.bind(this, vnode))

    document.addEventListener('mousemove', handlerMouseMove.bind(this, el))
  },
  update(el, binding, vnode) {
    vnode.elm.classList.remove('hover')

    switch (binding.value) {
      case 'index':
        blockRotation = false
        vnode.elm.classList.remove('cursor--work-about')
        break
      case 'works-project':
      case 'about':
        blockRotation = true
        vnode.elm.classList.add('cursor--work-about')
        break
      default:
        break
    }
  }
}
const handlerHoverProject = (vnode, bool) => {
  if (bool) {
    vnode.elm.classList.add('hover')
    cursorHoverActive = true
  } else {
    vnode.elm.classList.remove('hover')
    cursorHoverActive = false
  }
}
const handlerMouseMove = (el, e) => {
  if (!cursorHoverActive && !blockRotation && e.clientY < window.innerHeight / 2) {
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
