import Vue from 'vue'

// const eventBus = {}

export const eventBus = new Vue()

// export default function({ app, store }) {
//   app.$bus = new Vue()
//   if (store) store.$bus = app.$bus
// }

eventBus.install = Vue => {
  Vue.prototype.$bus = eventBus
}

Vue.use(eventBus)
