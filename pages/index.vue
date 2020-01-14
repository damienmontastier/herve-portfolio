<template>
  <div ref="home" class="home">
    <div class="home-marquee">
      <div
        ref="firstRow"
        v-for="(project, index) in projects"
        :key="index"
        class="home-marquee--row left"
      >
        <div class="row--inner" v-for="i in 5" :key="'yo' + i">{{ project.title }}</div>
        <div class="row--inner" v-for="i in 5" :key="'ya' + i">{{ project.title }}</div>
      </div>
    </div>
    <div style class="home-marquee">
      <div
        ref="secondRow"
        v-for="(project, index) in projects"
        :key="index"
        class="home-marquee--row home-marquee-middle"
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
        class="home-marquee--row right"
      >
        <div class="row--inner" v-for="i in 5" :key="'yr' + i">{{ project.title }}</div>
        <div class="row--inner" v-for="i in 5" :key="'yn' + i">{{ project.title }}</div>
      </div>
    </div>
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
            <source srcset="https://picsum.photos/2000/1500" media="(min-width: 600px)" />
            <img src="https://picsum.photos/2000/1500" alt />
          </picture>
        </div>
      </div>
    </div>
    <div class="elements-cloned"></div>
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapMutations } from 'vuex'
import Emitter from '~/assets/js/Events'
// import nulifyTransforms from '~/assets/js/nulifyTransforms'

export default {
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
    this.projectNameToClone = document.querySelectorAll(
      '.home-marquee-middle-center'
    )[this.currentProject.index]

    this.projectNameToCloneBouding = this.projectNameToClone.getBoundingClientRect()

    document.querySelectorAll('.home-marquee')[1].classList.add('rotate')

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
            y: `-=100`,
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
                    100 * (this.projects.length - 1) +
                    (this.previousProject.index !== 0
                      ? -(this.previousProject.index * 100)
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
      const projectNameDivCloned = this.projectNameToClone.cloneNode(true)
      projectNameDivCloned.classList.add('divFrontOf')
      projectNameDivCloned.style.transform = `translate3d(${this.projectNameToCloneBouding.left}px, ${this.projectNameToCloneBouding.top}px, 0) rotate(-5deg)`
      document
        .querySelector('.elements-cloned')
        .appendChild(projectNameDivCloned)

      this.$refs.galleryPictures[this.currentProject.index].classList.add(
        'active'
      )
      this.$refs.gallery.classList.add('active')
      e.currentTarget.classList.add('active')
      Emitter.emit('cursorTransform', true)
    },
    handleProjectLeave(e) {
      document.querySelector('.divFrontOf').remove()

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

  &-marquee {
    // transform: rotate(-5deg);
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: relative;

    &.rotate {
      transform: rotate(-5deg);
    }

    &:nth-child(1),
    &:nth-child(3) {
      transform: rotate(-5deg);
    }

    @at-root .divFrontOf,
      &--row {
      font-family: 'Gandur', 'Source Sans Pro';
      font-size: 248px;
      text-transform: uppercase;
      -webkit-text-stroke: 1px #ffffff;
      color: transparent;
      white-space: nowrap;
    }

    &--row {
      position: relative;
      display: flex;
      width: 100%;
      margin-bottom: 100px;

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
    pointer-events: none;
    // background: red;

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
  // transform-origin: 100% 100%;
  pointer-events: none;
}
.elements-cloned {
  .divFrontOf {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    // transform-origin: 100% 100%;
    pointer-events: none;
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
