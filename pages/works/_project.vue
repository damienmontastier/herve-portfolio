<template>
  <div ref="project" class="project">
    <p>0{{indexProject}}</p>
    <Marquee class="project-marquee" :dynamic="false" :text="project[1].title"></Marquee>
    <div class="project-thumbnail">
      <img :src="project[1].thumbnail" />
    </div>
    <div class="container">
      <div class="container-row about">
        <span class="name-part">about</span>
        <div class="container-row--content">
          <p>
            His back film little was you the a frequency on frequency
            behavioural frequencies eagerly however language needed my in
            salesmen have the were century good, frequencies eagerly however
            language needed
          </p>
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
    <div class="project-visuals"></div>
    <div class="project-footer"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Marquee from '~/components/Marquee'

export default {
  validate({ store, params }) {
    return Object.values(store.state.projects).find(project => project.title.toLowerCase() === params.project)
  },
  asyncData({ route, store, params, query }) {
    const project = Object.entries(store.state.projects).find(project => project[1].title.toLowerCase() === params.project)
    console.log(project)
    return { project }
  },
  components: {
    Marquee
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
  &__marquee {
    z-index: 99;
    position: relative;
  }
  &-thumbnail {
    display: flex;
    max-height: 540px;
    overflow: hidden;
    max-width: 70%;
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
}
</style>
