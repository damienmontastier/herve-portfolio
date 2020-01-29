<template>
  <div ref="about" class="about">
    <Marquee class="about-marquee" :dynamic="false" text="Let's connect"></Marquee>
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
