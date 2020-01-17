<template>
  <div ref="project" class="project">
    <Marquee class="project-marquee" :dynamic="false" :text="project.title"></Marquee>
    <img :src="project.thumbnail" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Marquee from '~/components/Marquee'

export default {
  validate({ store, params }) {
    return Object.values(store.state.projects).find(
      project => project.title.toLowerCase() === params.project
    )
  },
  asyncData({ route, store, params, query }) {
    const project = Object.values(store.state.projects).find(
      project => project.title.toLowerCase() === params.project
    )
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
      previousProject: state => state.previousProject,
      indexProject: state => state.indexProject
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
