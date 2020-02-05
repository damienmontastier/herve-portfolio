<template>
  <div ref="project" class="project">
    <Marquee class="project-marquee" :dynamic="false" :text="project[1].title"></Marquee>
    <div class="project-thumbnail">
      <img :src="project[1].thumbnail" />
    </div>
    <div class="container">
      <div class="container-row description">
        <span class="name-part">
          <ul>
            <li>Twitter</li>
            <li>Twitter</li>
            <li>Twitter</li>
            <li>Twitter</li>
          </ul>
        </span>
        <div class="container-row--content">
          <p>His back film little was you the a frequency on frequency behavioural frequencies eagerly however language needed my in salesmen have the were century good, frequencies eagerly however language needed</p>
        </div>
      </div>
    </div>
    <div class="project-visuals">
      <div v-for="(picture, index) in project[1].pictures" :key="index" class="visual">
        <picture>
          <source media="(min-width: )" srcset sizes />
          <img :src="picture" alt srcset />
        </picture>
      </div>
    </div>
    <div class="footer">
      <div class="footer__inner">
        <p>Scroll to see the next project</p>
        <Marquee class="project-marquee" :dynamic="false" :text="projects[nextProject].title"></Marquee>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import gsap from 'gsap'
import Marquee from '~/components/Marquee'

export default {
  transition: {
    css: false,
    mode: 'in-out',
    enter(el, done) {
      const test = el.querySelector('.m__row')

      gsap.from(test, {
        x: '200%',
        y: '100vh',
        z: 0,
        duration: 2
      })
      done()
    },

    leave(el, done) {
      done()
    }
  },
  validate({ store, params }) {
    return Object.values(store.state.projects).find(project => project.title.toLowerCase() === params.project)
  },
  asyncData({ route, store, params, query }) {
    const project = Object.entries(store.state.projects).find(project => project[1].title.toLowerCase() === params.project)
    const currentIndex = parseInt(project[0])
    return { project, currentIndex }
  },
  components: {
    Marquee
  },

  created() {
    this.setCurrentProject(this.currentIndex)
    console.log(this.current === this.projects.length - 1)
    if (!this.$store.state.nextProject && !this.$store.state.previousProject) {
      const next = this.currentIndex === this.projects.length - 1 ? 0 : (this.currentIndex += 1)
      this.setNextProject(next)
    }
  },
  mounted() {},
  methods: {
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
    indexProject() {
      let index = this.project[0]
      index++
      return index
    }
  }
}
</script>

<style lang="scss" scoped>
.project {
  .container {
    .container-row {
      span.name-part {
        position: absolute;
        left: 0;
        font-size: size(12px);
        font-weight: 200;
        font-family: 'Manrope';

        @include respond-to(md-) {
          position: relative;
        }
      }
      &--content {
        margin: auto;
        max-width: 650px;
        min-width: 50vw;
        font-family: 'Manrope';
        font-size: size(31px);
        font-weight: 200;

        p {
          line-height: size(42px);
        }

        @include respond-to(md-) {
          margin: auto;
          min-width: 100%;
        }
      }
    }
  }
  &-marquee {
    z-index: 9999999999;
    position: relative;
    margin-top: 150px;
  }

  &-thumbnail {
    display: flex;
    max-height: 540px;
    overflow: hidden;
    max-width: 75vw;
    min-height: 580px;
    position: relative;
    margin: -50px 0 150px auto;

    img {
      height: auto;
      width: 100%;
      object-fit: cover;
      position: relative;
    }
  }
  &-visuals {
    position: relative;
    width: 100%;
    background: #efefef;
    padding: 180px 0 100px 0;

    .visual {
      @include aspect-ratio(869, 498);
      margin: 0 20vw 100px;
    }
    & picture {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: #ffffff;
      overflow: hidden;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
  }
  .footer {
    width: 100%;
    height: 100vh;
    background: $black;

    &__inner {
      display: flex;
      justify-content: space-around;
      align-content: center;
      flex-wrap: wrap;
      flex-direction: row;
      height: 100%;
      width: 100%;

      p {
        font-size: size(14px);
        font-weight: 200;
        font-family: 'Manrope';
        text-transform: uppercase;
        color: white;
      }

      .project-marquee {
        margin-top: 50px;
      }
    }
  }
}
</style>
