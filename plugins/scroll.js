import Vue from 'vue'
const VirtualScroll = process.client ? require('virtual-scroll') : null

console.log(VirtualScroll)

const scroll = new Vue({
  created() {
    console.log('test scroll plugin')
  },
  mounted() {}
})

export default scroll
