<template>
  <div class="marquee">
    <div v-if="dynamic" class="home-marquee">
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="home-marquee--row marquee-title stroke left"
      >
        <div class="row--inner" v-for="i in 5" :key="'yo' + i">
          {{ project.title }}
        </div>
        <div class="row--inner" v-for="i in 5" :key="'ya' + i">
          {{ project.title }}
        </div>
      </div>
    </div>
    <div v-else class="home-marquee">
      <div class="home-marquee--row marquee-title fill left">
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
.home-marquee {
  transform: rotate(-5deg);
  overflow: hidden;
  width: 100%;
  position: relative;

  &--row {
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
      animation: 30s marqueeAnimation infinite linear;
    }
    &.right .row--inner {
      animation: 30s marqueeAnimation infinite linear reverse;
    }
  }
}

@keyframes marqueeAnimation {
  from {
    transform: translateX(0) translateZ(0);
  }
  to {
    transform: translateX(-100%) translateZ(0);
  }
}
</style>
