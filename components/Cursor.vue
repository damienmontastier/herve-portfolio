<template>
  <div ref="cursor" class="cursor">
    <svg class="arrow" width="27" height="42" xmlns="http://www.w3.org/2000/svg">
      <g fill="#FFF" fill-rule="evenodd">
        <path d="M12.075 0h3v38h-3z" />
        <path d="M24.879 26.575L27 28.697l-13.16 13.2-2.122-2.122z" />
        <path d="M2.197 26L.076 28.122 12.804 40.85l2.12-2.122z" />
      </g>
    </svg>
  </div>
</template>

<script>
import gsap from 'gsap'

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
  methods: {
    handleEvents() {
      document.addEventListener('mousemove', this.handleMouseMove)
    },
    handleMouseMove(e) {
      this.mousePosition.x = e.clientX
      this.mousePosition.y = e.clientY

      console.log(this.$refs.cursor.getBoundingClientRect())

      gsap.to(this.$refs.cursor, {
        duration: 1,
        x: this.mousePosition.x - this.cursorParams.width / 2,
        y: this.mousePosition.y - this.cursorParams.width / 2
      })
      console.log('mouse')
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
}
</style>
