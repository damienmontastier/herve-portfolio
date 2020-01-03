<template>
  <canvas class="webGLScene" />
</template>

<script>
// import Vue from 'vue'
// import WebGL from '@/webGL'
export default {
  name: 'WebglScene',
  mounted() {
    // Vue.prototype.$webgl = Vue.prototype.$webgl || new WebGL(this.$el)
    // this.$webgl.init()
  },
  beforeDestroy() {
    // this.$webgl.destroy()
    // Vue.prototype.$webgl = null
  }
}
</script>

<style lang="scss" scoped>
.webGLScene {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
