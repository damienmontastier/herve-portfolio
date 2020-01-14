<template>
  <div ref="cursor" class="cursor">
    <svg
      ref="arrow"
      class="arrow"
      width="20"
      height="31"
      viewBox="0 0 20 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g ref="arrowG" fill="#FFF" fill-rule="evenodd">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.54807 28.8591L8.99604 0.791321L11.9957 0.839196L11.5477 28.907L8.54807 28.8591Z"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19.8379 21.6992L10.1174 30.9838L0.684998 21.6311L2.7973 19.5008L10.1565 26.7978L17.7658 19.5298L19.8379 21.6992Z"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import gsap from 'gsap'
import Emitter from '@/assets/js/Events'

export default {
  data() {
    return {
      mousePosition: { x: 0, y: 0 },
      cursorParams: {}
    }
  },
  created() {},
  mounted() {
    this.handleEvents()
    this.cursorParams = this.$refs.cursor.getBoundingClientRect()
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.handleMouseMove)
  },
  methods: {
    handleEvents() {
      document.addEventListener('mousemove', this.handleMouseMove)

      Emitter.on('cursorTransform', this.cursorTransform)

      Emitter.on('blockCursor', bool => (this.cursorBlocked = bool))
    },
    handleMouseMove(e) {
      this.mousePosition.x = e.clientX
      this.mousePosition.y = e.clientY

      if (!this.cursorBlocked) {
        gsap.to(this.$refs.cursor, {
          duration: 0.5,
          x: this.mousePosition.x - this.cursorParams.width / 2,
          y: this.mousePosition.y - this.cursorParams.width / 2,
          ease: 'power1.out'
        })
      }
    },
    cursorTransform(bool) {
      if (bool) {
        gsap.to(this.$refs.cursor, {
          duration: 0.3,
          background: 'white'
        })
        gsap.to(this.$refs.arrow, {
          duration: 0.3,
          rotate: '-95deg'
        })
        gsap.to(this.$refs.arrowG, {
          fill: 'black',
          duration: 0.3
        })
      } else {
        gsap.to(this.$refs.arrow, {
          duration: 0.3,
          rotate: 0
        })
        gsap.to(this.$refs.arrowG, {
          fill: 'white',
          duration: 0.3
        })
        gsap.to(this.$refs.cursor, {
          duration: 0.2,
          background: 'linear-gradient(180deg, #5061ee 0%, #9d50f3 99%)'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cursor {
  height: 100px;
  width: 100px;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(180deg, #5061ee 0%, #9d50f3 99%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 999999;

  &.is-active {
    background: transparent !important;
    border: 1px solid #d8d8d8;

    & svg {
      visibility: hidden;
      opacity: 0;
    }
  }
}
</style>
