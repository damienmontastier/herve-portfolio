<template>
  <div ref="about" class="about">
    <Marquee></Marquee>
    <div class="elements-cloned"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Marquee from '~/components/Marquee'

export default {
  components: {
    Marquee
  },
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
    this.handleEvents()
  },
  beforeDestroy() {},
  methods: {
    handleEvents() {}
  }
}
</script>

<style lang="scss" scoped>
.about {
}
</style>
