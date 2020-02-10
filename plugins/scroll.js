import Vue from 'vue'
import Emitter from '@/assets/js/Events'

const VirtualScroll = process.client ? require('virtual-scroll') : null

const scroll = new Vue({
  created() {
    if (!process.client) return
    const vs = new VirtualScroll({ useKeyboard: false })
    vs.on(e => {
      Emitter.emit('scroll', e)
    })
  }
})

export default scroll
