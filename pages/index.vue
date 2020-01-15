<template>
  <div ref="home" class="home">
    <div class="home-marquee">
      <div
        ref="firstRow"
        v-for="(project, index) in projects"
        :key="index"
        class="home-marquee--row marquee-title left"
      >
        <div class="row--inner" v-for="i in 5" :key="'yo' + i">{{ project.title }}</div>
        <div class="row--inner" v-for="i in 5" :key="'ya' + i">{{ project.title }}</div>
      </div>
    </div>
    <!-- <Marquee ref="firstRow" :dynamic="true"></Marquee> -->

    <div class="home-marquee">
      <div
        ref="secondRow"
        v-for="(project, index) in projects"
        :key="index"
        class="home-marquee--row home-marquee-middle marquee-title"
      >
        <span v-for="i in 3" :key="'ye' + i" class="home-marquee-middle-left">{{ project.title }}</span>
        <div :data-type="project.type" class="home-marquee-middle-center">
          <span
            ref="projectLink"
            :data-name="project.title"
            class="middle--center"
          >{{ project.title }}</span>
        </div>
        <span v-for="i in 3" :key="'yu' + i" class="home-marquee-middle-right">{{ project.title }}</span>
      </div>
    </div>
    <div class="home-marquee">
      <div
        ref="thirdRow"
        v-for="(project, index) in projects"
        :key="index"
        class="home-marquee--row marquee-title right"
      >
        <div class="row--inner" v-for="i in 5" :key="'yr' + i">{{ project.title }}</div>
        <div class="row--inner" v-for="i in 5" :key="'yn' + i">{{ project.title }}</div>
      </div>
    </div>
    <!-- <Marquee ref="thirdRow" :dynamic="true"></Marquee> -->

    <div class="home-pagination">
      <div class="home-pagination--current">
        <span
          ref="currentPagination"
          v-for="(project, index) in projects"
          :key="index"
        >0{{ index + 1 }}</span>
      </div>
      <div class="home-pagination--line">
        <span ref="line" />
      </div>
      <div class="home-pagination--total">0{{ projects.length }}</div>
    </div>
    <div ref="gallery" class="home--gallery">
      <div ref="galleryMask" class="home--gallery-mask">
        <div ref="galleryImage" class="home--gallery-holder">
          <picture
            ref="galleryPictures"
            v-for="(project, index) in projects"
            :key="index"
            class="pictures"
          >
            <source :srcset="project.thumbnail" media="(min-width: 600px)" />
            <img :src="project.thumbnail" :alt="`${project.title}-img`" />
          </picture>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapMutations } from 'vuex'
import Emitter from '~/assets/js/Events'
// import Marquee from '~/components/Marquee'

