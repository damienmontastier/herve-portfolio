<template>
  <div>
    <Nav />
    <nuxt />
    <Pointer />
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Pointer from '@/components/Cursor'

export default {
  head() {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
      ]
    }
  },
  components: {
    Nav,
    Pointer
  }
}
</script>

<style>
</style>
