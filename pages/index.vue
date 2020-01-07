<template>
  <div ref="home" class="home">
    <div class="home-marquee">
      <div
        ref="firstRow"
        v-for="(project, index) in projects"
        :key="index"
        class="home-marquee--row left"
      >
        <span v-for="i in 5" :key="'yo' + i">{{ project.title }}</span>
        <span v-for="i in 5" :key="'ya' + i">{{ project.title }}</span>
      </div>
    </div>
    <div style class="home-marquee">
      <div
        ref="secondRow"
        v-for="(project, index) in projects"
        :key="index"
        class="home-marquee--row home-marquee-middle"
      >
        <span v-for="i in 3" :key="'ye' + i" class="home-marquee-middle-left">{{
          project.title
        }}</span>
        <div class="home-marquee-middle-center">
          <span class="middle--left">{{ project.type }}</span>
          <span
            ref="projectLink"
            :data-name="project.title"
            class="middle--center"
            >{{ project.title }}</span
          >
          <span class="middle--right">{{ project.type }}</span>
        </div>
        <span
          v-for="i in 3"
          :key="'yu' + i"
          class="home-marquee-middle-right"
          >{{ project.title }}</span
        >
      </div>
    </div>
    <div class="home-marquee">
      <div
        ref="thirdRow"
        v-for="(project, index) in projects"
        :key="index"
        class="home-marquee--row right"
      >
        <span v-for="i in 5" :key="'yr' + i">{{ project.title }}</span>
        <span v-for="i in 5" :key="'yn' + i">{{ project.title }}</span>
      </div>
    </div>
    <div class="home-pagination">
      <div class="home-pagination--current">
        <span
          ref="currentPagination"
          v-for="(project, index) in projects"
          :key="index"
          >0{{ index + 1 }}</span
        >
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
            <source
              srcset="https://picsum.photos/2000/1500"
              media="(min-width: 600px)"
            />
            <img src="https://picsum.photos/2000/1500" alt />
          </picture>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapMutations } from 'vuex'
import Emitter from '~/assets/js/events'

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
      nextProject: state => state.nextProject,
      previousProject: state => state.previousProject,
      indexProject: state => state.indexProject
    })
  },
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
        x: (e.clientX - window.innerWidth / 2) * 0.5,
        y: (e.clientY - window.innerHeight / 2) * 0.5,
        duration: 0.5,
        ease: 'power1.out'
      })

      gsap.to(this.$refs.galleryImage, {
        x: (e.offsetX - width / 2) * 0.65,
        y: (e.offsetY - height / 2) * 0.65,
        duration: 0.5,
        ease: 'power1.out'
      })
    },
    handleProjectHover(e) {
      const divCenter = document.querySelectorAll(
        '.home-marquee-middle-center'
      )[this.currentProject.index]
      const { left, top } = divCenter.getBoundingClientRect()
      const pPrime = divCenter.cloneNode(true)
      pPrime.classList.add('frontOf')
      pPrime.style.transform = `translate3d(${left}px, ${top}px, 0) rotate(-5deg)`
      document.querySelector('.home').appendChild(pPrime)

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
// @import './';

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
    height: 100%;
    position: relative;

    @at-root .frontOf,
      &--row {
      font-family: 'Gandur', 'Source Sans Pro';
      font-size: 248px;
      text-transform: uppercase;
      -webkit-text-stroke: 1px #ffffff;
      color: transparent;
      white-space: nowrap;
      margin-bottom: 100px;
      display: block;

      @include respond-to(xxl) {
        font-size: 380px;
      }
    }

    &--row {
      position: relative;
      display: flex;
      width: 100%;
      // height: 50vh;

      @include respond-to(xxl) {
        font-size: 380px;
      }

      span {
        display: block;
      }

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
          top: 50%;
        }
        .middle--left {
          left: calc(-50px - 25px);
        }
        .middle--right {
          right: calc(-50px - 25px);
        }
        .middle--center {
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
            height: 100%;
            color: white;
            overflow: hidden;
            transition: height 0.6s cubic-bezier(0.39, 0.575, 0.565, 1);
          }
        }
        &.frontOf {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          margin: 0;
          pointer-events: none;
          z-index: 9999;
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
      // left: -25%;
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

@keyframes marqueeAnimation {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
