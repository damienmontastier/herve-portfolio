<template>
  <div ref="cursor" class="cursor z-cursor">
    <svg ref="arrow" class="arrow" width="20" height="31" viewBox="0 0 20 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g ref="arrowG" fill="#FFF" fill-rule="evenodd">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.54807 28.8591L8.99604 0.791321L11.9957 0.839196L11.5477 28.907L8.54807 28.8591Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.8379 21.6992L10.1174 30.9838L0.684998 21.6311L2.7973 19.5008L10.1565 26.7978L17.7658 19.5298L19.8379 21.6992Z" />
      </g>
    </svg>
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState } from 'vuex'

import Emitter from '@/assets/js/Events'

export default {
  created() {},
  mounted() {
    this.handleEvents()
  },
  computed: {
    ...mapState({
      projects: state => state.projects,
      currentProject: state => state.currentProject,
      nextProject: state => state.nextProject,
      previousProject: state => state.previousProject
    })
  },
  methods: {
    handleEvents() {
      Emitter.on('blockCursor', bool => (this.cursorBlocked = bool))
    }
  },
  watch: {
    currentProject(current) {
      gsap.to(this.$refs.cursor, {
        background: this.projects[current].gradient,
        ease: 'power2.out',
        duration: 1
      })
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
  z-index: 9999999999;
  transition: border 0.5s ease-in-out;

  &--work-about {
    background: none !important;
    border: 1px solid white;
    mix-blend-mode: difference;
  }

  &.hover {
    background: white !important;
    transform: rotate(180deg);
    svg {
      g {
        fill: $black;
      }
    }
  }

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
