<template>
  <div class="home-marquee">
    <!-- <div :key="index" class="home-marquee--row left">
      <div class="row--inner" v-for="i in 5" :key="'yo' + i">
        {{ project.title }}
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  mounted() {},
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
.home-marquee {
  transform: rotate(-5deg);
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;

  &--row {
    position: relative;
    display: flex;
    width: 100%;
    margin-bottom: 200px;
    font-family: 'Gandur', 'Source Sans Pro';
    font-size: 248px;
    text-transform: uppercase;
    -webkit-text-stroke: 1px #ffffff;
    color: transparent;
    white-space: nowrap;

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
}
</style>
