<template>
  <div class="slider" ref="slider">
    <div class="slider__m">
      <transition-group :name="direction">
        <div
          ref="rowTop"
          v-for="(project, index) in projects"
          v-show="currentProject === index"
          :key="index"
          class="slider__m--row slider__m--top m-title stroke left"
        >
          <div
            class="row--inner"
            v-for="i in 8"
            :key="'slider_bottom_inner' + i"
            v-html="project.title"
          ></div>
        </div>
      </transition-group>
    </div>

    <div class="slider__m">
      <transition-group :name="direction">
        <div
          v-for="(project, index) in projects"
          :key="index"
          v-show="currentProject === index"
          class="slider__m--row slider__m--center slider__m-middle m-title stroke"
        >
          <span
            v-for="i in 3"
            :key="'slider_center' + i"
            class="slider__m-middle-left"
            v-html="project.title"
          ></span>
          <div :data-type="project.type" class="slider__m-middle-center">
            <!-- <nuxt-link
              :key="project.title.toLowerCase()"
              :to="{ name: 'works-project', params: {project: project.title.toLowerCase() }}"
            >-->
            <span
              ref="linkProject"
              :data-name="project.title"
              class="middle--center"
              v-html="project.title"
            ></span>
            <!-- </nuxt-link> -->
          </div>
          <span
            v-for="i in 3"
            :key="'slider_bottom' + i"
            class="slider__m-middle-right"
            v-html="project.title"
          ></span>
        </div>
      </transition-group>
    </div>
    <div class="slider__m">
      <transition-group :name="direction">
        <div
          ref="rowBottom"
          v-for="(project, index) in projects"
          :key="index"
          v-show="currentProject === index"
          class="slider__m--row slider__m--bottom m-title stroke right"
        >
          <div
            class="row--inner"
            v-for="i in 8"
            :key="'slider_bottom_inner' + i"
            v-html="project.title"
          ></div>
        </div>
      </transition-group>
    </div>
    <Gallery></Gallery>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Emitter from '@/assets/js/Events'

export default {
  components: {
    Gallery: () => import('@/components/Gallery')
  },
  data() {
    return {
      currentIndex: 0,
      direction: null,
      enableScroll: true
    }
  },
  created() {},
  mounted() {
    this.handleEvents()
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleMouseClick)
    Emitter.off('scroll', this.handleScroll)

    this.$refs.linkProject.forEach(link => {
      link.removeEventListener('click', this.goToProject)
    })
  },
  methods: {
    handleEvents() {
      document.addEventListener('click', this.handleMouseClick)
      Emitter.on('scroll', this.handleScroll)
      this.$refs.linkProject.forEach(link => {
        link.addEventListener('click', this.goToProject)
      })
    },

    handleScroll(e) {
      if (!this.enableScroll) return
      this.enableScroll = false
      const sign = Math.sign(e.deltaY)
      if (sign > 0) this.previousSlide()
      else this.nextSlide()

      setTimeout(() => {
        this.enableScroll = true
      }, 1000)
    },

    handleMouseClick(e) {
      if (!e.target.classList.contains('middle--center') && e.target.localName !== 'a') {
        if (e.clientY < window.innerHeight / 2) {
          this.previousSlide()
        } else {
          this.nextSlide()
        }
      }
    },
    goToProject() {
      this.$router.push({
        name: 'works-project',
        params: {
          project: this.projects[this.currentProject].title.toLowerCase()
        }
      })
    },
    nextSlide() {
      this.direction = 'next'
      this.currentIndex++
    },
    previousSlide() {
      this.direction = 'previous'
      this.currentIndex--
    },
    ...mapMutations({
      setCurrentProject: 'setCurrentProject',
      setNextProject: 'setNextProject',
      setPreviousProject: 'setPreviousProject'
    })
  },
  computed: {
    ...mapState({
      projects: state => state.projects,
      currentProject: state => state.currentProject,
      nextProject: state => state.nextProject,
      previousProject: state => state.previousProject
    }),
    currentProject() {
      return Math.abs(this.currentIndex) % Object.keys(this.projects).length
    },
    previousProject() {
      return Math.abs(this.currentIndex + 1) % Object.keys(this.projects).length
    },
    nextProject() {
      return Math.abs(Object.keys(this.projects).length + this.currentIndex - 1) % Object.keys(this.projects).length
    }
  },
  watch: {
    currentProject: {
      handler(index) {
        this.setCurrentProject(index)
      }
    },
    previousProject: {
      handler(index) {
        this.setPreviousProject(index)
      }
    },
    nextProject: {
      handler(index) {
        this.setNextProject(index)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.slider {
  width: 100%;
  height: 100vh;
  position: relative;

  &__m {
    transform: rotate(-5deg);
    overflow: hidden;
    width: 100%;
    height: 33.33%;
    position: relative;

    &:nth-child(2) {
      z-index: 999999;
    }

    &--row {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      @include respond-to(xxl) {
        font-size: size(380px);
      }

      .row--inner::after {
        content: '\00a0';
      }

      &.left,
      &.right {
        opacity: 0.2;
      }

      &.left .row--inner {
        animation: 30s marqueeAnimation infinite linear;
      }
      &.right .row--inner {
        animation: 30s marqueeAnimation infinite linear reverse;
      }
    }

    &-middle {
      display: flex;
      justify-content: center;

      &-left,
      &-right {
        display: block;
        opacity: 0.2;
      }

      &-left {
        &::before {
          content: '\00a0';
        }
      }

      &-right {
        &::after {
          content: '\00a0';
        }
      }

      &-center {
        position: relative;
        margin: 0 60px;

        &::after,
        &::before {
          content: attr(data-type);
          position: absolute;
          display: block;
          top: 50%;
          color: white;
          font-family: 'Manrope';
          font-weight: 200;
          font-size: 12px;
        }

        &::before {
          left: 0;
          transform: translateX(calc(-50% - 30px)) translateY(-50%) rotate(-90deg);
        }
        &::after {
          right: 0;
          transform: translateX(calc(50% + 30px)) translateY(-50%) rotate(-90deg);
        }

        .middle--center {
          display: block;
          position: relative;
          color: transparent;
          -webkit-text-stroke-color: white;

          &.active {
            &::after {
              height: 0%;
            }
          }
          &::after {
            content: attr(data-name);
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            color: white;
            overflow: hidden;
            transition: height 0.6s cubic-bezier(0.39, 0.575, 0.565, 1);
          }
        }
      }
    }
  }
}

@keyframes marqueeAnimation {
  from {
    transform: translateX(0) translateZ(0);
  }
  to {
    transform: translateX(-100%) translateZ(0);
  }
}
</style>
