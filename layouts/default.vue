<template>
  <div>
    <Nav />
    <nuxt />
    <Pointer />
    <div class="transition">
      <div class="transition--home">
        <div class="first-layer"></div>
        <div class="second-layer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Nav: () => import('@/components/Nav'),
    Pointer: () => import('@/components/Cursor')
  },
  head() {
    return {
      script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }]
    }
  }
}
</script>

<style lang="scss" scoped>
.transition {
  pointer-events: none;
  &--home {
    position: absolute;
    width: 110vw;
    height: 120%;
    right: 0;
    bottom: -100px;
    left: -5vw;
    z-index: 999999;
    transform: rotate(-5deg);
    overflow: hidden;
    .first-layer,
    .second-layer {
      width: 100%;
      position: absolute;
      bottom: 0;
      opacity: 0.4;
    }
    .first-layer {
      background: red;
      height: 0%;
    }
    .second-layer {
      height: 0%;
      background: $black;
    }
  }
}
</style>>


