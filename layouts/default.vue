<template>
  <div>
    <Nav />
    <nuxt />
    <Pointer />
    <!-- <WebGL /> -->
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Pointer from '@/components/Cursor'
// import WebGL from '@/components/WebGL'

export default {
  components: {
    Nav,
    Pointer
    // WebGL
  },
  head() {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
      ]
    }
  }
}
</script>

<style>
</style>