export default {
  components: {
    // Marquee
  },
  data() {
    return {
      sliderInProgress: false,
      projectNameToClone: null,
      projectNameToCloneBouding: null
    }
  },
  computed: {
    ...mapState({
      projects: state => state.projects,
      currentProject: state => state.currentProject,
      nextProject: state => state.nextProject,
      previousProject: state => state.previousProject,
      indexProject: state => state.indexProject
    })
  },
  beforeMount() {},
  mounted() {
    // this.$cursor.add()
    this.handleEvents()
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleMouseClick)

    this.$refs.projectLink.forEach(element => {
      element.removeEventListener('click', this.handleProjectSelected)
      element.removeEventListener('mouseover', this.handleProjectHover)
      element.removeEventListener('mouseleave', this.handleProjectLeave)
      element.addEventListener('mousemove', this.handleMoveGallery)
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
        element.addEventListener('mousemove', this.handleMoveGallery)
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

        const tl = gsap.timeline()
        tl.to(this.$refs.line, 0.5, {
          float: 'right',
          width: '0%'
        }).to(this.$refs.line, 0.5, {
          width: '100%',
          float: 'left'
        })

        gsap.to(this.$refs.currentPagination, {
          duration: 0.5,
          yPercent: '-=100',
          onComplete: () => {
            gsap.set(this.$refs.currentPagination[this.previousProject.index], {
              yPercent:
                100 * (this.projects.length - 1) +
                (this.previousProject.index !== 0
                  ? -(this.previousProject.index * 100)
                  : 0)
            })
          }
        })

        gsap.to(
          [this.$refs.firstRow, this.$refs.secondRow, this.$refs.thirdRow],
          {
            yPercent: `-=100`,
            y: `-=200`,
            duration: 2,
            ease: 'Power4.easeInOut',
            onComplete: () => {
              this.sliderInProgress = false

              gsap.set(
                [
                  this.$refs.firstRow[this.previousProject.index],
                  this.$refs.secondRow[this.previousProject.index],
                  this.$refs.thirdRow[this.previousProject.index]
                ],
                {
                  yPercent:
                    100 * (this.projects.length - 1) +
                    (this.previousProject.index !== 0
                      ? -(this.previousProject.index * 100)
                      : 0),
                  y:
                    200 * (this.projects.length - 1) +
                    (this.previousProject.index !== 0
                      ? -(this.previousProject.index * 200)
                      : 0)
                }
              )
            }
          }
        )
      }
    },

    handleProjectSelected() {
      console.log('click')
    },
    handleMoveGallery(e) {
      const { width, height } = this.$refs.gallery.getBoundingClientRect()

      gsap.to(this.$refs.gallery, {
        x: (e.clientX - window.innerWidth / 2) * 0.6,
        y: (e.clientY - window.innerHeight / 2) * 0.6,
        duration: 0.5,
        ease: 'power1.out'
      })

      gsap.to(this.$refs.galleryImage, {
        x: (e.offsetX - width / 2) * 0.7,
        y: (e.offsetY - height / 2) * 0.7,
        duration: 0.5,
        ease: 'power1.out'
      })
    },
    handleProjectHover(e) {
      this.$refs.galleryPictures[this.currentProject.index].classList.add(
        'active'
      )
      this.$refs.gallery.classList.add('active')
      e.currentTarget.classList.add('active')
      Emitter.emit('cursorTransform', true)
    },
    handleProjectLeave(e) {
      this.$refs.galleryPictures[this.currentProject.index].classList.remove(
        'active'
      )
      this.$refs.gallery.classList.remove('active')
      e.currentTarget.classList.remove('active')
      Emitter.emit('cursorTransform', false)
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

  .marquee {
    .home-marquee {
      &--row {
        margin-bottom: 200px;
      }
    }
  }

  &-marquee {
    transform: rotate(-5deg);
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: relative;

    &:nth-child(2) {
      z-index: 999999;
    }

    &--row {
      position: relative;
      display: flex;
      width: 100%;
      margin-bottom: 200px;

      @include respond-to(xxl) {
        font-size: 380px;
      }

      .row--inner::after {
        content: '\00a0';
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
          transform: translateY(-50%) rotate(-90deg);
        }

        &::before {
          left: -65px;
        }
        &::after {
          right: -65px;
        }

        .middle--center {
          display: block;
          position: relative;

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

      span {
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
  &--gallery {
    position: absolute;
    clip: rect(0px, 860px, 485px, 0px);
    width: 860px;
    height: 485px;
    opacity: 0;
    visibility: hidden;
    mix-blend-mode: screen;
    pointer-events: none;

    &.active {
      opacity: 1;
      visibility: visible;

      .home--gallery-mask {
        height: 100%;
      }
    }

    &-mask {
      height: 0%;
      overflow: hidden;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    &-holder {
      width: 150%;
      height: 100vh;
      position: absolute;
      top: -25%;
      // opacity: 0.9;

      picture {
        opacity: 0;
        visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        &.active {
          opacity: 1;
          visibility: visible;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
.divFrontOf {
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  pointer-events: none;
}
.elements-cloned {
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
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
