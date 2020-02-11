/* eslint-disable */

import Vue from 'vue'

const Viewport = new Vue({
  data() {
    if (!process.client) return
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      ratio: window.innerWidth / window.innerHeight
    }
  },
  created() {
    if (!process.client) return
    document.addEventListener('resize', this.onWindowResize.bind(this))
  },
  methods: {
    onWindowResize() {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.ratio = this.width / this.height
    }
  }
})

Vue.prototype.$viewport = Viewport

export default Viewport
