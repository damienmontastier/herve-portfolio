// import Events from '../../plugins/bus.js'

// if (typeof window !== 'undefined') {
//   const VirtualScroll = require('virtual-scroll')

//   console.log('VirtualScroll')

//   const scroll = new VirtualScroll({
//     useKeyboard: false
//   })

//   scroll.on(e => {
//     if (scroll.disabled) return

//     Events.emit('scroll', {
//       event: e
//     })
//   })
// }
// export default scroll

// if (process.client) {
//   export default class vScroll {
//     constructor() {
//       const VirtualScroll = require('virtual-scroll')

//       this.vScroll = new VirtualScroll({
//         useKeyboard: false
//       })
//     }
//   }

//   var s = new VirtualScroll()
// }

// export default s

// class vScroll {
//   constructor() {
//     if (process.client) {
//       this.virtualScroll = require('virtual-scroll')
//       this.ready(() => {
//         this.init()
//       })
//     }
//   }
// }

// export default new vScroll()
