<template>
  <div ref="gallery" class="gallery">
    <div ref="galleryMask" class="gallery-mask">
      <div ref="galleryImage" class="gallery-holder">
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
</template>

<script>
import { mapState } from 'vuex'
import gsap from 'gsap'
import Emitter from '@/assets/js/Events'

export default {
  data() {
    return {}
  },
  mounted() {
    this.handleEvents()
  },
  beforeDestroy() {
    this.$parent.$refs.linkProject.forEach(element => {
      element.removeEventListener('mouseover', this.handleProjectHover)
      element.removeEventListener('mouseleave', this.handleProjectLeave)
      element.removeEventListener('mousemove', this.handleMoveGallery)
    })
  },
  methods: {
    handleEvents() {
      this.$parent.$refs.linkProject.forEach(element => {
        element.addEventListener('mouseover', this.handleProjectHover)
        element.addEventListener('mouseleave', this.handleProjectLeave)
        element.addEventListener('mousemove', this.handleMoveGallery)
      })
    },
    handleProjectHover() {
      this.$refs.galleryPictures[this.currentProject].classList.add('active')
      this.$refs.gallery.classList.add('active')
      event.currentTarget.classList.add('active')
      Emitter.emit('cursorHoverProject', true)
    },
    handleProjectLeave(event) {
      this.$refs.galleryPictures[this.currentProject].classList.remove('active')
      this.$refs.gallery.classList.remove('active')
      event.currentTarget.classList.remove('active')
      Emitter.emit('cursorHoverProject', false)
    },
    handleMoveGallery(event) {
      const { width, height } = this.$refs.gallery.getBoundingClientRect()
      gsap.to(this.$refs.gallery, {
        x: event.clientX - width / 2,
        y: event.clientY - height / 2,
        duration: 0.5,
        ease: 'power1.out'
      })

      gsap.to(this.$refs.galleryImage, {
        x: (event.offsetX - width / 2) * 0.7,
        y: (event.offsetY - height / 2) * 0.7,
        duration: 0.5,
        ease: 'power1.out'
      })
    }
  },
  computed: {
    ...mapState({
      projects: state => state.projects,
      currentProject: state => state.currentProject
    })
  }
}
</script>

<style lang="scss" scoped>
.gallery {
  position: absolute;
  clip: rect(0px, 860px, 485px, 0px);
  width: 860px;
  height: 485px;
  opacity: 0;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 99999;
  top: 0;
  left: 0;
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &.active {
    opacity: 1;

    .gallery-mask {
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
    transition: height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  &-holder {
    width: 150%;
    height: 100vh;
    position: absolute;
    top: -25%;

    picture {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);

      &.active {
        opacity: 1;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
