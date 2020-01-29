<template>
  <div ref="home" class="home">
    <Slider ref="slider"></Slider>

    <div class="home-pagination">
      <div class="home-pagination--current">
        <span
          ref="currentPagination"
          v-for="(project, index) in projects"
          :key="index"
        >0{{ currentProject.index + 1 }}</span>
      </div>
      <div class="home-pagination--line">
        <span ref="line" />
      </div>
      <div class="home-pagination--total">0{{ projects.length }}</div>
    </div>
    <Gallery></Gallery>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Slider from '@/components/Slider'
import Gallery from '@/components/Gallery'

export default {
  components: {
    Slider,
    Gallery
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      projects: state => state.projects,
      currentProject: state => state.currentProject,
      nextProject: state => state.nextProject,
      previousProject: state => state.previousProject
    })
  },
  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.home {
  overflow: hidden;

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
}
</style>
