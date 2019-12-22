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
  components: {
    Nav,
    Pointer
  }
}
</script>

<style>
</style>
