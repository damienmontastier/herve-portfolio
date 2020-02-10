<template>
  <div>
    <Nav />
    <nuxt />
    <Pointer v-cursorHandler="cursorComportement" />
    <div class="transition">
      <div class="transition--home">
        <div class="first-layer"></div>
        <div class="second-layer"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import { cursorHandler } from '@/directives/cursor.js'

export default {
  directives: {
    // cursorHandler
  },
  components: {
    Nav: () => import('@/components/Nav'),
    Pointer: () => import('@/components/Cursor')
  },
  data() {
    return {
      cursorComportement: 'basic'
    }
  },
  head() {
    return {
      script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }]
    }
  },
  created() {
    this.cursorComportement = this.$route.name
  },
  watch: {
    $route: {
      handler(route) {
        // console.log(route, this.$refs.cursor)
        this.cursorComportement = route.name
        // switch (route.name) {
        //   case 'index':
        //     this.cursorBlockRotation = false
        //     this.$refs.cursor.classList.remove('cursor--work-about')
        //     break
        //   case 'works-project':
        //   case 'about':
        //     this.cursorBlockRotation = true
        //     this.$refs.cursor.classList.add('cursor--work-about')
        //     break

        //   default:
        //     break
        // }
      }
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
      // opacity: 0.4;
    }
    .first-layer {
      background: white;
      height: 0%;
    }
    .second-layer {
      height: 0%;
      background: $black;
    }
  }
}</style
>>
