<template>
  <div>
    <Nav />
    <nuxt />
    <!-- <Pointer /> -->
  </div>
</template>

<script>
import Nav from '@/components/Nav'
// import Pointer from '@/components/Cursor'

export default {
  components: {
    Nav
    // Pointer
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
