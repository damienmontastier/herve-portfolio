<template>
  <div ref="home" class="home">
    <Slider ref="slider"></Slider>

    <div class="home-pagination">
      <div class="home-pagination--current">
        <transition-group :name="translate">
          <span
            ref="currentPagination"
            v-for="(project, index) in projects"
            v-show="currentProject === index"
            :key="index"
          >0{{ index + 1 }}</span>
        </transition-group>
      </div>
      <div class="home-pagination--line">
        <span ref="line" />
      </div>
      <div class="home-pagination--total">0{{ projects.length }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gsap from 'gsap'

export default {
  transition: {
    css: false,
    mode: 'in-out',
    enter(el, done) {
      done()
    },

    leave(el, done) {
      if (this.$router.currentRoute.name === 'works-project') {
        // const transitionNode = document.querySelector('.transition--home')
        const firstLayer = document.querySelector('.first-layer')
        const secondLayer = document.querySelector('.second-layer')
        gsap.to(firstLayer, {
          height: '100%',
          duration: 1
        })
        const tn = gsap.to(secondLayer, {
          height: '100%',
          duration: 1.5,
          onUpdate() {
            if (tn.progress() > 0.5) {
              done()
            }
          },
          onComplete: () => {
            gsap.set(firstLayer, { clearProps: 'all' })
            gsap.set(secondLayer, { clearProps: 'all' })
          }
        })
      }
    }
  },
  components: {
    Slider: () => import('@/components/Slider')
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      projects: state => state.projects,
      currentProject: state => state.currentProject,
      nextProject: state => state.nextProject,
      previousProject: state => state.previousProject
    }),
    translate() {
      return this.currentProject !== this.previousProject ? 'previous' : 'next'
    }
  },
  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.home {
  overflow: hidden;

  &-pagination {
    position: fixed;
    bottom: 30px;
    right: 40px;
    display: flex;
    font-family: 'Manrope';
    color: white;
    font-size: 14px;
    height: 15px;
    max-height: 15px;
    overflow: hidden;

    &--current {
      display: flex;
      flex-flow: column;
      align-items: center;
      font-weight: 900;
      min-width: 16px;

      span {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 15px;
      }
    }
    &--total {
      font-weight: 200;
      align-self: center;
    }

    &--line {
      width: 40px;
      height: 1px;
      margin: 0 10px;
      align-self: center;
      span {
        background: white;
        width: 100%;
        height: 100%;
        display: block;
        float: right;
      }
    }
  }
}
</style>
