<template>
  <div class="home-marquee">
    <div
      ref="firstRow"
      v-for="(project, index) in projects"
      :key="index"
      class="home-marquee--row left"
    >
      <span v-for="i in 5" :key="'yo' + i">{{ project.title }}</span>
      <span v-for="i in 5" :key="'ya' + i">{{ project.title }}</span>
    </div>
  </div>
</template>

<script>
import Cursor from '@/assets/js/Cursor'

export default {
  mounted() {
    Cursor.add()
  }
}
</script>

<style lang="scss" scoped>
.nav-menu {
  position: fixed;
  top: 30px;
  left: 40px;
  z-index: 999;

  ul {
    display: inline-flex;
    li {
      font-size: 12px;
      font-family: 'Manrope';
      text-transform: uppercase;
      overflow: hidden;

      &:hover {
        a {
          transform: translateY(-100%);
        }
      }

      &:first-child {
        margin-right: 20px;
      }
      a {
        text-decoration: none;
        color: white;
        position: relative;
        display: block;
        transition: transform 0.2s ease-out;

        &:after {
          content: attr(data-value);
          position: absolute;
          top: 100%;
          left: 0;
        }
      }
    }
  }
}
</style>
