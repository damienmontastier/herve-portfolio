<template>
  <div ref="about" class="about">
    <Marquee class="about-marquee" :dynamic="false" text="Let's connect"></Marquee>
    <div class="container">
      <div class="container-row about">
        <span class="name-part">about</span>
        <div class="container-row--content">
          <p>His back film little was you the a frequency on frequency behavioural frequencies eagerly however language needed my in salesmen have the were century good, frequencies eagerly however language needed</p>
        </div>
      </div>
      <div class="container-row experiences">
        <span class="name-part">experience</span>
        <div class="container-row--content">
          <ul>
            <li>
              <span>AQKA</span>
              <p>Interactive and motion designer / 2019 - present</p>
            </li>
            <li>
              <span>AQKA</span>
              <p>Interactive and motion designer / 2019 - present</p>
            </li>
            <li>
              <span>AQKA</span>
              <p>Interactive and motion designer / 2019 - present</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="container-row social-network">
        <span class="name-part">find me</span>
        <div class="container-row--content">
          <ul>
            <li>Twitter</li>
            <li>Twitter</li>
            <li>Twitter</li>
          </ul>
        </div>
      </div>
      <div class="container-row credits">
        <span class="name-part">Credits</span>
        <div class="container-row--content">
          <p>Coded by Damien</p>
        </div>
      </div>
    </div>
    <div class="elements-cloned"></div>
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState } from 'vuex'
import Emitter from '@/assets/js/Events'
// import Raf from '@/assets/js/Raf'

export default {
  components: {
    Marquee: () => import('@/components/Marquee')
  },
  data() {
    return {
      pos: 0,
      delta: 0
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
    // Raf.add('scroll', this.update.bind(this))
    Emitter.on('scroll', this.handleScroll)
  },
  beforeDestroy() {
    // Raf.remove('scroll', this.update.bind(this))
    Emitter.off('scroll', this.handleScroll)
  },
  methods: {
    handleScroll(e) {
      this.delta = e.deltaY

      this.pos += -this.delta + 10
      this.pos = Math.max(0, Math.min(this.pos, document.body.scrollHeight - this.$viewport.height))

      gsap.to(this.$refs.about, {
        y: -this.pos,
        ease: 'power4.out',
        duration: 2
      })
    },
    update() {
      // if (process.client) this.$refs.about.style.transform = `translate3d(0px, ${-this.pos}px, 0)`
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  font-family: Manrope;
  font-weight: 200;
  text-transform: lowercase;
  &-marquee {
    margin-top: 150px;
    margin-bottom: 150px;
  }
  .container-row {
    span.name-part {
      font-size: 16px;
      color: #cecece;
    }
    &.social-network {
      ul {
        display: flex;
        li {
          font-size: 31px;
          display: flex;
          &:last-child {
            &::after {
              content: '';
            }
          }
          &::after {
            content: '\00a0 / \00a0';
            display: block;
          }
        }
      }
    }
    &.about {
      font-size: 31px;
    }
    &.experiences {
      ul {
        li {
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding-bottom: 30px;
          margin-bottom: 30px;
          span {
            text-transform: uppercase;
            font-size: 31px;
            margin-bottom: 15px;
            display: block;
          }
          p {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
