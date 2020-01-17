import VirtualScroll from 'virtual-scroll'
import Emitter from '@/assets/js/Events'

if (process.client) {
  var virtualScroll = new VirtualScroll({
    useKeyboard: false
  })
}

virtualScroll.on(e => {
  if (virtualScroll.disabled) return
  Emitter.emit('scroll', { event: e })
})

export default virtualScroll
