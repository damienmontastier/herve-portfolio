<template>
  <div class="marquee">
    <div v-if="dynamic" class="m">
      <div v-for="(project, index) in projects" :key="index" class="m__row m-title stroke left">
        <div class="row--inner" v-for="i in 5" :key="'yo' + i">{{ project.title }}</div>
        <div class="row--inner" v-for="i in 5" :key="'ya' + i">{{ project.title }}</div>
      </div>
    </div>
    <div v-else class="m">
      <div class="m__row m-title fill left">
        <div class="row--inner" v-for="i in 5" :key="'yo' + i">{{ text }}</div>
        <div class="row--inner" v-for="i in 5" :key="'ya' + i">{{ text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    dynamic: Boolean,
    text: String
  },
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
.m {
  transform: rotate(-5deg);
  overflow: hidden;
  width: 100%;
  position: relative;

  &__row {
    position: relative;
    display: flex;
    width: 100%;

    @include respond-to(xxl) {
      font-size: 380px;
    }

    .row--inner::after {
      content: '\00a0';
    }

    &.left .row--inner {
      animation: 10s marqueeAnimation infinite linear;
    }
    &.right .row--inner {
      animation: 10s marqueeAnimation infinite linear reverse;
    }
  }
}

@keyframes marqueeAnimation {
  from {
    transform: translateX(-150%) translateZ(0);
  }
  to {
    transform: translateX(-250%) translateZ(0);
  }
}
</style>
