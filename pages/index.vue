<template>
  <div ref="home" class="home">
    <div class="home-marquee">
      <div
        ref="firstRow"
        v-for="(project,index) in projects"
        :key="index"
        class="home-marquee--row left"
      >
        <span v-for="i in 5" :key="i">{{ project.title }}</span>
        <span v-for="i in 5" :key="i">{{ project.title }}</span>
      </div>
    </div>
    <div style class="home-marquee">
      <div
        ref="secondRow"
        v-for="(project,index) in projects"
        :key="index"
        class="home-marquee--row home-marquee-middle"
      >
        <span v-for="i in 3" :key="i" class="home-marquee-middle-left">{{ project.title }}</span>
        <div class="home-marquee-middle-center">
          <span class="middle--left">{{ project.type }}</span>
          <span
            ref="projectLink"
            :data-name="project.title"
            class="middle--center"
          >{{ project.title }}</span>
          <span class="middle--right">{{ project.type }}</span>
        </div>
        <span v-for="i in 3" :key="i" class="home-marquee-middle-right">{{ project.title }}</span>
      </div>
    </div>
    <div class="home-marquee">
      <div
        ref="thirdRow"
        v-for="(project,index) in projects"
        :key="index"
        class="home-marquee--row right"
      >
        <span v-for="i in 5" :key="i">{{ project.title }}</span>
        <span v-for="i in 5" :key="i">{{ project.title }}</span>
      </div>
    </div>
    <div class="home-pagination">
      <div class="home-pagination--current">01</div>
      <span />
      <div class="home-pagination--total">04</div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapMutations } from 'vuex'
// import VirtualScroll from '@/assets/js/VirtualScroll.js'

export default {
  data() {
    return {
      sliderInProgress: false
    }
  },
  computed: {
    ...mapState({
      projects: state => state.projects,
      currentProject: state => state.currentProject,
      indexProject: state => state.indexProject
    })
  },
  mounted() {
    this.handleEvents()
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleMouseClick)

    this.$refs.projectLink.forEach(element => {
      element.removeEventListener('click', this.handleProjectSelected)
      element.removeEventListener('mouseover', this.handleProjectHover)
      element.removeEventListener('mouseleave', this.handleProjectLeave)
    })
  },
  methods: {
    ...mapMutations({
      setCurrentProject: 'setCurrentProject',
      setIndexProject: 'setIndexProject'
    }),
    handleEvents() {
      document.addEventListener('click', this.nextSlide)

      this.$refs.projectLink.forEach(element => {
        element.addEventListener('click', this.handleProjectSelected)
        element.addEventListener('mouseover', this.handleProjectHover)
        element.addEventListener('mouseleave', this.handleProjectLeave)
      })
    },
    nextSlide(e) {
      if (
        e.target !== this.$refs.projectLink[this.indexProject] &&
        !this.sliderInProgress
      ) {
        this.sliderInProgress = true
        this.setIndexProject()
        this.setCurrentProject()

        gsap.to(
          [this.$refs.firstRow, this.$refs.secondRow, this.$refs.thirdRow],
          {
            yPercent: -this.indexProject * 100,
            duration: 2,
            ease: 'Power4.easeInOut',
            onComplete: () => {
              this.sliderInProgress = false
            }
          }
        )
      }
    },
    handleProjectSelected() {
      console.log('click')
    },
    handleProjectHover(e) {
      e.currentTarget.classList.add('active')
      this.$bus.$emit('cursorTransform', true)
    },
    handleProjectLeave(e) {
      e.currentTarget.classList.remove('active')
      this.$bus.$emit('cursorTransform', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  &-marquee {
    transform: rotate(-5deg);
    overflow: hidden;
    width: 100%;
    height: 30%;

    &--row {
      display: flex;
      white-space: nowrap;
      height: 50vh;
      width: 100%;
      font-size: 248px;
      position: relative;
      width: 100%;
      font-family: 'Gandur', 'Source Sans Pro';
      text-transform: uppercase;
      -webkit-text-stroke: 1px #ffffff;
      color: transparent;

      span::after {
        content: '\00a0';
      }

      &.left span {
        animation: 30s marqueeAnimation infinite linear;
      }
      &.right span {
        animation: 30s marqueeAnimation infinite linear reverse;
      }
    }

    &-middle {
      display: flex;
      justify-content: center;

      &-left {
        &::after {
          content: '' !important;
        }
        &::before {
          content: '\00a0';
        }
      }

      &-right {
        &::after {
          content: '\00a0';
        }
        &::before {
          content: '' !important;
        }
      }

      &-center {
        position: relative;
        margin: 0 60px;

        span::after {
          content: '' !important;
        }

        .middle--left,
        .middle--right {
          font-family: 'Manrope';
          font-weight: 200;
          font-size: 12px;
          position: absolute;
          transform: rotate(-90deg);
          top: 30%;
        }
        .middle--left {
          left: calc(-50px - 25px);
        }
        .middle--right {
          right: calc(-50px - 25px);
        }
        .middle--center {
          // -webkit-text-stroke: transparent;
          // color: white;
          &.active {
            &::before {
              height: 0%;
            }
          }
          &::before {
            content: attr(data-name);
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            height: 60%;
            color: white;
            overflow: hidden;
            transition: height 0.6s cubic-bezier(0.39, 0.575, 0.565, 1);
          }
        }
      }
    }
  }

  &-pagination {
    position: fixed;
    bottom: 30px;
    right: 40px;
    display: flex;
    align-items: center;
    font-family: 'Manrope';
    color: white;
    font-size: 14px;

    &--current {
      font-weight: 900;
    }
    &--total {
      font-weight: 200;
    }

    span {
      width: 40px;
      height: 1px;
      background: white;
      margin: 0 10px;
    }
  }
}

@keyframes marqueeAnimation {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
